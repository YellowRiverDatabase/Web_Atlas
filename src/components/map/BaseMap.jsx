import DeckGL from "@deck.gl/react";
import { useRecoilState } from "recoil";
import { viewState } from "../site/globalState";
import { OceansLayer } from "./OceansLayer";

export function BaseMap({ children }) {
  const [view, setView] = useRecoilState(viewState);

  return (
    <DeckGL
      viewState={view}
      style={{
        position: "relative",
      }}
      controller={true}
      layers={[OceansLayer()]}
      onViewStateChange={(e) => setView(e.viewState)}
    />
  );
}
