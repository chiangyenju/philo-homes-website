"""Smart furniture placement rules for realistic room layouts"""

import math
import random
from .expert_interior_design import ExpertInteriorLayout

class PlacementRules:
    """Defines smart placement rules for different furniture types"""
    
    @staticmethod
    def get_sofa_placement(room_size):
        """Get optimal sofa placement - against back wall, facing camera/center"""
        return {
            "positions": [
                {"pos": (0, -room_size/2 + 0.9), "rot": 0},  # Back wall, facing camera
                {"pos": (-room_size/2 + 0.9, -1), "rot": math.pi/2},  # Left wall, facing right
                {"pos": (room_size/2 - 0.9, -1), "rot": -math.pi/2},  # Right wall, facing left
            ],
            "priority": 1
        }
    
    @staticmethod
    def get_coffee_table_placement(sofa_position, sofa_rotation):
        """Place coffee table in front of sofa"""
        # Calculate offset based on sofa rotation
        if abs(sofa_rotation) < 0.1:  # Facing forward
            offset = (0, 1.2)
        elif sofa_rotation > math.pi/4:  # Facing right
            offset = (1.2, 0)
        else:  # Facing left
            offset = (-1.2, 0)
        
        return {
            "positions": [
                {"pos": (sofa_position[0] + offset[0], sofa_position[1] + offset[1]), "rot": sofa_rotation}
            ],
            "priority": 2
        }
    
    @staticmethod
    def get_side_table_placement(room_size, occupied_positions):
        """Place side table near seating or in strategic positions"""
        positions = []
        
        # First, try next to sofa if it exists
        for pos in occupied_positions:
            if "sofa" in pos.get("type", ""):
                sofa_pos = pos["position"]
                positions.extend([
                    {"pos": (sofa_pos[0] - 1.5, sofa_pos[1]), "rot": 0},
                    {"pos": (sofa_pos[0] + 1.5, sofa_pos[1]), "rot": 0},
                    {"pos": (sofa_pos[0] - 1.2, sofa_pos[1] + 0.5), "rot": 0},
                    {"pos": (sofa_pos[0] + 1.2, sofa_pos[1] + 0.5), "rot": 0},
                ])
        
        # Then add corner and wall positions
        positions.extend([
            {"pos": (-room_size/2 + 0.5, -room_size/2 + 0.5), "rot": 0},
            {"pos": (room_size/2 - 0.5, -room_size/2 + 0.5), "rot": 0},
            {"pos": (0, 0), "rot": 0},  # Center as fallback
            {"pos": (-1, -1), "rot": 0},  # Off-center positions
            {"pos": (1, -1), "rot": 0},
        ])
        
        return {
            "positions": positions,
            "priority": 3
        }
    
    @staticmethod
    def get_painting_placement(room_size):
        """Place paintings only on back wall facing camera at eye level"""
        return {
            "positions": [
                {"pos": (0, -room_size/2 + 0.1), "rot": 0, "height": 1.5},  # Back wall center only
            ],
            "priority": 4
        }
    
    @staticmethod
    def get_pot_placement(room_size, occupied_positions):
        """Place decorative pots in corners or empty spaces"""
        positions = [
            {"pos": (-room_size/2 + 0.4, -room_size/2 + 0.4), "rot": 0},
            {"pos": (room_size/2 - 0.4, -room_size/2 + 0.4), "rot": 0},
            {"pos": (-room_size/2 + 0.4, room_size/2 - 0.4), "rot": 0},
            {"pos": (room_size/2 - 0.4, room_size/2 - 0.4), "rot": 0},
            {"pos": (-1.5, -room_size/2 + 0.5), "rot": 0},  # More positions
            {"pos": (1.5, -room_size/2 + 0.5), "rot": 0},
        ]
        
        return {
            "positions": positions,
            "priority": 5
        }
    
    @staticmethod
    def get_shelf_placement(room_size):
        """Place shelves against walls"""
        return {
            "positions": [
                {"pos": (-room_size/4, -room_size/2 + 0.2), "rot": 0},  # Back wall left
                {"pos": (room_size/4, -room_size/2 + 0.2), "rot": 0},   # Back wall right
                {"pos": (-room_size/2 + 0.2, -room_size/4), "rot": math.pi/2},  # Left wall
                {"pos": (room_size/2 - 0.2, -room_size/4), "rot": -math.pi/2},  # Right wall
            ],
            "priority": 6
        }
    
    @staticmethod
    def get_rug_placement(room_size, sofa_position=None):
        """Place rug under sofa seating area"""
        if sofa_position:
            return {
                "positions": [
                    {"pos": (sofa_position[0], sofa_position[1] + 0.8), "rot": 0, "height": 0.01}  # Slightly in front of sofa
                ],
                "priority": 2  # Place right after sofa
            }
        else:
            return {
                "positions": [
                    {"pos": (0, -1), "rot": 0, "height": 0.01}  # Default center-back position
                ],
                "priority": 2
            }

