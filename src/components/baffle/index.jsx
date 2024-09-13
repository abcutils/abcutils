import React from "react";
import { styled } from "styled-components";
import Logo from "../logo";

const Baffle = styled.div`
  background: #f8f9fb;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

export default function () {
  const [display, setDisplay] = React.useState(true);
  React.useEffect(() => {
    setDisplay(false);
  }, []);
  if (!display) {
    return null;
  }
  return (
    <Baffle>
      <div style={{ opacity: 0.3 }}>
        <Logo size="100" />
      </div>
    </Baffle>
  );
}
