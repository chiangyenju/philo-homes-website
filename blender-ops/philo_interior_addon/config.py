"""Configuration settings for Philo Interior Scene Generator"""

import os

# Base paths
PROJECT_ROOT = "/Users/yenju/philo-homes-website"
BLENDER_OPS_PATH = os.path.join(PROJECT_ROOT, "blender-ops")

# Asset files
HDRI_PATH = os.path.join(BLENDER_OPS_PATH, "studio_small_08_4k.exr")
FABRIC_TEXTURE_PATH = os.path.join(BLENDER_OPS_PATH, "texture", "gray-cloth-fabric.png")

# Room dimensions
ROOM_SIZE = 12
WALL_HEIGHT = 3.2

# Camera settings
CAMERA_PRESETS = {
    "full_room": {
        "location": (7, 5, 2.8),
        "rotation": None,  # Auto-calculated for better framing
        "lens": 20,  # Wide angle
        "sensor": 36,
        "fstop": 5.6
    },
    "furniture_focus": {
        "location": (4, 3, 1.8),
        "rotation": None,  # Auto-calculated
        "lens": 35,
        "sensor": 36,
        "fstop": 2.8
    },
    "corner_view": {
        "location": (-5, 5, 2.2),
        "rotation": None,  # Auto-calculated
        "lens": 24,
        "sensor": 36,
        "fstop": 4.0
    }
}

# Viewport settings
VIEWPORT_CLIP_START = 0.1
VIEWPORT_CLIP_END = 1000

# Material keywords for smart assignment
MATERIAL_KEYWORDS = {
    "fabric": ["sofa", "chair", "seat", "cushion", "pillow", "upholstery"],
    "leather": ["leather", "hide", "ottoman"],
    "wood": ["table", "wood", "desk", "shelf", "frame", "cabinet"],
    "metal": ["metal", "leg", "support", "chrome", "steel", "iron"],
    "glass": ["glass", "mirror", "crystal"],
    "plastic": ["plastic", "acrylic", "poly"]
}

# Render settings
RENDER_PRESETS = {
    "preview": {
        "samples": 128,
        "resolution_percentage": 50,
        "denoising": True
    },
    "medium": {
        "samples": 512,
        "resolution_percentage": 75,
        "denoising": True
    },
    "final": {
        "samples": 1024,
        "resolution_percentage": 100,
        "denoising": True
    }
}