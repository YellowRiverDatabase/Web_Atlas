import { useState } from "react";
import { rgbHash } from "./colorHash";
import { color } from "d3";

const legendBox = {
  position: "absolute",
  top: "100px",
  display: "flex",
  flexDirection: "column",
  margin: "0 5px",
  border: "1px solid black",
  borderRadius: "5px",
  zIndex: 999,
  color: "black",
  backgroundColor: "white",
  padding: "5px",
  maxHeight: "400px",
  overflow: "auto",
  gap: "2px",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export function LegendMap() {
  const colors = rgbHash;
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div style={{ ...legendBox, padding: "15px" }}>
        <div style={divStyle}>
          <p>Category Colors</p>
          <button
            style={{
              backgroundColor: "lightgrey",
              color: "black",
              padding: "5px",
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &times;
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        {Object.entries(colors).map(([key, value]) => {
          return (
            <div
              styles={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <section style={{ padding: "0", margin: "0" }}>
                {key} :{" "}
                <svg height={20} width={20}>
                  <circle
                    cx={10}
                    cy={10}
                    r={9}
                    fill={value}
                    strokeWidth={1}
                    stroke={"black"}
                  />
                </svg>
              </section>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <button
      style={legendBox}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      Legend
    </button>
  );
}
