// stores/storeConfigs.ts
import { Categories, StoreConfig } from "../../_types";
export const DRIFIT = "Dri-Fit (+ $5)";
const youthSizes = ["YS", "YM", "YL", "YXL"];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const allSizes = [...youthSizes, ...sizes];
const colors = ["Black", "Silver", "White"];
const materials = ["Cotton", DRIFIT];
const backMock = "hustleNational/Back_mock.png";
export const stores: Record<string, StoreConfig> = {
  store1: {
    id: 1,
    version: 1,
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
        material: [...materials],
        orders: [],
      },
      {
        id: 2,
        title: "Shirt",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 22.99,
        image: "/tshirt.png",
        sizes: ["S", "M", "L", "XL"],
        colors,
        material: [...materials],
        orders: [],
      },
      // More items...
    ],
  },
  renegades: {
    id: 2,
    version: 1,
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
          { id: 0, imageUrl: "ren_sb_shirt_mock.png", color: "silver" },
          { id: 1, imageUrl: "ren_sb_shirt_mock.png", color: "white" },
          { id: 2, imageUrl: "ren_sb_shirt_mock.png", color: "purple" },
        ],
        sizes,
        colors: [...colors, "Purple"],
        material: [...materials],
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
        material: [...materials],
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
        material: [...materials],
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
        material: [...materials],
        orders: [],
      },
      // More items...
    ],
  },
  hustle: {
    id: 3,
    version: 2,
    name: "HUSTLE",
    branding: {
      logo: "",
      primaryColor: "#ffffff",
      secondaryColor: "#00C0C0",
    },
    players: [
      { name: "Sophia Ramirez", number: 10 },
      { name: "Jane Smith", number: 12 },
      { name: "Mike Johnson", number: 8 },
    ],
    passcode: "national",
    items: [
      {
        id: 1,
        title: "Paint Strokes",
        isCustomizable: true,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "hustleNational/Paint_HN_black.png",
        backImage: backMock,
        images: [
          {
            id: 0,
            imageUrl: "hustleNational/Paint_HN_black.png",
            color: "black",
          },
          {
            id: 1,
            imageUrl: "hustleNational/paint_HN_Silver.png",
            color: "silver",
          },
        ],
        sizes: allSizes,
        colors: ["Black", "Silver"],
        material: [...materials],
        orders: [],
      },
      {
        id: 2,
        title: "Born to Hustle",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "hustleNational/bornToHustle_WhiteTeal_black.png",
        backImage: backMock,
        images: [
          {
            id: 0,
            imageUrl: "hustleNational/bornToHustle_WhiteTeal_black.png",
            color: "black",
          },
          {
            id: 0,
            imageUrl: "hustleNational/bornToHustle_Silver.png",
            color: "silver",
          },
        ],
        sizes,
        colors: ["Black", "Silver"],
        material: [...materials],
        orders: [],
      },
      {
        id: 3,
        title: "Respect Hustle",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "hustleNational/respectTheHustle_silver.png",
        backImage: backMock,
        images: [
          {
            id: 0,
            imageUrl: "hustleNational/respectTheHustle_silver.png",
            color: "silver",
          },
          {
            id: 0,
            imageUrl: "hustleNational/respectTheHustle_black.png",
            color: "black",
          },
        ],
        sizes,
        colors: ["Black", "Silver"],
        material: [...materials],
        orders: [],
      },
    ],
  },
  // Add more stores as needed...
};
