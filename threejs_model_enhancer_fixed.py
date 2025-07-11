bl_info = {
    "name": "Three.js Model Enhancer",
    "blender": (4, 4, 0),
    "category": "Mesh",
    "version": (1, 0, 0),
    "author": "Three.js Enhancer",
    "description": "Enhance models with realistic materials optimized for Three.js",
    "location": "View3D > Sidebar > Three.js Tab",
    "warning": "",
    "doc_url": "",
    "support": "COMMUNITY",
}

import bpy
import bmesh
from mathutils import Vector, noise
import os
from bpy_extras.io_utils import ImportHelper
from bpy.props import StringProperty, FloatProperty, BoolProperty, EnumProperty
from bpy.types import Operator, Panel

class ThreeJSModelEnhancer:
    def __init__(self):
        self.original_object = None
        self.enhanced_objects = []
        
    def clear_scene(self):
        """Clear everything from the scene safely"""
        try:
            # Switch to object mode first
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
            
            # Deselect all first
            bpy.ops.object.select_all(action='DESELECT')
            
            # Select all objects
            for obj in bpy.context.scene.objects:
                obj.select_set(True)
            
            # Delete selected objects
            bpy.ops.object.delete(use_global=False)
            
            # Clear mesh data
            for mesh in bpy.data.meshes:
                bpy.data.meshes.remove(mesh)
            
            # Clear materials
            for mat in bpy.data.materials:
                bpy.data.materials.remove(mat)
            
            # Force update
            bpy.context.view_layer.update()
            
        except Exception as e:
            print(f"Error clearing scene: {e}")
        
    def import_model(self, filepath):
        """Import model with support for multiple formats"""
        try:
            print(f"Attempting to import: {filepath}")
            
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
            
            objects_before = set(bpy.context.scene.objects)
            
            # Import based on file extension
            if filepath.lower().endswith('.obj'):
                try:
                    bpy.ops.wm.obj_import(filepath=filepath)
                except:
                    bpy.ops.import_scene.obj(filepath=filepath)
                        
            elif filepath.lower().endswith('.fbx'):
                bpy.ops.import_scene.fbx(filepath=filepath)
                
            elif filepath.lower().endswith(('.gltf', '.glb')):
                bpy.ops.import_scene.gltf(filepath=filepath)
                
            else:
                raise Exception(f"Unsupported file format: {filepath}")
            
            # Find the newly imported object
            objects_after = set(bpy.context.scene.objects)
            new_objects = objects_after - objects_before
            
            if new_objects:
                self.original_object = list(new_objects)[0]
                print(f"Found imported object: {self.original_object.name}")
            else:
                self.original_object = bpy.context.active_object
                if not self.original_object:
                    raise Exception("No object found after import")
            
            # Select and center the object
            bpy.context.view_layer.objects.active = self.original_object
            self.original_object.select_set(True)
            
            # Center the object origin
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
            self.original_object.location = (0, 0, 0)
            
            print(f"Successfully imported and centered: {self.original_object.name}")
            
        except Exception as e:
            print(f"Import failed: {e}")
            bpy.ops.mesh.primitive_cube_add()
            self.original_object = bpy.context.active_object
            self.original_object.name = "Fallback_Cube"
            print("Created fallback cube")
            
    def optimize_for_threejs(self, obj):
        """Optimize geometry for Three.js performance"""
        try:
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            
            # Enter edit mode
            bpy.ops.object.mode_set(mode='EDIT')
            
            # Select all faces
            bpy.ops.mesh.select_all(action='SELECT')
            
            # Triangulate faces (Three.js works better with triangles)
            bpy.ops.mesh.quads_convert_to_tris()
            
            # Remove doubles
            bpy.ops.mesh.remove_doubles(threshold=0.001)
            
            # Recalculate normals
            bpy.ops.mesh.normals_make_consistent(inside=False)
            
            # Limited subdivision for better quality
            if len(obj.data.vertices) < 2000:
                bpy.ops.mesh.subdivide(number_cuts=1)
            
            # Exit edit mode
            bpy.ops.object.mode_set(mode='OBJECT')
            
            # Add smooth shading
            bpy.ops.object.shade_smooth()
            
            print(f"Optimized geometry for Three.js: {obj.name}")
            
        except Exception as e:
            print(f"Optimization failed for {obj.name}: {e}")
            if bpy.context.mode != 'OBJECT':
                bpy.ops.object.mode_set(mode='OBJECT')
        
    def create_threejs_materials(self):
        """Create materials optimized for Three.js PBR workflow"""
        materials = {}
        
        # Velvet Sofa Material
        velvet_mat = bpy.data.materials.new(name="Velvet_Sofa")
        velvet_mat.use_nodes = True
        nodes = velvet_mat.node_tree.nodes
        
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs['Base Color'].default_value = (0.2, 0.15, 0.4, 1)  # Deep purple
            principled.inputs['Roughness'].default_value = 0.8
            principled.inputs['Metallic'].default_value = 0.0
            # Handle both old and new Blender versions
            if 'Specular' in principled.inputs:
                principled.inputs['Specular'].default_value = 0.5
            elif 'IOR' in principled.inputs:
                principled.inputs['IOR'].default_value = 1.5  # Index of Refraction
        
        materials['velvet'] = velvet_mat
        
        # Leather Sofa Material - FIXED THE BUG HERE
        leather_mat = bpy.data.materials.new(name="Leather_Sofa")
        leather_mat.use_nodes = True
        nodes = leather_mat.node_tree.nodes
        
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs['Base Color'].default_value = (0.4, 0.25, 0.16, 1)  # Brown leather
            principled.inputs['Roughness'].default_value = 0.3
            principled.inputs['Metallic'].default_value = 0.0
            # Handle both old and new Blender versions - FIXED VALUES
            if 'Specular' in principled.inputs:
                principled.inputs['Specular'].default_value = 0.8  # Fixed from 0.5
            elif 'IOR' in principled.inputs:
                principled.inputs['IOR'].default_value = 1.6  # Proper leather IOR
            # Add clearcoat for leather shine
            if 'Clearcoat' in principled.inputs:
                principled.inputs['Clearcoat'].default_value = 0.1
                if 'Clearcoat Roughness' in principled.inputs:
                    principled.inputs['Clearcoat Roughness'].default_value = 0.8
        
        materials['leather'] = leather_mat
        
        # Linen Sofa Material
        linen_mat = bpy.data.materials.new(name="Linen_Sofa")
        linen_mat.use_nodes = True
        nodes = linen_mat.node_tree.nodes
        
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs['Base Color'].default_value = (0.9, 0.85, 0.75, 1)  # Natural linen
            principled.inputs['Roughness'].default_value = 0.9
            principled.inputs['Metallic'].default_value = 0.0
            # Handle both old and new Blender versions
            if 'Specular' in principled.inputs:
                principled.inputs['Specular'].default_value = 0.3
            elif 'IOR' in principled.inputs:
                principled.inputs['IOR'].default_value = 1.45  # Proper fabric IOR
            # Add slight transmission for fabric
            if 'Transmission' in principled.inputs:
                principled.inputs['Transmission'].default_value = 0.05
        
        materials['linen'] = linen_mat
        
        # Microfiber Sofa Material
        microfiber_mat = bpy.data.materials.new(name="Microfiber_Sofa")
        microfiber_mat.use_nodes = True
        nodes = microfiber_mat.node_tree.nodes
        
        principled = nodes.get("Principled BSDF")
        if principled:
            principled.inputs['Base Color'].default_value = (0.6, 0.6, 0.67, 1)  # Light gray
            principled.inputs['Roughness'].default_value = 0.7
            principled.inputs['Metallic'].default_value = 0.0
            # Handle both old and new Blender versions
            if 'Specular' in principled.inputs:
                principled.inputs['Specular'].default_value = 0.6
            elif 'IOR' in principled.inputs:
                principled.inputs['IOR'].default_value = 1.5  # Proper synthetic fabric IOR
            if 'Clearcoat' in principled.inputs:
                principled.inputs['Clearcoat'].default_value = 0.05
        
        materials['microfiber'] = microfiber_mat
        
        return materials
        
    def create_material_variants(self, base_name):
        """Create 4 sofa versions with different materials"""
        try:
            materials = self.create_threejs_materials()
            
            # Position variants in a grid
            grid_positions = {
                'velvet': (-3, -3, 0),
                'leather': (3, -3, 0),
                'linen': (-3, 3, 0),
                'microfiber': (3, 3, 0)
            }
            
            for i, (mat_name, material) in enumerate(materials.items()):
                print(f"Creating variant {i+1}/4: {mat_name}")
                
                # Duplicate the original object
                variant_obj = self.original_object.copy()
                variant_obj.data = self.original_object.data.copy()
                variant_obj.name = f"{base_name}_{mat_name}"
                
                # Add to scene
                bpy.context.collection.objects.link(variant_obj)
                
                # Clear existing materials
                variant_obj.data.materials.clear()
                
                # Apply new material
                variant_obj.data.materials.append(material)
                
                # Position variant
                variant_obj.location = grid_positions[mat_name]
                
                # Optimize for Three.js
                self.optimize_for_threejs(variant_obj)
                
                self.enhanced_objects.append(variant_obj)
                
                # Force update
                bpy.context.view_layer.update()
                
            print("All variants created successfully")
            
        except Exception as e:
            print(f"Error creating variants: {e}")
            raise
            
    def export_for_threejs(self, output_dir, base_name, export_format='GLB'):
        """Export variants optimized for Three.js"""
        try:
            # Expand the path and ensure it's absolute
            output_dir = os.path.expanduser(output_dir)
            if not os.path.isabs(output_dir):
                output_dir = bpy.path.abspath(output_dir)
            
            print(f"Output directory: {output_dir}")
            
            # Create directory with better error handling
            try:
                os.makedirs(output_dir, exist_ok=True)
                print(f"Created/verified directory: {output_dir}")
            except PermissionError:
                # Fallback to Desktop
                fallback_dir = os.path.expanduser("~/Desktop/threejs_models/")
                os.makedirs(fallback_dir, exist_ok=True)
                output_dir = fallback_dir
                print(f"Permission denied, using fallback: {output_dir}")
            except Exception as e:
                print(f"Directory creation failed: {e}")
                raise
                    
            if not self.enhanced_objects:
                raise Exception("No enhanced objects to export!")
                
            for i, obj in enumerate(self.enhanced_objects):
                try:
                    print(f"Exporting {i+1}/{len(self.enhanced_objects)}: {obj.name}")
                    
                    # Ensure we're in object mode
                    if bpy.context.mode != 'OBJECT':
                        bpy.ops.object.mode_set(mode='OBJECT')
                    
                    # Select only this object
                    bpy.ops.object.select_all(action='DESELECT')
                    obj.select_set(True)
                    bpy.context.view_layer.objects.active = obj
                    
                    # Verify object is selected
                    if not obj.select_get():
                        print(f"Warning: {obj.name} not properly selected")
                        continue
                    
                    # Export based on format
                    if export_format == 'GLB':
                        export_path = os.path.join(output_dir, f"{obj.name}.glb")
                        print(f"Exporting to: {export_path}")
                        
                        # Export with more explicit settings
                        bpy.ops.export_scene.gltf(
                            filepath=export_path,
                            use_selection=True,
                            export_format='GLB',
                            export_materials='EXPORT',
                            export_colors=True,
                            export_normals=True,
                            export_tangents=False,  # Sometimes causes issues
                            export_texcoords=True,
                            export_apply=True,
                            export_yup=True,  # Y-up coordinate system
                            export_image_format='AUTO'
                        )
                        
                    elif export_format == 'GLTF':
                        export_path = os.path.join(output_dir, f"{obj.name}.gltf")
                        bpy.ops.export_scene.gltf(
                            filepath=export_path,
                            use_selection=True,
                            export_format='GLTF_EMBEDDED',
                            export_materials='EXPORT',
                            export_colors=True,
                            export_normals=True,
                            export_tangents=False,
                            export_texcoords=True,
                            export_apply=True,
                            export_yup=True
                        )
                    else:  # Fallback to OBJ
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
                    
                    # Verify file was created
                    if os.path.exists(export_path):
                        file_size = os.path.getsize(export_path)
                        print(f"✓ Successfully exported: {export_path} ({file_size} bytes)")
                    else:
                        print(f"✗ Export failed - file not found: {export_path}")
                    
                except Exception as e:
                    print(f"Failed to export {obj.name}: {e}")
                    
        except Exception as e:
            print(f"Export failed: {e}")
            raise

