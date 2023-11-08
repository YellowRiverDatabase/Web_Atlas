import DeckGL from "@deck.gl/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChinaBorderState,
  groupedEventsState,
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
import { Events } from "./Events";
import { Tiles } from "./TileLayer";
import { Marker } from "react-map-gl";
import { formatDate } from "./formatDate";

export function BaseMap() {
  const [view, setView] = useRecoilState(viewState);
  const [visibility, setVisibility] = useRecoilState(visibilityState);
  const [chinaBorders, setChinaBorders] = useRecoilState(ChinaBorderState);
  const [rivers, setRivers] = useRecoilState(riversState);
  const [studyarea, setStudyArea] = useRecoilState(studyAreaState);
  const riverRoutes = useRecoilValue(riverRoutesState);
  const groupedEvents = useRecoilValue(groupedEventsState);
  useEffect(() => {
    console.log(groupedEvents);
  }, [groupedEvents]);

  // console.log(studyarea);

  return (
    <DeckGL
      viewState={{ ...view }}
      style={{
        position: "relative",
      }}
      controller={true}
      layers={[Tiles(), ChinaBorderLayer(visibility), Events(), RiversLayer()]}
      onViewStateChange={(e) => {
        setView(e.viewState);
      }}
      getTooltip={({ object }) => {
        if (object && object.properties) {
          return (
            object.properties.yearstart + " - " + object.properties.yearend
          );
        }
        if (object && !object.properties) {
          return `${object.en_type}: ${formatDate(object.en_date_start)}`;
        }
      }}
    ></DeckGL>
  );
}
