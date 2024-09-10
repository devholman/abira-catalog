export interface StoreConfig {
  id: number;
  name: string;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  players: { name: string; number: number }[];
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
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  category: Categories;
  orders: {
    id: string;
    quantity: number;
    size: string;
    color: string;
    isAddBack: boolean;
  }[];
}

export enum Categories {
  TSHIRTS = "TSHIRTS",
  HOODIES = "HOODIES",
  DRIFITS = "DRIFITS",
}