class SmartLayoutGenerator:
    """Generates smart furniture layouts using placement rules"""
    
    def __init__(self, room_size=6):
        self.room_size = room_size
        self.placed_items = []
        self.rules = PlacementRules()
    
    def generate_layout(self, furniture_list):
        """Generate a smart layout for the given furniture using expert fixed positions"""
        layout = []
        
        # Get expert layout positions
        expert_positions = ExpertInteriorLayout.get_expert_layout()
        furniture_mapping = ExpertInteriorLayout.get_furniture_mapping()
        
        # Debug output
        print(f"\nProcessing {len(furniture_list)} furniture items:")
        for f in furniture_list:
            print(f"  - {f}")
        
        # Process each furniture item
        for furniture_file in furniture_list:
            # Map furniture file to layout key
            layout_key = furniture_mapping.get(furniture_file)
            print(f"\nMapping {furniture_file} -> {layout_key}")
            
            if layout_key and layout_key in expert_positions:
                expert_pos = expert_positions[layout_key]
                
                # Create placement from expert position
                placement = {
                    "file": furniture_file,
                    "position": expert_pos["position"],
                    "rotation": expert_pos["rotation"],
                    "type": layout_key
                }
                
                layout.append(placement)
                self.placed_items.append(placement)
                print(f"  ✓ Placed at expert position {expert_pos['position']}")
            else:
                print(f"  ✗ WARNING: No expert position for {furniture_file} (key: {layout_key})")
        
        # Ensure we have all essential items
        essential_count = sum(1 for item in layout if item["type"] in ["sofa", "coffee_table", "side_table"])
        print(f"Layout complete with {len(layout)} items ({essential_count} essential furniture pieces)")
        
        return layout
    
    def _categorize_furniture(self, furniture_list):
        """Categorize furniture by type"""
        categories = {}
        
        for furniture in furniture_list:
            if "sofa" in furniture.lower():
                categories.setdefault("sofa", []).append(furniture)
            elif "table-2" in furniture.lower():
                categories.setdefault("coffee_table", []).append(furniture)
            elif "table-1" in furniture.lower():
                categories.setdefault("side_table", []).append(furniture)
            elif "painting" in furniture.lower():
                categories.setdefault("painting", []).append(furniture)
            elif "pot" in furniture.lower():
                categories.setdefault("pot", []).append(furniture)
            elif "shelf" in furniture.lower():
                categories.setdefault("shelf", []).append(furniture)
            elif "rug" in furniture.lower():
                categories.setdefault("rug", []).append(furniture)
        
        return categories
    
    def _place_sofa(self, furniture_file):
        """Place sofa using smart rules"""
        placements = self.rules.get_sofa_placement(self.room_size)
        
        for placement in placements["positions"]:
            if not self._check_collision(placement["pos"], 2.2, 0.9):
                return {
                    "file": furniture_file,
                    "position": (placement["pos"][0], placement["pos"][1], 0),
                    "rotation": (0, 0, placement["rot"]),
                    "type": "sofa"
                }
        return None
    
    def _place_coffee_table(self, furniture_file, sofa_pos, sofa_rot):
        """Place coffee table relative to sofa"""
        placements = self.rules.get_coffee_table_placement(sofa_pos, sofa_rot)
        
        for placement in placements["positions"]:
            if not self._check_collision(placement["pos"], 1.2, 0.6):
                return {
                    "file": furniture_file,
                    "position": (placement["pos"][0], placement["pos"][1], 0),
                    "rotation": (0, 0, placement["rot"]),
                    "type": "coffee_table"
                }
        return None
    
    def _place_rug(self, furniture_file, sofa_pos):
        """Place rug under/near sofa"""
        placements = self.rules.get_rug_placement(self.room_size, sofa_pos)
        
        for placement in placements["positions"]:
            # Rugs don't need collision checking as they're on the floor
            return {
                "file": furniture_file,
                "position": (placement["pos"][0], placement["pos"][1], placement["height"]),
                "rotation": (0, 0, placement["rot"]),
                "type": "rug"
            }
        return None
    
    def _place_furniture_by_type(self, furniture_file, furniture_type):
        """Place furniture based on its type"""
        if furniture_type == "side_table":
            placements = self.rules.get_side_table_placement(self.room_size, self.placed_items)
        elif furniture_type == "painting":
            placements = self.rules.get_painting_placement(self.room_size)
        elif furniture_type == "pot":
            placements = self.rules.get_pot_placement(self.room_size, self.placed_items)
        elif furniture_type == "shelf":
            placements = self.rules.get_shelf_placement(self.room_size)
        elif furniture_type == "rug":
            sofa_pos = next((item["position"] for item in self.placed_items if item.get("type") == "sofa"), None)
            placements = self.rules.get_rug_placement(self.room_size, sofa_pos)
        else:
            return None
        
        # Try each placement position
        for i, placement in enumerate(placements["positions"]):
            pos = placement["pos"]
            height = placement.get("height", 0)
            
            # For wall items, don't check collision as strictly
            if furniture_type in ["painting", "shelf"]:
                return {
                    "file": furniture_file,
                    "position": (pos[0], pos[1], height),
                    "rotation": (0, 0, placement["rot"]),
                    "type": furniture_type
                }
            
            # For floor items, check collision but be less strict
            if not self._check_collision(pos, 0.3, 0.3):  # Smaller collision check
                return {
                    "file": furniture_file,
                    "position": (pos[0], pos[1], height),
                    "rotation": (0, 0, placement["rot"]),
                    "type": furniture_type
                }
        
        # If no position worked, force place it with offset
        print(f"Warning: Could not find ideal position for {furniture_type}, placing with offset")
        fallback_pos = (i * 0.8 - 1.5, 0, height)  # Spread items along x-axis
        return {
            "file": furniture_file,
            "position": fallback_pos,
            "rotation": (0, 0, 0),
            "type": furniture_type
        }
    
    def _check_collision(self, position, width, depth):
        """Check if position collides with existing furniture"""
        for item in self.placed_items:
            dist = math.sqrt(
                (position[0] - item["position"][0])**2 + 
                (position[1] - item["position"][1])**2
            )
            if dist < (width + 0.5):  # Minimum spacing
                return True
        return False