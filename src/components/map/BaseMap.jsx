import DeckGL from "@deck.gl/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChinaBorderState,
  riverRoutesState,
  riversState,
  studyAreaState,
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
import { RiversLayer } from "./RiversLayer";

export function BaseMap() {
  const [view, setView] = useRecoilState(viewState);
  const [visibility, setVisibility] = useRecoilState(visibilityState);
  const [chinaBorders, setChinaBorders] = useRecoilState(ChinaBorderState);
  const [rivers, setRivers] = useRecoilState(riversState);
  const [studyarea, setStudyArea] = useRecoilState(studyAreaState);
  const riverRoutes = useRecoilValue(riverRoutesState);

  // console.log(studyarea);

  return (
    <DeckGL
      viewState={{ ...view }}
      style={{
        position: "relative",
      }}
      controller={true}
      layers={[ChinaBorderLayer(visibility), RiversLayer()]}
      onViewStateChange={(e) => {
        setView(e.viewState);
      }}
    >
      <Map
        reuseMaps
        viewState={{ ...viewState }}
        interactive={true}
        // onViewStateChange={(e) => setView(e.viewState)}
        // onViewStateChange={(e) => {
        //   setView(e.viewState);
        // }}
        mapStyle={BASEMAP.VOYAGER_NOLABELS}
      >
        {/* <GeoJsonLayer
          visibilityName="China Borders"
          data={chinaBorders}
          setData={setChinaBorders}
          color={"white"}
          url={
            "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/cultural_data/china-borders.geojson"
          }
        />
        <GeoJsonLayer
          visibilityName="Study Area"
          data={studyarea}
          setData={setStudyArea}
          color={"white"}
          url={
            "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/cultural_data/study-area.geojson"
          }
        />
        <LineLayer
          visibilityName="Rivers"
          data={riverRoutes}
          setData={setRivers}
          url="https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/physical_data/yellow-river-course-changes.geojson"
        /> */}
      </Map>
    </DeckGL>
  );
}
