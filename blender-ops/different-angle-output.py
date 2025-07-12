import bpy
import math

sofa = bpy.data.objects['Sofa']
camera = bpy.data.objects['Camera']
orientations = {"front": 0, "side": 90, "back": 180}

bpy.context.scene.render.image_settings.file_format = 'PNG'
bpy.context.scene.render.image_settings.color_mode = 'RGBA'

for orientation, angle in orientations.items():
    sofa.rotation_euler[2] = math.radians(angle)  # Rotate around Z-axis
    bpy.context.view_layer.update()  # Update the scene
    output_path = f"/Users/yenju/Desktop/threejs_models/sofa_{orientation}.png"  # Update path
    bpy.context.scene.render.filepath = output_path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered {orientation} to {output_path}")