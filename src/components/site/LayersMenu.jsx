import { useRecoilState, useRecoilValue } from "recoil";
import {
  dynastiesState,
  erasState,
  isLayersMenuState,
  visibilityState,
} from "./globalState";
import { RadioBtn } from "./RadioBtn";

export function LayersMenu() {
  const [isLayersMenu, setIsLayersMenu] = useRecoilState(isLayersMenuState);
  const [visibility, setVisibility] = useRecoilState(visibilityState);

  return (
    <div className="menu-right">
      <div>
        {Object.keys(visibility).map((key) => {
          function handleChange(e) {
            setVisibility({ ...visibility, [key]: e.target.checked });
          }
          return (
            <RadioBtn
              key={key}
              value={key}
              label={key}
              checked={visibility[key]}
              onChange={handleChange}
            />
          );
        })}
        {/* <RadioBtn
          value={"layers"}
          checked={visibility.oceans}
          onChange={(e) =>
            setVisibility({ ...visibility, oceans: e.target.checked })
          }
          label={"Oceans"}
        /> */}
      </div>
      <button onClick={() => setIsLayersMenu(false)}>Close</button>
    </div>
  );
}
