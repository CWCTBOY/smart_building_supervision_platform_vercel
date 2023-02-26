import styled from "@emotion/styled";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AccordionContainer = styled.div<{
  isOpen: boolean;
  length: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  transition: all 0.05s linear;
  height: ${({ isOpen, length }) =>
    isOpen ? `${30 * length + 40}px` : "40px"};
  padding: 0 10px 0 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.1s linear;
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    }
  }
  .nav_hidden {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0 0 0 10px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      color: black;
    }
  }
`;

const Accordion = ({
  data,
}: {
  data: {
    title: string;
    contents: {
      title: string;
      navTo: string;
    }[];
  };
}) => {
  const nav = useNavigate();
  const { title, contents } = data;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <AccordionContainer isOpen={isOpen} length={contents.length}>
      <div className="nav">
        {title}
        <div
          className="arrow"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <MdKeyboardArrowDown />
        </div>
      </div>
      {contents.map(({ title, navTo }) => (
        <div
          className="nav_hidden"
          key={title}
          onClick={() => {
            nav(navTo);
          }}
        >
          - {title}
        </div>
      ))}
    </AccordionContainer>
  );
};

export default Accordion;
