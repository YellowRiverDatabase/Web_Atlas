import { useRecoilValue } from "recoil";
import { isEntryModalState } from "./globalState";
import { Nav } from "./Nav";
import { Layers } from "./Layers";
export function Header() {
  const isEntryModal = useRecoilValue(isEntryModalState);
  const styledWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "10%",
    minHeight: "50px",
    width: "100%",
    backgroundColor: "#242424",
    borderBottom: "1px solid grey",
    zIndex: 100,
  };
  return (
    <>
      {!isEntryModal ? (
        <div style={styledWrapperStyle}>
          <Nav />
          <h1>Yellow River Database Web Atlas</h1>
          <Layers />
        </div>
      ) : null}
    </>
  );
}
