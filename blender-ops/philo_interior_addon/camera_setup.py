"""Camera setup and management module"""

import bpy
import math
from mathutils import Vector
from . import config

class CameraManager:
    def __init__(self):
        self.camera_obj = None
    
    def create_camera(self, name="Interior_Camera"):
        """Create a new camera or get existing one"""
        # Remove existing cameras
        for cam in bpy.data.cameras:
            bpy.data.cameras.remove(cam)
        
        # Create new camera
        cam_data = bpy.data.cameras.new(name)
        self.camera_obj = bpy.data.objects.new(cam_data.name, cam_data)
        bpy.context.scene.collection.objects.link(self.camera_obj)
        bpy.context.scene.camera = self.camera_obj
        
        return self.camera_obj
    
    def setup_camera_preset(self, preset_name, target_obj=None):
        """Apply camera preset settings"""
        if not self.camera_obj:
            self.create_camera()
        
        if preset_name not in config.CAMERA_PRESETS:
            print(f"Unknown preset: {preset_name}")
            return
        
        preset = config.CAMERA_PRESETS[preset_name]
        
        # Set location
        self.camera_obj.location = preset["location"]
        
        # Always look at furniture or room center for better framing
        if target_obj:
            self.look_at_target(target_obj)
        else:
            # Look at room center at furniture height
            self.look_at_point(Vector((0, -1, 1.0)))
        
        # Set camera properties
        self.camera_obj.data.lens = preset["lens"]
        self.camera_obj.data.sensor_width = preset["sensor"]
        self.camera_obj.data.dof.use_dof = True
        self.camera_obj.data.dof.aperture_fstop = preset["fstop"]
        
        # Calculate focus distance
        if target_obj:
            target_loc = self.get_target_center(target_obj)
            self.camera_obj.data.dof.focus_distance = (target_loc - self.camera_obj.location).length
        else:
            self.camera_obj.data.dof.focus_distance = 5.0
        
        print(f"Camera preset '{preset_name}' applied")
    
    def get_target_center(self, target_obj):
        """Get the center point of a target object or group"""
        if target_obj.type == 'EMPTY':
            # Get center of all children
            points = []
            for child in target_obj.children:
                if child.type == 'MESH':
                    bbox = [child.matrix_world @ Vector(corner) for corner in child.bound_box]
                    points.extend(bbox)
            
            if points:
                min_co = Vector((min(p.x for p in points), 
                               min(p.y for p in points), 
                               min(p.z for p in points)))
                max_co = Vector((max(p.x for p in points), 
                               max(p.y for p in points), 
                               max(p.z for p in points)))
                return (min_co + max_co) / 2
        else:
            # Single object
            bbox = [target_obj.matrix_world @ Vector(corner) for corner in target_obj.bound_box]
            min_co = Vector((min(p.x for p in bbox), 
                           min(p.y for p in bbox), 
                           min(p.z for p in bbox)))
            max_co = Vector((max(p.x for p in bbox), 
                           max(p.y for p in bbox), 
                           max(p.z for p in bbox)))
            return (min_co + max_co) / 2
        
        return Vector((0, 0, 1))
    
    def look_at_target(self, target_obj):
        """Point camera at target object"""
        target_loc = self.get_target_center(target_obj)
        self.look_at_point(target_loc)
    
    def look_at_point(self, point):
        """Point camera at specific point"""
        if not self.camera_obj:
            return
        
        direction = point - self.camera_obj.location
        rot_quat = direction.to_track_quat('-Z', 'Y')
        self.camera_obj.rotation_euler = rot_quat.to_euler()
    
    def adjust_for_full_room_view(self):
        """Adjust camera to show entire room"""
        room_size = config.ROOM_SIZE
        wall_height = config.WALL_HEIGHT
        
        # Position camera in corner looking at room center
        self.camera_obj.location = Vector((room_size * 0.7, room_size * 0.7, wall_height * 0.8))
        
        # Look at room center
        room_center = Vector((0, 0, wall_height * 0.4))
        self.look_at_point(room_center)
        
        # Wide angle lens for full room
        self.camera_obj.data.lens = 20
        self.camera_obj.data.dof.aperture_fstop = 8.0  # Deeper depth of field
        self.camera_obj.data.dof.focus_distance = (room_center - self.camera_obj.location).length
    
    def setup_reference_view(self):
        """Setup camera to match the reference image view angle"""
        if not self.camera_obj:
            self.create_camera()
        
        # Position camera similar to reference image - elevated front view
        # The reference shows a straight-on view with slight elevation
        self.camera_obj.location = Vector((0, 4.5, 1.8))  # Front view, slightly elevated
        
        # Look at the center-back area of the room where sofa would be
        target_point = Vector((0, -1.0, 1.2))  # Looking at back wall area at sofa height
        self.look_at_point(target_point)
        
        # Camera settings for reference-style shot
        self.camera_obj.data.lens = 35  # Standard lens for interior photography
        self.camera_obj.data.sensor_width = 36
        self.camera_obj.data.dof.use_dof = True
        self.camera_obj.data.dof.aperture_fstop = 5.6  # Good depth of field
        self.camera_obj.data.dof.focus_distance = (target_point - self.camera_obj.location).length
        
        print("Camera setup for reference image view")

def create_camera_with_full_view(target_obj=None):
    """Quick function to create camera with full room view"""
    cam_manager = CameraManager()
    cam_manager.create_camera()
    cam_manager.setup_camera_preset("full_room", target_obj)
    return cam_manager.camera_obj

def create_camera_with_furniture_focus(target_obj):
    """Quick function to create camera focused on furniture"""
    cam_manager = CameraManager()
    cam_manager.create_camera()
    cam_manager.setup_camera_preset("furniture_focus", target_obj)
    return cam_manager.camera_obj