"""Main scene generation module"""

import bpy
import os
import math
from mathutils import Vector
from . import config
from . import materials
from . import camera_setup
from . import furniture_placement

class PhiloSceneGenerator:
    def __init__(self):
        self.imported_object = None
        self.room_size = 6  # Compact room size
        self.wall_height = config.WALL_HEIGHT
        self.material_manager = materials.MaterialManager()
        self.camera_manager = camera_setup.CameraManager()
        self.furniture_manager = furniture_placement.FurnitureManager()

    def clear_scene(self):
        """Clear the entire scene"""
        if bpy.context.mode != 'OBJECT':
            bpy.ops.object.mode_set(mode='OBJECT')
        bpy.ops.object.select_all(action='SELECT')
        bpy.ops.object.delete(use_global=False)
        
        # Clear data blocks
        for data in [bpy.data.meshes, bpy.data.materials, bpy.data.cameras, 
                    bpy.data.lights, bpy.data.worlds, bpy.data.images]:
            for item in data:
                try:
                    data.remove(item)
                except:
                    pass
        print("Scene cleared for new generation.")

    def import_model(self, filepath):
        """Import furniture model"""
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
            # Create parent empty
            bpy.ops.object.empty_add(location=(0, 0, 0))
            parent = bpy.context.active_object
            parent.name = "Imported_Furniture_Group"
            
            for obj in new_objects:
                obj.parent = parent
            
            self.imported_object = parent
        else:
            self.imported_object = list(new_objects)[0]
        
        print(f"Successfully imported: {self.imported_object.name}")
        
        # Analyze material slots
        self.analyze_material_slots()

    def analyze_material_slots(self):
        """Analyze and report material slots in imported model"""
        if not self.imported_object:
            return
        
        print("\n=== Material Slot Analysis ===")
        
        objects_to_check = []
        if self.imported_object.type == 'EMPTY':
            objects_to_check = [child for child in self.imported_object.children if child.type == 'MESH']
        else:
            objects_to_check = [self.imported_object]
        
        for obj in objects_to_check:
            if obj.material_slots:
                print(f"\nObject: {obj.name}")
                for i, slot in enumerate(obj.material_slots):
                    print(f"  Slot {i}: {slot.name if slot.name else 'Unnamed'}")
            else:
                print(f"\nObject: {obj.name} - No material slots")
        
        print("==============================\n")

    def prepare_model(self, obj):
        """Prepare and position the model"""
        if not obj:
            return
        
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
        
        # Position on floor
        self.position_on_floor(obj)

    def position_on_floor(self, obj):
        """Position object on floor"""
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
        obj.location.y = -1.5  # Against back wall
        
        bpy.context.view_layer.update()

    def create_room(self):
        """Create the room environment"""
        # Floor
        bpy.ops.mesh.primitive_plane_add(size=self.room_size, location=(0, 0, 0))
        floor = bpy.context.active_object
        floor.name = "Floor"
        
        # Walls
        # Back wall
        bpy.ops.mesh.primitive_plane_add(
            size=self.room_size, 
            location=(0, -self.room_size/2, self.wall_height/2), 
            rotation=(math.radians(90), 0, 0)
        )
        back_wall = bpy.context.active_object
        back_wall.name = "Back_Wall"
        
        # Left wall
        bpy.ops.mesh.primitive_plane_add(
            size=self.room_size, 
            location=(-self.room_size/2, 0, self.wall_height/2), 
            rotation=(math.radians(90), 0, math.radians(90))
        )
        left_wall = bpy.context.active_object
        left_wall.name = "Left_Wall"
        
        # Right wall
        bpy.ops.mesh.primitive_plane_add(
            size=self.room_size, 
            location=(self.room_size/2, 0, self.wall_height/2), 
            rotation=(math.radians(90), 0, math.radians(-90))
        )
        right_wall = bpy.context.active_object
        right_wall.name = "Right_Wall"
        
        # Ceiling
        bpy.ops.mesh.primitive_plane_add(
            size=self.room_size, 
            location=(0, 0, self.wall_height)
        )
        ceiling = bpy.context.active_object
        ceiling.name = "Ceiling"
        
        # Create room materials
        self.create_room_materials([floor, back_wall, left_wall, right_wall, ceiling])

    def create_room_materials(self, room_objects):
        """Create and assign room materials"""
        # Floor material
        floor_mat = bpy.data.materials.new(name="Wood_Floor")
        floor_mat.use_nodes = True
        principled = floor_mat.node_tree.nodes["Principled BSDF"]
        principled.inputs['Base Color'].default_value = (0.12, 0.08, 0.05, 1)
        principled.inputs['Roughness'].default_value = 0.15
        
        # Wall material
        wall_mat = bpy.data.materials.new(name="Wall_Paint")
        wall_mat.use_nodes = True
        principled = wall_mat.node_tree.nodes["Principled BSDF"]
        principled.inputs['Base Color'].default_value = (0.88, 0.87, 0.85, 1)
        principled.inputs['Roughness'].default_value = 0.9
        
        # Assign materials
        room_objects[0].data.materials.append(floor_mat)  # Floor
        for wall in room_objects[1:]:
            wall.data.materials.append(wall_mat)

    def setup_lighting(self, hdri_path=None):
        """Setup professional lighting"""
        # World HDRI
        world = bpy.data.worlds.new("Interior_World")
        bpy.context.scene.world = world
        world.use_nodes = True
        nodes = world.node_tree.nodes
        links = world.node_tree.links
        nodes.clear()
        
        # HDRI setup
        bg_node = nodes.new(type='ShaderNodeBackground')
        output_node = nodes.new(type='ShaderNodeOutputWorld')
        
        if hdri_path and os.path.exists(hdri_path):
            env_tex = nodes.new(type='ShaderNodeTexEnvironment')
            try:
                env_tex.image = bpy.data.images.load(hdri_path)
                links.new(env_tex.outputs['Color'], bg_node.inputs['Color'])
                bg_node.inputs['Strength'].default_value = 0.5
            except:
                bg_node.inputs['Color'].default_value = (0.05, 0.05, 0.07, 1)
                bg_node.inputs['Strength'].default_value = 0.3
        else:
            bg_node.inputs['Color'].default_value = (0.05, 0.05, 0.07, 1)
            bg_node.inputs['Strength'].default_value = 0.3
        
        links.new(bg_node.outputs['Background'], output_node.inputs['Surface'])
        
        # Key light (window light) - main illumination from front-left
        bpy.ops.object.light_add(type='AREA', location=(-4, 3, 2.5))
        key_light = bpy.context.active_object
        key_light.name = "Key_Light"
        key_light.data.size = 2.5
        key_light.data.energy = 150
        key_light.data.color = (1.0, 0.95, 0.85)  # Warm daylight
        key_light.rotation_euler = (math.radians(-30), math.radians(-45), 0)
        
        # Fill light (ceiling) - soft ambient fill
        bpy.ops.object.light_add(type='AREA', location=(0, 0, self.wall_height - 0.3))
        fill_light = bpy.context.active_object
        fill_light.name = "Fill_Light"
        fill_light.data.size = 5
        fill_light.data.energy = 40
        fill_light.data.color = (1.0, 1.0, 1.0)
        fill_light.rotation_euler = (math.radians(180), 0, 0)
        
        # Back rim light for depth and separation
        bpy.ops.object.light_add(type='AREA', location=(2, -4, 1.5))
        rim_light = bpy.context.active_object
        rim_light.name = "Rim_Light"
        rim_light.data.size = 1.5
        rim_light.data.energy = 80
        rim_light.data.color = (0.9, 0.9, 1.0)  # Slightly cool
        rim_light.rotation_euler = (math.radians(45), math.radians(30), 0)

    def setup_render_settings(self, quality="medium"):
        """Configure photorealistic render settings"""
        scene = bpy.context.scene
        
        # Render engine
        scene.render.engine = 'CYCLES'
        scene.cycles.device = 'GPU'
        
        # Apply quality preset
        if quality in config.RENDER_PRESETS:
            preset = config.RENDER_PRESETS[quality]
            scene.cycles.samples = preset["samples"]
            scene.render.resolution_percentage = preset["resolution_percentage"]
            scene.cycles.use_denoising = preset["denoising"]
        
        # Enhanced photorealistic settings for interior scenes
        scene.cycles.max_bounces = 16
        scene.cycles.diffuse_bounces = 6
        scene.cycles.glossy_bounces = 6
        scene.cycles.transmission_bounces = 16
        scene.cycles.volume_bounces = 2
        scene.cycles.transparent_max_bounces = 12
        
        # Better caustics and light sampling for realistic interior lighting
        scene.cycles.caustics_reflective = True
        scene.cycles.caustics_refractive = True
        scene.cycles.blur_glossy = 0.3  # Sharper reflections
        
        # Improved sampling for interior scenes
        scene.cycles.use_adaptive_sampling = True
        scene.cycles.adaptive_threshold = 0.01
        scene.cycles.sample_clamp_direct = 0.0  # No clamping for realistic lighting
        scene.cycles.sample_clamp_indirect = 0.0
        
        # Color management for photorealistic interiors
        scene.view_settings.view_transform = 'Filmic'
        scene.view_settings.look = 'Medium High Contrast'
        scene.view_settings.exposure = 0.1  # Slightly brighter for interior
        scene.view_settings.gamma = 1.0
        
        # Film settings for natural look (Blender 4.x compatible)
        try:
            scene.render.filter_type = 'GAUSSIAN'
            scene.render.filter_size = 1.5
        except AttributeError:
            # Blender 4.x uses different filter settings
            pass
        
        # High resolution for quality
        scene.render.resolution_x = 1920
        scene.render.resolution_y = 1080
        scene.render.pixel_aspect_x = 1.0
        scene.render.pixel_aspect_y = 1.0
        
        # Film settings for realism
        scene.render.film_transparent = False
        
        print(f"Photorealistic render settings applied ({quality} quality)")

    def generate_scene(self, filepath, camera_preset="full_room", render_quality="medium"):
        """Generate complete scene"""
        # Import model
        self.import_model(filepath)
        
        # Create room
        self.create_room()
        
        # Prepare model
        self.prepare_model(self.imported_object)
        
        # Create and assign materials
        mats = self.material_manager.create_all_materials(config.FABRIC_TEXTURE_PATH)
        materials.assign_materials_by_name(self.imported_object, mats)
        
        # Setup lighting
        self.setup_lighting(config.HDRI_PATH)
        
        # Setup camera
        self.camera_manager.create_camera()
        self.camera_manager.setup_camera_preset(camera_preset, self.imported_object)
        
        # Setup viewport for better navigation
        self.setup_viewport()
        
        # Setup render settings
        self.setup_render_settings(render_quality)
        
        print(f"Scene generated successfully with {camera_preset} camera view!")
    
    def generate_furnished_room(self, furniture_count=6, camera_preset="reference_view", render_quality="medium"):
        """Generate a complete furnished room with smart furniture placement"""
        print("Generating furnished room layout...")
        
        # Clear scene
        self.clear_scene()
        
        # Create compact room
        self.create_room()
        
        # Generate smart furniture layout
        furniture_objects = self.furniture_manager.generate_furnished_room(furniture_count)
        
        # Apply materials to all furniture
        print("\nApplying materials to furniture...")
        for i, obj in enumerate(furniture_objects):
            if obj and obj.name in bpy.data.objects:
                print(f"  Processing {obj.name}...")
                
                # Get furniture info for material assignment
                furniture_info = None
                for filename, info in furniture_placement.FurnitureCatalog.FURNITURE_DATA.items():
                    if filename[:-4] in obj.name:
                        furniture_info = info
                        break
                
                if furniture_info:
                    self._apply_smart_materials(obj, furniture_info)
                else:
                    print(f"    WARNING: No furniture info found for {obj.name}")
                    
                # Verify object still exists
                if obj.name not in bpy.data.objects:
                    print(f"    ERROR: {obj.name} was deleted during material application!")
            else:
                print(f"  WARNING: furniture_objects[{i}] is missing or None")
        
        # Setup lighting
        self.setup_lighting(config.HDRI_PATH)
        
        # Setup camera to match reference image
        self.camera_manager.create_camera()
        self.camera_manager.setup_reference_view()
        
        # Setup viewport
        self.setup_viewport()
        
        # Setup render settings
        self.setup_render_settings(render_quality)
        
        print(f"Furnished room generated successfully with {len(furniture_objects)} pieces!")
        
        # Final check - what's actually in the scene?
        print("\nFinal scene check:")
        furniture_in_scene = []
        for obj in bpy.context.scene.objects:
            if "Furniture" in obj.name:
                furniture_in_scene.append(obj.name)
                print(f"  ✓ {obj.name}")
        
        missing = []
        for obj in furniture_objects:
            if obj and obj.name not in [o.name for o in bpy.context.scene.objects]:
                missing.append(obj.name)
                print(f"  ✗ {obj.name} is MISSING from scene!")
        
        if missing:
            print(f"\nWARNING: {len(missing)} objects went missing during generation!")
        
        return furniture_objects
    
    def _apply_smart_materials(self, obj, furniture_info):
        """Apply appropriate materials based on furniture type"""
        category = furniture_info["category"]
        
        if category == "seating":
            # Apply fabric material to sofa
            mats = self.material_manager.create_all_materials(config.FABRIC_TEXTURE_PATH)
            materials.assign_materials_by_name(obj, mats)
        elif category == "table":
            # Apply wood material to tables
            self._apply_wood_material(obj)
        elif category == "storage":
            # Apply wood material to shelves
            self._apply_wood_material(obj)
        elif category == "decor":
            # Apply decorative materials
            self._apply_decorative_material(obj)
    
    def _apply_wood_material(self, obj):
        """Apply wood material to object"""
        wood_mat = bpy.data.materials.new(name=f"Wood_{obj.name}")
        wood_mat.use_nodes = True
        principled = wood_mat.node_tree.nodes["Principled BSDF"]
        principled.inputs['Base Color'].default_value = (0.3, 0.2, 0.1, 1)
        principled.inputs['Roughness'].default_value = 0.3
        # Blender 4.x uses 'Specular IOR Level' instead of 'Specular'
        if 'Specular IOR Level' in principled.inputs:
            principled.inputs['Specular IOR Level'].default_value = 0.5
        elif 'Specular' in principled.inputs:
            principled.inputs['Specular'].default_value = 0.2
        
        self._assign_material_to_object(obj, wood_mat)
    
    def _apply_decorative_material(self, obj):
        """Apply decorative material to object"""
        decor_mat = bpy.data.materials.new(name=f"Decor_{obj.name}")
        decor_mat.use_nodes = True
        principled = decor_mat.node_tree.nodes["Principled BSDF"]
        principled.inputs['Base Color'].default_value = (0.8, 0.7, 0.6, 1)
        principled.inputs['Roughness'].default_value = 0.4
        
        self._assign_material_to_object(obj, decor_mat)
    
    def _assign_material_to_object(self, obj, material):
        """Assign material to object and all its children"""
        objects_to_process = []
        if obj.type == 'EMPTY' and obj.children:
            objects_to_process = [child for child in obj.children if child.type == 'MESH']
        elif obj.type == 'MESH':
            objects_to_process = [obj]
        
        for mesh_obj in objects_to_process:
            if not mesh_obj.data.materials:
                mesh_obj.data.materials.append(material)
            else:
                mesh_obj.data.materials[0] = material
    
    def setup_viewport(self):
        """Configure viewport for better navigation"""
        for area in bpy.context.screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        # Set clipping distances
                        space.clip_start = config.VIEWPORT_CLIP_START
                        space.clip_end = config.VIEWPORT_CLIP_END
                        
                        # Set shading to material preview
                        space.shading.type = 'MATERIAL'
                        space.shading.use_scene_lights = True
                        space.shading.use_scene_world = False
                        
                        # Frame all objects
                        try:
                            bpy.ops.view3d.view_all()
                        except:
                            # Skip if no 3D view context
                            pass
                        
                        print("Viewport configured for better navigation")