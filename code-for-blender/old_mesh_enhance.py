bl_info = {
    "name": "Meshy Model Enhancer Pro",
    "blender": (3, 0, 0),
    "category": "Mesh",
    "version": (2, 0, 0),
    "author": "Meshy Enhancer Pro",
    "description": "Enhance Meshy.ai models with realistic materials, lighting, and environments",
    "location": "View3D > Sidebar > Meshy Tab",
    "warning": "",
    "doc_url": "",
    "support": "COMMUNITY",
}

import bpy
import bmesh
from mathutils import Vector, noise
import os
import math
import random
from bpy_extras.io_utils import ImportHelper
from bpy.props import StringProperty, FloatProperty, BoolProperty, EnumProperty
from bpy.types import Operator, Panel

class MeshyModelEnhancerPro:
    def __init__(self):
        self.original_object = None
        self.enhanced_objects = []
        self.scene_objects = []
        
    def clear_scene(self):
        """Clear everything from the scene safely"""
        try:
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
            
            bpy.ops.object.select_all(action='DESELECT')
            
            for obj in bpy.context.scene.objects:
                obj.select_set(True)
            
            bpy.ops.object.delete(use_global=False)
            
            # Clear data
            for mesh in bpy.data.meshes:
                bpy.data.meshes.remove(mesh)
            for mat in bpy.data.materials:
                bpy.data.materials.remove(mat)
            for img in bpy.data.images:
                bpy.data.images.remove(img)
            for light in bpy.data.lights:
                bpy.data.lights.remove(light)
            for world in bpy.data.worlds:
                if world.name != "World":
                    bpy.data.worlds.remove(world)
            
            bpy.context.view_layer.update()
            
        except Exception as e:
            print(f"Error clearing scene: {e}")
        
    def import_model(self, filepath):
        """Import OBJ/FBX model with better error handling"""
        try:
            print(f"Attempting to import: {filepath}")
            
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
            
            objects_before = set(bpy.context.scene.objects)
            
            if filepath.lower().endswith('.obj'):
                try:
                    bpy.ops.wm.obj_import(filepath=filepath)
                except:
                    try:
                        bpy.ops.import_scene.obj(filepath=filepath)
                    except:
                        self.import_obj_manual(filepath)
                        
            elif filepath.lower().endswith('.fbx'):
                bpy.ops.import_scene.fbx(filepath=filepath)
            else:
                raise Exception(f"Unsupported file format: {filepath}")
            
            objects_after = set(bpy.context.scene.objects)
            new_objects = objects_after - objects_before
            
            if new_objects:
                self.original_object = list(new_objects)[0]
            else:
                self.original_object = bpy.context.active_object
                if not self.original_object:
                    raise Exception("No object found after import")
            
            bpy.context.view_layer.objects.active = self.original_object
            self.original_object.select_set(True)
            
            # Center and scale appropriately
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
            self.original_object.location = (0, 0, 0)
            
            # Scale to reasonable size (assuming it's furniture)
            dimensions = self.original_object.dimensions
            max_dim = max(dimensions)
            if max_dim > 3.0:  # If larger than 3 meters, scale down
                scale_factor = 2.5 / max_dim
                self.original_object.scale = (scale_factor, scale_factor, scale_factor)
            
            print(f"Successfully imported: {self.original_object.name}")
            
        except Exception as e:
            print(f"Import failed: {e}")
            bpy.ops.mesh.primitive_cube_add()
            self.original_object = bpy.context.active_object
            self.original_object.name = "Fallback_Cube"
            
    def import_obj_manual(self, filepath):
        """Simplified manual OBJ import"""
        try:
            vertices = []
            faces = []
            
            with open(filepath, 'r') as file:
                for line in file:
                    line = line.strip()
                    if line.startswith('v '):
                        parts = line.split()
                        if len(parts) >= 4:
                            vertices.append([float(parts[1]), float(parts[2]), float(parts[3])])
                    elif line.startswith('f '):
                        parts = line.split()[1:]
                        face = []
                        for part in parts:
                            vertex_index = int(part.split('/')[0]) - 1
                            face.append(vertex_index)
                        if len(face) >= 3:
                            faces.append(face)
            
            if not vertices or not faces:
                raise Exception("No valid geometry found")
            
            mesh = bpy.data.meshes.new(name="ImportedOBJ")
            mesh.from_pydata(vertices, [], faces)
            mesh.update()
            
            obj = bpy.data.objects.new("ImportedOBJ", mesh)
            bpy.context.collection.objects.link(obj)
            
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
        except Exception as e:
            print(f"Manual import failed: {e}")
            raise
            
    def smart_uv_unwrap(self, obj):
        """Smart UV unwrapping for better textures"""
        try:
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='SELECT')
            
            # Try angle-based unwrapping first
            try:
                bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=0.02)
            except:
                # Fallback to basic unwrap
                bpy.ops.uv.unwrap(method='ANGLE_BASED', margin=0.02)
            
            bpy.ops.object.mode_set(mode='OBJECT')
            print(f"UV unwrapped: {obj.name}")
            
        except Exception as e:
            print(f"UV unwrap failed for {obj.name}: {e}")
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
        
    def enhance_geometry_safe(self, obj):
        """Safe geometry enhancement"""
        try:
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='SELECT')
            
            # Clean up mesh
            bpy.ops.mesh.remove_doubles(threshold=0.001)
            bpy.ops.mesh.normals_make_consistent(inside=False)
            
            # Add smooth shading
            bpy.ops.object.mode_set(mode='OBJECT')
            bpy.ops.object.shade_smooth()
            
            # Add edge split modifier for better normals
            edge_split = obj.modifiers.new(name="EdgeSplit", type='EDGE_SPLIT')
            edge_split.split_angle = math.radians(30)
            
            print(f"Enhanced geometry: {obj.name}")
            
        except Exception as e:
            print(f"Geometry enhancement failed: {e}")
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
        
    def create_realistic_sofa_materials(self):
        """Create realistic sofa materials compatible with older Blender versions"""
        materials = {}
        
        # Velvet Sofa
        velvet_mat = bpy.data.materials.new(name="Velvet_Sofa")
        velvet_mat.use_nodes = True
        nodes = velvet_mat.node_tree.nodes
        links = velvet_mat.node_tree.links
        
        nodes.clear()
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        
        # Velvet properties (compatible with older versions)
        principled.inputs['Base Color'].default_value = (0.2, 0.15, 0.4, 1.0)
        principled.inputs['Roughness'].default_value = 0.8
        principled.inputs['Metallic'].default_value = 0.0
        principled.inputs['Specular'].default_value = 0.3
        if 'Subsurface' in principled.inputs:
            principled.inputs['Subsurface'].default_value = 0.1
        
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        materials['velvet'] = velvet_mat
        
        # Leather Sofa
        leather_mat = bpy.data.materials.new(name="Leather_Sofa")
        leather_mat.use_nodes = True
        nodes = leather_mat.node_tree.nodes
        links = leather_mat.node_tree.links
        
        nodes.clear()
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        noise_tex = nodes.new(type='ShaderNodeTexNoise')
        bump_node = nodes.new(type='ShaderNodeBump')
        
        # Leather properties
        principled.inputs['Base Color'].default_value = (0.4, 0.25, 0.15, 1.0)
        principled.inputs['Roughness'].default_value = 0.3
        principled.inputs['Metallic'].default_value = 0.0
        principled.inputs['Specular'].default_value = 0.8
        
        # Leather texture
        noise_tex.inputs['Scale'].default_value = 50.0
        noise_tex.inputs['Detail'].default_value = 15.0
        noise_tex.inputs['Roughness'].default_value = 0.7
        
        bump_node.inputs['Strength'].default_value = 0.2
        
        links.new(noise_tex.outputs['Fac'], bump_node.inputs['Height'])
        links.new(bump_node.outputs['Normal'], principled.inputs['Normal'])
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        materials['leather'] = leather_mat
        
        # Linen Fabric
        linen_mat = bpy.data.materials.new(name="Linen_Sofa")
        linen_mat.use_nodes = True
        nodes = linen_mat.node_tree.nodes
        links = linen_mat.node_tree.links
        
        nodes.clear()
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        wave_tex = nodes.new(type='ShaderNodeTexWave')
        bump_node = nodes.new(type='ShaderNodeBump')
        
        # Linen properties
        principled.inputs['Base Color'].default_value = (0.9, 0.85, 0.75, 1.0)
        principled.inputs['Roughness'].default_value = 0.9
        principled.inputs['Metallic'].default_value = 0.0
        principled.inputs['Specular'].default_value = 0.2
        
        # Fabric texture
        wave_tex.inputs['Scale'].default_value = 100.0
        wave_tex.inputs['Distortion'].default_value = 2.0
        bump_node.inputs['Strength'].default_value = 0.1
        
        links.new(wave_tex.outputs['Color'], bump_node.inputs['Height'])
        links.new(bump_node.outputs['Normal'], principled.inputs['Normal'])
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        materials['linen'] = linen_mat
        
        # Microfiber
        microfiber_mat = bpy.data.materials.new(name="Microfiber_Sofa")
        microfiber_mat.use_nodes = True
        nodes = microfiber_mat.node_tree.nodes
        links = microfiber_mat.node_tree.links
        
        nodes.clear()
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        
        # Microfiber properties
        principled.inputs['Base Color'].default_value = (0.6, 0.6, 0.65, 1.0)
        principled.inputs['Roughness'].default_value = 0.7
        principled.inputs['Metallic'].default_value = 0.0
        principled.inputs['Specular'].default_value = 0.4
        
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        materials['microfiber'] = microfiber_mat
        
        return materials
        
    def create_realistic_environment(self):
        """Create a realistic room environment"""
        try:
            # Create floor
            bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, -0.01))
            floor = bpy.context.active_object
            floor.name = "Floor"
            
            # Floor material
            floor_mat = bpy.data.materials.new(name="Wood_Floor")
            floor_mat.use_nodes = True
            nodes = floor_mat.node_tree.nodes
            links = floor_mat.node_tree.links
            
            nodes.clear()
            output = nodes.new(type='ShaderNodeOutputMaterial')
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            wave_tex = nodes.new(type='ShaderNodeTexWave')
            noise_tex = nodes.new(type='ShaderNodeTexNoise')
            mix_node = nodes.new(type='ShaderNodeMixRGB')
            
            # Wood floor properties
            principled.inputs['Base Color'].default_value = (0.4, 0.25, 0.1, 1.0)
            principled.inputs['Roughness'].default_value = 0.4
            principled.inputs['Specular'].default_value = 0.6
            
            # Wood grain texture
            wave_tex.inputs['Scale'].default_value = 20.0
            wave_tex.wave_type = 'SAW'
            
            noise_tex.inputs['Scale'].default_value = 50.0
            noise_tex.inputs['Detail'].default_value = 10.0
            
            mix_node.blend_type = 'MULTIPLY'
            mix_node.inputs['Fac'].default_value = 0.3
            
            links.new(wave_tex.outputs['Color'], mix_node.inputs['Color1'])
            links.new(noise_tex.outputs['Color'], mix_node.inputs['Color2'])
            links.new(mix_node.outputs['Color'], principled.inputs['Base Color'])
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            
            floor.data.materials.append(floor_mat)
            self.scene_objects.append(floor)
            
            # Create walls
            # Back wall
            bpy.ops.mesh.primitive_plane_add(size=20, location=(0, -8, 5))
            back_wall = bpy.context.active_object
            back_wall.name = "Back_Wall"
            back_wall.rotation_euler = (math.radians(90), 0, 0)
            
            # Side walls
            bpy.ops.mesh.primitive_plane_add(size=20, location=(-8, 0, 5))
            left_wall = bpy.context.active_object
            left_wall.name = "Left_Wall"
            left_wall.rotation_euler = (math.radians(90), 0, math.radians(90))
            
            bpy.ops.mesh.primitive_plane_add(size=20, location=(8, 0, 5))
            right_wall = bpy.context.active_object
            right_wall.name = "Right_Wall"
            right_wall.rotation_euler = (math.radians(90), 0, math.radians(-90))
            
            # Wall material
            wall_mat = bpy.data.materials.new(name="Wall_Paint")
            wall_mat.use_nodes = True
            nodes = wall_mat.node_tree.nodes
            links = wall_mat.node_tree.links
            
            nodes.clear()
            output = nodes.new(type='ShaderNodeOutputMaterial')
            principled = nodes.new(type='ShaderNodeBsdfPrincipled')
            
            # Wall properties
            principled.inputs['Base Color'].default_value = (0.95, 0.95, 0.9, 1.0)
            principled.inputs['Roughness'].default_value = 0.8
            principled.inputs['Specular'].default_value = 0.1
            
            links.new(principled.outputs['BSDF'], output.inputs['Surface'])
            
            # Apply wall material
            for wall in [back_wall, left_wall, right_wall]:
                wall.data.materials.append(wall_mat)
                self.scene_objects.append(wall)
            
            print("Environment created successfully")
            
        except Exception as e:
            print(f"Environment creation failed: {e}")
            
    def setup_realistic_lighting(self):
        """Setup realistic lighting with HDRI and additional lights"""
        try:
            # Setup world shader for HDRI
            world = bpy.context.scene.world
            if not world:
                world = bpy.data.worlds.new("World")
                bpy.context.scene.world = world
            
            world.use_nodes = True
            nodes = world.node_tree.nodes
            links = world.node_tree.links
            
            nodes.clear()
            output = nodes.new(type='ShaderNodeOutputWorld')
            background = nodes.new(type='ShaderNodeBackground')
            
            # Create a simple sky color instead of HDRI (more compatible)
            sky_color = nodes.new(type='ShaderNodeTexSky')
            sky_color.sky_type = 'NISHITA'
            sky_color.sun_elevation = math.radians(45)
            sky_color.sun_rotation = math.radians(135)
            
            links.new(sky_color.outputs['Color'], background.inputs['Color'])
            links.new(background.outputs['Background'], output.inputs['Surface'])
            
            background.inputs['Strength'].default_value = 0.5
            
            # Add key light (window light)
            bpy.ops.object.light_add(type='AREA', location=(5, 3, 6))
            key_light = bpy.context.active_object
            key_light.name = "Window_Light"
            key_light.data.energy = 100
            key_light.data.size = 3
            key_light.data.color = (1.0, 0.95, 0.8)  # Warm daylight
            key_light.rotation_euler = (math.radians(45), 0, math.radians(-45))
            
            # Add fill light
            bpy.ops.object.light_add(type='AREA', location=(-3, 4, 4))
            fill_light = bpy.context.active_object
            fill_light.name = "Fill_Light"
            fill_light.data.energy = 30
            fill_light.data.size = 2
            fill_light.data.color = (0.8, 0.9, 1.0)  # Cool fill
            fill_light.rotation_euler = (math.radians(30), 0, math.radians(45))
            
            # Add rim light
            bpy.ops.object.light_add(type='SPOT', location=(0, 8, 7))
            rim_light = bpy.context.active_object
            rim_light.name = "Rim_Light"
            rim_light.data.energy = 50
            rim_light.data.spot_size = math.radians(45)
            rim_light.data.color = (1.0, 0.9, 0.7)  # Warm rim
            rim_light.rotation_euler = (math.radians(135), 0, 0)
            
            # Set render settings for better quality
            bpy.context.scene.render.engine = 'CYCLES'
            bpy.context.scene.cycles.samples = 128
            bpy.context.scene.cycles.use_denoising = True
            
            print("Lighting setup completed")
            
        except Exception as e:
            print(f"Lighting setup failed: {e}")
            
    def create_material_variants(self, base_name):
        """Create material variants in a realistic environment"""
        try:
            # Create environment first
            self.create_realistic_environment()
            
            # Setup lighting
            self.setup_realistic_lighting()
            
            materials = self.create_realistic_sofa_materials()
            
            # Position variants in a line for better presentation
            spacing = 4.0
            start_x = -((len(materials) - 1) * spacing) / 2
            
            for i, (mat_name, material) in enumerate(materials.items()):
                print(f"Creating variant {i+1}/{len(materials)}: {mat_name}")
                
                # Duplicate the original object
                variant_obj = self.original_object.copy()
                variant_obj.data = self.original_object.data.copy()
                variant_obj.name = f"{base_name}_{mat_name}"
                
                bpy.context.collection.objects.link(variant_obj)
                
                # Position variant
                variant_obj.location = (start_x + i * spacing, 0, 0)
                
                # Clear existing materials and apply new one
                variant_obj.data.materials.clear()
                variant_obj.data.materials.append(material)
                
                # UV unwrap for better texturing
                self.smart_uv_unwrap(variant_obj)
                
                # Enhance geometry
                self.enhance_geometry_safe(variant_obj)
                
                self.enhanced_objects.append(variant_obj)
                
                bpy.context.view_layer.update()
                
            print("All variants created successfully")
            
        except Exception as e:
            print(f"Error creating variants: {e}")
            raise
            
    def export_variants_safe(self, output_dir, base_name):
        """Export variants with better settings"""
        try:
            output_dir = os.path.expanduser(output_dir)
            output_dir = bpy.path.abspath(output_dir)
            
            if not os.path.exists(output_dir):
                try:
                    os.makedirs(output_dir, exist_ok=True)
                except PermissionError:
                    fallback_dir = os.path.expanduser("~/Desktop/enhanced_models/")
                    os.makedirs(fallback_dir, exist_ok=True)
                    output_dir = fallback_dir
                    
            for i, obj in enumerate(self.enhanced_objects):
                try:
                    print(f"Exporting {i+1}/{len(self.enhanced_objects)}: {obj.name}")
                    
                    if bpy.context.mode != 'OBJECT':
                        bpy.ops.object.mode_set(mode='OBJECT')
                    
                    bpy.ops.object.select_all(action='DESELECT')
                    obj.select_set(True)
                    bpy.context.view_layer.objects.active = obj
                    
                    export_path = os.path.join(output_dir, f"{obj.name}.obj")
                    
                    try:
                        bpy.ops.wm.obj_export(
                            filepath=export_path,
                            export_selected_objects=True,
                            export_materials=True,
                            export_smooth_groups=True,
                            export_normals=True,
                            export_uv=True,
                            export_triangulated_mesh=True
                        )
                    except:
                        bpy.ops.export_scene.obj(
                            filepath=export_path,
                            use_selection=True,
                            use_materials=True,
                            use_smooth_groups=True,
                            use_normals=True,
                            use_uvs=True,
                            use_triangles=True
                        )
                    
                    print(f"Exported: {export_path}")
                    
                except Exception as e:
                    print(f"Failed to export {obj.name}: {e}")
                    
            # Also export a complete scene
            try:
                scene_path = os.path.join(output_dir, f"{base_name}_complete_scene.blend")
                bpy.ops.wm.save_as_mainfile(filepath=scene_path)
                print(f"Complete scene saved: {scene_path}")
            except Exception as e:
                print(f"Failed to save complete scene: {e}")
                
        except Exception as e:
            print(f"Export failed: {e}")
            raise

