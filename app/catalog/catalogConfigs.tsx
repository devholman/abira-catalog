// stores/storeConfigs.ts
import { Categories, StoreConfig } from "../../_types";
export const DRIFIT = "Dri-Fit (+ $5)";
const youthSizes = ["YS", "YM", "YL", "YXL"];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const allSizes = [...youthSizes, ...sizes];
const colors = ["Black", "Silver", "White"];
const renegadeColors = ["Black", "Gray", "Purple"];
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
    passcode: "ren",
    items: [
      {
        id: 2,
        title: "Leopard Fastpitch T-Shirt - Customizable",
        isCustomizable: true,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "renegades/12-purple-leopard-front.png",
        images: [
          {
            id: 2,
            imageUrl: "renegades/12-purple-leopard-front.png",
            color: "purple",
          },
          {
            id: 0,
            imageUrl: "renegades/12-black-leopard-front.png",
            color: "black",
          },
          {
            id: 1,
            imageUrl: "renegades/12-gray-leopard-front.png",
            color: "gray",
          },
        ],
        sizes: allSizes,
        colors: [...renegadeColors],
        material: [...materials],
        orders: [],
      },
      {
        id: 4,
        title: "Traditional TX Softball T-Shirt",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "renegades/1-black-purple-front.png",
        images: [
          {
            id: 0,
            imageUrl: "renegades/1-black-purple-front.png",
            color: "black",
          },
          {
            id: 1,
            imageUrl: "renegades/1-Black-+Purple-Back.png",
            color: "black",
          },
          {
            id: 2,
            imageUrl: "renegades/1-Blue-Purple-front.png",
            color: "teal",
          },
          {
            id: 3,
            imageUrl: "renegades/1-Blue-Purple-Back.png",
            color: "teal",
          },
          {
            id: 4,
            imageUrl: "renegades/1-white-purple-front.png",
            color: "gray",
          },
          {
            id: 5,
            imageUrl: "renegades/1-white-purple-back.png",
            color: "gray",
          },
        ],
        sizes: allSizes,
        colors: ["Black", "Gray", "Teal"],
        material: [...materials],
        orders: [],
      },
      {
        id: 3,
        title: "TX Renegades T-Shirt",
        isCustomizable: false,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "renegades/10-silver-TexRen-front.png",
        images: [
          {
            id: 0,
            imageUrl: "renegades/10-silver-TexRen-front.png",
            color: "gray",
          },
          {
            id: 1,
            imageUrl: "renegades/10-black-TexRen-front.png",
            color: "black",
          },
        ],
        sizes: allSizes,
        colors: ["Black", "Gray"],
        material: [...materials],
        orders: [],
      },
      {
        id: 5,
        title: "TX Renegades Hoodie",
        isCustomizable: false,
        category: Categories.HOODIES,
        price: 30.0,
        image: "renegades/10-black-TexRen-hoodie.png",
        images: [
          {
            id: 0,
            imageUrl: "renegades/10-black-TexRen-hoodie.png",
            color: "black",
          },
        ],
        sizes: allSizes,
        colors: ["Black"],
        material: ["Cotton"],
        orders: [],
      },
      {
        id: 6,
        title: "TX Renegades Crop Hoodie",
        isCustomizable: false,
        category: Categories.HOODIES,
        price: 30.0,
        image: "renegades/10-black-TexRen-crop top hoodie.png",
        images: [
          {
            id: 0,
            imageUrl: "renegades/10-black-TexRen-crop top hoodie.png",
            color: "black",
          },
        ],
        sizes: allSizes,
        colors: ["Black"],
        material: ["Cotton"],
        orders: [],
      },
      {
        id: 7,
        title: "Little Brother Big Fan",
        isCustomizable: true,
        category: Categories.TSHIRTS,
        price: 25.0,
        image: "renegades/11-black-SisBro-front.png",
        images: [
          {
            id: 0,
            imageUrl: "renegades/11-black-SisBro-front.png",
            color: "black",
          },
          {
            id: 1,
            imageUrl: "renegades/11-black-SisBro-front.png",
            color: "black",
          },
        ],
        sizes: allSizes,
        colors: ["Black"],
        material: ["Cotton"],
        orders: [],
      },
      // More items...
    ],
  },
  hustle: {
    id: 3,
    version: 4,
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
        isCustomizable: false,
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
