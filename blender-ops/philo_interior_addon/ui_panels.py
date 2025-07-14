"""UI panels and operators for the addon"""

import bpy
from bpy.types import Operator, Panel
from bpy.props import StringProperty, BoolProperty, FloatProperty, EnumProperty, IntProperty
from bpy_extras.io_utils import ImportHelper
from . import scene_generator
from . import config

class PHILO_OT_generate_scene(Operator, ImportHelper):
    bl_idname = "philo.generate_scene"
    bl_label = "Generate Photorealistic Living Room"
    bl_options = {'REGISTER', 'UNDO'}
    
    filename_ext = ".obj;*.fbx"
    filter_glob: StringProperty(default="*.obj;*.fbx", options={'HIDDEN'})
    
    # Camera preset selection
    camera_preset: EnumProperty(
        name="Camera View",
        description="Choose camera angle",
        items=[
            ('full_room', "Full Room View", "Shows entire room from corner"),
            ('furniture_focus', "Furniture Focus", "Close-up of furniture"),
            ('corner_view', "Corner View", "Alternative corner angle")
        ],
        default='full_room'
    )
    
    # Render quality
    render_quality: EnumProperty(
        name="Render Quality",
        description="Choose render quality preset",
        items=[
            ('preview', "Preview", "Fast preview quality"),
            ('medium', "Medium", "Balanced quality and speed"),
            ('final', "Final", "High quality final render")
        ],
        default='medium'
    )
    
    def execute(self, context):
        try:
            generator = scene_generator.PhiloSceneGenerator()
            generator.clear_scene()
            generator.generate_scene(
                self.filepath, 
                camera_preset=self.camera_preset,
                render_quality=self.render_quality
            )
            
            self.report({'INFO'}, f"Scene generated with {self.camera_preset} view!")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Scene generation failed: {str(e)}")
            return {'CANCELLED'}

class PHILO_OT_generate_furnished_room(Operator):
    bl_idname = "philo.generate_furnished_room"
    bl_label = "Generate Furnished Room (Smart Layout)"
    bl_options = {'REGISTER', 'UNDO'}
    
    # Number of furniture pieces
    furniture_count: IntProperty(
        name="Furniture Count",
        description="Number of furniture pieces to place",
        default=6,
        min=5,
        max=7
    )
    
    # Render quality
    render_quality: EnumProperty(
        name="Render Quality",
        description="Choose render quality preset",
        items=[
            ('preview', "Preview", "Fast preview quality"),
            ('medium', "Medium", "Balanced quality and speed"),
            ('final', "Final", "High quality final render")
        ],
        default='medium'
    )
    
    def execute(self, context):
        try:
            generator = scene_generator.PhiloSceneGenerator()
            furniture_objects = generator.generate_furnished_room(
                furniture_count=self.furniture_count,
                render_quality=self.render_quality
            )
            
            self.report({'INFO'}, f"Furnished room generated with {len(furniture_objects)} pieces!")
            return {'FINISHED'}
            
        except Exception as e:
            self.report({'ERROR'}, f"Furnished room generation failed: {str(e)}")
            return {'CANCELLED'}

class PHILO_OT_quick_render(Operator):
    bl_idname = "philo.quick_render"
    bl_label = "Quick Preview Render"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        original_samples = context.scene.cycles.samples
        context.scene.cycles.samples = 128
        
        bpy.ops.render.render('INVOKE_DEFAULT')
        
        context.scene.cycles.samples = original_samples
        return {'FINISHED'}

class PHILO_OT_final_render(Operator):
    bl_idname = "philo.final_render"
    bl_label = "Final High-Quality Render"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        context.scene.cycles.samples = 1024
        context.scene.cycles.use_denoising = True
        
        bpy.ops.render.render('INVOKE_DEFAULT')
        return {'FINISHED'}

