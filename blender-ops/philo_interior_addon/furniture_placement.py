"""Smart furniture placement system for Philo Interior Addon"""

import bpy
import bmesh
import random
import math
from mathutils import Vector
from . import config
from . import smart_placement_rules

class FurnitureCatalog:
    """Catalog of available furniture with placement characteristics"""
    
    FURNITURE_DATA = {
        "painting-1.obj": {
            "type": "wall_decor",
            "category": "decor",
            "dimensions": {"width": 1.2, "height": 0.9, "depth": 0.05},
            "scale": 0.6,  # Scale factor for realistic size
            "initial_rotation": (0, 0, 0),  # Based on reference image
            "placement": {
                "zone": "wall",
                "wall_distance": 0.05,  # Very close to wall
                "height": 1.5,  # Eye level
                "orientation": "wall_aligned"
            }
        },
        "pot-1.obj": {
            "type": "floor_decor",
            "category": "decor", 
            "dimensions": {"width": 0.3, "height": 0.6, "depth": 0.3},
            "scale": 0.3,  # Scale down for realistic pot size
            "initial_rotation": (0, 0, 0),  # Based on reference image
            "placement": {
                "zone": "corner",
                "wall_distance": 0.3,
                "height": 0.0,
                "orientation": "fixed"  # No rotation
            }
        },
        "rug-1.obj": {
            "type": "floor_decor",
            "category": "floor_decor",
            "dimensions": {"width": 2.5, "height": 0.02, "depth": 1.8},
            "scale": 1.25,  # Slightly larger
            "initial_rotation": (0, 0, 0),  # Based on reference image
            "placement": {
                "zone": "center",
                "wall_distance": 1.0,
                "height": 0.001,  # Just above floor
                "orientation": "fixed"
            }
        },
        "shelf-1.obj": {
            "type": "storage",
            "category": "storage",
            "dimensions": {"width": 0.8, "height": 1.8, "depth": 0.35},
            "scale": 0.9,  # Realistic shelf size
            "initial_rotation": (0, 0, 0),  # Based on reference image
            "placement": {
                "zone": "wall",
                "wall_distance": 0.02,
                "height": 0.0,
                "orientation": "wall_aligned"
            }
        },
        "sofa-1.obj": {
            "type": "seating",
            "category": "seating",
            "dimensions": {"width": 2.2, "height": 0.85, "depth": 0.9},
            "scale": 1.1,  # Realistic sofa size
            "initial_rotation": (0, 0, 0),  # Correct orientation after -90X fix
            "placement": {
                "zone": "wall",
                "wall_distance": 0.3,
                "height": 0.0,
                "orientation": "wall_aligned"
            }
        },
        "table-1.obj": {
            "type": "side_table",
            "category": "table",
            "dimensions": {"width": 0.5, "height": 0.5, "depth": 0.5},
            "scale": 0.5,  # Smaller scale for realistic side table
            "initial_rotation": (math.pi/2, 0, math.pi/2),  # 90° X rotation + 90° Z rotation
            "placement": {
                "zone": "center",
                "wall_distance": 0.8,
                "height": 0.0,
                "orientation": "fixed"
            }
        },
        "table-2.obj": {
            "type": "coffee_table",
            "category": "table",
            "dimensions": {"width": 1.2, "height": 0.4, "depth": 0.6},
            "scale": 0.7,  # Smaller scale for realistic coffee table
            "initial_rotation": (0, 0, math.pi/2),  # Rotate 90° to fix orientation
            "placement": {
                "zone": "center",
                "wall_distance": 0.8,
                "height": 0.0,
                "orientation": "fixed"
            }
        }
    }
    
    @classmethod
    def get_furniture_info(cls, filename):
        """Get furniture information by filename"""
        return cls.FURNITURE_DATA.get(filename, None)
    
    @classmethod
    def get_all_furniture(cls):
        """Get list of all available furniture"""
        return list(cls.FURNITURE_DATA.keys())