# UI Panel
class MESH_PT_threejs_panel(Panel):
    bl_label = "Three.js Model Enhancer"
    bl_idname = "MESH_PT_threejs"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Three.js'

    def draw(self, context):
        layout = self.layout
        
        layout.operator("mesh.enhance_threejs_model")
        layout.operator("mesh.test_threejs_enhance")

class MESH_OT_enhance_threejs(Operator, ImportHelper):
    """Enhance a model with Three.js optimized materials"""
    bl_idname = "mesh.enhance_threejs_model"
    bl_label = "Enhance for Three.js"
    
    filename_ext = ".obj"
    filter_glob: StringProperty(
        default="*.obj;*.fbx;*.gltf;*.glb",
        options={'HIDDEN'}
    )
    
    base_name: StringProperty(
        name="Base Name",
        description="Base name for enhanced models",
        default="sofa_enhanced"
    )
    
    output_dir: StringProperty(
        name="Output Directory",
        description="Directory to save enhanced models",
        default="~/Desktop/threejs_models/",
        subtype='DIR_PATH'
    )
    
    export_format: EnumProperty(
        name="Export Format",
        description="Choose export format for Three.js",
        items=[
            ('GLB', 'GLB (Recommended)', 'Binary GLTF format, best for Three.js'),
            ('GLTF', 'GLTF', 'Text-based GLTF format'),
            ('OBJ', 'OBJ', 'Wavefront OBJ format (fallback)')
        ],
        default='GLB'
    )
    
    def execute(self, context):
        try:
            print("Starting Three.js model enhancement...")
            
            enhancer = ThreeJSModelEnhancer()
            
            # Clear scene
            enhancer.clear_scene()
            
            # Import model
            enhancer.import_model(self.filepath)
            
            # Create variants
            enhancer.create_material_variants(self.base_name)
            
            # Export variants
            enhancer.export_for_threejs(self.output_dir, self.base_name, self.export_format)
            
            final_path = os.path.expanduser(self.output_dir)
            self.report({'INFO'}, f"Enhanced models saved to {final_path}")
            return {'FINISHED'}
            
        except Exception as e:
            error_msg = f"Enhancement failed: {str(e)}"
            print(error_msg)
            self.report({'ERROR'}, error_msg)
            return {'CANCELLED'}

