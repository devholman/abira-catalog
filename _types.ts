export interface StoreConfig {
  id: number;
  version: number;
  name: string;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  players: { name: string; number: string }[];
  passcode: string;
  items: StoreItem[];
}

export interface Item {
  id: number;
  title: string;
  price: number;
  image: string;
  sizes: string[];
  selectedSize: string;
  selectedQuantity: number;
  category: Categories;
  orders: {
    id: string;
    quantity: number;
    size: string;
    color: string;
    isAddBack: boolean;
  }[];
}

export interface CartItem {
  id: number;
  title: string;
  selectedSize: string;
  price: number;
  orders: [];
}
export interface StoreItem {
  id: number;
  title: string;
  isCustomizable: boolean;
  price: number;
  image: string;
  backImage?: string;
  images?: { id: number; imageUrl: string; color: string }[];
  sizes: string[];
  colors: string[];
  material: string[];
  category: Categories;
  orders: {
    id: string;
    quantity: number;
    size: string;
    color: string;
    material: string;
    isAddBack: boolean;
    notes: string;
    playerName: string;
    playerNumber: number;
    productImage?: string;
    orderPrice: number;
  }[];
}

export enum Categories {
  ALL = "ALL",
  TSHIRTS = "TSHIRTS",
  HOODIES = "HOODIES",
}
