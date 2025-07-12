bl_info = {
    "name": "Philo Homes Interior Scene Generator - Enhanced",
    "blender": (4, 0, 0),
    "category": "Mesh",
    "version": (9, 0, 0),
    "author": "Enhanced for Ultra-Realism",
    "description": "Generates photorealistic living room scenes with professional interior design elements",
    "location": "View3D > Sidebar > Philo Homes Tab",
    "warning": "Model should have separate material slots for different components",
    "doc_url": "",
    "support": "COMMUNITY",
}

import bpy
from mathutils import Vector
import os
import math
import random

from bpy_extras.io_utils import ImportHelper
from bpy.props import StringProperty, BoolProperty, FloatProperty, EnumProperty
from bpy.types import Operator, Panel

class PhiloSceneGenerator:
    def __init__(self):
        self.imported_object = None
        self.room_size = 12
        self.wall_height = 3.2

    def clear_scene(self):
        if bpy.context.mode != 'OBJECT':
            bpy.ops.object.mode_set(mode='OBJECT')
        bpy.ops.object.select_all(action='SELECT')
        bpy.ops.object.delete(use_global=False)
        for data in [bpy.data.meshes, bpy.data.materials, bpy.data.cameras, bpy.data.lights, bpy.data.worlds, bpy.data.images]:
            for item in data:
                try:
                    data.remove(item)
                except:
                    pass
        print("Scene cleared for new generation.")

    def import_model(self, filepath):
        objects_before = set(bpy.context.scene.objects)
        if filepath.lower().endswith('.obj'):
            bpy.ops.wm.obj_import(filepath=filepath)
        elif filepath.lower().endswith('.fbx'):
            bpy.ops.import_scene.fbx(filepath=filepath)
        else:
            raise Exception(f"Unsupported file format: {filepath}")
        
        new_objects = set(bpy.context.scene.objects) - objects_before
        if not new_objects:
            raise Exception("Model import failed.")
            
        # Handle multiple imported objects
        if len(new_objects) > 1:
            # Create parent object and group all imported objects
            bpy.ops.object.empty_add(location=(0, 0, 0))
            parent = bpy.context.active_object
            parent.name = "Imported_Furniture_Group"
            
            for obj in new_objects:
                obj.parent = parent
            
            self.imported_object = parent
        else:
            self.imported_object = list(new_objects)[0]
        
        bpy.context.view_layer.objects.active = self.imported_object
        print(f"Successfully imported: {self.imported_object.name}")

    def prepare_model(self, obj):
        if not obj:
            return
        
        # Handle both single objects and grouped objects
        objects_to_process = []
        if obj.type == 'EMPTY' and obj.children:
            objects_to_process = [child for child in obj.children if child.type == 'MESH']
        elif obj.type == 'MESH':
            objects_to_process = [obj]
        
        for mesh_obj in objects_to_process:
            bpy.context.view_layer.objects.active = mesh_obj
            bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
            bpy.ops.object.shade_smooth()
            
            # Add edge split modifier
            if not any(mod.type == 'EDGE_SPLIT' for mod in mesh_obj.modifiers):
                edge_split = mesh_obj.modifiers.new(name="EdgeSplit", type='EDGE_SPLIT')
                edge_split.split_angle = math.radians(30)
            
            # Improve UV mapping
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='SELECT')
            bpy.ops.uv.smart_project(angle_limit=66, island_margin=0.02, area_weight=0.0)
            bpy.ops.object.mode_set(mode='OBJECT')
        
        # Position main object/group on floor
        if obj.type == 'EMPTY':
            # Get bounds of all children
            all_vertices = []
            for child in obj.children:
                if child.type == 'MESH':
                    all_vertices.extend([child.matrix_world @ v.co for v in child.data.vertices])
            if all_vertices:
                lowest_z = min(v.z for v in all_vertices)
                obj.location.z -= lowest_z
        else:
            lowest_z = min((obj.matrix_world @ v.co).z for v in obj.data.vertices)
            obj.location.z -= lowest_z
        
        obj.location.x = 0
        obj.location.y = -1.5  # Position against back wall
        
        bpy.context.view_layer.update()
        print(f"Prepared and positioned furniture group on floor.")

    def create_advanced_materials(self, fabric_texture_path):
        """Create realistic PBR materials with advanced node setups"""
        materials = {}
        
        # PREMIUM FABRIC MATERIAL (Main Sofa)
        fabric_mat = bpy.data.materials.new(name="Premium_Fabric")
        fabric_mat.use_nodes = True
        nodes = fabric_mat.node_tree.nodes
        links = fabric_mat.node_tree.links
        nodes.clear()
        
        # Node setup for fabric
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        tex_coord = nodes.new(type='ShaderNodeTexCoord')
        mapping = nodes.new(type='ShaderNodeMapping')
        
        # Fabric texture
        if os.path.exists(fabric_texture_path):
            img_node = nodes.new(type='ShaderNodeTexImage')
            try:
                img_node.image = bpy.data.images.load(fabric_texture_path)
                img_node.projection = 'BOX'
            except:
                pass
        
        # Fabric weave bump
        noise_tex = nodes.new(type='ShaderNodeTexNoise')
        noise_tex.inputs['Scale'].default_value = 150
        noise_tex.inputs['Detail'].default_value = 16
        noise_tex.inputs['Roughness'].default_value = 0.5
        
        bump = nodes.new(type='ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.02
        
        # Color variation
        color_ramp = nodes.new(type='ShaderNodeValToRGB')
        color_ramp.color_ramp.elements[0].color = (0.12, 0.12, 0.15, 1)
        color_ramp.color_ramp.elements[1].color = (0.18, 0.18, 0.22, 1)
        
        # Fabric properties
        principled.inputs['Base Color'].default_value = (0.15, 0.15, 0.18, 1)
        principled.inputs['Roughness'].default_value = 0.8
        principled.inputs['Sheen Weight'].default_value = 0.3
        principled.inputs['Specular IOR Level'].default_value = 0.2
        
        # Connect nodes
        mapping.inputs['Scale'].default_value = (8, 8, 8)
        links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
        links.new(mapping.outputs['Vector'], noise_tex.inputs['Vector'])
        links.new(noise_tex.outputs['Fac'], color_ramp.inputs['Fac'])
        links.new(color_ramp.outputs['Color'], principled.inputs['Base Color'])
        links.new(noise_tex.outputs['Fac'], bump.inputs['Height'])
        links.new(bump.outputs['Normal'], principled.inputs['Normal'])
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        
        materials["fabric"] = fabric_mat
        
        # LUXURY LEATHER MATERIAL
        leather_mat = bpy.data.materials.new(name="Luxury_Leather")
        leather_mat.use_nodes = True
        l_nodes = leather_mat.node_tree.nodes
        l_links = leather_mat.node_tree.links
        l_principled = l_nodes["Principled BSDF"]
        
        # Leather texture
        l_noise = l_nodes.new(type='ShaderNodeTexNoise')
        l_noise.inputs['Scale'].default_value = 25
        l_noise.inputs['Detail'].default_value = 5
        
        l_bump = l_nodes.new(type='ShaderNodeBump')
        l_bump.inputs['Strength'].default_value = 0.05
        
        l_principled.inputs['Base Color'].default_value = (0.08, 0.05, 0.03, 1)
        l_principled.inputs['Roughness'].default_value = 0.15
        l_principled.inputs['Specular IOR Level'].default_value = 0.8
        
        l_links.new(l_noise.outputs['Fac'], l_bump.inputs['Height'])
        l_links.new(l_bump.outputs['Normal'], l_principled.inputs['Normal'])
        
        materials["leather"] = leather_mat
        
        # PREMIUM WOOD MATERIAL
        wood_mat = bpy.data.materials.new(name="Premium_Wood")
        wood_mat.use_nodes = True
        w_nodes = wood_mat.node_tree.nodes
        w_links = wood_mat.node_tree.links
        w_principled = w_nodes["Principled BSDF"]
        
        # Wood grain
        w_tex = w_nodes.new(type='ShaderNodeTexWave')
        w_tex.inputs['Scale'].default_value = 15
        w_tex.inputs['Distortion'].default_value = 2
        w_tex.inputs['Detail'].default_value = 2
        
        w_noise = w_nodes.new(type='ShaderNodeTexNoise')
        w_noise.inputs['Scale'].default_value = 80
        
        w_mix = w_nodes.new(type='ShaderNodeMix')
        w_mix.data_type = 'RGBA'
        w_mix.inputs['Fac'].default_value = 0.3
        
        w_ramp = w_nodes.new(type='ShaderNodeValToRGB')
        w_ramp.color_ramp.elements[0].color = (0.06, 0.03, 0.01, 1)
        w_ramp.color_ramp.elements[1].color = (0.12, 0.07, 0.03, 1)
        
        w_principled.inputs['Roughness'].default_value = 0.1
        w_principled.inputs['Specular IOR Level'].default_value = 0.6
        
        w_links.new(w_tex.outputs['Color'], w_ramp.inputs['Fac'])
        w_links.new(w_ramp.outputs['Color'], w_mix.inputs['Color1'])
        w_links.new(w_noise.outputs['Color'], w_mix.inputs['Color2'])
        w_links.new(w_mix.outputs['Color'], w_principled.inputs['Base Color'])
        
        materials["wood"] = wood_mat
        
        # METAL MATERIAL (for legs, frames)
        metal_mat = bpy.data.materials.new(name="Brushed_Metal")
        metal_mat.use_nodes = True
        m_nodes = metal_mat.node_tree.nodes
        m_principled = m_nodes["Principled BSDF"]
        
        m_principled.inputs['Base Color'].default_value = (0.7, 0.7, 0.7, 1)
        m_principled.inputs['Metallic'].default_value = 1.0
        m_principled.inputs['Roughness'].default_value = 0.2
        
        materials["metal"] = metal_mat
        
        return materials

    def assign_smart_materials(self, obj, materials):
        """Intelligently assign materials based on object names and material slots"""
        if not obj:
            return
        
        objects_to_process = []
        if obj.type == 'EMPTY' and obj.children:
            objects_to_process = [child for child in obj.children if child.type == 'MESH']
        elif obj.type == 'MESH':
            objects_to_process = [obj]
        
        for mesh_obj in objects_to_process:
            if not mesh_obj.data.materials:
                continue
            
            obj_name = mesh_obj.name.lower()
            
            # Clear existing materials
            mesh_obj.data.materials.clear()
            
            # Smart material assignment based on object name
            if any(keyword in obj_name for keyword in ['sofa', 'chair', 'seat', 'cushion']):
                mesh_obj.data.materials.append(materials["fabric"])
            elif any(keyword in obj_name for keyword in ['table', 'wood', 'desk', 'shelf']):
                mesh_obj.data.materials.append(materials["wood"])
            elif any(keyword in obj_name for keyword in ['metal', 'leg', 'frame', 'support']):
                mesh_obj.data.materials.append(materials["metal"])
            elif any(keyword in obj_name for keyword in ['leather', 'hide']):
                mesh_obj.data.materials.append(materials["leather"])
            else:
                # Default to fabric for main furniture pieces
                mesh_obj.data.materials.append(materials["fabric"])
            
            print(f"Assigned material to {mesh_obj.name}")

    def create_realistic_room(self, hdri_path):
        """Create a sophisticated living room with architectural details"""
        
        # --- FLOOR ---
        bpy.ops.mesh.primitive_plane_add(size=self.room_size, location=(0, 0, 0))
        floor = bpy.context.active_object
        floor.name = "Hardwood_Floor"
        
        # Add floor material
        floor_mat = bpy.data.materials.new(name="Herringbone_Floor")
        floor_mat.use_nodes = True
        f_nodes = floor_mat.node_tree.nodes
        f_links = floor_mat.node_tree.links
        f_principled = f_nodes["Principled BSDF"]
        
        # Wood floor texture
        f_tex = f_nodes.new(type='ShaderNodeTexBrick')
        f_tex.inputs['Scale'].default_value = 20
        f_tex.inputs['Color1'].default_value = (0.12, 0.08, 0.05, 1)
        f_tex.inputs['Color2'].default_value = (0.15, 0.10, 0.06, 1)
        f_tex.inputs['Mortar'].default_value = (0.1, 0.08, 0.05, 1)
        f_tex.inputs['Mortar Size'].default_value = 0.02
        
        f_principled.inputs['Roughness'].default_value = 0.15
        f_principled.inputs['Specular IOR Level'].default_value = 0.4
        
        f_links.new(f_tex.outputs['Color'], f_principled.inputs['Base Color'])
        floor.data.materials.append(floor_mat)
        
        # --- WALLS WITH PANELING ---
        # Back wall
        bpy.ops.mesh.primitive_plane_add(size=self.room_size, location=(0, -self.room_size/2, self.wall_height/2), rotation=(math.radians(90), 0, 0))
        back_wall = bpy.context.active_object
        back_wall.name = "Back_Wall"
        
        # Left wall
        bpy.ops.mesh.primitive_plane_add(size=self.room_size, location=(-self.room_size/2, 0, self.wall_height/2), rotation=(math.radians(90), 0, math.radians(90)))
        left_wall = bpy.context.active_object
        left_wall.name = "Left_Wall"
        
        # Right wall
        bpy.ops.mesh.primitive_plane_add(size=self.room_size, location=(self.room_size/2, 0, self.wall_height/2), rotation=(math.radians(90), 0, math.radians(-90)))
        right_wall = bpy.context.active_object
        right_wall.name = "Right_Wall"
        
        # --- CEILING ---
        bpy.ops.mesh.primitive_plane_add(size=self.room_size, location=(0, 0, self.wall_height))
        ceiling = bpy.context.active_object
        ceiling.name = "Ceiling"
        
        # --- WALL MATERIALS ---
        wall_mat = bpy.data.materials.new(name="Elegant_Wall_Paint")
        wall_mat.use_nodes = True
        w_nodes = wall_mat.node_tree.nodes
        w_principled = w_nodes["Principled BSDF"]
        
        # Subtle texture for walls
        w_noise = w_nodes.new(type='ShaderNodeTexNoise')
        w_noise.inputs['Scale'].default_value = 500
        w_noise.inputs['Detail'].default_value = 1
        
        w_principled.inputs['Base Color'].default_value = (0.88, 0.87, 0.85, 1)
        w_principled.inputs['Roughness'].default_value = 0.9
        
        for wall in [back_wall, left_wall, right_wall, ceiling]:
            wall.data.materials.append(wall_mat)
        
        # --- BASEBOARDS ---
        self.create_baseboards()
        
        # --- CROWN MOLDING ---
        self.create_crown_molding()
        
        # --- WINDOW ---
        self.create_window(left_wall)
        
        # --- LIGHTING SETUP ---
        self.setup_advanced_lighting(hdri_path)
        
        # --- DECORATIVE ELEMENTS ---
        self.add_decorative_elements()
        
        print("Realistic room environment created.")

    def create_baseboards(self):
        """Add baseboards around the room perimeter"""
        baseboard_height = 0.15
        baseboard_depth = 0.03
        
        # Back wall baseboard
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -self.room_size/2 + baseboard_depth/2, baseboard_height/2))
        back_base = bpy.context.active_object
        back_base.scale = (self.room_size, baseboard_depth, baseboard_height)
        back_base.name = "Baseboard_Back"
        
        # Left wall baseboard
        bpy.ops.mesh.primitive_cube_add(size=1, location=(-self.room_size/2 + baseboard_depth/2, 0, baseboard_height/2))
        left_base = bpy.context.active_object
        left_base.scale = (baseboard_depth, self.room_size, baseboard_height)
        left_base.name = "Baseboard_Left"
        
        # Right wall baseboard
        bpy.ops.mesh.primitive_cube_add(size=1, location=(self.room_size/2 - baseboard_depth/2, 0, baseboard_height/2))
        right_base = bpy.context.active_object
        right_base.scale = (baseboard_depth, self.room_size, baseboard_height)
        right_base.name = "Baseboard_Right"
        
        # Baseboard material
        baseboard_mat = bpy.data.materials.new(name="White_Trim")
        baseboard_mat.use_nodes = True
        b_principled = baseboard_mat.node_tree.nodes["Principled BSDF"]
        b_principled.inputs['Base Color'].default_value = (0.95, 0.95, 0.95, 1)
        b_principled.inputs['Roughness'].default_value = 0.2
        
        for baseboard in [back_base, left_base, right_base]:
            baseboard.data.materials.append(baseboard_mat)

    def create_crown_molding(self):
        """Add crown molding near the ceiling"""
        molding_size = 0.1
        molding_pos = self.wall_height - molding_size
        
        # Create molding profile
        bpy.ops.mesh.primitive_cube_add(size=molding_size, location=(0, -self.room_size/2 + molding_size/2, molding_pos))
        back_molding = bpy.context.active_object
        back_molding.scale = (self.room_size, molding_size, molding_size)
        back_molding.name = "Crown_Molding"
        
        # Use same material as baseboards
        if "White_Trim" in bpy.data.materials:
            back_molding.data.materials.append(bpy.data.materials["White_Trim"])

    def create_window(self, wall_obj):
        """Add a realistic window with frame"""
        window_width = 2.5
        window_height = 1.8
        window_z = self.wall_height * 0.6
        
        # Create window opening
        bpy.ops.mesh.primitive_cube_add(location=(-self.room_size/2, 0, window_z))
        window_cutter = bpy.context.active_object
        window_cutter.scale = (0.1, window_width, window_height)
        window_cutter.display_type = 'WIRE'
        
        # Boolean modifier for window opening
        bool_mod = wall_obj.modifiers.new(name="WindowCut", type='BOOLEAN')
        bool_mod.object = window_cutter
        bool_mod.operation = 'DIFFERENCE'
        
        # Window frame
        bpy.ops.mesh.primitive_cube_add(location=(-self.room_size/2 + 0.05, 0, window_z))
        window_frame = bpy.context.active_object
        window_frame.scale = (0.08, window_width + 0.1, window_height + 0.1)
        window_frame.name = "Window_Frame"
        
        # Window glass
        bpy.ops.mesh.primitive_cube_add(location=(-self.room_size/2 + 0.02, 0, window_z))
        window_glass = bpy.context.active_object
        window_glass.scale = (0.01, window_width - 0.1, window_height - 0.1)
        window_glass.name = "Window_Glass"
        
        # Window materials
        frame_mat = bpy.data.materials.new(name="Window_Frame")
        frame_mat.use_nodes = True
        frame_principled = frame_mat.node_tree.nodes["Principled BSDF"]
        frame_principled.inputs['Base Color'].default_value = (0.9, 0.9, 0.9, 1)
        frame_principled.inputs['Roughness'].default_value = 0.1
        
        glass_mat = bpy.data.materials.new(name="Window_Glass")
        glass_mat.use_nodes = True
        glass_principled = glass_mat.node_tree.nodes["Principled BSDF"]
        glass_principled.inputs['Base Color'].default_value = (1, 1, 1, 1)
        glass_principled.inputs['Roughness'].default_value = 0.0
        glass_principled.inputs['Transmission Weight'].default_value = 0.95
        glass_principled.inputs['IOR'].default_value = 1.45
        
        window_frame.data.materials.append(frame_mat)
        window_glass.data.materials.append(glass_mat)

    def setup_advanced_lighting(self, hdri_path):
        """Professional lighting setup with HDRI and practical lights"""
        
        # --- WORLD HDRI SETUP ---
        world = bpy.context.scene.world or bpy.data.worlds.new("Interior_World")
        bpy.context.scene.world = world
        world.use_nodes = True
        w_nodes = world.node_tree.nodes
        w_links = world.node_tree.links
        w_nodes.clear()
        
        # HDRI Environment
        bg_node = w_nodes.new(type='ShaderNodeBackground')
        env_tex = w_nodes.new(type='ShaderNodeTexEnvironment')
        mapping = w_nodes.new(type='ShaderNodeMapping')
        tex_coord = w_nodes.new(type='ShaderNodeTexCoord')
        output_node = w_nodes.new(type='ShaderNodeOutputWorld')
        
        # Load HDRI
        try:
            env_tex.image = bpy.data.images.load(hdri_path)
            bg_node.inputs['Strength'].default_value = 0.5
            mapping.inputs['Rotation'].default_value[2] = math.radians(45)  # Rotate HDRI
        except Exception as e:
            print(f"Could not load HDRI: {e}")
            bg_node.inputs['Color'].default_value = (0.05, 0.05, 0.07, 1)
            bg_node.inputs['Strength'].default_value = 0.3
        
        # Connect HDRI nodes
        w_links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
        w_links.new(mapping.outputs['Vector'], env_tex.inputs['Vector'])
        w_links.new(env_tex.outputs['Color'], bg_node.inputs['Color'])
        w_links.new(bg_node.outputs['Background'], output_node.inputs['Surface'])
        
        # --- KEY LIGHT (Window light) ---
        bpy.ops.object.light_add(type='AREA', location=(-8, 0, 2))
        key_light = bpy.context.active_object
        key_light.name = "Window_Key_Light"
        key_light.data.size = 3
        key_light.data.energy = 100
        key_light.data.color = (1.0, 0.95, 0.8)
        key_light.rotation_euler = (0, math.radians(90), 0)
        
        # --- FILL LIGHT (Ceiling bounce) ---
        bpy.ops.object.light_add(type='AREA', location=(0, 0, self.wall_height - 0.2))
        fill_light = bpy.context.active_object
        fill_light.name = "Ceiling_Fill_Light"
        fill_light.data.size = 4
        fill_light.data.energy = 30
        fill_light.data.color = (1.0, 1.0, 1.0)
        fill_light.rotation_euler = (math.radians(180), 0, 0)
        
        # --- ACCENT LIGHT (Warm corner light) ---
        bpy.ops.object.light_add(type='POINT', location=(3, 3, 1.5))
        accent_light = bpy.context.active_object
        accent_light.name = "Accent_Light"
        accent_light.data.energy = 50
        accent_light.data.color = (1.0, 0.8, 0.6)
        accent_light.data.shadow_soft_size = 0.5

    def add_decorative_elements(self):
        """Add plants, books, and other decorative elements"""
        
        # --- AREA RUG ---
        bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0, 0.01))
        rug = bpy.context.active_object
        rug.name = "Area_Rug"
        rug.scale = (1.5, 2, 1)
        
        # Rug material
        rug_mat = bpy.data.materials.new(name="Persian_Rug")
        rug_mat.use_nodes = True
        r_nodes = rug_mat.node_tree.nodes
        r_links = rug_mat.node_tree.links
        r_principled = r_nodes["Principled BSDF"]
        
        # Rug pattern
        r_tex = r_nodes.new(type='ShaderNodeTexVoronoi')
        r_tex.inputs['Scale'].default_value = 8
        r_ramp = r_nodes.new(type='ShaderNodeValToRGB')
        r_ramp.color_ramp.elements[0].color = (0.2, 0.15, 0.1, 1)
        r_ramp.color_ramp.elements[1].color = (0.4, 0.3, 0.2, 1)
        
        r_principled.inputs['Roughness'].default_value = 0.9
        r_principled.inputs['Sheen Weight'].default_value = 0.2
        
        r_links.new(r_tex.outputs['Distance'], r_ramp.inputs['Fac'])
        r_links.new(r_ramp.outputs['Color'], r_principled.inputs['Base Color'])
        
        rug.data.materials.append(rug_mat)
        
        # --- SIMPLE PLANT ---
        bpy.ops.mesh.primitive_ico_sphere_add(location=(4, -4, 0.8), subdivisions=2)
        plant = bpy.context.active_object
        plant.name = "Decorative_Plant"
        plant.scale = (0.3, 0.3, 0.5)
        
        # Plant material
        plant_mat = bpy.data.materials.new(name="Plant_Foliage")
        plant_mat.use_nodes = True
        p_principled = plant_mat.node_tree.nodes["Principled BSDF"]
        p_principled.inputs['Base Color'].default_value = (0.1, 0.3, 0.1, 1)
        p_principled.inputs['Roughness'].default_value = 0.8
        p_principled.inputs['Subsurface Weight'].default_value = 0.1
        p_principled.inputs['Subsurface Color'].default_value = (0.2, 0.6, 0.2, 1)
        
        plant.data.materials.append(plant_mat)

    def setup_professional_camera(self, target_obj):
        """Create camera with professional composition matching reference image"""
        if not target_obj:
            return
        
        # Camera setup
        cam_data = bpy.data.cameras.new("Interior_Camera")
        cam_obj = bpy.data.objects.new(cam_data.name, cam_data)
        bpy.context.scene.collection.objects.link(cam_obj)
        bpy.context.scene.camera = cam_obj
        
        # Professional camera positioning (matching reference image angle)
        cam_obj.location = (5.5, 4.5, 2.2)
        
        # Calculate furniture center for targeting
        if target_obj.type == 'EMPTY':
            # Get center of all furniture pieces
            furniture_center = Vector((0, 0, 0))
            count = 0
            for child in target_obj.children:
                if child.type == 'MESH':
                    furniture_center += child.location
                    count += 1
            if count > 0:
                furniture_center /= count
        else:
            furniture_center = target_obj.location
        
        # Point camera towards furniture with slight upward angle
        look_at_point = furniture_center + Vector((0, 0, 0.8))
        direction = look_at_point - cam_obj.location
        cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
        
        # Camera settings for realism
        cam_obj.data.lens = 24  # Wide angle for room coverage
        cam_obj.data.sensor_width = 36  # Full frame sensor
        cam_obj.data.dof.use_dof = True
        cam_obj.data.dof.focus_distance = 4.5
        cam_obj.data.dof.aperture_fstop = 2.8  # Shallow depth of field
        
        print(f"Professional camera positioned at {cam_obj.location}")

    def setup_render_settings(self):
        """Configure Cycles render settings for photorealistic output"""
        scene = bpy.context.scene
        
        # Render engine
        scene.render.engine = 'CYCLES'
        scene.cycles.device = 'GPU'  # Use GPU if available
        
        # Sampling
        scene.cycles.samples = 1024  # High quality samples
        scene.cycles.use_denoising = True
        scene.cycles.denoiser = 'OPENIMAGEDENOISE'
        
        # Light paths
        scene.cycles.max_bounces = 12
        scene.cycles.diffuse_bounces = 4
        scene.cycles.glossy_bounces = 4
        scene.cycles.transmission_bounces = 12
        scene.cycles.volume_bounces = 2
        
        # Caustics
        scene.cycles.caustics_reflective = True
        scene.cycles.caustics_refractive = True
        
        # Color management
        scene.view_settings.view_transform = 'Filmic'
        scene.view_settings.look = 'Medium High Contrast'
        scene.view_settings.exposure = 0.5
        scene.view_settings.gamma = 1.0
        
        # Resolution
        scene.render.resolution_x = 1920
        scene.render.resolution_y = 1080
        scene.render.resolution_percentage = 100
        
        # Film settings
        scene.render.film_transparent = False
        scene.cycles.film_exposure = 1.0
        
        print("Render settings configured for photorealistic output")

