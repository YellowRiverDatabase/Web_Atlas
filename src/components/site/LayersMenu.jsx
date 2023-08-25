import { useRecoilState } from "recoil";
import { isLayersMenuState } from "./globalState";
import { RadioBtn } from "./RadioBtn";

export function LayersMenu() {
  const [isLayersMenu, setIsLayersMenu] = useRecoilState(isLayersMenuState);

  return (
    <div className="menu-right">
      <div>
        <RadioBtn
          value={"layers"}
          checked={false}
          onChange={() => console.log("I'm clicked")}
          label={"Layers"}
        />
      </div>
      <button onClick={() => setIsLayersMenu(false)}>Close</button>
    </div>
  );
}