class SmartFurniturePlacement:
    """Smart furniture placement algorithm"""
    
    def __init__(self, room_size=6, wall_height=3.2):
        self.room_size = room_size  # Compact room
        self.wall_height = wall_height
        self.placed_objects = []
        self.floor_bounds = {
            "min_x": -room_size/2 + 0.3,
            "max_x": room_size/2 - 0.3,
            "min_y": -room_size/2 + 0.3,
            "max_y": room_size/2 - 0.3
        }
    
    def generate_random_layout(self, furniture_count=5):
        """Generate a random furniture layout"""
        available_furniture = FurnitureCatalog.get_all_furniture()
        print(f"Available furniture: {available_furniture}")
        
        # Reset placed objects for new generation
        self.placed_objects = []
        
        # Ensure we have at least one sofa, one table, and one decoration
        essential_furniture = []
        
        # Find essential pieces
        sofa = next((f for f in available_furniture if "sofa" in f.lower()), None)
        table = next((f for f in available_furniture if "table" in f.lower()), None)
        decor = next((f for f in available_furniture if "painting" in f.lower() or "pot" in f.lower()), None)
        
        if sofa: essential_furniture.append(sofa)
        if table: essential_furniture.append(table)
        if decor: essential_furniture.append(decor)
        
        print(f"Essential furniture selected: {essential_furniture}")
        
        # Fill remaining slots with random furniture
        remaining_slots = furniture_count - len(essential_furniture)
        remaining_furniture = [f for f in available_furniture if f not in essential_furniture]
        
        if remaining_slots > 0 and remaining_furniture:
            additional = random.sample(remaining_furniture, min(remaining_slots, len(remaining_furniture)))
            essential_furniture.extend(additional)
        
        print(f"Total furniture to place: {essential_furniture}")
        
        # Prioritize placement order
        placement_order = self._get_placement_order(essential_furniture)
        print(f"Placement order: {placement_order}")
        
        layout = []
        for furniture_file in placement_order:
            placement = self._find_optimal_placement(furniture_file)
            if placement:
                layout.append({
                    "file": furniture_file,
                    "position": placement["position"],
                    "rotation": placement["rotation"]
                })
                self.placed_objects.append(placement)
                print(f"Found placement for {furniture_file}")
            else:
                print(f"Could not find valid placement for {furniture_file}")
        
        print(f"Final layout has {len(layout)} items")
        return layout
    
    def _get_placement_order(self, furniture_list):
        """Determine optimal placement order"""
        priority_order = {
            "wall_decor": 1,    # Paintings first
            "storage": 2,       # Shelves second  
            "seating": 3,       # Sofa third
            "table": 4,         # Tables fourth
            "floor_decor": 5    # Decorative items last
        }
        
        def get_priority(filename):
            furniture_info = FurnitureCatalog.get_furniture_info(filename)
            return priority_order.get(furniture_info["category"], 10)
        
        return sorted(furniture_list, key=get_priority)
    
    def _find_optimal_placement(self, furniture_file):
        """Find optimal placement for a piece of furniture"""
        furniture_info = FurnitureCatalog.get_furniture_info(furniture_file)
        if not furniture_info:
            return None
        
        placement_zone = furniture_info["placement"]["zone"]
        
        if placement_zone == "wall":
            return self._place_against_wall(furniture_info)
        elif placement_zone == "corner":
            return self._place_in_corner(furniture_info)
        elif placement_zone == "center":
            return self._place_in_center(furniture_info)
        else:
            return self._place_anywhere(furniture_info)
    
    def _place_against_wall(self, furniture_info):
        """Place furniture against a wall"""
        walls = [
            {"position": (0, -self.room_size/2), "rotation": 0, "normal": (0, 1)},      # Back wall
            {"position": (-self.room_size/2, 0), "rotation": math.pi/2, "normal": (1, 0)}, # Left wall  
            {"position": (self.room_size/2, 0), "rotation": -math.pi/2, "normal": (-1, 0)}, # Right wall
        ]
        
        dims = furniture_info["dimensions"]
        wall_distance = furniture_info["placement"]["wall_distance"]
        height = furniture_info["placement"]["height"]
        
        # Try each wall
        for wall in walls:
            # Calculate position offset from wall
            offset_x = wall["normal"][0] * (wall_distance + dims["depth"]/2)
            offset_y = wall["normal"][1] * (wall_distance + dims["depth"]/2)
            
            position = (
                wall["position"][0] + offset_x,
                wall["position"][1] + offset_y,
                height
            )
            
            # Check if placement is valid
            if self._is_valid_placement(position, dims, wall["rotation"]):
                return {
                    "position": position,
                    "rotation": (0, 0, wall["rotation"]),
                    "dimensions": dims
                }
        
        return None
    
    def _place_in_corner(self, furniture_info):
        """Place furniture in a corner"""
        corners = [
            {"position": (-self.room_size/2 + 0.5, -self.room_size/2 + 0.5), "rotation": math.pi/4},
            {"position": (self.room_size/2 - 0.5, -self.room_size/2 + 0.5), "rotation": -math.pi/4},
            {"position": (-self.room_size/2 + 0.5, self.room_size/2 - 0.5), "rotation": 3*math.pi/4},
        ]
        
        dims = furniture_info["dimensions"]
        height = furniture_info["placement"]["height"]
        
        for corner in corners:
            position = (corner["position"][0], corner["position"][1], height)
            
            if self._is_valid_placement(position, dims, corner["rotation"]):
                return {
                    "position": position,
                    "rotation": (0, 0, corner["rotation"]),
                    "dimensions": dims
                }
        
        return None
    
    def _place_in_center(self, furniture_info):
        """Place furniture in center area"""
        dims = furniture_info["dimensions"]
        height = furniture_info["placement"]["height"]
        orientation = furniture_info["placement"]["orientation"]
        
        # Try multiple center positions
        center_positions = [
            (0, -0.5, height),          # Slightly back from center
            (0.5, 0, height),           # Slightly right
            (-0.5, 0, height),          # Slightly left
            (0, 0.5, height),           # Slightly forward
            (0, 0, height),             # Dead center
        ]
        
        for position in center_positions:
            # Use appropriate rotation based on orientation
            if orientation == "fixed":
                rotation = 0  # No rotation for fixed orientation
            else:
                rotation = random.uniform(0, 2*math.pi)  # Random rotation for others
            
            if self._is_valid_placement(position, dims, rotation):
                return {
                    "position": position,
                    "rotation": (0, 0, rotation),
                    "dimensions": dims
                }
        
        return None
    
    def _place_anywhere(self, furniture_info):
        """Place furniture anywhere valid"""
        dims = furniture_info["dimensions"]
        height = furniture_info["placement"]["height"]
        
        # Try random positions
        for _ in range(20):
            x = random.uniform(self.floor_bounds["min_x"], self.floor_bounds["max_x"])
            y = random.uniform(self.floor_bounds["min_y"], self.floor_bounds["max_y"])
            rotation = random.uniform(0, 2*math.pi)
            
            position = (x, y, height)
            
            if self._is_valid_placement(position, dims, rotation):
                return {
                    "position": position,
                    "rotation": (0, 0, rotation),
                    "dimensions": dims
                }
        
        return None
    
    def _is_valid_placement(self, position, dimensions, rotation):
        """Check if placement is valid (no collisions, within bounds)"""
        # Check room bounds
        half_width = dimensions["width"] / 2
        half_depth = dimensions["depth"] / 2
        
        # Apply rotation to get actual bounds
        cos_r = abs(math.cos(rotation))
        sin_r = abs(math.sin(rotation))
        
        actual_half_x = half_width * cos_r + half_depth * sin_r
        actual_half_y = half_width * sin_r + half_depth * cos_r
        
        # Check bounds with some debug info
        bounds_check = (position[0] - actual_half_x >= self.floor_bounds["min_x"] and
                       position[0] + actual_half_x <= self.floor_bounds["max_x"] and
                       position[1] - actual_half_y >= self.floor_bounds["min_y"] and
                       position[1] + actual_half_y <= self.floor_bounds["max_y"])
        
        if not bounds_check:
            print(f"  Bounds check failed for position {position}")
            return False
        
        # Check collisions with existing objects
        for i, placed_obj in enumerate(self.placed_objects):
            if self._check_collision(position, dimensions, rotation, 
                                   placed_obj["position"], placed_obj["dimensions"], placed_obj["rotation"]):
                print(f"  Collision with object {i} at {placed_obj['position']}")
                return False
        
        return True
    
    def _check_collision(self, pos1, dims1, rot1, pos2, dims2, rot2):
        """Check collision between two objects"""
        # Simple distance-based collision detection
        distance = math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)
        min_distance = max(dims1["width"], dims1["depth"], dims2["width"], dims2["depth"]) / 2 + 0.2  # Smaller safety margin
        
        return distance < min_distance