# --- Enhanced Blender UI Classes ---

class PHILO_OT_generate_scene(Operator, ImportHelper):
    bl_idname = "philo.generate_scene"
    bl_label = "Generate Photorealistic Living Room"
    bl_options = {'REGISTER', 'UNDO'}
    
    filename_ext = ".obj;*.fbx"
    filter_glob: StringProperty(default="*.obj;*.fbx", options={'HIDDEN'})
    
    # Properties for customization
    add_decorations: BoolProperty(
        name="Add Decorative Elements",
        description="Include plants, rugs, and decorative objects",
        default=True
    )
    
    lighting_strength: FloatProperty(
        name="Lighting Strength",
        description="Overall lighting intensity",
        default=1.0,
        min=0.1,
        max=3.0
    )
    
    room_style: EnumProperty(
        name="Room Style",
        description="Choose room design style",
        items=[
            ('MODERN', "Modern", "Clean, minimalist design"),
            ('CLASSIC', "Classic", "Traditional, elegant design"),
            ('CONTEMPORARY', "Contemporary", "Current, stylish design")
        ],
        default='CONTEMPORARY'
    )

    def execute(self, context):
        # Asset paths
        project_root = "/Users/yenju/philo-homes-website"
        hdri_path = os.path.join(project_root, "items/studio_small_08_4k.exr")
        fabric_texture_path = os.path.join(project_root, "items/gray-cloth-fabric.png")
        
        # Check if assets exist
        assets_exist = True
        missing_assets = []
        
        if not os.path.exists(hdri_path):
            assets_exist = False
            missing_assets.append("HDRI file")
            hdri_path = None
        
        if not os.path.exists(fabric_texture_path):
            assets_exist = False
            missing_assets.append("Fabric texture")
            fabric_texture_path = None
        
        if not assets_exist:
            self.report({'WARNING'}, f"Missing assets: {', '.join(missing_assets)}. Using procedural materials.")
        
        try:
            generator = PhiloSceneGenerator()
            
            # Clear scene
            generator.clear_scene()
            
            # Import furniture model
            generator.import_model(self.filepath)
            
            # Create realistic room environment
            generator.create_realistic_room(hdri_path)
            
            # Prepare and position furniture
            generator.prepare_model(generator.imported_object)
            
            # Create and assign advanced materials
            materials = generator.create_advanced_materials(fabric_texture_path or "")
            generator.assign_smart_materials(generator.imported_object, materials)
            
            # Setup professional camera
            generator.setup_professional_camera(generator.imported_object)
            
            # Configure render settings
            generator.setup_render_settings()
            
            # Apply lighting strength
            if self.lighting_strength != 1.0:
                for light in bpy.data.lights:
                    light.energy *= self.lighting_strength
            
            self.report({'INFO'}, "Photorealistic living room scene generated successfully!")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Scene generation failed: {str(e)}")
            import traceback
            traceback.print_exc()
            return {'CANCELLED'}

