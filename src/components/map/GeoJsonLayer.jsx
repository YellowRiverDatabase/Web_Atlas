import { Layer, Source } from "react-map-gl";
import { useRecoilValue } from "recoil";
import { visibilityState } from "../site/globalState";
import { useEffect } from "react";

export function GeoJsonLayer({ visibilityName, data, setData, url, color }) {
  const visibility = useRecoilValue(visibilityState);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setData(data.features);
    };
    fetchData();
  }, []);
  return (
    <>
      {visibility[visibilityName]
        ? data.map((d, i) => {
            return (
              <Source id={visibilityName + i} type="geojson" data={data[i]}>
                <Layer
                  id={visibilityName + i}
                  type="fill"
                  source={visibilityName + i}
                  paint={{
                    "fill-color": color || "lightblue",
                    "fill-opacity": 0.8,
                  }}
                />
              </Source>
            );
          })
        : null}
    </>
  );
}