class PHILO_OT_render_snapshot(Operator):
    bl_idname = "philo.render_snapshot"
    bl_label = "Render Snapshot from Reference View"
    bl_options = {'REGISTER', 'UNDO'}
    
    def execute(self, context):
        # Setup camera for reference view
        from . import camera_setup
        
        cam_manager = camera_setup.CameraManager()
        if context.scene.camera:
            cam_manager.camera_obj = context.scene.camera
        else:
            cam_manager.create_camera()
        
        cam_manager.setup_reference_view()
        
        # Render with high quality settings
        context.scene.cycles.samples = 512
        context.scene.cycles.use_denoising = True
        
        # Start render
        bpy.ops.render.render('INVOKE_DEFAULT')
        
        self.report({'INFO'}, "Rendering snapshot from reference view angle")
        return {'FINISHED'}

class PHILO_OT_adjust_camera(Operator):
    bl_idname = "philo.adjust_camera"
    bl_label = "Adjust Camera View"
    bl_options = {'REGISTER', 'UNDO'}
    
    camera_preset: EnumProperty(
        name="Camera Preset",
        items=[
            ('full_room', "Full Room", "Wide angle room view"),
            ('furniture_focus', "Furniture Focus", "Close-up view"),
            ('corner_view', "Corner View", "Alternative angle")
        ]
    )
    
    def execute(self, context):
        from . import camera_setup
        
        # Find furniture object
        furniture_obj = None
        for obj in context.scene.objects:
            if "furniture" in obj.name.lower() or "imported" in obj.name.lower():
                furniture_obj = obj
                break
        
        cam_manager = camera_setup.CameraManager()
        cam_manager.camera_obj = context.scene.camera
        cam_manager.setup_camera_preset(self.camera_preset, furniture_obj)
        
        self.report({'INFO'}, f"Camera adjusted to {self.camera_preset} view")
        return {'FINISHED'}

class PHILO_OT_set_viewport_shading(Operator):
    bl_idname = "philo.set_viewport_shading"
    bl_label = "Set Viewport Shading"
    bl_options = {'REGISTER', 'UNDO'}
    
    shading_type: EnumProperty(
        name="Shading Type",
        items=[
            ('SOLID', "Solid", "Basic shading"),
            ('MATERIAL', "Material Preview", "Show materials"),
            ('RENDERED', "Rendered", "Full render preview")
        ]
    )
    
    def execute(self, context):
        for area in context.screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.shading.type = self.shading_type
                        
                        # Additional settings for better material preview
                        if self.shading_type == 'MATERIAL':
                            space.shading.use_scene_lights = True
                            space.shading.use_scene_world = False
                            space.shading.studio_light = 'forest.exr'
                        elif self.shading_type == 'RENDERED':
                            space.shading.use_scene_lights_render = True
                            space.shading.use_scene_world_render = True
        
        self.report({'INFO'}, f"Viewport shading set to {self.shading_type}")
        return {'FINISHED'}

class PHILO_OT_assign_material_to_selected(Operator):
    bl_idname = "philo.assign_material_to_selected"
    bl_label = "Assign Material to Selected Faces"
    bl_options = {'REGISTER', 'UNDO'}
    
    material_type: EnumProperty(
        name="Material Type",
        items=[
            ('fabric', "Fabric", "Soft fabric material"),
            ('leather', "Leather", "Leather material"),
            ('wood', "Wood", "Wood material"),
            ('metal', "Metal", "Metal material"),
            ('plastic', "Plastic", "Plastic material")
        ]
    )
    
    def execute(self, context):
        obj = context.active_object
        if not obj or obj.type != 'MESH':
            self.report({'ERROR'}, "Select a mesh object")
            return {'CANCELLED'}
        
        # Get or create material
        mat_name = f"{self.material_type.title()}_Material"
        material = bpy.data.materials.get(mat_name)
        
        if not material:
            # Create material if it doesn't exist
            from . import materials
            mat_manager = materials.MaterialManager()
            all_mats = mat_manager.create_all_materials()
            material = all_mats.get(self.material_type)
        
        if not material:
            self.report({'ERROR'}, f"Could not create {self.material_type} material")
            return {'CANCELLED'}
        
        # Add material to object if not already present
        if material.name not in obj.data.materials:
            obj.data.materials.append(material)
        
        # Get material index
        mat_index = obj.data.materials.find(material.name)
        
        # Assign to selected faces in edit mode
        if context.mode == 'EDIT_MESH':
            bpy.ops.object.material_slot_assign()
            obj.active_material_index = mat_index
            self.report({'INFO'}, f"Assigned {self.material_type} to selected faces")
        else:
            # Assign to whole object in object mode
            if len(obj.data.materials) == 0:
                obj.data.materials.append(material)
            else:
                obj.data.materials[0] = material
            self.report({'INFO'}, f"Assigned {self.material_type} to entire object")
        
        return {'FINISHED'}

