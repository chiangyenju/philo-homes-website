bl_info = {
    "name": "Philo Homes Interior Scene Generator",
    "blender": (4, 0, 0),
    "category": "Mesh",
    "version": (2, 0, 0),
    "author": "Philo Homes",
    "description": "Generates photorealistic living room scenes with professional interior design elements",
    "location": "View3D > Sidebar > Philo Homes Tab",
    "warning": "",
    "doc_url": "",
    "support": "COMMUNITY",
}

import bpy
from . import scene_generator
from . import materials
from . import camera_setup
from . import ui_panels
from . import expert_interior_design
from . import smart_placement_rules
from . import furniture_placement

# Registration
classes = (
    ui_panels.PHILO_OT_generate_scene,
    ui_panels.PHILO_OT_generate_furnished_room,
    ui_panels.PHILO_OT_quick_render,
    ui_panels.PHILO_OT_final_render,
    ui_panels.PHILO_OT_render_snapshot,
    ui_panels.PHILO_OT_adjust_camera,
    ui_panels.PHILO_OT_set_viewport_shading,
    ui_panels.PHILO_OT_assign_material_to_selected,
    ui_panels.PHILO_PT_main_panel,
    ui_panels.PHILO_PT_settings_panel,
    ui_panels.PHILO_PT_camera_panel,
    ui_panels.PHILO_PT_material_panel,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()