import { useEffect, useMemo } from "react";
import { eventsState, filteredEventsState } from "../site/globalState";
import { Marker } from "react-map-gl";
import { useRecoilState, useRecoilValue } from "recoil";
import { ColumnLayer, DeckGL, ScatterplotLayer } from "deck.gl";
import { colorHash } from "./colorHash";

export function Events() {
  const [events, setEvents] = useRecoilState(eventsState);
  const filtered = useRecoilValue(filteredEventsState);
  useEffect(() => {
    if (events.length === 0) {
      const fetchData = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/relational-datadata/yrdb-places-events.json"
        );
        const data = await res.json();
        console.log(data);
        setEvents(data);
      };
      fetchData();
    }
  }, []);

  const setFillColor = (data) => {
    // return the most frequent occurence in the array
    const frequencyHash = {};
    data.forEach(
      (d) =>
        (frequencyHash[d.en_type] = frequencyHash[d.en_type]
          ? (frequencyHash[d.en_type] += 1)
          : (frequencyHash[d.en_type] = 1))
    );
    const frequentKey = (obj) => {
      return Object.entries(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    };
    const mostFrequent = frequentKey(frequencyHash);
    console.log(mostFrequent[0]);
    return colorHash[mostFrequent[0]];
  };

  const eventsObject = useMemo(() => {
    // const processedData = processData(filtered);
    return new ColumnLayer({
      id: "events-layers",
      extruded: true,
      data: filtered,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radius: 9000,
      elevationScale: 1,
      lineWidthMinPixels: 500,
      getElevation: (d) => {
        return 200 * d.events.length;
      },
      getPosition: (d) => [d.long, d.lat],
      getRadius: (d) => 2000,
      getFillColor: (d) => {
        return setFillColor(d.events);
      },
      getLineColor: (d) => [100, 0, 0],
    });
  }, [filtered]);

  return eventsObject;
}
