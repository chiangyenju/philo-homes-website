import bpy
import os
from mathutils import Vector

class FurnitureSwapper:
    """Handles furniture swapping functionality"""
    
    def __init__(self):
        self.furniture_catalog = {
            "tables": [
                {"name": "Modern Table", "file": "table-1.obj", "type": "table"},
                {"name": "Classic Table", "file": "table-2.obj", "type": "table"},
            ],
            "sofas": [
                {"name": "Contemporary Sofa", "file": "sofa-1.obj", "type": "sofa"},
            ],
            "accessories": [
                {"name": "Potted Plant", "file": "pot-1.obj", "type": "pot"},
            ]
        }
        self.loaded_furniture = {}  # Cache loaded furniture
        self.active_furniture = {}  # Track active furniture per slot
        
    def get_base_path(self):
        """Get the base path for 3D models"""
        # Check if we're running as an addon
        if hasattr(bpy.context.preferences.addons.get('philo_interior_addon'), 'preferences'):
            return bpy.context.preferences.addons['philo_interior_addon'].preferences.models_path
        # Fallback to relative path
        return os.path.join(os.path.dirname(__file__), "3d-models")
        
    def load_furniture(self, furniture_data):
        """Load furniture from OBJ file and cache it"""
        furniture_id = furniture_data["file"]
        
        # Check if already loaded
        if furniture_id in self.loaded_furniture:
            return self.loaded_furniture[furniture_id].copy(linked=False)
            
        # Import OBJ
        filepath = os.path.join(self.get_base_path(), furniture_data["file"])
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            return None
            
        # Store current objects
        old_objects = set(bpy.data.objects)
        
        # Import the OBJ
        bpy.ops.wm.obj_import(filepath=filepath)
        
        # Get newly imported objects
        new_objects = set(bpy.data.objects) - old_objects
        
        if not new_objects:
            return None
            
        # Create a parent empty for the furniture
        parent = bpy.data.objects.new(furniture_data["name"], None)
        bpy.context.collection.objects.link(parent)
        
        # Parent all imported objects to the empty
        for obj in new_objects:
            obj.parent = parent
            # Hide the object initially
            obj.hide_set(True)
            obj.hide_render = True
            
        # Cache the furniture
        self.loaded_furniture[furniture_id] = parent
        
        return parent
        
    def swap_furniture(self, slot_name, furniture_type, furniture_index):
        """Swap furniture at a specific slot"""
        # Get furniture options for this type
        options = self.furniture_catalog.get(furniture_type, [])
        if not options or furniture_index >= len(options):
            return False
            
        furniture_data = options[furniture_index]
        
        # Hide current furniture in this slot
        if slot_name in self.active_furniture:
            old_furniture = self.active_furniture[slot_name]
            self.hide_furniture(old_furniture)
            
        # Load or get cached furniture
        furniture = self.load_furniture(furniture_data)
        if not furniture:
            return False
            
        # Create instance if using cached version
        if furniture in self.loaded_furniture.values():
            # Create a linked duplicate
            new_furniture = furniture.copy()
            new_furniture.data = furniture.data
            bpy.context.collection.objects.link(new_furniture)
            
            # Also duplicate children
            for child in furniture.children:
                new_child = child.copy()
                new_child.data = child.data.copy() if child.data else None
                new_child.parent = new_furniture
                bpy.context.collection.objects.link(new_child)
                
            furniture = new_furniture
            
        # Position furniture at slot location
        if slot_name in bpy.data.objects:
            slot_obj = bpy.data.objects[slot_name]
            furniture.location = slot_obj.location
            furniture.rotation_euler = slot_obj.rotation_euler
            
        # Show the furniture
        self.show_furniture(furniture)
        
        # Update active furniture
        self.active_furniture[slot_name] = furniture
        
        return True
        
    def hide_furniture(self, furniture):
        """Hide furniture and its children"""
        furniture.hide_set(True)
        furniture.hide_render = True
        for child in furniture.children:
            child.hide_set(True)
            child.hide_render = True
            
    def show_furniture(self, furniture):
        """Show furniture and its children"""
        furniture.hide_set(False)
        furniture.hide_render = False
        for child in furniture.children:
            child.hide_set(False)
            child.hide_render = False
            
    def create_furniture_slot(self, name, location=(0, 0, 0)):
        """Create a furniture slot marker"""
        slot = bpy.data.objects.new(name, None)
        slot.empty_display_type = 'CUBE'
        slot.empty_display_size = 0.5
        slot.location = location
        bpy.context.collection.objects.link(slot)
        return slot


