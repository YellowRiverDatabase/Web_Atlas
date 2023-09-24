import { Layer, Source } from "react-map-gl";
import { useRecoilValue } from "recoil";
import {
  dynastiesState,
  erasState,
  visibilityState,
} from "../site/globalState";
import { useEffect } from "react";
import { log } from "deck.gl";

export function GeoJsonLayer({ visibilityName, data, setData, url, color }) {
  const visibility = useRecoilValue(visibilityState);
  const dynasties = useRecoilValue(dynastiesState);
  const eras = useRecoilValue(erasState);
  useEffect(() => {
    if (data.length === 0 && visibility[visibilityName] === true) {
      const fetchData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        if (data.features.time) {
          data.feature.start_date = dynasties[data.feature.time][0];
          data.feature.end_date = dynasties[data.feature.time][1];
        }
        setData(data.features);
      };
      fetchData();
    }
  }, [data, visibility[visibilityName]]);
  // console.log(data);
  return (
    <>
      {visibility[visibilityName]
        ? data.map((d, i) => {
            return (
              <Source
                id={visibilityName + i}
                key={d + i}
                type="geojson"
                data={data[i]}
              >
                <Layer
                  id={visibilityName + i}
                  type="fill"
                  source={visibilityName + i}
                  paint={{
                    "fill-color": color || "lightblue",
                    "fill-opacity": 0.4,
                    "fill-outline-color": "black",
                  }}
                />
              </Source>
            );
          })
        : null}
    </>
  );
}
