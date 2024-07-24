import { useRecoilState } from "recoil";
import { typesState } from "../site/globalState";
import React, { useEffect } from "react";

const filterStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "center",
  top: "12%",
  right: "10px",
  zIndex: 2,
  height: "60vh",
  backgroundColor: "white",
  padding: "10px",
  color: "black",
  border: "1px solid black",
  borderRadius: "10px",
};
const typesStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "center",
  width: "100%",
  overflow: "auto",
};

const toggleStyle = {
  backgroundColor: "lightgrey",
  color: "black",
  border: "solid black 1px",
  padding: "5px",
  borderRadius: "5px",
};

const categoriesBox = {
  display: "flex",
  flexDirection: "row",
  gap: "1em",
  alignItems: "center",
  justifyContent: "center",
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
  backgroundColor: "white",
  color: "black",
  border: "solid black 1px",
  padding: "5px",
  margin: "15px",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "0",
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

  const [disastersState, setDisastersState] = React.useState(false);
  const [managementState, setManagementState] = React.useState(false);

  useEffect(() => {
    if (managementState === true) {
      setCats({
        ...cats,
        "Proposals and Discussion": true,
        "Settlement Relocation": true,
        "Movement of refugeess": true,
        "Dam/Sluice Opening": true,
        Dredging: true,
        "Using water for a purpose": true,
        "Repair of Structures": true,
        "Emergency Repair": true,
        "New Construction": true,
        "Fieldtrip/survey": true,
      });
      return;
    }

    if (managementState === false) {
      setCats({
        ...cats,
        "Proposals and Discussion": false,
        "Settlement Relocation": false,
        "Movement of refugeess": false,
        "Dam/Sluice Opening": false,
        Dredging: false,
        "Using water for a purpose": false,
        "Repair of Structures": false,
        "Emergency Repair": false,
        "New Construction": false,
        "Fieldtrip/survey": false,
      });
      return;
    }
  }, [managementState]);

  useEffect(() => {
    if (disastersState === true) {
      setCats({
        ...cats,
        Flood: true,
        Drought: true,
        "Intentional Breach": true,
        "Risky situation": true,
        Omen: true,
        "Course change": true,
        Extinction: true,
        Blockage: true,
      });
      return;
    }
    if (disastersState === false) {
      setCats({
        ...cats,
        Flood: false,
        Drought: false,
        "Intentional Breach": false,
        "Risky situation": false,
        Omen: false,
        "Course change": false,
        Extinction: false,
        Blockage: false,
      });
      return;
    }
  }, [disastersState]);

  const setDisasters = () => {
    setDisastersState(!disastersState);
  };

  const setManagement = () => {
    setManagementState(!managementState);
  };

  if (isFilter)
    return (
      <>
        <div style={filterStyle} ref={filterRef}>
          <div>
            <h3 onClick={openfilter}>Filter Types</h3>
          </div>
          <button style={closeBtn} onClick={openfilter}>
            <strong>&times;</strong>
          </button>
          <div style={categoriesBox}>
            <button
              type="button"
              id="disasters"
              onClick={setDisasters}
              style={
                disastersState
                  ? { ...toggleStyle, ...color }
                  : { ...toggleStyle }
              }
            >
              Disasters
            </button>
            <button
              type="button"
              onClick={setManagement}
              style={managementState ? color : null}
            >
              Management
            </button>
          </div>
          <div style={typesStyle}>
            {types.map((type, i) => (
              <button
                type="button"
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