class PHILO_OT_quick_render(Operator):
    bl_idname = "philo.quick_render"
    bl_label = "Quick Preview Render"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        try:
            # Set lower samples for quick preview
            original_samples = context.scene.cycles.samples
            context.scene.cycles.samples = 128
            
            # Start render
            bpy.ops.render.render('INVOKE_DEFAULT')
            
            # Restore original samples
            context.scene.cycles.samples = original_samples
            
            self.report({'INFO'}, "Quick preview render started")
            return {'FINISHED'}
        except Exception as e:
            self.report({'ERROR'}, f"Render failed: {str(e)}")
            return {'CANCELLED'}

class PHILO_OT_final_render(Operator):
    bl_idname = "philo.final_render"
    bl_label = "Final High-Quality Render"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        try:
            # Ensure high quality settings
            context.scene.cycles.samples = 1024
            context.scene.cycles.use_denoising = True
            
            # Start render
            bpy.ops.render.render('INVOKE_DEFAULT')
            
            self.report({'INFO'}, "High-quality render started")
            return {'FINISHED'}
        except Exception as e:
            self.report({'ERROR'}, f"Render failed: {str(e)}")
            return {'CANCELLED'}

class PHILO_PT_main_panel(Panel):
    bl_label = "Philo Homes Scene Generator"
    bl_idname = "PHILO_PT_main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Philo Homes'

    def draw(self, context):
        layout = self.layout
        
        # Main generation button
        layout.operator(PHILO_OT_generate_scene.bl_idname, 
                       text="Generate Photorealistic Scene", 
                       icon='SCENE')
        
        layout.separator()
        
        # Render buttons
        col = layout.column(align=True)
        col.operator(PHILO_OT_quick_render.bl_idname, 
                    text="Quick Preview", 
                    icon='RESTRICT_RENDER_OFF')
        col.operator(PHILO_OT_final_render.bl_idname, 
                    text="Final Render", 
                    icon='RENDER_STILL')
        
        layout.separator()
        
        # Info section
        box = layout.box()
        box.label(text="Scene Info:", icon='INFO')
        box.label(text="• Supports OBJ and FBX models")
        box.label(text="• Auto-assigns realistic materials")
        box.label(text="• Professional lighting setup")
        box.label(text="• Architectural room details")

class PHILO_PT_settings_panel(Panel):
    bl_label = "Render Settings"
    bl_idname = "PHILO_PT_settings_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Philo Homes'
    bl_parent_id = "PHILO_PT_main_panel"

    def draw(self, context):
        layout = self.layout
        scene = context.scene
        
        if scene.render.engine == 'CYCLES':
            layout.prop(scene.cycles, "samples")
            layout.prop(scene.cycles, "use_denoising")
            layout.separator()
            layout.prop(scene.view_settings, "exposure")
            layout.prop(scene.view_settings, "gamma")

# --- Registration ---

classes = (
    PHILO_OT_generate_scene,
    PHILO_OT_quick_render,
    PHILO_OT_final_render,
    PHILO_PT_main_panel,
    PHILO_PT_settings_panel
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()