export function EssayTemplate({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        styles={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "45px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
