import styled from "@emotion/styled";
import {
  MdCloudUpload,
  MdSettingsSuggest,
  MdWarningAmber,
  MdQuiz,
  MdAddAlert,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.1s linear;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .thumbnail_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 170px;
    overflow: hidden;
    .img {
      width: inherit;
    }
  }
  .desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 130px;
    padding: 10px;
    .title {
      font-size: ${({ theme }) => theme.fonts.size.medium};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
      margin-bottom: 5px;
      cursor: pointer;
    }
    .date {
      font-size: ${({ theme }) => theme.fonts.size.small};
      color: rgba(0, 0, 0, 0.4);
    }
    .mid_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      .process {
        font-size: ${({ theme }) => theme.fonts.size.small};
      }
      .updater {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50px;
        .upload,
        .setting {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.4);
          transition: all 0.2s linear;
          &:hover {
            color: black;
          }
        }
      }
    }
    .alert_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      .new,
      .emergency,
      .question {
        display: flex;
        justify-content: space-between;
        width: 50px;
        font-size: ${({ theme }) => theme.fonts.size.medium};
        color: black;
      }
    }
  }
`;

const Content = ({
  id,
  projectName,
  startDate,
  endDate,
  processRate,
  thumbnail,
  alert: { newOne, emergency, question },
}: {
  id: number;
  projectName: string;
  startDate: string;
  endDate: string;
  processRate: string;
  thumbnail: string;
  alert: {
    newOne: number;
    emergency: number;
    question: number;
  };
}) => {
  const nav = useNavigate();
  return (
    <Container>
      <div className="thumbnail_box">
        {thumbnail ? (
          <img className="img" src={thumbnail} />
        ) : (
          <div>no image</div>
        )}
      </div>
      <div className="desc">
        <div
          className="title"
          onClick={() => {
            nav(`${id}/virtualtour`);
          }}
        >
          {projectName}
        </div>
        <div className="date">
          {startDate} ~ {endDate}
        </div>
        <div className="mid_box">
          <div className="process">공정률: {processRate}</div>
          <div className="updater">
            <span
              className="upload"
              onClick={() => {
                nav(`${id}/upload`);
              }}
            >
              <MdCloudUpload size={20} />
            </span>
            <span
              className="setting"
              onClick={() => {
                nav(`${id}/edit`);
              }}
            >
              <MdSettingsSuggest size={20} />
            </span>
          </div>
        </div>
        <div className="alert_box">
          <div className="new">
            <MdAddAlert size={16} />
            <span className="txt">{newOne} 건</span>
          </div>
          <div className="emergency">
            <MdWarningAmber size={16} color="red" />
            <span className="txt">{emergency} 건</span>
          </div>
          <div className="question">
            <MdQuiz size={16} color="blue" />
            <span className="txt">{question} 건</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Content;
