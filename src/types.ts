// ==============================================
// Sushi Menu App - TypeScript Types
// ==============================================

export type SectionType =
  | 'Bebidas'
  | 'Entradas'
  | 'Cozinha'
  | 'Sushi'
  | 'Sashimi'
  | 'Nigiri'
  | 'Temaki'
  | 'Sushi Rolls'
  | 'Especiais'
  | 'Sobremesas';

export const SECTIONS: SectionType[] = [
  'Bebidas',
  'Entradas',
  'Cozinha',
  'Sushi',
  'Sashimi',
  'Nigiri',
  'Temaki',
  'Sushi Rolls',
  'Especiais',
  'Sobremesas',
];

export interface Ingredient {
  name: string;
  detail?: string;
  icon: string; // path to ingredient icon image
}

export interface MenuItem {
  id: string;
  section: SectionType;
  name: string;
  description: string;
  piecesLabel?: string; // e.g., "(4 peças)"
  price?: number; // only for Bebidas and Sobremesas
  image: string; // path to item image
  origin: string; // brief origin/story text
  ingredients: Ingredient[];
  modelUrl?: string; // URL for GLB/GLTF model
  iosModelUrl?: string; // URL for USDZ model (iOS AR)
}

export interface SectionInfo {
  type: SectionType;
  icon: string; // path to section icon
  heroImage: string; // path to banner hero image
}

// ==============================================
// App Navigation & Cart Types
// ==============================================

export type AppView = 'menu' | 'cart' | 'history';

export interface CartItem {
  itemId: string;
  name: string;
  quantity: number;
  image: string;
  price?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'completed';
}
