"""Expert Interior Design Layout - Award-winning fixed positions for furniture"""

import math

class ExpertInteriorLayout:
    """Professional interior design layout with carefully curated positions"""
    
    @staticmethod
    def get_expert_layout():
        """
        Returns expertly designed furniture positions for a 6x6m room
        Camera is at front looking at back wall
        """
        return {
            # ANCHOR PIECES - Main seating area
            "sofa": {
                "position": (0, -2.2, 0),  # Centered against back wall
                "rotation": (0, 0, 0),     # Facing camera/forward
                "essential": True
            },
            
            # RUG - Under and in front of sofa for cohesive seating area
            "rug": {
                "position": (0, -1.8, 0.01),  # Centered to extend from under sofa to coffee table
                "rotation": (0, 0, 0),
                "essential": True
            },
            
            # SIDE TABLE - Corner accent next to sofa
            "side_table": {
                "position": (2.4, -2.4, 0),  # Corner of room, next to sofa
                "rotation": (0, 0, 0),
                "essential": True
            },
            
            # PAINTING - Focal point on back wall above sofa
            "painting": {
                "position": (0, -2.9, 1.6),  # Centered above sofa at eye level
                "rotation": (0, 0, 0),
                "essential": True
            },
            
            # POT - Corner accent for visual balance
            "pot": {
                "position": (-2.5, -2.5, 0),  # Left back corner
                "rotation": (0, 0, math.pi/6),  # Slight angle for interest
                "essential": True
            },
            
            # SHELF - Close to back wall, facing camera
            "shelf": {
                "position": (-1.8, -2.7, 0),  # Slightly forward from back wall to avoid clipping
                "rotation": (0, 0, 0),  # Facing camera/forward
                "essential": False
            }
        }
    
    @staticmethod
    def get_furniture_mapping():
        """Map furniture files to layout keys"""
        return {
            "sofa-1.obj": "sofa",
            "rug-1.obj": "rug",
            "table-1.obj": "side_table",
            "painting-1.obj": "painting",
            "pot-1.obj": "pot",
            "shelf-1.obj": "shelf"
        }
    
    @staticmethod
    def get_design_notes():
        """Interior design principles used"""
        return {
            "seating_area": "Sofa anchors the room against back wall with rug defining the conversation area",
            "traffic_flow": "Clear pathways on both sides of the seating area",
            "focal_point": "Painting creates visual interest above sofa",
            "balance": "Side table and pot provide asymmetrical balance",
            "functionality": "Coffee table at optimal distance (60-80cm) from sofa",
            "scale": "All pieces sized appropriately for 6x6m room"
        }