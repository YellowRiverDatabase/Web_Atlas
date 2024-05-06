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
          // "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/relational-datadata/yrdb-places-events.json"-and-
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/relational-datadata/yrdb-places-and-events.json"
        );
        const data = await res.json();
        // console.log(data);
        setEvents(data);
      };
      fetchData();
    }
  }, []);

  const setFillColor = (data1) => {
    // return the most frequent occurence in the array
    const data = data1;
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
    // console.log(mostFrequent[0]);
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
        // console.log("from the events", d.events);
        return 300 * d.events.length;
      },
      getPosition: (d) => [d.lon, d.lat],
      getRadius: (d) => 1500,
      getFillColor: (d) => {
        // return setFillColor(d.events);
        return [100, 0, 0];
      },
      getLineColor: (d) => [100, 0, 0],
    });
  }, [filtered]);

  return eventsObject;
}
