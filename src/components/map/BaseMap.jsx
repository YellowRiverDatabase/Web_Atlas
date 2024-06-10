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
  tableHeaderState,
  viewState,
  visibilityState,
} from "../site/globalState";
import { OceansLayer } from "./OceansLayer";
import { Map } from "react-map-gl";
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
import "mapbox-gl/dist/mapbox-gl.css";

function capitalizeWords(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
  const [tableHeader, setTableHeader] = useRecoilState(tableHeaderState);

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
        map
        layers={[
          // Tiles(),
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
            console.log(e.object.events);
            // console.log(e.object.placepinyin);
            setTableData(e.object.events);
            setTableHeader(capitalizeWords(e.object.ch_pinyin));
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
            return `${object.ch_pinyin} (${object.ft_id}): ${
              object.events.length
            } events from ${formatDate(
              min(
                object.events
                  .map((a) =>
                    Object.values(a)
                      .flat()
                      .map((b) => b.en_date_start)
                  )
                  .flat(),
                (c) => c
              )
            )} to ${formatDate(
              max(
                object.events
                  .map((a) =>
                    Object.values(a)
                      .flat()
                      .map((b) => b.en_date_start)
                  )
                  .flat(),
                (c) => c
              )
            )}`;
          }
        }}
      >
        <Map
          reuseMaps
          mapStyle={"mapbox://styles/nkmwicz123/clsg57t6903gi01p27znh5t4s"}
          // mapStyle="mapbox://styles/nkmwicz123/clsg5aqky03gr01pb30cmebxd"
          preventStyleDiffing={true}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <MyTable /> <Filter />
    </>
  );
}
