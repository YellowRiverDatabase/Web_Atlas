import { group } from "d3-array";
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

export const yearsState = atom({
  key: "yearsState",
  default: [0, 100],
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

export const visibilityState = atom({
  key: "visibilityState",
  default: {
    "China Borders": false,
    "Study Area": false,
    Rivers: false,
  },
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

export const filteredEventsState = selector({
  key: "filteredEventsState",
  get: ({ get }) => {
    const events = get(eventsState);
    const [start, end] = get(yearsState);
    return events.filter((e) => {
      return e.en_date_start >= start && e.en_date_start <= end;
    });
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
