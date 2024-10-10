import { Header } from "../../components/site/Header";

export function EssayTemplate({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "620px",
          height: "100%",
          backgroundColor: "lightgrey",
          color: "black",
          padding: "2em",
        }}
      >
        {children}
      </div>
    </div>
  );
}
