"""
Simple test script to demonstrate furniture swapping
Run this in Blender's Text Editor
"""

import bpy
import sys
import os

# Add the addon path to sys.path
addon_path = os.path.join(os.path.dirname(__file__))
if addon_path not in sys.path:
    sys.path.append(addon_path)

# Import and run the basic swapper
import furniture_swapper_demo

# Clear the scene first
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Set up basic lighting
light = bpy.data.lights.new(name="Sun", type='SUN')
light_obj = bpy.data.objects.new(name="Sun", object_data=light)
light_obj.location = (5, 5, 10)
light_obj.rotation_euler = (0.6, 0.2, 0)
bpy.context.collection.objects.link(light_obj)

# Add a simple floor
bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, 0))
floor = bpy.context.active_object
floor.name = "Floor"

# Set up camera
camera_data = bpy.data.cameras.new(name="Camera")
camera_obj = bpy.data.objects.new("Camera", camera_data)
camera_obj.location = (5, -5, 5)
camera_obj.rotation_euler = (1.1, 0, 0.785)
bpy.context.collection.objects.link(camera_obj)
bpy.context.scene.camera = camera_obj

# Register the furniture swapper if not already registered
try:
    furniture_swapper_demo.register()
except:
    pass

# Create a furniture slot for the table
swapper = bpy.context.scene.furniture_swapper
slot = swapper.create_furniture_slot("Table_Slot", location=(0, 0, 0.5))

# Load table-1 first
print("Loading table-1...")
swapper.swap_furniture("Table_Slot", "tables", 0)

# Function to swap tables with delay
def swap_tables_demo():
    """Demonstrate swapping between table-1 and table-2"""
    import time
    
    print("\n=== Furniture Swapping Demo ===")
    print("Swapping to table-1...")
    swapper.swap_furniture("Table_Slot", "tables", 0)
    
    # In real usage, you'd have a UI button instead of sleep
    print("(In real app, user would click a button to swap)")
    
    print("Swapping to table-2...")
    swapper.swap_furniture("Table_Slot", "tables", 1)
    
    print("\nDemo complete! Use the Philo panel in the sidebar to swap furniture.")

# Run the demo
swap_tables_demo()

print("\n=== How to use: ===")
print("1. Press 'N' to open the sidebar")
print("2. Look for the 'Philo' tab")
print("3. Use the dropdown to select different tables")
print("4. Click 'Swap' to change the furniture")
print("\nFor Redecor-style pre-rendering:")
print("- Run multiple renders with different furniture")
print("- Store renders as images")
print("- Show images in UI for instant preview")