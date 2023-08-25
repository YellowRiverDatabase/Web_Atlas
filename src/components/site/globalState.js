import { atom, selector } from "recoil";

export const viewState = atom({
  key: "viewState",
  default: {
    longitude: 104.195,
    latitude: 35.862,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  },
});

// state for geojson
export const oceansState = atom({
  key: "oceansState",
  default: {},
});

// Menus and Modals
export const isEntryModalState = atom({
  key: "isEntryModalState",
  default: true,
});

export const isLayersMenuState = atom({
  key: "isLayersMenuState",
  default: false,
});

export const isNavMenuState = atom({
  key: "isNavMenuState",
  default: false,
});

export const dynastiesState = atom({
  key: "dynastiesState",
  default: {},
});

export const erasState = atom({
  key: "erasState",
  default: {},
});
