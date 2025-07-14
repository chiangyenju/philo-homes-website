/**
 * Furniture Placement System for Philo Homes AI Room Designer
 * 
 * This module defines furniture types, their characteristics, and smart placement rules
 * based on analysis of 3D models in the blender-ops/3d-models directory.
 */

export type FurnitureCategory = 'seating' | 'table' | 'storage' | 'decor' | 'floor_decor' | 'wall_decor';
export type PlacementZone = 'floor' | 'wall' | 'corner' | 'center' | 'anywhere';
export type Orientation = 'fixed' | 'rotatable' | 'wall_aligned';

export interface FurnitureDimensions {
  width: number;   // X-axis extent
  height: number;  // Y-axis extent  
  depth: number;   // Z-axis extent
  scale: number;   // Recommended scale factor for room placement
}

export interface PlacementRules {
  primaryZone: PlacementZone;
  secondaryZones: PlacementZone[];
  minDistanceFromWall: number;  // Minimum distance in meters
  maxDistanceFromWall: number;  // Maximum distance in meters
  orientation: Orientation;
  canStack: boolean;
  requiresFloorContact: boolean;
  preferredHeight?: number;     // For wall-mounted items (meters from floor)
  avoidOverlap: boolean;
}

export interface FurnitureModel {
  id: string;
  name: string;
  fileName: string;
  category: FurnitureCategory;
  dimensions: FurnitureDimensions;
  placementRules: PlacementRules;
  tags: string[];
  description: string;
}

/**
 * Furniture catalog with analyzed dimensions and placement rules
 * Dimensions are normalized to approximately real-world scale (meters)
 */
export const furnitureCatalog: FurnitureModel[] = [
  {
    id: 'painting-1',
    name: 'Wall Painting',
    fileName: 'painting-1.obj',
    category: 'wall_decor',
    dimensions: {
      width: 2.003,    // ~2m wide painting
      height: 1.578,   // ~1.6m tall
      depth: 0.113,    // Very thin (wall-mounted)
      scale: 0.5       // Scale down to 1m x 0.8m for typical room
    },
    placementRules: {
      primaryZone: 'wall',
      secondaryZones: [],
      minDistanceFromWall: 0,
      maxDistanceFromWall: 0.05,  // Must be flush with wall
      orientation: 'wall_aligned',
      canStack: false,
      requiresFloorContact: false,
      preferredHeight: 1.5,  // Eye level placement
      avoidOverlap: true
    },
    tags: ['art', 'decoration', 'wall-mounted'],
    description: 'Large wall painting for decoration. Should be centered on wall at eye level.'
  },
  
  {
    id: 'pot-1',
    name: 'Decorative Pot',
    fileName: 'pot-1.obj',
    category: 'decor',
    dimensions: {
      width: 0.973,    // ~1m wide
      height: 1.997,   // ~2m tall (large floor vase)
      depth: 0.994,    // ~1m deep
      scale: 0.4       // Scale to 40cm x 80cm x 40cm
    },
    placementRules: {
      primaryZone: 'corner',
      secondaryZones: ['floor', 'anywhere'],
      minDistanceFromWall: 0.1,
      maxDistanceFromWall: 0.5,
      orientation: 'rotatable',
      canStack: false,
      requiresFloorContact: true,
      avoidOverlap: true
    },
    tags: ['decoration', 'vase', 'plant-holder'],
    description: 'Large decorative pot or vase. Ideal for corners or beside furniture.'
  },
  
  {
    id: 'rug-1',
    name: 'Area Rug',
    fileName: 'rug-1.obj',
    category: 'floor_decor',
    dimensions: {
      width: 1.991,    // ~2m wide
      height: 0.055,   // Very flat (5.5cm thick)
      depth: 1.424,    // ~1.4m deep
      scale: 1.5       // Scale up to 3m x 2.1m for living room
    },
    placementRules: {
      primaryZone: 'center',
      secondaryZones: ['floor'],
      minDistanceFromWall: 0.5,
      maxDistanceFromWall: 10,  // Can be anywhere
      orientation: 'rotatable',
      canStack: false,
      requiresFloorContact: true,
      avoidOverlap: false  // Other furniture can be placed on top
    },
    tags: ['carpet', 'floor-covering', 'textile'],
    description: 'Area rug for floor coverage. Typically placed under seating arrangements.'
  },
  
  {
    id: 'shelf-1',
    name: 'Storage Shelf',
    fileName: 'shelf-1.obj',
    category: 'storage',
    dimensions: {
      width: 0.615,    // ~60cm wide
      height: 1.993,   // ~2m tall
      depth: 0.356,    // ~35cm deep
      scale: 1.0       // Use as-is
    },
    placementRules: {
      primaryZone: 'wall',
      secondaryZones: ['corner'],
      minDistanceFromWall: 0,
      maxDistanceFromWall: 0.1,  // Should be against wall
      orientation: 'wall_aligned',
      canStack: false,
      requiresFloorContact: true,
      avoidOverlap: true
    },
    tags: ['storage', 'bookshelf', 'organizer'],
    description: 'Tall storage shelf unit. Must be placed against a wall for stability.'
  },
  
  {
    id: 'sofa-1',
    name: 'Living Room Sofa',
    fileName: 'sofa-1.obj',
    category: 'seating',
    dimensions: {
      width: 2.000,    // 2m wide (3-seater)
      height: 0.704,   // ~70cm tall (back height)
      depth: 1.550,    // ~1.5m deep
      scale: 1.0       // Use as-is
    },
    placementRules: {
      primaryZone: 'wall',
      secondaryZones: ['center', 'anywhere'],
      minDistanceFromWall: 0.1,
      maxDistanceFromWall: 1.0,  // Can float in room
      orientation: 'rotatable',
      canStack: false,
      requiresFloorContact: true,
      avoidOverlap: true
    },
    tags: ['seating', 'living-room', 'couch'],
    description: 'Three-seater sofa. Typically placed against wall or floating with back to room divider.'
  },
  
  {
    id: 'table-1',
    name: 'Round Dining Table',
    fileName: 'table-1.obj',
    category: 'table',
    dimensions: {
      width: 1.180,    // ~1.2m diameter
      height: 1.998,   // Model height (seems too tall, likely includes full scene)
      depth: 1.178,    // ~1.2m (round table)
      scale: 0.75      // Scale for appropriate table height (~75cm)
    },
    placementRules: {
      primaryZone: 'center',
      secondaryZones: ['anywhere'],
      minDistanceFromWall: 0.8,  // Need space for chairs
      maxDistanceFromWall: 10,   // Can be anywhere
      orientation: 'rotatable',
      canStack: false,
      requiresFloorContact: true,
      avoidOverlap: true
    },
    tags: ['dining', 'round-table', 'furniture'],
    description: 'Round dining table. Requires clearance around all sides for seating.'
  },
  
  {
    id: 'table-2',
    name: 'Coffee Table',
    fileName: 'table-2.obj',
    category: 'table',
    dimensions: {
      width: 2.000,    // 2m wide
      height: 1.012,   // Model height (will scale down)
      depth: 1.649,    // ~1.65m deep
      scale: 0.4       // Scale to coffee table height (~40cm)
    },
    placementRules: {
      primaryZone: 'center',
      secondaryZones: ['floor'],
      minDistanceFromWall: 0.5,
      maxDistanceFromWall: 10,
      orientation: 'rotatable',
      canStack: false,
      requiresFloorContact: true,
      avoidOverlap: true
    },
    tags: ['coffee-table', 'living-room', 'low-table'],
    description: 'Rectangular coffee table. Place in front of sofa with adequate legroom.'
  }
];

