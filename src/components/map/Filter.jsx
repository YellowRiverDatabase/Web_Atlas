import { useRecoilState } from "recoil";
import { typesState } from "../site/globalState";
import React from "react";

const filterStyle = {
  position: "absolute",
  // display: "flex",
  // alignContent: "center",
  alignItems: "center",
  top: "10%",
  right: 0,
  zIndex: 1,
  height: "80vh",
  backgroundColor: "rgb(36, 36, 36)",
  padding: "10px",
  color: "black",
};
const typesStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignContent: "center",

  zIndex: 100,
  height: "60vh",
  backgroundColor: "rgb(36, 36, 36)",
  padding: "10px",
  color: "black",
  overflow: "auto",
};

const filterBox = {
  display: "flex",
  flexDirection: "column",
};

const color = {
  backgroundColor: "blue",
  color: "white",
};

const filterHeaderBtn = {
  position: "absolute",
  top: "10%",
  right: "0",
  zIndex: "1",
  height: "75px",
  // backgroundColor: "rgb(36, 36, 36)",
};

const buttonStyle = {
  backgroundColor: "rgb(36, 36, 36)",
  color: "white",
  border: "solid white 1px",
  padding: "5px",
  margin: "15px",
};

export function Filter() {
  const categories = ["Disasters", "Management"];
  const filterRef = React.useRef();

  const [isFilter, setIsFilter] = React.useState(false);

  const types = [
    "Flood",
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
    "Repair of Structures",
    "Emergency Repair",
    "New Construction",
    "Fieldtrip/survey",
  ];

  const filterWidth = filterRef?.current?.offsetWidth;

  const [cats, setCats] = useRecoilState(typesState);

  const openfilter = () => {
    setIsFilter(!isFilter);
  };

  if (isFilter)
    return (
      <>
        <div style={filterStyle} ref={filterRef}>
          <div>
            <h1 style={{ color: "white" }} onClick={openfilter}>
              Filters
            </h1>
          </div>
          <div style={typesStyle}>
            <h3 style={{ color: "white", right: filterWidth }}>Types</h3>
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

  return (
    // <div style={filterStyle} ref={filterRef}>
    <div style={filterHeaderBtn}>
      <button style={buttonStyle} onClick={openfilter}>
        Filters
      </button>
    </div>
    // </div>
  );
}