# Blender UI Panel
class MESH_PT_furniture_swapper(bpy.types.Panel):
    """Creates a Panel in the 3D viewport N panel"""
    bl_label = "Furniture Swapper"
    bl_idname = "MESH_PT_furniture_swapper"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Philo"
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene
        
        # Furniture slots section
        layout.label(text="Furniture Slots:")
        
        # Table slot
        box = layout.box()
        box.label(text="Living Room Table")
        row = box.row()
        row.prop(scene, "table_selection", text="")
        row.operator("furniture.swap_table", text="Swap")
        
        # Add more slots button
        layout.operator("furniture.create_slot", text="Create Furniture Slot")
        
        # Preview render button
        layout.separator()
        layout.operator("furniture.preview_render", text="Quick Preview Render")


class FURNITURE_OT_swap_table(bpy.types.Operator):
    """Swap table furniture"""
    bl_idname = "furniture.swap_table"
    bl_label = "Swap Table"
    
    def execute(self, context):
        swapper = context.scene.furniture_swapper
        table_index = int(context.scene.table_selection)
        
        # Create slot if it doesn't exist
        if "Table_Slot" not in bpy.data.objects:
            swapper.create_furniture_slot("Table_Slot", location=(0, 0, 0))
            
        # Swap the furniture
        success = swapper.swap_furniture("Table_Slot", "tables", table_index)
        
        if success:
            self.report({'INFO'}, f"Swapped to table {table_index + 1}")
        else:
            self.report({'ERROR'}, "Failed to swap furniture")
            
        return {'FINISHED'}


class FURNITURE_OT_create_slot(bpy.types.Operator):
    """Create a new furniture slot at 3D cursor"""
    bl_idname = "furniture.create_slot"
    bl_label = "Create Furniture Slot"
    
    slot_name: bpy.props.StringProperty(
        name="Slot Name",
        default="Furniture_Slot"
    )
    
    def execute(self, context):
        swapper = context.scene.furniture_swapper
        cursor_loc = context.scene.cursor.location
        swapper.create_furniture_slot(self.slot_name, cursor_loc)
        self.report({'INFO'}, f"Created slot: {self.slot_name}")
        return {'FINISHED'}
    
    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)


class FURNITURE_OT_preview_render(bpy.types.Operator):
    """Quick preview render"""
    bl_idname = "furniture.preview_render"
    bl_label = "Preview Render"
    
    def execute(self, context):
        # Set up quick preview settings
        scene = context.scene
        scene.render.resolution_x = 800
        scene.render.resolution_y = 600
        scene.render.resolution_percentage = 100
        
        # Render
        bpy.ops.render.render('INVOKE_DEFAULT')
        
        return {'FINISHED'}


# Registration
classes = [
    MESH_PT_furniture_swapper,
    FURNITURE_OT_swap_table,
    FURNITURE_OT_create_slot,
    FURNITURE_OT_preview_render,
]

def register():
    # Register classes
    for cls in classes:
        bpy.utils.register_class(cls)
    
    # Add properties
    bpy.types.Scene.furniture_swapper = FurnitureSwapper()
    
    # Table selection enum
    bpy.types.Scene.table_selection = bpy.props.EnumProperty(
        name="Table",
        items=[
            ('0', "Modern Table", "Sleek modern design"),
            ('1', "Classic Table", "Traditional style"),
        ],
        default='0'
    )

def unregister():
    # Unregister classes
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
    
    # Remove properties
    del bpy.types.Scene.furniture_swapper
    del bpy.types.Scene.table_selection

if __name__ == "__main__":
    register()