# UI Panel
class MESH_PT_enhancer_panel(Panel):
    bl_label = "Meshy Model Enhancer Pro"
    bl_idname = "MESH_PT_enhancer_pro"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Meshy'

    def draw(self, context):
        layout = self.layout
        
        layout.label(text="Realistic Model Enhancement")
        layout.operator("mesh.enhance_meshy_model_pro")
        layout.separator()
        layout.label(text="Quick Test")
        layout.operator("mesh.test_simple_enhance_pro")
        layout.separator()
        layout.label(text="Scene Setup")
        layout.operator("mesh.setup_realistic_scene")

class MESH_OT_enhance_model_pro(Operator, ImportHelper):
    """Enhance a Meshy model with realistic materials and environment"""
    bl_idname = "mesh.enhance_meshy_model_pro"
    bl_label = "Enhance Meshy Model Pro"
    
    filename_ext = ".obj"
    filter_glob: StringProperty(
        default="*.obj;*.fbx",
        options={'HIDDEN'}
    )
    
    base_name: StringProperty(
        name="Base Name",
        description="Base name for enhanced models",
        default="enhanced_model"
    )
    
    output_dir: StringProperty(
        name="Output Directory",
        description="Directory to save enhanced models",
        default="~/Desktop/enhanced_models/",
        subtype='DIR_PATH'
    )
    
    def execute(self, context):
        try:
            print("Starting professional model enhancement...")
            
            enhancer = MeshyModelEnhancerPro()
            
            # Clear scene
            enhancer.clear_scene()
            
            # Import model
            enhancer.import_model(self.filepath)
            
            # Create variants with environment
            enhancer.create_material_variants(self.base_name)
            
            # Export everything
            enhancer.export_variants_safe(self.output_dir, self.base_name)
            
            # Set camera for better view
            self.setup_camera_view()
            
            self.report({'INFO'}, f"Enhanced models and scene saved to {bpy.path.abspath(os.path.expanduser(self.output_dir))}")
            return {'FINISHED'}
            
        except Exception as e:
            error_msg = f"Enhancement failed: {str(e)}"
            print(error_msg)
            self.report({'ERROR'}, error_msg)
            return {'CANCELLED'}
            
    def setup_camera_view(self):
        """Setup camera for better presentation"""
        try:
            # Position camera for good view
            bpy.ops.object.camera_add(location=(8, 8, 6))
            camera = bpy.context.active_object
            camera.rotation_euler = (math.radians(60), 0, math.radians(45))
            
            # Set as active camera
            bpy.context.scene.camera = camera
            
            # Switch to camera view
            for area in bpy.context.screen.areas:
                if area.type == 'VIEW_3D':
                    for space in area.spaces:
                        if space.type == 'VIEW_3D':
                            space.region_3d.view_perspective = 'CAMERA'
                            break
        except Exception as e:
            print(f"Camera setup failed: {e}")

