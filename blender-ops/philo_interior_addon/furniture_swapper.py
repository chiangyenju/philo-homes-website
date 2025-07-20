"""
Furniture Swapping Module for Philo Interior Addon
Allows real-time swapping of furniture with pre-rendering capabilities
"""

import bpy
import os
import json
from mathutils import Vector
from .materials import create_material, assign_materials_by_name

class FurnitureSwapperAdvanced:
    """Advanced furniture swapping with material preservation and pre-rendering support"""
    
    def __init__(self):
        self.furniture_variations = {
            "living_room_table": {
                "slot_name": "Table_Center",
                "default_location": (0, -2, 0),
                "options": [
                    {
                        "name": "Modern Glass Table",
                        "file": "table-1.obj",
                        "materials": {"glass": ["top"], "metal": ["legs", "frame"]},
                        "accessories": ["coffee_cups", "magazine"],
                    },
                    {
                        "name": "Wooden Coffee Table", 
                        "file": "table-2.obj",
                        "materials": {"wood": ["*"]},  # * means all parts
                        "accessories": ["plant_pot", "books"],
                    }
                ]
            },
            "sofa": {
                "slot_name": "Sofa_Wall",
                "default_location": (0, 3, 0),
                "options": [
                    {
                        "name": "Modern Sectional",
                        "file": "sofa-1.obj",
                        "materials": {"fabric": ["cushion", "seat"], "metal": ["legs"]},
                        "accessories": ["throw_pillows"],
                    }
                ]
            }
        }
        
        self.accessory_catalog = {
            "coffee_cups": {
                "file": "cup.obj",  # You'd need to add this
                "offset": (0.3, 0, 0.5),
                "materials": {"glass": ["*"]}
            },
            "plant_pot": {
                "file": "pot-1.obj",
                "offset": (0, 0, 0.5),
                "materials": {"plastic": ["pot"], "fabric": ["plant"]}
            },
            "books": {
                "file": "books.obj",  # You'd need to add this
                "offset": (-0.3, 0, 0.5),
                "materials": {"fabric": ["cover"], "wood": ["pages"]}
            }
        }
        
        self.render_cache = {}  # Store pre-rendered views
        
    def swap_furniture_with_materials(self, slot_type, option_index):
        """Swap furniture and automatically apply appropriate materials"""
        if slot_type not in self.furniture_variations:
            return False
            
        variation = self.furniture_variations[slot_type]
        options = variation["options"]
        
        if option_index >= len(options):
            return False
            
        selected_option = options[option_index]
        slot_name = variation["slot_name"]
        
        # Clear existing furniture at this slot
        self._clear_slot(slot_name)
        
        # Load new furniture
        furniture_obj = self._load_furniture(selected_option["file"], slot_name)
        if not furniture_obj:
            return False
            
        # Apply materials based on configuration
        self._apply_configured_materials(furniture_obj, selected_option["materials"])
        
        # Add accessories if specified
        if "accessories" in selected_option:
            self._add_accessories(furniture_obj, selected_option["accessories"])
            
        # Position at slot
        if slot_name in bpy.data.objects:
            slot = bpy.data.objects[slot_name]
            furniture_obj.location = slot.location
        else:
            furniture_obj.location = variation["default_location"]
            
        return True
        
    def _clear_slot(self, slot_name):
        """Remove all furniture at a given slot"""
        objects_to_remove = []
        for obj in bpy.data.objects:
            if obj.get("furniture_slot") == slot_name:
                objects_to_remove.extend([obj] + list(obj.children))
                
        # Remove objects
        for obj in objects_to_remove:
            bpy.data.objects.remove(obj, do_unlink=True)
            
    def _load_furniture(self, filename, slot_name):
        """Load furniture and tag it with slot information"""
        filepath = os.path.join(self._get_models_path(), filename)
        if not os.path.exists(filepath):
            print(f"Model file not found: {filepath}")
            return None
            
        # Import OBJ
        old_objects = set(bpy.data.objects)
        bpy.ops.wm.obj_import(filepath=filepath)
        new_objects = list(set(bpy.data.objects) - old_objects)
        
        if not new_objects:
            return None
            
        # Create parent empty
        parent = bpy.data.objects.new(f"{slot_name}_Furniture", None)
        parent["furniture_slot"] = slot_name
        bpy.context.collection.objects.link(parent)
        
        # Parent imported objects
        for obj in new_objects:
            obj.parent = parent
            obj["furniture_slot"] = slot_name
            
        return parent
        
    def _apply_configured_materials(self, furniture_obj, material_config):
        """Apply materials based on configuration"""
        for material_type, part_patterns in material_config.items():
            material = create_material(material_type)
            
            for child in furniture_obj.children:
                if child.type != 'MESH':
                    continue
                    
                # Check if object name matches any pattern
                for pattern in part_patterns:
                    if pattern == "*" or pattern.lower() in child.name.lower():
                        # Apply material
                        if child.data.materials:
                            child.data.materials[0] = material
                        else:
                            child.data.materials.append(material)
                        break
                        
    def _add_accessories(self, furniture_obj, accessory_list):
        """Add accessories to furniture"""
        for accessory_name in accessory_list:
            if accessory_name not in self.accessory_catalog:
                continue
                
            accessory_data = self.accessory_catalog[accessory_name]
            
            # Load accessory
            acc_obj = self._load_furniture(accessory_data["file"], f"{furniture_obj.name}_acc")
            if not acc_obj:
                continue
                
            # Parent to furniture
            acc_obj.parent = furniture_obj
            
            # Apply offset
            acc_obj.location = Vector(accessory_data["offset"])
            
            # Apply materials
            if "materials" in accessory_data:
                self._apply_configured_materials(acc_obj, accessory_data["materials"])
                
    def _get_models_path(self):
        """Get the path to 3D models"""
        # Try addon preferences first
        if hasattr(bpy.context.preferences.addons.get('philo_interior_addon', None), 'preferences'):
            return bpy.context.preferences.addons['philo_interior_addon'].preferences.models_path
        # Fallback
        return os.path.join(os.path.dirname(os.path.dirname(__file__)), "3d-models")
        
    def pre_render_variations(self, slot_type, output_dir):
        """Pre-render all variations for faster swapping (like Redecor)"""
        if slot_type not in self.furniture_variations:
            return
            
        variation = self.furniture_variations[slot_type]
        options = variation["options"]
        
        # Store current scene state
        current_state = self._save_scene_state()
        
        # Set up render settings for previews
        scene = bpy.context.scene
        scene.render.resolution_x = 1024
        scene.render.resolution_y = 768
        scene.render.film_transparent = True
        
        renders = []
        
        for i, option in enumerate(options):
            # Clear and load furniture
            self.swap_furniture_with_materials(slot_type, i)
            
            # Render
            output_path = os.path.join(output_dir, f"{slot_type}_{i}.png")
            scene.render.filepath = output_path
            bpy.ops.render.render(write_still=True)
            
            renders.append({
                "option_index": i,
                "name": option["name"],
                "render_path": output_path
            })
            
        # Save render catalog
        catalog_path = os.path.join(output_dir, f"{slot_type}_catalog.json")
        with open(catalog_path, 'w') as f:
            json.dump(renders, f, indent=2)
            
        # Restore scene state
        self._restore_scene_state(current_state)
        
        return renders
        
    def _save_scene_state(self):
        """Save current scene state"""
        return {
            "visible_objects": [(obj.name, obj.hide_get()) for obj in bpy.data.objects],
            "active_object": bpy.context.active_object.name if bpy.context.active_object else None
        }
        
    def _restore_scene_state(self, state):
        """Restore scene state"""
        for obj_name, hidden in state["visible_objects"]:
            if obj_name in bpy.data.objects:
                bpy.data.objects[obj_name].hide_set(hidden)
                
        if state["active_object"] and state["active_object"] in bpy.data.objects:
            bpy.context.view_layer.objects.active = bpy.data.objects[state["active_object"]]


# Operator for integration with UI
class FURNITURE_OT_smart_swap(bpy.types.Operator):
    """Smart furniture swapping with material application"""
    bl_idname = "philo.smart_furniture_swap"
    bl_label = "Smart Furniture Swap"
    
    slot_type: bpy.props.StringProperty()
    option_index: bpy.props.IntProperty()
    
    def execute(self, context):
        swapper = FurnitureSwapperAdvanced()
        success = swapper.swap_furniture_with_materials(self.slot_type, self.option_index)
        
        if success:
            self.report({'INFO'}, f"Swapped furniture successfully")
        else:
            self.report({'ERROR'}, "Failed to swap furniture")
            
        return {'FINISHED'}


def register():
    bpy.utils.register_class(FURNITURE_OT_smart_swap)

def unregister():
    bpy.utils.unregister_class(FURNITURE_OT_smart_swap)