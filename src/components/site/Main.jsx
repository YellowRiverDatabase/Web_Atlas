import styled from "styled-components";
export function Main({ children }) {
  const MainDiv = styled.div`
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  `;
  return <MainDiv>{children}</MainDiv>;
}
