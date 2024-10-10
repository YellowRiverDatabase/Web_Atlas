import { Header } from "../../components/site/Header";

export function Contributors() {
  console.log(" You are on the correct page");
  const images = [
    {
      name: "Ruth Mostern",
      url: "",
      description: "",
    },
    {
      name: "Nathan Michalewicz",
      url: "",
      description: "",
    },
    {
      name: "Ryan Horne",
      url: "",
      description: "",
    },
    {
      name: "Sharon Zhang",
      url: "",
      description: "",
    },
  ];

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header />
        <div style={{ color: "white" }}>
          <p>Something</p>
        </div>
      </div>
    </>
  );
}
