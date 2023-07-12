import { BaseMap } from "../components/map/BaseMap";
import { Borders } from "../components/map/Borders";
import { EntryModal } from "../components/site/EntryModal";
import { Header } from "../components/site/Header";
import { Main } from "../components/site/Main";
export function Home() {
  return (
    <Main>
      <Header />
      <BaseMap />
      <EntryModal />
    </Main>
  );
}