/**
 * Smart placement algorithm suggestions
 */
export interface PlacementSuggestion {
  position: { x: number; y: number; z: number };
  rotation: number;  // Y-axis rotation in degrees
  confidence: number; // 0-1 score
  reason: string;
}

/**
 * Get furniture by category
 */
export function getFurnitureByCategory(category: FurnitureCategory): FurnitureModel[] {
  return furnitureCatalog.filter(item => item.category === category);
}

/**
 * Get furniture that can be placed in a specific zone
 */
export function getFurnitureForZone(zone: PlacementZone): FurnitureModel[] {
  return furnitureCatalog.filter(item => 
    item.placementRules.primaryZone === zone || 
    item.placementRules.secondaryZones.includes(zone)
  );
}

/**
 * Calculate optimal placement for furniture in a room
 * @param furniture - The furniture model to place
 * @param roomDimensions - Room dimensions in meters
 * @param existingFurniture - Already placed furniture with positions
 * @returns Array of placement suggestions ranked by confidence
 */
export function calculateOptimalPlacement(
  furniture: FurnitureModel,
  roomDimensions: { width: number; depth: number; height: number },
  existingFurniture: Array<{ model: FurnitureModel; position: { x: number; y: number; z: number }; rotation: number }>
): PlacementSuggestion[] {
  const suggestions: PlacementSuggestion[] = [];
  const rules = furniture.placementRules;
  
  // Base Y position (height)
  const baseY = rules.requiresFloorContact ? 0 : (rules.preferredHeight || 1.5);
  
  // Calculate scaled dimensions
  const scaledWidth = furniture.dimensions.width * furniture.dimensions.scale;
  const scaledDepth = furniture.dimensions.depth * furniture.dimensions.scale;
  
  switch (rules.primaryZone) {
    case 'wall':
      // Try each wall
      const walls = [
        { x: roomDimensions.width / 2, z: rules.minDistanceFromWall, rotation: 0 },    // Back wall
        { x: roomDimensions.width / 2, z: roomDimensions.depth - rules.minDistanceFromWall, rotation: 180 }, // Front wall
        { x: rules.minDistanceFromWall, z: roomDimensions.depth / 2, rotation: 90 },   // Left wall
        { x: roomDimensions.width - rules.minDistanceFromWall, z: roomDimensions.depth / 2, rotation: 270 } // Right wall
      ];
      
      walls.forEach(wall => {
        suggestions.push({
          position: { x: wall.x, y: baseY, z: wall.z },
          rotation: wall.rotation,
          confidence: 0.9,
          reason: `Placed against wall with proper orientation`
        });
      });
      break;
      
    case 'corner':
      // Try each corner
      const corners = [
        { x: scaledWidth / 2 + 0.2, z: scaledDepth / 2 + 0.2 },
        { x: roomDimensions.width - scaledWidth / 2 - 0.2, z: scaledDepth / 2 + 0.2 },
        { x: scaledWidth / 2 + 0.2, z: roomDimensions.depth - scaledDepth / 2 - 0.2 },
        { x: roomDimensions.width - scaledWidth / 2 - 0.2, z: roomDimensions.depth - scaledDepth / 2 - 0.2 }
      ];
      
      corners.forEach(corner => {
        suggestions.push({
          position: { x: corner.x, y: baseY, z: corner.z },
          rotation: 0,
          confidence: 0.95,
          reason: 'Placed in room corner for optimal space usage'
        });
      });
      break;
      
    case 'center':
      // Place in center of room or in front of sofa if present
      const sofa = existingFurniture.find(f => f.model.category === 'seating');
      
      if (sofa && furniture.category === 'table' && furniture.id === 'table-2') {
        // Coffee table in front of sofa
        const sofaFront = {
          x: sofa.position.x,
          z: sofa.position.z + (sofa.rotation === 0 ? 1.2 : -1.2)
        };
        suggestions.push({
          position: { x: sofaFront.x, y: baseY, z: sofaFront.z },
          rotation: sofa.rotation,
          confidence: 0.95,
          reason: 'Placed in front of sofa with matching orientation'
        });
      }
      
      // Center of room
      suggestions.push({
        position: { x: roomDimensions.width / 2, y: baseY, z: roomDimensions.depth / 2 },
        rotation: 0,
        confidence: 0.8,
        reason: 'Centered in room for balanced layout'
      });
      break;
      
    case 'floor':
      // For rugs, place under seating area if exists
      if (furniture.category === 'floor_decor') {
        const seatingArea = existingFurniture.filter(f => f.model.category === 'seating' || 
          (f.model.category === 'table' && f.model.id === 'table-2'));
        
        if (seatingArea.length > 0) {
          // Calculate center of seating area
          const centerX = seatingArea.reduce((sum, f) => sum + f.position.x, 0) / seatingArea.length;
          const centerZ = seatingArea.reduce((sum, f) => sum + f.position.z, 0) / seatingArea.length;
          
          suggestions.push({
            position: { x: centerX, y: 0, z: centerZ },
            rotation: 0,
            confidence: 0.9,
            reason: 'Placed under seating arrangement to define the space'
          });
        }
      }
      break;
  }
  
  // Sort by confidence
  return suggestions.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Check if two furniture items would overlap
 */
export function checkCollision(
  furniture1: FurnitureModel,
  position1: { x: number; z: number },
  furniture2: FurnitureModel,
  position2: { x: number; z: number }
): boolean {
  const scale1 = furniture1.dimensions.scale;
  const scale2 = furniture2.dimensions.scale;
  
  const halfWidth1 = (furniture1.dimensions.width * scale1) / 2;
  const halfDepth1 = (furniture1.dimensions.depth * scale1) / 2;
  const halfWidth2 = (furniture2.dimensions.width * scale2) / 2;
  const halfDepth2 = (furniture2.dimensions.depth * scale2) / 2;
  
  return Math.abs(position1.x - position2.x) < (halfWidth1 + halfWidth2) &&
         Math.abs(position1.z - position2.z) < (halfDepth1 + halfDepth2);
}

/**
 * Validate if a placement is valid according to rules
 */
export function validatePlacement(
  furniture: FurnitureModel,
  position: { x: number; y: number; z: number },
  roomDimensions: { width: number; depth: number; height: number },
  existingFurniture: Array<{ model: FurnitureModel; position: { x: number; y: number; z: number } }>
): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const scaledWidth = furniture.dimensions.width * furniture.dimensions.scale;
  const scaledDepth = furniture.dimensions.depth * furniture.dimensions.scale;
  
  // Check room boundaries
  if (position.x - scaledWidth / 2 < 0 || position.x + scaledWidth / 2 > roomDimensions.width) {
    issues.push('Furniture extends beyond room width');
  }
  if (position.z - scaledDepth / 2 < 0 || position.z + scaledDepth / 2 > roomDimensions.depth) {
    issues.push('Furniture extends beyond room depth');
  }
  
  // Check collisions
  if (furniture.placementRules.avoidOverlap) {
    for (const existing of existingFurniture) {
      if (existing.model.placementRules.avoidOverlap && 
          checkCollision(furniture, position, existing.model, existing.position)) {
        issues.push(`Overlaps with ${existing.model.name}`);
      }
    }
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}