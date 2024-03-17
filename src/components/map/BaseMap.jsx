import DeckGL from "@deck.gl/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChinaBorderState,
  groupedEventsState,
  isTableState,
  riverRoutesState,
  riversState,
  studyAreaState,
  tableDataState,
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
import { useEffect, useMemo } from "react";
import { RiversLayer } from "./RiversLayer";
import { Events } from "./Events";
import { Tiles } from "./TileLayer";
import { Marker } from "react-map-gl";
import { formatDate } from "./formatDate";
import { StudyArea } from "./StudyArea";
import { WebMercatorViewport } from "deck.gl";
import { max, min } from "d3-array";
import { MyTable } from "../site/Table";
import { Filter } from "./Filter";

export function BaseMap() {
  const [view, setView] = useRecoilState(viewState);
  const [visibility, setVisibility] = useRecoilState(visibilityState);
  const [chinaBorders, setChinaBorders] = useRecoilState(ChinaBorderState);
  const [rivers, setRivers] = useRecoilState(riversState);
  const [studyarea, setStudyArea] = useRecoilState(studyAreaState);
  const riverRoutes = useRecoilValue(riverRoutesState);
  const groupedEvents = useRecoilValue(groupedEventsState);
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const [isTable, setIsTable] = useRecoilState(isTableState);
  const [tableHeader, setTableHeader] = useRecoilState(tableDataState);

  useEffect(() => {
    console.log(groupedEvents);
  }, [groupedEvents]);
  // console.log("mapbox access", import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);

  // console.log(studyarea);

  return (
    <>
      <DeckGL
        viewState={{ ...view }}
        style={{
          position: "relative",
        }}
        controller={true}
        layers={[
          Tiles(),
          // ChinaBorderLayer(visibility),
          Events(),
          RiversLayer(),
          StudyArea(),
        ]}
        onViewStateChange={(e) => {
          setView(e.viewState);
        }}
        onClick={(e) => {
          if (e.object && e.object.events) {
            setTableData(JSON.parse(e.object.events));
            setTableHeader(e.object.placepinyin);
            setIsTable(true);
          }
        }}
        getTooltip={({ object }) => {
          if (object && object.properties) {
            return (
              object.properties.yearstart + " - " + object.properties.yearend
            );
          }
          if (object && !object.properties) {
            // console.log(object.events);
            return `${object.placepinyin}: ${
              JSON.parse(object.events).length
            } events from ${formatDate(
              min(object.events, (a) => a.en_date_start)
            )} to ${formatDate(max(object.events, (a) => a.en_date_start))}`;
          }
        }}
      >
        {/* <Map
        reuseMaps
        // mapStyle={"mapbox://styles/nkmwicz123/clsg57t6903gi01p27znh5t4s"}
        // mapStyle="mapbox://styles/nkmwicz123/clsg5aqky03gr01pb30cmebxd"
        mapStyle="mapbox://styles/nkmwicz/cl0tn8k16000r14s2xbgesv75"
        preventStyleDiffing={true}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      /> */}
      </DeckGL>
      <MyTable /> <Filter />
    </>
  );
}
