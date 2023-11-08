import { useEffect, useMemo } from "react";
import { eventsState, filteredEventsState } from "../site/globalState";
import { Marker } from "react-map-gl";
import { useRecoilState, useRecoilValue } from "recoil";
import { DeckGL, ScatterplotLayer } from "deck.gl";
import { colorHash } from "./colorHash";

export function Events() {
  const [events, setEvents] = useRecoilState(eventsState);
  const filtered = useRecoilValue(filteredEventsState);
  useEffect(() => {
    if (events.length === 0) {
      const fetchData = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/relational-datadata/yrdb_events.json"
        );
        const data = await res.json();
        console.log(data);
        setEvents(data);
      };
      fetchData();
    }
  }, []);
  const eventsObject = useMemo(() => {
    return new ScatterplotLayer({
      id: "events-layers",
      data: filtered,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d) => [d.lon, d.lat],
      getRadius: (d) => 20,
      getFillColor: (d) => colorHash[d.en_type],
      getLineColor: (d) => [0, 0, 0],
    });
  }, [filtered]);

  return eventsObject;
}
