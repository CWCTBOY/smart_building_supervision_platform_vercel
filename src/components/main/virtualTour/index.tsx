import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const PanoramaContainer = styled.div<{
  centerX?: number;
  centerY?: number;
  dx: number;
  dy: number;
}>`
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  .panorama {
    position: absolute;
    transition: all 0.3s ease-in;
    top: ${({ centerY, dy }) => `${-centerY! - dy}px`};
    left: ${({ centerX, dx }) => `${-centerX! - dx}px`};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200%;
    height: 200%;
    background: linear-gradient(pink, blue);
    .testPoint {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      color: white;
      background-color: black;
    }
  }
`;

const VirtualModelContainer = styled.div<{
  centerX?: number;
  centerY?: number;
  dx: number;
  dy: number;
}>`
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  .model {
    position: absolute;
    transition: all 0.3s ease-in;
    top: ${({ centerY, dy }) => `${-centerY! - dy}px`};
    left: ${({ centerX, dx }) => `${-centerX! - dx}px`};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200%;
    height: 200%;
    background: linear-gradient(blue, pink);
    .testPoint {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      color: white;
      background-color: black;
    }
  }
`;

const VirtualTourRender = () => {
  const boxWidth = (window.innerWidth - 350) / 2;
  const boxHeight = window.innerHeight - 60;
  const innerContentRef = useRef<HTMLDivElement>(null);
  const [centerPoint, setCenterPoint] = useState<{
    centerX: number;
    centerY: number;
  }>();
  const [delta, setDelta] = useState({ dx: 0, dy: 0 });
  const { dx, dy } = delta;
  const { centerX, centerY } = centerPoint || { x: 0, y: 0 };
  const handleClickLeft = (e: any) => {
    const { clientX, clientY } = e;
    const absClientX = clientX - 350;
    const absClientY = clientY - 60;
    const dx = absClientX - centerX!;
    const dy = absClientY - centerY!;
    setDelta({ dx, dy });
  };
  const handleClickRight = (e: any) => {
    const { clientX, clientY } = e;
    const absClientX = clientX - (350 + boxWidth);
    const absClientY = clientY - 60;
    const dx = absClientX - centerX!;
    const dy = absClientY - centerY!;
    setDelta({ dx, dy });
  };
  useEffect(() => {
    if (innerContentRef.current) {
      const modelWidth = innerContentRef.current.offsetWidth;
      const modelHeight = innerContentRef.current.offsetHeight;
      const x = (modelWidth - boxWidth) / 2;
      const y = (modelHeight - boxHeight) / 2;
      setCenterPoint({ centerX: x, centerY: y });
    }
  }, []);
  return (
    <Container>
      <PanoramaContainer
        centerX={centerX}
        centerY={centerY}
        dx={dx}
        dy={dy}
        onClick={handleClickLeft}
      >
        <div className="panorama" ref={innerContentRef}>
          <div className="testPoint">1</div>
        </div>
      </PanoramaContainer>
      <VirtualModelContainer
        centerX={centerX}
        centerY={centerY}
        dx={dx}
        dy={dy}
        onClick={handleClickRight}
      >
        <div className="model">
          <div className="testPoint">2</div>
        </div>
      </VirtualModelContainer>
    </Container>
  );
};

export default VirtualTourRender;
