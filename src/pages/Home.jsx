import { Slider } from "@mui/base";
import { BaseMap } from "../components/map/BaseMap";
import { EntryModal } from "../components/site/EntryModal";
import { Header } from "../components/site/Header";
import { Main } from "../components/site/Main";
import TimeSlider from "../components/site/TimeSlider";
export function Home() {
  return (
    <>
      <Main>
        <Header />

        <BaseMap />
        <EntryModal />
      </Main>
      <TimeSlider />
    </>
  );
}
