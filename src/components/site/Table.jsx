import { useRecoilState, useRecoilValue } from "recoil";
import { isTableState, tableDataState, tableHeaderState } from "./globalState";
import { useMemo } from "react";
import { formatDate } from "../map/formatDate";

// const tableStyle = {
//   display: "flex",
//   flexDirection: "column",
//   position: "absolute",
//   top: "11%",
//   left: "5px",
//   backgroundColor: "white",
//   color: "black",
//   justifyContent: "center",
//   alignItems: "center",
//   maxHeight: "65vh",
//   // width: "20%",
//   overflow: "scroll",
//   padding: "1em",
//   border: "1px solid black",
//   borderRadius: "10px",
//   // paddingTop: "200px",
// };

const tableStyle = {
  // display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "11%",
  left: "5px",
  backgroundColor: "white",
  color: "black",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "65vh",
  padding: "1em",
  border: "1px solid black",
  borderRadius: "10px",
  overflow: "auto",
};

const tableBodyStyle = {
  maxHeight: "60%",
  overflow: "auto",
  position: "relative",
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  color: "black",
  alignItems: "center",
  height: "3em",
};

const dataStyle = {
  cursor: "pointer",
  border: "1px solid black",
  padding: "0.5em",
};

const closeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer",
  border: "1px solid black",
  padding: "0.5em",
  borderRadius: "10px",
  backgroundColor: "lightgray",
};

export function MyTable() {
  const [isTable, setIsTable] = useRecoilState(isTableState);
  const tableData = useRecoilValue(tableDataState);
  const tableHeader = useRecoilValue(tableHeaderState);

  const sortedTableData = useMemo(() => {
    return [...tableData].sort((a, b) => +a.en_date_start - +b.en_date_start);
  }, [tableData]);

  if (!isTable) {
    return null;
  }

  return (
    <>
      <div style={tableStyle}>
        <div style={headerStyle}>
          <h1>{tableHeader}</h1>
          <div style={closeButtonStyle} onClick={() => setIsTable(false)}>
            X
          </div>
        </div>
        <table style={tableBodyStyle}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {sortedTableData.map((row, i) => (
              <tr
                key={`table-row-${i}`}
                onClick={() => {
                  setIsTable(false);
                }}
              >
                <td style={dataStyle}>{formatDate(row.en_date_start)}</td>
                <td style={dataStyle}>{row.en_cat}</td>
                <td style={dataStyle}>{row.en_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
    </>
  );
}