class PHILO_PT_main_panel(Panel):
    bl_label = "Philo Homes Scene Generator"
    bl_idname = "PHILO_PT_main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Philo Homes'

    def draw(self, context):
        layout = self.layout
        
        # Main generation buttons
        col = layout.column(align=True)
        col.operator(PHILO_OT_generate_scene.bl_idname, 
                    text="Generate Scene (Import Model)", 
                    icon='IMPORT')
        col.operator(PHILO_OT_generate_furnished_room.bl_idname, 
                    text="Generate Furnished Room (Smart)", 
                    icon='HOME')
        
        layout.separator()
        
        # Viewport shading buttons
        box = layout.box()
        box.label(text="Viewport Display:", icon='SHADING_RENDERED')
        row = box.row(align=True)
        op = row.operator(PHILO_OT_set_viewport_shading.bl_idname, text="Solid", icon='SHADING_SOLID')
        op.shading_type = 'SOLID'
        op = row.operator(PHILO_OT_set_viewport_shading.bl_idname, text="Material", icon='SHADING_TEXTURE')
        op.shading_type = 'MATERIAL'
        op = row.operator(PHILO_OT_set_viewport_shading.bl_idname, text="Rendered", icon='SHADING_RENDERED')
        op.shading_type = 'RENDERED'
        
        layout.separator()
        
        # Render buttons
        col = layout.column(align=True)
        col.operator(PHILO_OT_quick_render.bl_idname, 
                    text="Quick Preview", 
                    icon='RESTRICT_RENDER_OFF')
        col.operator(PHILO_OT_final_render.bl_idname, 
                    text="Final Render", 
                    icon='RENDER_STILL')
        col.operator(PHILO_OT_render_snapshot.bl_idname, 
                    text="Snapshot (Reference View)", 
                    icon='CAMERA_DATA')

class PHILO_PT_camera_panel(Panel):
    bl_label = "Camera Controls"
    bl_idname = "PHILO_PT_camera_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Philo Homes'
    bl_parent_id = "PHILO_PT_main_panel"

    def draw(self, context):
        layout = self.layout
        
        # Camera presets
        row = layout.row(align=True)
        op = row.operator(PHILO_OT_adjust_camera.bl_idname, text="Full Room")
        op.camera_preset = 'full_room'
        
        op = row.operator(PHILO_OT_adjust_camera.bl_idname, text="Furniture")
        op.camera_preset = 'furniture_focus'
        
        op = row.operator(PHILO_OT_adjust_camera.bl_idname, text="Corner")
        op.camera_preset = 'corner_view'

class PHILO_PT_material_panel(Panel):
    bl_label = "Material Assignment"
    bl_idname = "PHILO_PT_material_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Philo Homes'
    bl_parent_id = "PHILO_PT_main_panel"

    def draw(self, context):
        layout = self.layout
        
        # Instructions
        box = layout.box()
        box.label(text="To assign materials to parts:", icon='INFO')
        box.label(text="1. Select object")
        box.label(text="2. Enter Edit Mode (Tab)")
        box.label(text="3. Select faces (Alt+A = all)")
        box.label(text="4. Click material below")
        
        # Material assignment buttons
        col = layout.column(align=True)
        for mat_type, label in [('fabric', 'Fabric'), ('leather', 'Leather'), 
                                ('wood', 'Wood'), ('metal', 'Metal'), ('plastic', 'Plastic')]:
            op = col.operator(PHILO_OT_assign_material_to_selected.bl_idname, text=label)
            op.material_type = mat_type

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