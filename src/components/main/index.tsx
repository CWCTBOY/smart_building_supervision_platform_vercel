import styled from "@emotion/styled";
import {
  MdCloudUpload,
  MdSettingsSuggest,
  MdOutlineImageNotSupported,
  MdAddAlert,
  MdErrorOutline,
  MdQuiz,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { isParticipants } from "../../hooks/projectHooks";
import { IProjectType } from "../../interface/projectInterface";
import { ServiceRole } from "../../type/RoleEnum";

const Container = styled.div`
  width: 100%;
  height: 320px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.1s linear;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .thumbnail_box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    overflow: hidden;
    .img {
      width: 120%;
    }
    .none {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 10px 10px 0 0;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 10px 0px inset;
    }
    .test {
      display: flex;
      flex-direction: column;
    }
  }
  .desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 200px);
    padding: 10px;
    .title {
      font-size: ${({ theme }) => theme.fonts.size.medium};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
      cursor: pointer;
    }
    .date {
      font-size: ${({ theme }) => theme.fonts.size.small};
      color: rgba(0, 0, 0, 0.4);
    }
    .participants_box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .participants {
        font-size: ${({ theme }) => theme.fonts.size.small};
      }
      .request {
        border: none;
        background-color: #5973c9;
        color: white;
        font-size: 13px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 10px 0px inset;
        }
      }
    }
    .mid_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
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
      .alert_box {
        display: flex;
        align-items: center;
        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 27px;
        }
        .new,
        .emergency,
        .question {
          display: flex;
          justify-content: space-between;
          font-size: ${({ theme }) => theme.fonts.size.small};
          margin-right: 5px;
        }
      }
    }
  }
`;

const Content = ({
  projectData,
  role,
  userId,
  pathname,
}: {
  projectData: IProjectType;
  role: ServiceRole;
  userId: number;
  pathname: string;
}) => {
  const {
    id,
    name,
    processRate,
    startDate,
    endDate,
    constructionClass,
    detailConstructionClass,
    floorPlanUrl,
    thumbnailUrl,
    participants,
  } = projectData;
  const nav = useNavigate();
  const requestToJoin = async () => {
    // 프로젝트 참여요청 보내기 api
    alert("해당프로젝트에 참여요청을 보냈습니다.");
  };
  return (
    <Container>
      <div className="thumbnail_box">
        {thumbnailUrl !== null ? (
          <img className="img" src={thumbnailUrl} alt="projectImg" />
        ) : (
          <div className="none">
            <MdOutlineImageNotSupported size={40} opacity={0.3} />
            <div className="test">
              <span>{constructionClass}</span>
              <span>{detailConstructionClass}</span>
            </div>
          </div>
        )}
      </div>
      <div className="desc">
        <div
          className="title"
          onClick={() => {
            role !== ServiceRole.COMPANY_ADMIN &&
            role !== ServiceRole.SERVICE_ADMIN
              ? isParticipants(participants, userId)
                ? nav(`${id}/virtualtour`)
                : alert("참여자만 접근가능합니다.")
              : nav(`${id}/virtualtour`);
          }}
        >
          {name}
        </div>
        <div className="date">
          {startDate}~{endDate}
        </div>
        <div className="participants_box">
          <span className="participants">참여인원 {participants.length}명</span>
          {role !== ServiceRole.COMPANY_ADMIN &&
            role !== ServiceRole.SERVICE_ADMIN && (
              <button className="request" onClick={requestToJoin}>
                {role === ServiceRole.MEMBER ? "참여요청" : "열람요청"}
              </button>
            )}
        </div>
        <div className="mid_box">
          <div className="process">공정률 {processRate}%</div>
          <div className="alert_box">
            <div className="box new">
              <MdAddAlert size={16} />
              <span className="txt">{2} </span>
            </div>
            <div className="box emergency">
              <MdErrorOutline size={16} color="#E91E63" />
              <span className="txt">{2} </span>
            </div>
            <div className="box question">
              <MdQuiz size={16} color="#5873C9" />
              <span className="txt">{2} </span>
            </div>
          </div>
          {role === ServiceRole.COMPANY_ADMIN && pathname === "/project" && (
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
          )}
        </div>
      </div>
    </Container>
  );
};

export default Content;
