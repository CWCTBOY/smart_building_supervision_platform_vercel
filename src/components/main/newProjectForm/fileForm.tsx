import styled from "@emotion/styled";
import { ChangeEvent, RefObject, useRef } from "react";
import {
  MdOutlineImageNotSupported,
  MdCheckCircleOutline,
} from "react-icons/md";
import { imgUploader } from "../../../hooks/projectHooks";
import { IFileFormType } from "../../../interface/formInterface";

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
    height: 342px;
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
      overflow: hidden;
      .no_img {
        font-size: ${({ theme }) => theme.fonts.size.large};
        color: rgba(0, 0, 0, 0.3);
      }
      .thumbnail {
        width: 150%;
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

const FileForm = ({
  fileForm,
  setFileForm,
}: {
  fileForm: IFileFormType | null;
  setFileForm: any;
}) => {
  const floorPlanRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const onAssign = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const thumbnail = await imgUploader(file);
    if (!fileForm) return;
    setFileForm({ ...fileForm, thumbnail });
  };
  return (
    <Container>
      <div className="body">
        <div className="preview">
          {fileForm?.thumbnail === null ? (
            <MdOutlineImageNotSupported className="no_img" size={40} />
          ) : (
            <img className="thumbnail" src={fileForm?.thumbnail} alt="11" />
          )}
        </div>
        <div className="flex_box">
          <button
            className="thumbnail_selecter"
            type="button"
            onClick={() => {
              onAssign(thumbnailRef);
            }}
          >
            <input type="file" ref={thumbnailRef} onChange={onChangeImg} />
            <span className="btn_name">대표이미지 등록</span>
          </button>
          <MdCheckCircleOutline
            size={25}
            color={fileForm?.thumbnail === null ? "#D0D0D0" : "#05A846"}
          />
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
          </button>
          <span className="icon">
            <MdCheckCircleOutline
              size={25}
              color={fileForm?.floorPlan === null ? "#D0D0D0" : "#05A846"}
            />
          </span>
        </div>
      </div>
    </Container>
  );
};

export default FileForm;