class MESH_OT_test_simple_pro(Operator):
    """Test enhancement with a simple object"""
    bl_idname = "mesh.test_simple_enhance_pro"
    bl_label = "Test Enhancement Pro"
    
    def execute(self, context):
        try:
            print("Starting test enhancement...")
            
            enhancer = MeshyModelEnhancerPro()
            
            # Clear scene
            enhancer.clear_scene()
            
            # Create test object (more interesting than cube)
            bpy.ops.mesh.primitive_uv_sphere_add(subdivisions=3)
            bpy.ops.object.modifier_add(type='SUBSURF')
            enhancer.original_object = bpy.context.active_object
            enhancer.original_object.name = "Test_Sphere"
            
            # Create variants
            enhancer.create_material_variants("test_sphere")
            
            self.report({'INFO'}, "Test enhancement completed successfully")
            return {'FINISHED'}
            
        except Exception as e:
            error_msg = f"Test failed: {str(e)}"
            print(error_msg)
            self.report({'ERROR'}, error_msg)
            return {'CANCELLED'}

class MESH_OT_setup_realistic_scene(Operator):
    """Setup realistic scene without model"""
    bl_idname = "mesh.setup_realistic_scene"
    bl_label = "Setup Realistic Scene"
    
    def execute(self, context):
        try:
            enhancer = MeshyModelEnhancerPro()
            
            # Clear scene
            enhancer.clear_scene()
            
            # Create environment and lighting
            enhancer.create_realistic_environment()
            enhancer.setup_realistic_lighting()
            
            # Setup camera
            bpy.ops.object.camera_add(location=(8, 8, 6))
            camera = bpy.context.active_object
            camera.rotation_euler = (math.radians(60), 0, math.radians(45))
            bpy.context.scene.camera = camera
            
            self.report({'INFO'}, "Realistic scene setup completed")
            return {'FINISHED'}
            
        except Exception as e:
            error_msg = f"Scene setup failed: {str(e)}"
            print(error_msg)
            self.report({'ERROR'}, error_msg)
            return {'CANCELLED'}

# Registration
def register():
    bpy.utils.register_class(MESH_PT_enhancer_panel)
    bpy.utils.register_class(MESH_OT_enhance_model_pro)
    bpy.utils.register_class(MESH_OT_test_simple_pro)
    bpy.utils.register_class(MESH_OT_setup_realistic_scene)

def unregister():
    bpy.utils.unregister_class(MESH_PT_enhancer_panel)
    bpy.utils.unregister_class(MESH_OT_enhance_model_pro)
    bpy.utils.unregister_class(MESH_OT_test_simple_pro)
    bpy.utils.unregister_class(MESH_OT_setup_realistic_scene)

if __name__ == "__main__":
    register()