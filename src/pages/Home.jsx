import { Slider } from "@mui/base";
import { BaseMap } from "../components/map/BaseMap";
import { EntryModal } from "../components/site/EntryModal";
import { Header } from "../components/site/Header";
import { Main } from "../components/site/Main";
import TimeSlider from "../components/site/TimeSlider";
import { LineChart } from "../components/site/LineChart";
import { useRef } from "react";
import { ModalSources } from "../components/site/ModalSources";
import { LegendMap } from "../components/map/LegendMap";
export function Home() {
  // const sliderRef = useRef();
  return (
    <>
      <Main>
        <Header />
        <LegendMap />
        <BaseMap />
        <EntryModal />
      </Main>
      {/* <TimeSlider /> */}
      <LineChart />
      <ModalSources />
    </>
  );
}
