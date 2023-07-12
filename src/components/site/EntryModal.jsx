import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { isEntryModalState } from "./globalState";
import "../../App.css";
import { useEffect, useState } from "react";

export function EntryModal() {
  const [isEntryModal, setIsEntryModal] = useRecoilState(isEntryModalState);
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const closeModal = () => {
    setIsEntryModal(false);
  };

  const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
  `;

  const ModalDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    z-index: 200;

    @media (max-width: 500px) {
      width: 100%;
      height: 100%;
      border: none;
      justify-content: space-between;
    }

    @media (min-width: 500px) {
      width: 500px;
    }
  `;

  const Title = styled.h2`
    text-align: center;
    color: black;
    margin: 0 20px;
  `;

  const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    margin-bottom: 20px;
  `;

  const ModalButton = styled.button`
    width: 20%;
    min-width: 75px;
  `;

  const BlackP = styled.p`
    color: black;
    margin: 20px;
  `;

  return (
    <>
      {isEntryModal ? (
        <ModalWrapper>
          <ModalDiv>
            <Section>
              <Title>
                Welcome to the Web Atlas
                <br />
                for the Yellow River Database
              </Title>
              <BlackP>
                There will be more content here as we write a simple
                description.
              </BlackP>
            </Section>
            <ModalButton onClick={closeModal}>
              {windowWidth > 500 ? "Close" : "Go to Web Atlas"}
            </ModalButton>
          </ModalDiv>
        </ModalWrapper>
      ) : null}
    </>
  );
}
