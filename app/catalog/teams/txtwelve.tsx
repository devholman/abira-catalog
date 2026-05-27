import { Categories } from "../../../_types";
export const DRIFIT = "Dri-Fit (+ $5)";
const youthSizes = ["YS", "YM", "YL", "YXL"];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const allSizes = [...youthSizes, ...sizes];
export const DEFAULT_PLAYER_NUMBER = "n/a";

export const txTwelve = {
  id: 9,
  version: 1,
  name: "Texas Twelve 10U Maroon Katy",
  branding: {
    logo: "",
    primaryColor: "#ffffff",
    secondaryColor: "#7B1728",
  },
  passcode: "txtwelve",
  localPickupOnly: true,
  players: [
    { name: "Kathryn Schmidt-Pena", number: "1" },
    { name: "Emma Schoeneberg", number: "5" },
    { name: "Faith Piper", number: "6" },
    { name: "Ariel Segovia", number: "7" },
    { name: "Elle Wallace", number: "8" },
    { name: "Gianna Campise", number: "9" },
    { name: "Lindsey Deleon", number: "10" },
    { name: "Sydni Vandeventer", number: "12" },
    { name: "Audrey Ramirez", number: "13" },
    { name: "Madison Rosario", number: "14" },
    { name: "Savannah Henningson", number: "15" },
    { name: "Sophie Hassall", number: "16" },
    { name: "Gaby Perez", number: "20" },
    { name: "Kaylee Barnett", number: "25" },
    { name: "Ossie Coulte", number: "32" },
    { name: "Coach", number: "n/a" },
  ],
  items: [
    {
      id: 1,
      title: "Texas Twelve Fan Shirt",
      isCustomizable: false,
      showBackSelection: false,
      isBackRequired: false,
      category: Categories.TSHIRTS,
      price: 25.0,
      image: "txtwelve/txtwelve-black-frontBack.png",
      images: [
        {
          id: 0,
          imageUrl: "txtwelve/txtwelve-black-frontBack.png",
          color: "Black",
        },
      ],
      sizes: allSizes,
      colors: ["Black"],
      material: ["Dri-Fit"],
      orders: [],
    },
  ],
};
