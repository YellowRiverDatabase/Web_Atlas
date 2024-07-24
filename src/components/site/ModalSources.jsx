import { useRecoilState, useRecoilValue } from "recoil";
import { isSourceModalState, sourceModalInfoState } from "./globalState";
import { formatDate } from "../map/formatDate";
import { max, text } from "d3";

const spanStyle = {
  // make at the bottom of modal
  fontSize: "0.8em",
};

const modalBkg = {
  position: "absolute",
  top: "0",
  left: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100vw",
  height: "100vh",
  zIndex: "999",
};

const modal = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "azure",
  borderRadius: "10pt",
  padding: "20px",
  minWidth: "250px",
  minHeight: "250px",
  maxWidth: "33vw",
  border: "solid 1px black",
  color: "black",
};

const header = {
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
};

const tableStyle = {
  border: "1px solid black",
  borderRadius: "10px",
};

const trStyle = {
  borderBottom: "1px solid black",
};

export function ModalSources({ sources, onClose }) {
  const [isSourceModal, setIsSourceModal] = useRecoilState(isSourceModalState);
  const sourceInfo = useRecoilValue(sourceModalInfoState);

  // console.log("source info", sourceInfo);

  if (isSourceModal) {
    return (
      <div style={modalBkg} onClick={() => setIsSourceModal(false)}>
        <div style={modal}>
          <div style={header}>
            <h2>
              {sourceInfo.place}
              <br />({formatDate(sourceInfo.en_date_start)})
            </h2>
            <table style={tableStyle}>
              <tr style={trStyle}>
                <td>Category: </td>
                <td>{Array.from(sourceInfo.en_cat).join(", ")}</td>
              </tr>
              <tr style={trStyle}>
                <td>Type:</td>
                <td>{Array.from(sourceInfo.en_type).join(", ")}</td>
              </tr>
              <tr style={trStyle}>
                <td>Source:</td>
                <td>{Array.from(sourceInfo.source).join(", ")}</td>
              </tr>
            </table>
          </div>
          <span style={spanStyle}>* Click anywhere to close.</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
