import { group } from "d3-array";
import { log } from "deck.gl";
import { atom, selector } from "recoil";

export const viewState = atom({
  key: "viewState",
  default: {
    longitude: 109.695,
    latitude: 35.862,
    zoom: 4,
    pitch: 33,
    bearing: 0,
    minZoom: 5,
  },
});

export const yearsState = atom({
  key: "yearsState",
  default: [0, 100],
});

// state for geojson
export const oceansState = atom({
  key: "oceansState",
  default: {},
});

export const isTableState = atom({
  key: "isTableState",
  default: false,
});

export const tableDataState = atom({
  key: "tableDataState",
  default: [],
});

export const tableHeaderState = atom({
  key: "tableHeaderState",
  default: "",
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

export const visibilityState = atom({
  key: "visibilityState",
  default: {
    "Study Area": false,
    Rivers: false,
  },
});

export const sliderWidthState = atom({
  key: "sliderWidthState",
  default: 500,
});

/**
 * state for geojson
 */
export const ChinaBorderState = atom({
  key: "ChinaBorderState",
  default: [],
});

export const StudyBorderState = atom({
  key: "StudyBorderState",
  default: [],
});

export const riversState = atom({
  key: "riverState",
  default: [],
});

export const riverRoutesState = selector({
  key: "riverRoutesState",
  get: ({ get }) => {
    const rivers = get(riversState);
    const [start, end] = get(yearsState);
    // console.log(rivers);
    return rivers.filter((r) => {
      return end > r.properties.yearstart && start < r.properties.yearend;
    });
  },
});

export const studyAreaState = atom({
  key: "studyAreaState",
  default: [],
});

export const eventsState = atom({
  key: "eventsState",
  default: [],
});

export const typesState = atom({
  key: "typesArrayState",
  default: {},
});

export const filteredEventsState = selector({
  key: "filteredEventsState",
  get: ({ get }) => {
    const ev = get(eventsState);
    const [start, end] = get(yearsState);
    const type = get(typesState);
    const type1 = Object.keys(type).filter((t) => type[t]);
    const typeArray = Object.keys(type).filter((t) => type[t]);
    console.log("typeArray", typeArray);
    const updatedEv = ev.map((e) => {
      const parsedEvents = JSON.parse(e.events);
      const eventsArray = parsedEvents.filter((d) => {
        if (typeArray.length === 0) {
          return end > d.en_date_start && start < d.en_date_start;
        }
        if (typeArray.length > 0) {
          return (
            end > d.en_date_start &&
            start < d.en_date_start &&
            typeArray.includes(d.en_type)
          );
        }
      });
      return { ...e, events: eventsArray };
    });
    const filtered = updatedEv.filter((e) => {
      return e.events.length > 0 && e.place_class !== "administrative units";
    });
    return filtered;
  },
});

export const groupedEventsState = selector({
  key: "groupedEventsState",
  get: ({ get }) => {
    const events = get(eventsState);
    const grouped = Array.from(
      group(events, (d) => d.en_date_start),
      ([key, value]) => ({
        date: key,
        events: value,
      })
    );
    // sort grouped by date
    grouped.sort((a, b) => {
      return a.date - b.date;
    });
    console.log(grouped);
    return grouped;
  },
});
