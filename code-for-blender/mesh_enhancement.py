bl_info = {
    "name": "Philo Homes Interior Scene Generator",
    "blender": (4, 0, 0),
    "category": "Mesh",
    "version": (8, 0, 0),
    "author": "Gemini (Definitive Version)",
    "description": "Generates a complete, photorealistic living room scene for an imported model.",
    "location": "View3D > Sidebar > Philo Homes Tab",
    "warning": "Model should have separate material slots for sofa, pillows, and table.",
    "doc_url": "",
    "support": "COMMUNITY",
}

import bpy
from mathutils import Vector
import os
import math

from bpy_extras.io_utils import ImportHelper
from bpy.props import StringProperty
from bpy.types import Operator, Panel

class PhiloSceneGenerator:
    def __init__(self):
        self.imported_object = None

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
            
        self.imported_object = list(new_objects)[0]
        bpy.context.view_layer.objects.active = self.imported_object
        print(f"Successfully imported: {self.imported_object.name}")

    def prepare_model(self, obj):
        if not obj:
            return
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
        obj.location = (0, 0, 0)
        bpy.ops.object.shade_smooth()
        try:
            obj.modifiers.new(name="EdgeSplit", type='EDGE_SPLIT').split_angle = math.radians(35)
        except:
            print("Could not add Edge Split, likely already exists.")
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.uv.smart_project(angle_limit=66, island_margin=0.02)
        bpy.ops.object.mode_set(mode='OBJECT')
        bpy.context.view_layer.update()
        lowest_z = min((obj.matrix_world @ v.co).z for v in obj.data.vertices)
        obj.location.z -= lowest_z
        print(f"Prepared and placed '{obj.name}' on the floor.")

    def assign_materials_by_slot(self, obj, fabric_texture_path):
        if not obj or not obj.data:
            return

        materials = {}
        # Sofa Fabric
        sofa_mat = bpy.data.materials.new(name="PBR_Sofa_Fabric")
        sofa_mat.use_nodes = True
        nodes = sofa_mat.node_tree.nodes
        links = sofa_mat.node_tree.links
        nodes.clear()
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        tex_coord = nodes.new(type='ShaderNodeTexCoord')
        mapping = nodes.new(type='ShaderNodeMapping')
        mapping.inputs['Scale'].default_value = (6, 6, 6)
        try:
            img_node = nodes.new(type='ShaderNodeTexImage')
            img_node.image = bpy.data.images.load(fabric_texture_path)
            img_node.projection = 'BOX'
        except Exception as e:
            print(f"Could not load fabric texture: {e}")
            return
        bump = nodes.new(type='ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.04
        principled.inputs['Sheen Weight'].default_value = 0.7
        links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
        links.new(mapping.outputs['Vector'], img_node.inputs['Vector'])
        links.new(img_node.outputs['Color'], principled.inputs['Base Color'])
        links.new(img_node.outputs['Color'], principled.inputs['Roughness'])
        links.new(img_node.outputs['Color'], bump.inputs['Height'])
        links.new(bump.outputs['Normal'], principled.inputs['Normal'])
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        materials["sofa"] = sofa_mat

        # Pillow Fabric
        pillow_mat = bpy.data.materials.new(name="PBR_Pillow_Fabric")
        pillow_mat.use_nodes = True
        p_principled = pillow_mat.node_tree.nodes["Principled BSDF"]
        p_principled.inputs['Base Color'].default_value = (0.95, 0.95, 0.92, 1.0)
        p_principled.inputs['Roughness'].default_value = 0.8
        p_principled.inputs['Sheen Weight'].default_value = 1.0
        materials["pillow"] = pillow_mat

        # Table Wood
        wood_mat = bpy.data.materials.new(name="PBR_Table_Wood")
        wood_mat.use_nodes = True
        w_nodes = wood_mat.node_tree.nodes
        w_links = wood_mat.node_tree.links
        w_principled = w_nodes["Principled BSDF"]
        w_principled.inputs['Roughness'].default_value = 0.15
        w_principled.inputs['Specular IOR Level'].default_value = 0.4
        w_tex = w_nodes.new(type='ShaderNodeTexNoise')
        w_tex.inputs['Scale'].default_value = 25
        w_tex.inputs['Detail'].default_value = 10
        w_ramp = w_nodes.new(type='ShaderNodeValToRGB')
        w_ramp.color_ramp.elements[0].color = (0.03, 0.01, 0.01, 1)
        w_ramp.color_ramp.elements[1].color = (0.08, 0.04, 0.02, 1)
        w_links.new(w_tex.outputs['Fac'], w_ramp.inputs['Fac'])
        w_links.new(w_ramp.outputs['Color'], w_principled.inputs['Base Color'])
        materials["table"] = wood_mat

        obj.data.materials.clear()
        num_slots = len(obj.material_slots)
        print(f"Found {num_slots} material slots on the imported model.")
        if num_slots >= 1:
            obj.material_slots[0].material = materials["sofa"]
            print("Assigned: Sofa Fabric to Slot 1.")
        if num_slots >= 2:
            obj.material_slots[1].material = materials["pillow"]
            print("Assigned: Pillow Fabric to Slot 2.")
        if num_slots >= 3:
            obj.material_slots[2].material = materials["table"]
            print("Assigned: Table Wood to Slot 3.")
        print("--- Material Assignment Complete. --- ")

    def create_living_room_scene(self, hdri_path):
        # --- Create Room Structure ---
        room_size = 15
        wall_height = 4
        # Floor
        bpy.ops.mesh.primitive_plane_add(size=room_size, location=(0, 0, 0))
        floor = bpy.context.active_object
        floor.name = "Living_Room_Floor"
        # Back Wall
        bpy.ops.mesh.primitive_plane_add(size=room_size, location=(0, -room_size/2, wall_height/2), rotation=(math.radians(90), 0, 0))
        back_wall = bpy.context.active_object
        # Left Wall with Window
        bpy.ops.mesh.primitive_plane_add(size=room_size, location=(-room_size/2, 0, wall_height/2), rotation=(math.radians(90), 0, math.radians(90)))
        left_wall = bpy.context.active_object
        window_bool = left_wall.modifiers.new(name="WindowBool", type='BOOLEAN')
        bpy.ops.mesh.primitive_cube_add(location=(-room_size/2, 0, wall_height/2))
        cutter = bpy.context.active_object
        cutter.scale = (0.1, 2, 1.2)
        window_bool.object = cutter
        cutter.display_type = 'WIRE'
        # Ceiling
        bpy.ops.mesh.primitive_plane_add(size=room_size, location=(0, 0, wall_height))
        ceiling = bpy.context.active_object

        # --- Create Materials for Room ---
        floor_mat = bpy.data.materials.new(name="Hardwood_Floor")
        floor_mat.use_nodes = True
        nodes = floor_mat.node_tree.nodes
        principled = nodes["Principled BSDF"]
        principled.inputs['Roughness'].default_value = 0.2
        floor.data.materials.append(floor_mat)

        wall_mat = bpy.data.materials.new(name="Wall_Paint")
        wall_mat.use_nodes = True
        wall_principled = wall_mat.node_tree.nodes["Principled BSDF"]
        wall_principled.inputs['Base Color'].default_value = (0.92, 0.92, 0.9, 1)
        wall_principled.inputs['Roughness'].default_value = 0.7
        back_wall.data.materials.append(wall_mat)
        left_wall.data.materials.append(wall_mat)
        ceiling.data.materials.append(wall_mat)

        # --- World, Lighting, and Render Settings ---
        world = bpy.context.scene.world or bpy.data.worlds.new("Studio_World")
        bpy.context.scene.world = world
        world.use_nodes = True
        w_nodes = world.node_tree.nodes
        w_links = world.node_tree.links
        w_nodes.clear()
        bg_node = w_nodes.new(type='ShaderNodeBackground')
        env_tex = w_nodes.new(type='ShaderNodeTexEnvironment')
        output_node = w_nodes.new(type='ShaderNodeOutputWorld')
        try:
            env_tex.image = bpy.data.images.load(hdri_path)
            bg_node.inputs['Strength'].default_value = 0.7
        except Exception as e:
            print(f"Could not load HDRI: {e}")
        w_links.new(env_tex.outputs['Color'], bg_node.inputs['Color'])
        w_links.new(bg_node.outputs['Background'], output_node.inputs['Surface'])

        # Sun light shining through the window
        bpy.ops.object.light_add(type='SUN', location=(-10, 5, 5))
        sun = bpy.context.active_object
        sun.rotation_euler = (math.radians(45), 0, math.radians(-110))
        sun.data.angle = math.radians(1)
        sun.data.energy = 2

        # Portal light in the window to improve render quality
        bpy.ops.object.light_add(type='AREA', location=(-room_size/2 + 0.1, 0, wall_height/2))
        portal = bpy.context.active_object
        portal.scale = (0.1, 2, 1.2)
        portal.data.is_portal = True

        bpy.context.scene.render.engine = 'CYCLES'
        bpy.context.scene.cycles.samples = 400
        bpy.context.scene.cycles.use_denoising = True
        bpy.context.scene.view_settings.view_transform = 'Filmic'
        bpy.context.scene.view_settings.look = 'Medium High Contrast'
        print("Living room scene created.")

    def setup_room_camera(self, target_obj):
        if not target_obj:
            return
        cam_data = bpy.data.cameras.new("Room_View_Camera")
        cam_obj = bpy.data.objects.new(cam_data.name, cam_data)
        bpy.context.scene.collection.objects.link(cam_obj)
        bpy.context.scene.camera = cam_obj

        # Position camera for a wide, realistic room view
        cam_obj.location = (7, 7, 2.5)
        # Point camera towards the sofa
        look_at_point = target_obj.location + Vector((0, 0, 0.5))
        direction = look_at_point - cam_obj.location
        cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
        cam_obj.data.lens = 35
        print(f"Room camera created and positioned.")

# --- Blender UI Classes ---

class PHILO_OT_generate_scene(Operator, ImportHelper):
    bl_idname = "philo.generate_scene"
    bl_label = "Generate Living Room Scene"
    bl_options = {'REGISTER', 'UNDO'}

    filename_ext = ".obj;*.fbx"
    filter_glob: StringProperty(default="*.obj;*.fbx", options={'HIDDEN'})

    def execute(self, context):
        project_root = "/Users/yenju/philo-homes-website"
        hdri_path = os.path.join(project_root, "items/studio_small_08_4k.exr")
        fabric_texture_path = os.path.join(project_root, "items/gray-cloth-fabric.png")

        if not all(os.path.exists(p) for p in [hdri_path, fabric_texture_path]):
            self.report({'ERROR'}, "Asset file (HDRI or Fabric Texture) not found. Check paths.")
            return {'CANCELLED'}

        try:
            generator = PhiloSceneGenerator()
            generator.clear_scene()
            generator.import_model(self.filepath)
            generator.create_living_room_scene(hdri_path)
            generator.prepare_model(generator.imported_object)
            generator.assign_materials_by_slot(generator.imported_object, fabric_texture_path)
            generator.setup_room_camera(generator.imported_object)
            
            self.report({'INFO'}, "Photorealistic living room scene generated!")
            return {'FINISHED'}
        except Exception as e:
            self.report({'ERROR'}, f"Process failed: {e}")
            import traceback
            traceback.print_exc()
            return {'CANCELLED'}

class PHILO_PT_main_panel(Panel):
    bl_label = "Philo Homes Scene Generator"
    bl_idname = "PHILO_PT_main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Philo Homes'

    def draw(self, context):
        layout = self.layout
        layout.operator(PHILO_OT_generate_scene.bl_idname)

# --- Registration ---

classes = (PHILO_OT_generate_scene, PHILO_PT_main_panel)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()