"""Material creation and assignment module"""

import bpy
import os
from . import config

class MaterialManager:
    def __init__(self):
        self.materials = {}
    
    def create_all_materials(self, fabric_texture_path=None):
        """Create all material types"""
        self.materials["fabric"] = self.create_fabric_material(fabric_texture_path)
        self.materials["leather"] = self.create_leather_material()
        self.materials["wood"] = self.create_wood_material()
        self.materials["metal"] = self.create_metal_material()
        self.materials["glass"] = self.create_glass_material()
        self.materials["plastic"] = self.create_plastic_material()
        return self.materials
    
    def create_fabric_material(self, texture_path=None):
        """Create realistic fabric material"""
        mat = bpy.data.materials.new(name="Premium_Fabric")
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        nodes.clear()
        
        # Setup nodes
        output = nodes.new(type='ShaderNodeOutputMaterial')
        principled = nodes.new(type='ShaderNodeBsdfPrincipled')
        tex_coord = nodes.new(type='ShaderNodeTexCoord')
        mapping = nodes.new(type='ShaderNodeMapping')
        
        # Fabric properties
        principled.inputs['Base Color'].default_value = (0.15, 0.15, 0.18, 1)
        principled.inputs['Roughness'].default_value = 0.8
        principled.inputs['Sheen Weight'].default_value = 0.3
        principled.inputs['Specular IOR Level'].default_value = 0.2
        
        # Texture if available
        if texture_path and os.path.exists(texture_path):
            img_node = nodes.new(type='ShaderNodeTexImage')
            try:
                img_node.image = bpy.data.images.load(texture_path)
                links.new(mapping.outputs['Vector'], img_node.inputs['Vector'])
                links.new(img_node.outputs['Color'], principled.inputs['Base Color'])
            except:
                pass
        
        # Fabric pattern
        noise_tex = nodes.new(type='ShaderNodeTexNoise')
        noise_tex.inputs['Scale'].default_value = 150
        noise_tex.inputs['Detail'].default_value = 16
        
        bump = nodes.new(type='ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.02
        
        # Connect
        links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector'])
        links.new(mapping.outputs['Vector'], noise_tex.inputs['Vector'])
        # Blender 4.x uses 'Factor' instead of 'Fac'
        noise_output = 'Factor' if 'Factor' in noise_tex.outputs else 'Fac'
        links.new(noise_tex.outputs[noise_output], bump.inputs['Height'])
        links.new(bump.outputs['Normal'], principled.inputs['Normal'])
        links.new(principled.outputs['BSDF'], output.inputs['Surface'])
        
        return mat
    
    def create_leather_material(self):
        """Create leather material"""
        mat = bpy.data.materials.new(name="Luxury_Leather")
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        principled = nodes["Principled BSDF"]
        
        # Leather properties
        principled.inputs['Base Color'].default_value = (0.08, 0.05, 0.03, 1)
        principled.inputs['Roughness'].default_value = 0.15
        principled.inputs['Specular IOR Level'].default_value = 0.8
        
        # Leather texture
        noise = nodes.new(type='ShaderNodeTexNoise')
        noise.inputs['Scale'].default_value = 25
        noise.inputs['Detail'].default_value = 5
        
        bump = nodes.new(type='ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.05
        
        # Blender 4.x uses 'Factor' instead of 'Fac'
        noise_output = 'Factor' if 'Factor' in noise.outputs else 'Fac'
        links.new(noise.outputs[noise_output], bump.inputs['Height'])
        links.new(bump.outputs['Normal'], principled.inputs['Normal'])
        
        return mat
    
    def create_wood_material(self):
        """Create wood material"""
        mat = bpy.data.materials.new(name="Premium_Wood")
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        principled = nodes["Principled BSDF"]
        
        # Wood grain
        wave = nodes.new(type='ShaderNodeTexWave')
        wave.inputs['Scale'].default_value = 15
        wave.inputs['Distortion'].default_value = 2
        
        noise = nodes.new(type='ShaderNodeTexNoise')
        noise.inputs['Scale'].default_value = 80
        
        mix = nodes.new(type='ShaderNodeMix')
        mix.data_type = 'RGBA'
        # Blender 4.x uses 'Factor' instead of 'Fac'
        factor_input = 'Factor' if 'Factor' in mix.inputs else 'Fac'
        mix.inputs[factor_input].default_value = 0.3
        
        ramp = nodes.new(type='ShaderNodeValToRGB')
        ramp.color_ramp.elements[0].color = (0.06, 0.03, 0.01, 1)
        ramp.color_ramp.elements[1].color = (0.12, 0.07, 0.03, 1)
        
        principled.inputs['Roughness'].default_value = 0.1
        principled.inputs['Specular IOR Level'].default_value = 0.6
        
        # Blender 4.x uses 'Factor' instead of 'Fac'
        ramp_input = 'Factor' if 'Factor' in ramp.inputs else 'Fac'
        links.new(wave.outputs['Color'], ramp.inputs[ramp_input])
        # Blender 4.x uses 'A' and 'B' instead of 'Color1' and 'Color2'
        color1_input = 'A' if 'A' in mix.inputs else 'Color1'
        color2_input = 'B' if 'B' in mix.inputs else 'Color2'
        links.new(ramp.outputs['Color'], mix.inputs[color1_input])
        links.new(noise.outputs['Color'], mix.inputs[color2_input])
        # Blender 4.x uses 'Result' instead of 'Color' for mix output
        mix_output = 'Result' if 'Result' in mix.outputs else 'Color'
        links.new(mix.outputs[mix_output], principled.inputs['Base Color'])
        
        return mat
    
    def create_metal_material(self):
        """Create metal material"""
        mat = bpy.data.materials.new(name="Brushed_Metal")
        mat.use_nodes = True
        principled = mat.node_tree.nodes["Principled BSDF"]
        
        principled.inputs['Base Color'].default_value = (0.7, 0.7, 0.7, 1)
        principled.inputs['Metallic'].default_value = 1.0
        principled.inputs['Roughness'].default_value = 0.2
        
        return mat
    
    def create_glass_material(self):
        """Create glass material"""
        mat = bpy.data.materials.new(name="Clear_Glass")
        mat.use_nodes = True
        principled = mat.node_tree.nodes["Principled BSDF"]
        
        principled.inputs['Base Color'].default_value = (1, 1, 1, 1)
        principled.inputs['Roughness'].default_value = 0.0
        principled.inputs['Transmission Weight'].default_value = 0.95
        principled.inputs['IOR'].default_value = 1.45
        
        return mat
    
    def create_plastic_material(self):
        """Create plastic material"""
        mat = bpy.data.materials.new(name="Plastic")
        mat.use_nodes = True
        principled = mat.node_tree.nodes["Principled BSDF"]
        
        principled.inputs['Base Color'].default_value = (0.5, 0.5, 0.5, 1)
        principled.inputs['Roughness'].default_value = 0.4
        principled.inputs['Specular IOR Level'].default_value = 0.5
        
        return mat

def assign_materials_by_name(obj, materials):
    """Intelligently assign materials based on object/material slot names"""
    if not obj:
        return
    
    objects_to_process = []
    if obj.type == 'EMPTY' and obj.children:
        objects_to_process = [child for child in obj.children if child.type == 'MESH']
    elif obj.type == 'MESH':
        objects_to_process = [obj]
    
    for mesh_obj in objects_to_process:
        # Get existing material slots
        existing_slots = list(mesh_obj.material_slots)
        
        if existing_slots:
            # Keep existing slots but replace materials
            for slot in existing_slots:
                slot_name = slot.name.lower() if slot.name else ""
                material_assigned = False
                
                # Check each material type's keywords
                for mat_type, keywords in config.MATERIAL_KEYWORDS.items():
                    if any(keyword in slot_name for keyword in keywords):
                        if mat_type in materials:
                            slot.material = materials[mat_type]
                            material_assigned = True
                            print(f"Assigned {mat_type} to slot: {slot.name}")
                            break
                
                # If no keyword match, check object name
                if not material_assigned:
                    obj_name = mesh_obj.name.lower()
                    for mat_type, keywords in config.MATERIAL_KEYWORDS.items():
                        if any(keyword in obj_name for keyword in keywords):
                            if mat_type in materials:
                                slot.material = materials[mat_type]
                                print(f"Assigned {mat_type} to slot: {slot.name} (based on object name)")
                                break
        else:
            # No existing slots, create one based on object name
            mesh_obj.data.materials.clear()
            obj_name = mesh_obj.name.lower()
            
            material_assigned = False
            for mat_type, keywords in config.MATERIAL_KEYWORDS.items():
                if any(keyword in obj_name for keyword in keywords):
                    if mat_type in materials:
                        mesh_obj.data.materials.append(materials[mat_type])
                        material_assigned = True
                        print(f"Created material slot with {mat_type} for: {mesh_obj.name}")
                        break
            
            # Default to fabric if no match
            if not material_assigned:
                mesh_obj.data.materials.append(materials.get("fabric", materials[list(materials.keys())[0]]))
                print(f"Assigned default fabric material to: {mesh_obj.name}")