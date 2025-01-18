import { Categories } from "../../../_types";
export const DRIFIT = "Dri-Fit (+ $5)";
const youthSizes = ["YS", "YM", "YL", "YXL"];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const allSizes = [...youthSizes, ...sizes];
const materials = ["Cotton", DRIFIT];
const backMock = "reign/SHIRTBACK.png";
export const DEFAULT_PLAYER_NUMBER = "n/a";
export const coach = { name: "Coach", number: DEFAULT_PLAYER_NUMBER };
export const cinco = {
  id: 4,
  version: 1,
  name: "CINCO RANCH",
  branding: {
    logo: "",
    primaryColor: "#ffffff",
    secondaryColor: "#5c0a15",
  },
  passcode: "cinco",
  players: [
    // { name: "Aria Etuk", number: "17" },
    // { name: "Mya Bhutani", number: "12" },
    // { name: "Charlotte Bean", number: "10" },
    // { name: "Ainsley Elledge", number: "1" },
    // { name: "Coach", number: "n/a" },
  ],
  items: [
    {
      id: 1,
      title: "Varsity Shirt",
      isCustomizable: false,
      category: Categories.TSHIRTS,
      showBackSelection: true,
      backOptionPrice: 0,
      price: 25.0,
      image: "cinco-Ranch/VarsityShirt.png",
      backImage: backMock,
      images: [
        {
          id: 0,
          imageUrl: "cinco-Ranch/VarsityShirt.png",
          color: "Maroon",
        },
        {
          id: 1,
          imageUrl: "cinco-Ranch/Varsity-Back-and-Front.png",
          color: "Maroon",
        },
      ],
      sizes: allSizes,
      colors: ["Maroon"],
      material: ["Dri-Fit"],
      orders: [],
    },
    {
      id: 2,
      title: "Junior Varsity Shirt",
      isCustomizable: false,
      category: Categories.TSHIRTS,
      showBackSelection: true,
      backOptionPrice: 0,
      price: 25.0,
      image: "cinco-Ranch/JuniorVarsityShirt.png",
      backImage: backMock,
      images: [
        {
          id: 0,
          imageUrl: "cinco-Ranch/JuniorVarsityShirt.png",
          color: "Gray",
        },
        {
          id: 1,
          imageUrl: "cinco-Ranch/JV-Back-and-Front.png",
          color: "Gray",
        },
      ],
      sizes: allSizes,
      colors: ["Gray"],
      material: ["Dri-Fit"],
      orders: [],
    },
    {
      id: 3,
      title: "Varsity Long Sleeve Shirt",
      isCustomizable: false,
      category: Categories.LONG_SLEEVE,
      showBackSelection: true,
      backOptionPrice: 0,
      price: 25.0,
      image: "cinco-Ranch/Vasity-Long-Sleeve.png",
      backImage: backMock,
      images: [
        {
          id: 0,
          imageUrl: "cinco-Ranch/Vasity-Long-Sleeve.png",
          color: "Maroon",
        },
        {
          id: 1,
          imageUrl: "cinco-Ranch/Vasity-back-and-front-Long-Sleeve.png",
          color: "Maroon",
        },
      ],
      sizes: allSizes,
      colors: ["Maroon"],
      material: ["Dri-Fit"],
      orders: [],
    },
    {
      id: 4,
      title: "Junior Varsity Long Sleeve Shirt",
      isCustomizable: false,
      category: Categories.LONG_SLEEVE,
      showBackSelection: true,
      backOptionPrice: 0,
      price: 25.0,
      image: "cinco-Ranch/JV-Long-Sleeve.png",
      backImage: backMock,
      images: [
        {
          id: 0,
          imageUrl: "cinco-Ranch/JV-Long-Sleeve.png",
          color: "Gray",
        },
        {
          id: 1,
          imageUrl: "cinco-Ranch/JV-back-and-front-Long-Sleeve.png",
          color: "Gray",
        },
      ],
      sizes: allSizes,
      colors: ["Gray"],
      material: ["Dri-Fit"],
      orders: [],
    },
  ],
};
