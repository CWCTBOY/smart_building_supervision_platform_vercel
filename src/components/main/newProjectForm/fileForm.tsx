import styled from "@emotion/styled";
import { RefObject, useRef } from "react";
import {
  MdOutlineImageSearch,
  MdOutlineImageNotSupported,
  MdLayers,
  MdCheckCircleOutline,
} from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
  margin-left: 20px;
  .body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: inherit;
    height: 330px;
    margin-top: 17px;
    padding: 10px;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
    input {
      display: none;
    }
    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 230px;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.gray};
      .no_img {
        font-size: ${({ theme }) => theme.fonts.size.large};
        color: rgba(0, 0, 0, 0.3);
      }
    }
    .flex_box {
      display: flex;
      justify-content: space-between;
      .thumbnail_selecter,
      .floorPlan_selector {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 295px;
        color: white;
        background-color: #2e76b6;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        .btn_name {
          font-size: ${({ theme }) => theme.fonts.size.small};
          margin-right: 5px;
        }
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 27px;
        height: 27px;
      }
    }
  }
`;

/* <--> */

const FileForm = () => {
  const floorPlanRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const onAssign = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return (
    <Container>
      <div className="body">
        <div className="preview">
          <MdOutlineImageNotSupported className="no_img" size={40} />
        </div>
        <div className="flex_box">
          <button
            className="thumbnail_selecter"
            type="button"
            onClick={() => {
              onAssign(thumbnailRef);
            }}
          >
            <input type="file" ref={thumbnailRef} />
            <span className="btn_name">대표이미지 등록</span>
            <span className="icon">
              <MdOutlineImageSearch size={25} />
            </span>
          </button>
          <MdCheckCircleOutline size={25} />
        </div>
        <div className="flex_box">
          <button
            className="floorPlan_selector"
            type="button"
            onClick={() => {
              onAssign(floorPlanRef);
            }}
          >
            <input type="file" ref={floorPlanRef} />
            <span className="btn_name">평면도 등록</span>
            <MdLayers size={25} />
          </button>
          <span className="icon">
            <MdCheckCircleOutline size={25} />
          </span>
        </div>
      </div>
    </Container>
  );
};

export default FileForm;