class FurnitureManager:
    """Manages furniture import and placement in Blender"""
    
    def __init__(self):
        self.models_path = "/Users/yenju/philo-homes-website/blender-ops/3d-models"
        self.placement_system = SmartFurniturePlacement(room_size=6)  # Compact room
    
    def generate_furnished_room(self, furniture_count=6):
        """Generate a complete furnished room"""
        print(f"Generating smart furniture layout for {furniture_count} pieces...")
        
        # Use smart placement instead of random
        smart_generator = smart_placement_rules.SmartLayoutGenerator(room_size=6)
        
        # Get available furniture
        available_furniture = FurnitureCatalog.get_all_furniture()
        
        # Select furniture intelligently
        selected = self._select_furniture_smartly(available_furniture, furniture_count)
        
        # Generate smart layout
        layout = smart_generator.generate_layout(selected)
        print(f"Generated smart layout with {len(layout)} placements")
        
        imported_objects = []
        for i, item in enumerate(layout):
            print(f"\n{'='*50}")
            print(f"Processing item {i+1}/{len(layout)}: {item['file']}")
            print(f"Target position: {item['position']}")
            print(f"Type: {item.get('type', 'unknown')}")
            
            # Import furniture
            obj = self._import_furniture(item["file"])
            if obj:
                print(f"✓ Import successful, got object: {obj.name}")
                
                # Get furniture info for this item
                furniture_info = FurnitureCatalog.get_furniture_info(item["file"])
                if not furniture_info:
                    print(f"WARNING: No furniture info for {item['file']}")
                    continue
                
                # Apply placement with furniture info
                print(f"Applying placement...")
                self._apply_placement(obj, item["position"], item["rotation"], furniture_info)
                imported_objects.append(obj)
                
                # Verify placement
                final_loc = tuple(round(x, 2) for x in obj.location)
                print(f"✓ Placed {item['file']} at {final_loc}")
                
                # Special check for tables
                if "table" in item['file']:
                    print(f"TABLE CHECK: {obj.name} is at {final_loc}, visible={obj.visible_get()}")
            else:
                print(f"✗ Failed to import {item['file']}")
        
        print(f"\nSuccessfully placed {len(imported_objects)} furniture pieces")
        
        # Final verification
        print("\nFinal verification of imported objects:")
        for obj in imported_objects:
            if obj and obj.name in bpy.data.objects:
                print(f"  ✓ {obj.name} exists at {tuple(round(x, 2) for x in obj.location)}")
            else:
                print(f"  ✗ {obj.name if obj else 'None'} is missing from scene!")
        
        return imported_objects
    
    def _select_furniture_smartly(self, available, count):
        """Select all non-repetitive furniture items"""
        selected = []
        
        # Essential furniture that must be included
        essential_items = [
            "sofa-1.obj",      # Always include sofa
            "table-1.obj",     # Side table (replacing coffee table)
            "rug-1.obj",       # Rug under sofa
            "painting-1.obj",  # Painting on back wall
            "pot-1.obj",       # Decorative pot
            "shelf-1.obj"      # Shelf
        ]
        
        # Add all essential items that are available
        for item in essential_items:
            if item in available and len(selected) < count:
                selected.append(item)
        
        print(f"Selected furniture ({len(selected)} items): {selected}")
        print(f"  - Sofa: {'sofa-1.obj' in selected}")
        print(f"  - Side Table: {'table-1.obj' in selected}")
        print(f"  - Rug: {'rug-1.obj' in selected}")
        print(f"  - Painting: {'painting-1.obj' in selected}")
        print(f"  - Pot: {'pot-1.obj' in selected}")
        print(f"  - Shelf: {'shelf-1.obj' in selected}")
        
        return selected
    
    def _import_furniture(self, filename):
        """Import a single furniture piece"""
        import os
        filepath = os.path.join(self.models_path, filename)
        
        print(f"  Attempting to import: {filepath}")
        
        if not os.path.exists(filepath):
            print(f"  WARNING: File not found: {filepath}")
            return None
        
        # Store current objects
        objects_before = set(bpy.context.scene.objects)
        
        # Ensure we're in object mode
        if bpy.context.mode != 'OBJECT':
            bpy.ops.object.mode_set(mode='OBJECT')
        
        # Deselect all objects first
        bpy.ops.object.select_all(action='DESELECT')
        
        # Import the OBJ file
        imported = False
        
        # Method 1: Try with execution context (Blender 4.x)
        try:
            bpy.ops.wm.obj_import('EXEC_DEFAULT', filepath=filepath)
            imported = True
            print(f"  Import successful for {filename}")
        except Exception as e:
            print(f"  Method 1 failed: {e}")
            
            # Method 2: Try without execution context
            try:
                bpy.ops.wm.obj_import(filepath=filepath)
                imported = True
                print(f"  Import successful for {filename} (direct call)")
            except Exception as e2:
                print(f"  Method 2 failed: {e2}")
                
                # Method 3: Try old import method
                try:
                    bpy.ops.import_scene.obj(filepath=filepath)
                    imported = True
                    print(f"  Import successful for {filename} (import_scene.obj)")
                except Exception as e3:
                    print(f"  Method 3 failed: {e3}")
        
        if not imported:
            print(f"  ERROR: All import methods failed for {filename}")
            return None
        
        # Get newly imported objects
        new_objects = set(bpy.context.scene.objects) - objects_before
        if not new_objects:
            print(f"  WARNING: No new objects after import of {filename}")
            return None
        
        print(f"  Found {len(new_objects)} new objects after import")
        
        # Handle multiple objects
        if len(new_objects) > 1:
            print(f"  Multiple objects ({len(new_objects)}) imported for {filename}")
            
            # For tables, don't create parent empty - just return the main mesh
            if "table" in filename.lower():
                # Find the largest mesh object (likely the main table)
                largest_obj = None
                max_verts = 0
                for obj in new_objects:
                    if obj.type == 'MESH' and obj.data and len(obj.data.vertices) > max_verts:
                        max_verts = len(obj.data.vertices)
                        largest_obj = obj
                
                if largest_obj:
                    largest_obj.name = f"Furniture_{filename[:-4]}"
                    print(f"  Using largest mesh as table: {largest_obj.name} ({max_verts} vertices)")
                    
                    # Delete other objects
                    for obj in new_objects:
                        if obj != largest_obj:
                            bpy.data.objects.remove(obj, do_unlink=True)
                    
                    return largest_obj
            
            # For non-tables, create parent empty as before
            bpy.ops.object.empty_add(location=(0, 0, 0))
            parent = bpy.context.active_object
            parent.name = f"Furniture_{filename[:-4]}"
            print(f"  Created parent object: {parent.name}")
            
            for obj in new_objects:
                obj.parent = parent
            
            # Apply coordinate system correction to parent
            self._apply_obj_coordinate_fix(parent)
            return parent
        else:
            obj = list(new_objects)[0]
            old_name = obj.name
            obj.name = f"Furniture_{filename[:-4]}"
            print(f"  Renamed {old_name} to {obj.name}")
            
            # Apply coordinate system correction to single object
            self._apply_obj_coordinate_fix(obj)
            
            # Ensure object still exists after fixes
            if obj.name not in bpy.data.objects:
                print(f"  ERROR: {obj.name} was deleted during import process!")
                return None
                
            return obj
    
    def _apply_obj_coordinate_fix(self, obj):
        """Apply coordinate system correction for OBJ imports"""
        import math
        
        # Store current location
        current_loc = obj.location.copy()
        
        # Different coordinate fixes for different furniture types
        if "table" in obj.name.lower():
            # Tables need minimal rotation - they're usually oriented correctly
            print(f"  Applying minimal coordinate fix for table: {obj.name}")
            # Just ensure they're upright, no Z rotation needed
            obj.rotation_euler.x = 0
            obj.rotation_euler.y = 0  
            obj.rotation_euler.z = 0
        else:
            print(f"  Applying full coordinate fix for: {obj.name}")
            # Other furniture needs full coordinate fix
            # +90° on X to make it stand upright and right-side up
            # +180° on Z to face toward the camera
            obj.rotation_euler.x = math.radians(90)
            obj.rotation_euler.z = math.radians(180)
        
        # Apply transforms to make them permanent
        try:
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.select_all(action='DESELECT')
            obj.select_set(True)
            bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
        except Exception as e:
            print(f"  WARNING: Could not apply transform to {obj.name}: {e}")
        
        # Restore location
        obj.location = current_loc
    
    def _apply_placement(self, obj, position, rotation, furniture_info):
        """Apply position, rotation, and scaling to object"""
        # Apply scale first
        scale_factor = furniture_info.get('scale', 1.0)
        if scale_factor <= 0:
            print(f"  WARNING: Invalid scale {scale_factor}, using 1.0")
            scale_factor = 1.0
            
        obj.scale = (scale_factor, scale_factor, scale_factor)
        print(f"  Applied scale: {scale_factor}")
        
        # Apply scale transform to make it permanent for all furniture
        try:
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.select_all(action='DESELECT')
            obj.select_set(True)
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            print(f"  Scale transform applied to {obj.name}")
        except Exception as e:
            print(f"  WARNING: Could not apply scale transform to {obj.name}: {e}")
        
        # Get initial rotation from furniture info
        initial_rot = furniture_info.get('initial_rotation', (0, 0, 0))
        
        # Combine initial rotation with placement rotation
        final_rotation = (
            initial_rot[0] + rotation[0],
            initial_rot[1] + rotation[1],
            initial_rot[2] + rotation[2]
        )
        
        # Apply the combined rotation
        obj.rotation_euler = final_rotation
        
        # Apply position BEFORE floor positioning
        obj.location = position
        
        # Update to ensure transforms are correct
        bpy.context.view_layer.update()
        
        # Handle positioning based on type
        if furniture_info['type'] == 'wall_decor':
            self._position_on_wall(obj, position, final_rotation)
        elif furniture_info['type'] in ['side_table', 'coffee_table']:
            # Tables need special handling - they import below floor
            print(f"  Fixing table {obj.name} position...")
            self._fix_table_position(obj)
        else:
            # Position on floor for other items
            self._position_on_floor(obj)
        
        bpy.context.view_layer.update()
    
    def _fix_table_position(self, obj):
        """Fix table position - ensure table sits properly on floor"""
        try:
            # Update to get latest transforms
            bpy.context.view_layer.update()
            
            if obj.type == 'MESH' and obj.data:
                # Get the lowest point of the table after all transforms
                obj.data.update()
                lowest_z = min((obj.matrix_world @ v.co).z for v in obj.data.vertices)
                
                # Calculate how much to lift to sit on floor with small buffer
                adjustment = -lowest_z + 0.001  # Small buffer to ensure no sinking
                obj.location.z += adjustment
                
                print(f"  Table {obj.name}: lowest_z={lowest_z:.3f}, adjusted by {adjustment:.3f} to final Z={obj.location.z:.3f}")
            else:
                print(f"  WARNING: {obj.name} is not a mesh, using default table height")
                # Fallback to reasonable table heights if we can't calculate
                if "table-2" in obj.name.lower():  # Coffee table
                    obj.location.z = 0.0
                else:  # Side table
                    obj.location.z = 0.0
                    
        except Exception as e:
            print(f"  ERROR fixing table position for {obj.name}: {e}")
            # Safe fallback
            obj.location.z = 0.0
        
        bpy.context.view_layer.update()
    
    def _position_on_wall(self, obj, position, rotation):
        """Position object on wall (for paintings etc)"""
        # The position already includes the wall placement
        # Just ensure proper orientation
        if obj.type == 'MESH':
            # Rotate to face outward from wall
            obj.rotation_euler = (rotation[0], rotation[1], rotation[2])
    
    def _position_on_floor(self, obj):
        """Position object properly on floor"""
        try:
            # First ensure we have the latest transforms
            bpy.context.view_layer.update()
            
            # Store original Z position
            original_z = obj.location.z
            
            if obj.type == 'EMPTY':
                # Get bounds of all children
                all_vertices = []
                for child in obj.children:
                    if child.type == 'MESH' and child.data:
                        try:
                            # Make sure we get updated vertex positions
                            child.data.update()
                            all_vertices.extend([child.matrix_world @ v.co for v in child.data.vertices])
                        except Exception as e:
                            print(f"  Warning: Could not get vertices from child {child.name}: {e}")
                            
                if all_vertices:
                    lowest_z = min(v.z for v in all_vertices)
                    # Adjust to sit on floor
                    obj.location.z -= lowest_z
                    print(f"  Adjusted {obj.name} Z from {original_z} to {obj.location.z}")
                else:
                    print(f"  No vertices found for {obj.name}, keeping at Z={original_z}")
                    
            elif obj.type == 'MESH' and obj.data:
                try:
                    # Update mesh data after scaling and rotation
                    obj.data.update()
                    bpy.context.view_layer.update()
                    
                    # Get lowest point
                    if obj.data.vertices:
                        lowest_z = min((obj.matrix_world @ v.co).z for v in obj.data.vertices)
                        # Adjust to sit on floor
                        obj.location.z -= lowest_z
                        print(f"  Adjusted {obj.name} Z from {original_z} to {obj.location.z}")
                    else:
                        print(f"  No vertices in {obj.name}, keeping at Z={original_z}")
                except Exception as e:
                    print(f"  Warning: Could not position {obj.name} on floor: {e}")
                    # Keep original position
                    obj.location.z = original_z
            
            # Final update
            bpy.context.view_layer.update()
            
        except Exception as e:
            print(f"  ERROR in _position_on_floor for {obj.name}: {e}")
            # Don't crash, just leave object where it is