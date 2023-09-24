import { GeoJsonLayer } from "@deck.gl/layers";
import { memo, useMemo } from "react";
import { useRecoilState } from "recoil";
import { ChinaBorderState } from "../site/globalState";
import { useEffect } from "react";

export function ChinaBorderLayer(visibility) {
  const [chinaBorder, setChinaBorder] = useRecoilState(ChinaBorderState);
  useEffect(() => {
    if (Object.keys(chinaBorder).length === 0) {
      const fetchData = async () => {
        const res = fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/cultural_data/china-borders.geojson"
        );
        const data = await res.json();
        setChinaBorder(data);
      };
      fetchData();
    }
  }, []);
  const oceansObject = useMemo(() => {
    return new GeoJsonLayer({
      id: "china-border",
      data: chinaBorder,
      pickable: false,
      visible: visibility,
      stroked: false,
      extruded: false,
      lineWidthMinPixels: 1,
      getFillColor: [39, 106, 245, 44],
      getLineWidth: 0,
    });
  }, [visibility, ChinaBorderState]);

  return oceansObject;
}
