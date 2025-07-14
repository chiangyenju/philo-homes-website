# Furniture Model Analysis and Placement Rules

## Overview

This document provides a detailed analysis of the 3D furniture models found in `/blender-ops/3d-models/` and their smart placement characteristics for the Philo Homes AI Room Designer.

## Model Analysis

### 1. **painting-1.obj** - Wall Painting
- **Dimensions**: 2.0m × 1.6m × 0.11m (Width × Height × Depth)
- **Vertices**: 38,283
- **Category**: Wall Decoration
- **Placement Rules**:
  - Must be mounted flush against a wall
  - Optimal height: 1.5m from floor (eye level)
  - Should be centered on wall segments
  - Cannot overlap with other wall-mounted items
  - Recommended scale: 0.5 (resulting in 1m × 0.8m painting)

### 2. **pot-1.obj** - Decorative Pot/Vase
- **Dimensions**: 0.97m × 2.0m × 0.99m (appears to be a tall floor vase)
- **Vertices**: 156,752 (high detail)
- **Category**: Floor Decoration
- **Placement Rules**:
  - Prefers corners but can be placed anywhere
  - Must maintain 10-50cm distance from walls
  - Floor contact required
  - Ideal for empty corners or beside furniture
  - Recommended scale: 0.4 (resulting in 40cm × 80cm pot)

### 3. **rug-1.obj** - Area Rug
- **Dimensions**: 2.0m × 0.055m × 1.4m (flat rectangular rug)
- **Vertices**: 97,934
- **Category**: Floor Covering
- **Placement Rules**:
  - Primary placement: under seating arrangements
  - Can be placed anywhere on floor
  - Other furniture can be placed on top
  - Should extend beyond furniture edges
  - Recommended scale: 1.5 (resulting in 3m × 2.1m rug)

### 4. **shelf-1.obj** - Storage Shelf Unit
- **Dimensions**: 0.62m × 2.0m × 0.36m (tall bookshelf)
- **Vertices**: 62,574
- **Category**: Storage Furniture
- **Placement Rules**:
  - Must be against a wall for stability
  - Maximum 10cm from wall
  - Can be placed in corners
  - Floor contact required
  - No scaling needed (use as-is)

### 5. **sofa-1.obj** - Three-Seater Sofa
- **Dimensions**: 2.0m × 0.70m × 1.55m (standard 3-seater size)
- **Vertices**: 115,820
- **Category**: Seating Furniture
- **Placement Rules**:
  - Typically against a wall but can float
  - 10cm minimum clearance from wall
  - Can be centered in room as divider
  - Pairs well with coffee table
  - No scaling needed (use as-is)

### 6. **table-1.obj** - Round Dining Table
- **Dimensions**: 1.18m diameter × 2.0m height (height includes full scene)
- **Vertices**: 142,549
- **Category**: Dining Furniture
- **Placement Rules**:
  - Prefers center placement
  - Needs 80cm clearance on all sides for chairs
  - Away from walls for circulation
  - Recommended scale: 0.75 (for proper table height)

### 7. **table-2.obj** - Coffee Table
- **Dimensions**: 2.0m × 1.01m × 1.65m (rectangular low table)
- **Vertices**: 120,525
- **Category**: Living Room Furniture
- **Placement Rules**:
  - Place in front of sofa with 40-60cm gap
  - Can be centered on area rug
  - Align with sofa orientation
  - Recommended scale: 0.4 (for coffee table height)

## Smart Placement Algorithm

The placement system uses a confidence-based approach with the following hierarchy:

### 1. Primary Zones
Each furniture piece has a primary preferred zone:
- **Wall**: Paintings, shelves, sofas
- **Corner**: Decorative pots, shelves
- **Center**: Dining tables, coffee tables, rugs
- **Floor**: Rugs, pots
- **Anywhere**: Flexible placement items

### 2. Placement Priority
1. **Wall-mounted items** (paintings) - Fixed position at eye level
2. **Large furniture** (sofas, dining tables) - Define room layout
3. **Complementary furniture** (coffee tables) - Placed relative to primary furniture
4. **Floor coverings** (rugs) - Under furniture groupings
5. **Decorative items** (pots) - Fill empty spaces

### 3. Collision Detection
- Items marked with `avoidOverlap: true` cannot intersect
- Rugs allow furniture placement on top
- Wall items check for vertical overlap
- Floor items check for horizontal overlap

### 4. Distance Rules
- **Wall items**: 0-5cm from wall
- **Storage**: 0-10cm from wall  
- **Seating**: 10-100cm from wall
- **Tables**: 80cm+ from walls (for circulation)
- **Decorative**: 10-50cm from walls

## Usage Example

```typescript
import { furnitureCatalog, calculateOptimalPlacement } from '@/lib/furniture-placement';

// Define a 5m × 4m × 3m room
const room = { width: 5, depth: 4, height: 3 };

// Get sofa model
const sofa = furnitureCatalog.find(f => f.id === 'sofa-1')!;

// Calculate placement suggestions
const suggestions = calculateOptimalPlacement(sofa, room, []);

// Best placement will be against the longest wall
console.log(suggestions[0]);
// { position: { x: 2.5, y: 0, z: 0.1 }, rotation: 0, confidence: 0.9 }
```

## Room Layout Strategy

### Living Room Example
1. Place sofa against main wall
2. Add coffee table 50cm in front of sofa
3. Place rug under both sofa and coffee table
4. Add decorative pot in empty corner
5. Mount painting on opposite wall at eye level

### Dining Room Example
1. Center dining table in room
2. Ensure 80cm clearance on all sides
3. Add shelf unit against wall
4. Place decorative items on shelf
5. Consider rug under dining set

## Technical Considerations

### Model Optimization
- High vertex counts (especially pot-1.obj with 156k vertices)
- Consider LOD (Level of Detail) versions for performance
- Use instancing for repeated items

### Scaling Requirements
- Some models need scaling for realistic proportions
- Coffee table needs 0.4× scale for proper height
- Painting benefits from 0.5× scale for typical rooms
- Rug can be scaled up 1.5× for larger coverage

### Coordinate System
- Y-axis is up (height)
- X-axis is width
- Z-axis is depth
- Origin (0,0,0) is room corner at floor level

## Future Enhancements

1. **Style Matching**: Tag furniture with style attributes (modern, vintage, etc.)
2. **Room Templates**: Pre-defined layouts for common room types
3. **User Preferences**: Learn from user placement choices
4. **Physics Simulation**: Ensure stable, realistic placements
5. **Lighting Considerations**: Place items to optimize natural light