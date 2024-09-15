// stores/storeConfigs.ts
import { Categories, StoreConfig } from "../../_types";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "Silver", "White"];

export const stores: Record<string, StoreConfig> = {
  store1: {
    id: 1,
    name: "Store 1",
    branding: {
      logo: "/store1-logo.png",
      primaryColor: "#ff5733",
      secondaryColor: "#c70039",
    },
    passcode: "s1",
    players: [
      { name: "John Doe", number: 10 },
      { name: "Jane Smith", number: 12 },
      { name: "Mike Johnson", number: 8 },
    ],
    items: [
      {
        id: 1,
        title: "T-Shirt",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 19.99,
        image: "/tshirt.png",
        sizes: ["S", "M", "L", "XL"],
        colors,
        orders: [],
      },
      {
        id: 2,
        title: "Dri-Fit Shirt",
        isCustomizable: false,
        category: Categories.DRIFITS,
        price: 22.99,
        image: "/tshirt.png",
        sizes: ["S", "M", "L", "XL"],
        colors,
        orders: [],
      },
      // More items...
    ],
  },
  renegades: {
    id: 2,
    name: "renegades",
    branding: {
      logo: "",
      primaryColor: "#ffffff",
      secondaryColor: "#39c7c7",
    },
    players: [
      { name: "John Doe", number: 10 },
      { name: "Jane Smith", number: 12 },
      { name: "Mike Johnson", number: 8 },
    ],
    passcode: "s2r",
    items: [
      {
        id: 2,
        title: "Hoodie",
        isCustomizable: true,
        category: Categories.HOODIES,
        price: 39.99,
        image: "ren_sb_shirt_mock.png",
        images: [
          "ren_sb_shirt_mock.png",
          "ren_sb_shirt_mocks.png",
          "ren_sb_shirt_mock.png",
          "ren_sb_shirt_mock.png",
          "ren_sb_shirt_mock.png",
          "ren_sb_shirt_mock.png",
        ],
        sizes,
        colors: [...colors, "Purple"],
        orders: [],
      },
      {
        id: 4,
        title: "Shirt",
        isCustomizable: false,
        category: Categories.HOODIES,
        price: 19.99,
        image: "ren_sb_shirt_mock.png",
        sizes,
        colors: [...colors, "Purple"],
        orders: [],
      },
      {
        id: 3,
        title: "Shirt",
        isCustomizable: true,
        category: Categories.HOODIES,
        price: 19.99,
        image: "ren_sb_shirt_mock.png",
        sizes,
        colors: [...colors, "Purple"],
        orders: [],
      },
      {
        id: 5,
        title: "Shirt",
        isCustomizable: true,
        category: Categories.HOODIES,
        price: 19.99,
        image: "ren_sb_shirt_mock.png",
        sizes,
        colors: [...colors, "Purple"],
        orders: [],
      },
      // More items...
    ],
  },
  // Add more stores as needed...
};
