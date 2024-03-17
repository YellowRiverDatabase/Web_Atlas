import { useRecoilState } from "recoil";
import { typesState } from "../site/globalState";

const filterStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: "white",
  padding: "10px",
  color: "black",
};

const filterBox = {
  display: "flex",
  flexDirection: "column",
};

const color = {
  backgroundColor: "blue",
  color: "white",
};

export function Filter() {
  const categories = ["Disasters", "Management"];

  const types = [
    "Flood",
    "Disasters",
    "Drought",
    "Intentional Breach",
    "Risky situation",
    "Omen",
    "Course change",
    "Extinction",
    "Blockage",
    "Proposals and Discussion",
    "Settlement Relocation",
    "Movement of refugeess",
    "Dam/Sluice Opening",
    "Dredging",
    "Using water for a purpose",
    "Management",
    "Repair of Structures",
    "Emergency Repair",
    "New Construction",
    "Fieldtrip/survey",
  ];

  const [cats, setCats] = useRecoilState(typesState);

  return (
    <>
      <div style={filterStyle}>
        <div>
          <h1>Filter</h1>
        </div>
        <div style={filterStyle}>
          <h3>Types</h3>
          <div>
            {types.map((type, i) => (
              <button
                type="radio"
                id={type}
                style={cats[type] ? color : null}
                value={type}
                key={`type-${i}`}
                onClick={() => {
                  setCats({ ...cats, [type]: !cats[type] });
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
