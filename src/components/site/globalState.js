import { atom, selector } from "recoil";

export const viewState = atom({
  key: "viewState",
  default: {
    longitude: 104.195,
    latitude: 35.862,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  },
});

export const isEntryModalState = atom({
  key: "isEntryModalState",
  default: true,
});
