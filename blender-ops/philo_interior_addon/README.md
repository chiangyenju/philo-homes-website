# Philo Homes Interior Scene Generator Addon

A modular Blender addon for creating photorealistic interior scenes with imported furniture models.

## Installation

1. Copy the entire `philo_interior_addon` folder to your Blender addons directory:
   - Windows: `%APPDATA%\Blender Foundation\Blender\4.0\scripts\addons\`
   - macOS: `~/Library/Application Support/Blender/4.0/scripts/addons/`
   - Linux: `~/.config/blender/4.0/scripts/addons/`

2. In Blender, go to Edit > Preferences > Add-ons
3. Search for "Philo Homes Interior Scene Generator"
4. Enable the addon

## Features

### 1. Smart Furnished Room Generation (NEW!)
- **Automatic Furniture Placement**: Randomly places furniture in intelligent locations based on type
- **Smart Layout Algorithm**: Sofas against walls, tables in center, decorative items in corners
- **Compact Room Design**: 6x6 meter room optimized for home-like proportions
- **Reference View Camera**: Matches the provided reference image angle

### 2. Multiple Camera Views
The addon includes multiple camera presets:
- **Reference View**: Matches your provided reference image (elevated front view)
- **Full Room**: Shows the entire room from a corner angle
- **Furniture Focus**: Close-up view of the furniture
- **Corner View**: Alternative corner perspective

### 3. Smart Material Assignment
The addon automatically detects and assigns materials based on:
- Furniture type (seating, tables, storage, decor)
- Object names and material slot names
- Keywords like "sofa", "pillow", "table", "metal", etc.

### 4. Photorealistic Rendering
- **Enhanced Cycles Settings**: Optimized bounce limits, caustics, and denoising
- **Professional Lighting**: HDRI environment with key and fill lights
- **Color Management**: Filmic tone mapping for realistic look

### 5. Modular Structure
- `config.py`: Easy customization of paths, dimensions, and presets
- `materials.py`: Material creation and assignment logic
- `camera_setup.py`: Camera management with presets
- `scene_generator.py`: Main scene generation logic
- `furniture_placement.py`: Smart furniture placement algorithms (NEW!)
- `ui_panels.py`: Blender UI panels and operators

## Usage

### Smart Furnished Room Generation (Recommended)
1. In the 3D Viewport, look for the "Philo Homes" tab in the sidebar (press N if hidden)
2. Click "Generate Furnished Room (Smart)"
3. Adjust furniture count (3-7 pieces) and render quality
4. The addon will automatically:
   - Create a compact 6x6m room
   - Place furniture intelligently based on type
   - Apply appropriate materials
   - Set camera to reference view angle
   - Configure photorealistic render settings

### Manual Scene Generation
1. Click "Generate Scene (Import Model)" for single furniture import
2. Select your furniture model (.obj or .fbx)
3. Choose camera view and render quality

### Rendering Options
- **Quick Preview**: Fast 128-sample render for testing
- **Final Render**: High-quality 1024-sample render
- **Snapshot (Reference View)**: Renders from the reference image angle

### Camera Controls
Switch between different camera angles:
- Reference View (matches your reference image)
- Full Room, Furniture Focus, Corner views

### Material Customization
Edit `config.py` to add material keywords:
```python
MATERIAL_KEYWORDS = {
    "fabric": ["sofa", "chair", "cushion", "pillow"],
    "leather": ["leather", "ottoman"],
    # Add more as needed
}
```

## Customization

### Changing Room Dimensions
Edit `config.py`:
```python
ROOM_SIZE = 12  # Room width/depth in meters
WALL_HEIGHT = 3.2  # Wall height in meters
```

### Adding Camera Presets
Edit `config.py`:
```python
CAMERA_PRESETS = {
    "my_preset": {
        "location": (x, y, z),
        "rotation": (rx, ry, rz),  # or None for auto
        "lens": 24,
        "sensor": 36,
        "fstop": 2.8
    }
}
```

## Tips

1. **Material Slots**: Name your material slots descriptively (e.g., "sofa_fabric", "pillow_fabric", "table_wood")
2. **Object Names**: Use descriptive object names for better material assignment
3. **Performance**: Use "Preview" quality for testing, "Final" for production renders
4. **Assets**: Place HDRI and texture files in the configured paths for best results