"""
Enhanced Addon Refresh Script for Philo Interior Design Addon
This script ensures complete reload of all addon modules and UI updates
"""

import bpy
import sys
import importlib
from bpy.app.handlers import persistent

def clear_all_caches():
    """Clear all possible Python caches"""
    import gc
    
    # Clear importlib caches
    importlib.invalidate_caches()
    
    # Force garbage collection
    gc.collect()
    
    # Clear __pycache__ from memory
    for module_name in list(sys.modules.keys()):
        if module_name.startswith('philo_interior_addon'):
            module = sys.modules[module_name]
            if hasattr(module, '__file__') and module.__file__:
                if '__pycache__' in module.__file__:
                    del sys.modules[module_name]

def refresh_philo_addon_complete():
    """Complete refresh of the Philo Interior Design addon"""
    
    addon_name = "philo_interior_addon"
    
    print("=" * 60)
    print("🔄 ENHANCED PHILO ADDON REFRESH")
    print("=" * 60)
    
    # Step 1: Clear any existing handlers
    try:
        bpy.app.handlers.depsgraph_update_post.clear()
        print("✅ Cleared handlers")
    except:
        pass
    
    # Step 2: Disable addon if enabled
    if addon_name in bpy.context.preferences.addons:
        print(f"🔄 Disabling addon: {addon_name}")
        try:
            bpy.ops.preferences.addon_disable(module=addon_name)
            print("✅ Addon disabled successfully")
        except Exception as e:
            print(f"⚠️  Warning during disable: {e}")
    
    # Step 3: Comprehensive module cleanup
    print("🧹 Cleaning up modules...")
    modules_to_remove = []
    for module_name in list(sys.modules.keys()):
        if module_name.startswith(addon_name) or 'philo' in module_name.lower():
            modules_to_remove.append(module_name)
    
    for module_name in modules_to_remove:
        try:
            del sys.modules[module_name]
            print(f"  🗑️  Removed: {module_name}")
        except:
            pass
    
    # Step 4: Clear all caches
    print("🧹 Clearing caches...")
    clear_all_caches()
    
    # Step 5: Force UI refresh
    print("🔄 Refreshing UI...")
    for window in bpy.context.window_manager.windows:
        for area in window.screen.areas:
            area.tag_redraw()
    
    # Step 6: Re-enable addon
    print(f"🔄 Re-enabling addon: {addon_name}")
    try:
        bpy.ops.preferences.addon_enable(module=addon_name)
        print("✅ Addon re-enabled successfully")
    except Exception as e:
        print(f"❌ Failed to re-enable addon: {e}")
        return False
    
    # Step 7: Verify addon is working
    print("🔍 Verifying addon...")
    if addon_name in bpy.context.preferences.addons:
        print("✅ Addon is enabled and ready")
        
        # Check if our classes are registered
        try:
            from philo_interior_addon.ui_panels import PHILO_OT_generate_furnished_room
            print("✅ Core classes verified")
        except ImportError as e:
            print(f"⚠️  Import warning: {e}")
    else:
        print("❌ Addon verification failed")
        return False
    
    # Step 8: Final UI update
    bpy.ops.wm.redraw_timer(type='DRAW_WIN_SWAP', iterations=1)
    
    print("=" * 60)
    print("🎉 ADDON REFRESH COMPLETE!")
    print("   The Philo Homes tab should now show updated functionality.")
    print("   Updated layout: Shelf flush against wall, table-1 in corner")
    print("=" * 60)
    
    return True

# Make the function available in the Text Editor
if __name__ == "__main__":
    refresh_philo_addon_complete()
else:
    # If imported, make function available
    bpy.app.driver_namespace['refresh_philo_addon'] = refresh_philo_addon_complete