class MESH_OT_test_threejs(Operator):
    """Test enhancement with a simple cube"""
    bl_idname = "mesh.test_threejs_enhance"
    bl_label = "Test Three.js Enhancement"
    
    def execute(self, context):
        try:
            print("Starting Three.js test enhancement...")
            
            enhancer = ThreeJSModelEnhancer()
            
            # Clear scene
            enhancer.clear_scene()
            
            # Create test cube
            bpy.ops.mesh.primitive_cube_add()
            enhancer.original_object = bpy.context.active_object
            enhancer.original_object.name = "Test_Sofa"
            
            # Create variants
            enhancer.create_material_variants("test_sofa")
            
            # Export test variants to Desktop
            desktop_path = "~/Desktop/threejs_models/"
            enhancer.export_for_threejs(desktop_path, "test_sofa", 'GLB')
            
            self.report({'INFO'}, "Three.js test enhancement completed - check Desktop/threejs_models/")
            return {'FINISHED'}
            
        except Exception as e:
            error_msg = f"Test failed: {str(e)}"
            print(error_msg)
            self.report({'ERROR'}, error_msg)
            return {'CANCELLED'}

# Registration
def register():
    bpy.utils.register_class(MESH_PT_threejs_panel)
    bpy.utils.register_class(MESH_OT_enhance_threejs)
    bpy.utils.register_class(MESH_OT_test_threejs)

def unregister():
    bpy.utils.unregister_class(MESH_PT_threejs_panel)
    bpy.utils.unregister_class(MESH_OT_enhance_threejs)
    bpy.utils.unregister_class(MESH_OT_test_threejs)

if __name__ == "__main__":
    register() 