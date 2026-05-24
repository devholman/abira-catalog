import { Categories } from "../../../_types";
export const DRIFIT = "Dri-Fit (+ $5)";
const youthSizes = ["YS", "YM", "YL", "YXL"];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const allSizes = [...youthSizes, ...sizes];
export const DEFAULT_PLAYER_NUMBER = "n/a";

export const diamondWarriors = {
  id: 8,
  version: 1,
  name: "DIAMOND WARRIORS",
  localPickupOnly: true,
  branding: {
    logo: "diamondWarriors/logo.png",
    primaryColor: "#ffffff",
    secondaryColor: "#1840CC",
  },
  players: [
    { name: "Miabella Lopez", number: "13" },
    { name: "Gina Hernandez", number: "9" },
    { name: "Rylee Blaylock", number: "5" },
    { name: "Melanie Gonzalez", number: "6" },
    { name: "Alexis Gonzalez", number: "8" },
    { name: "Mady Vega", number: "11" },
    { name: "Avery Alonzo", number: "15" },
    { name: "Alannah Sewell", number: "44" },
    { name: "Nora Rasmussen", number: "22" },
    { name: "Anastasia Puche", number: "28" },
    { name: "Taylor Smith", number: "3" },
    { name: "Emma Christian", number: "18" },
    { name: "Coach Rob", number: "n/a" },
    { name: "Coach Mike", number: "n/a" },
  ],
  passcode: "diamond",
  items: [
    {
      id: 1,
      title: "Diamond Warriors Fan Shirt",
      isCustomizable: true,
      showBackSelection: true,
      category: Categories.TSHIRTS,
      price: 20.0,
      image: "diamondWarriors/dw-jersey-white-front.png",
      backImage: "diamondWarriors/dw-jersey-white-back.png",
      images: [
        {
          id: 0,
          imageUrl: "diamondWarriors/dw-jersey-white-front.png",
          color: "White",
        },
        {
          id: 1,
          imageUrl: "diamondWarriors/dw-jersey-white-front_frontBack.png",
          color: "White",
        },
      ],
      sizes: allSizes,
      colors: ["White"],
      material: ["Cotton", DRIFIT],
      orders: [],
    },
  ],
};
