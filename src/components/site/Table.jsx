import { useRecoilState, useRecoilValue } from "recoil";
import { isTableState, tableDataState, tableHeaderState } from "./globalState";
import { useMemo } from "react";

const tableStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "11%",
  left: "5px",
  backgroundColor: "white",
  color: "black",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "65vh",
  // width: "20%",
  overflow: "scroll",
  padding: "1em",
  border: "1px solid black",
  borderRadius: "10px",
  // paddingTop: "200px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  color: "black",
  alignItems: "center",
  height: "3em",
};

export function MyTable() {
  const [isTable, setIsTable] = useRecoilState(isTableState);
  const tableData = useRecoilValue(tableDataState);
  const tableHeader = useRecoilValue(tableHeaderState);
  // console.log(isTable);

  return (
    <>
      {isTable && (
        <div style={tableStyle}>
          <div style={headerStyle}>
            <h1>{tableHeader}</h1>
          </div>
          <table onclick={() => setIsTable(false)}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={`table-row-${i}`}
                  onClick={() => {
                    console.log(isTable);
                    setIsTable(false);
                  }}
                >
                  <td>{row.en_date_start}</td>
                  <td>{row.en_cat}</td>
                  <td>{row.en_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// export const Table = useMemo(MyTable, [isTableState, tableDataState]);
