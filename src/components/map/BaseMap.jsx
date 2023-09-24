import DeckGL from "@deck.gl/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChinaBorderState,
  riverRoutesState,
  riversState,
  viewState,
  visibilityState,
} from "../site/globalState";
import { OceansLayer } from "./OceansLayer";
import { Map } from "react-map-gl/maplibre";
import { BASEMAP } from "@deck.gl/carto";
import oceans from "../../mymaps/oceans.json";
import { ChinaBorderLayer } from "./ChinaBorder";
import { GeoJsonLayer } from "./GeoJsonLayer";
import { LineLayer } from "./LineLayer";
import { useEffect } from "react";

export function BaseMap() {
  const [view, setView] = useRecoilState(viewState);
  const [visibility, setVisibility] = useRecoilState(visibilityState);
  const [chinaBorders, setChinaBorders] = useRecoilState(ChinaBorderState);
  const [rivers, setRivers] = useRecoilState(riversState);
  const riverRoutes = useRecoilValue(riverRoutesState);

  return (
    <DeckGL
      viewState={{ ...view }}
      style={{
        position: "relative",
      }}
      controller={true}
      onViewStateChange={(e) => {
        setView(e.viewState);
      }}
    >
      <Map
        reuseMaps
        viewState={{ ...viewState }}
        interactive={true}
        // onViewStateChange={(e) => setView(e.viewState)}
        onViewStateChange={(e) => {
          setView(e.viewState);
        }}
        mapStyle={BASEMAP.VOYAGER_NOLABELS}
      >
        <GeoJsonLayer
          visibilityName="China Borders"
          data={chinaBorders}
          setData={setChinaBorders}
          color={"white"}
          url={
            "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/cultural_data/china-borders.geojson"
          }
        />
        <LineLayer
          visibilityName="Rivers"
          data={riverRoutes}
          setData={setRivers}
          url="https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/physical_data/yellow-river-course-changes.geojson"
        />
      </Map>
    </DeckGL>
  );
}
