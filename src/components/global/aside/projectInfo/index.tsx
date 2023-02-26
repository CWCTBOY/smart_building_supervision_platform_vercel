import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  .thumbnail_box {
    width: 100%;
    height: 170px;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 5px;
    img {
      width: inherit;
    }
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.fonts.size.medium};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: black;
    span {
      margin-left: 10px;
    }
  }
  .period {
    font-size: ${({ theme }) => theme.fonts.size.small};
    color: rgba(0, 0, 0, 0.4);
  }
`;

const ProjectInfo = () => {
  //   const data = {
  //     id: 4,
  //     projectName: "project D",
  //     startDate: "2021-01-01",
  //     endDate: "2021-01-01",
  //     processRate: "50%",
  //     thumbnail: four,
  //     alert: {
  //       newOne: 3,
  //       emergency: 4,
  //       question: 7,
  //     },
  //   };
  // const { projectName, startDate, endDate, thumbnail } = data;

  const { id } = useParams();
  return null;
  // return (
  //   <Container>
  //     <div className="thumbnail_box">
  //       <img src={thumbnail} alt={projectName} />
  //     </div>
  //     <span className="header">{projectName}</span>
  //     <span className="period">
  //       {startDate} ~ {endDate}
  //     </span>
  //   </Container>
  // );
};

export default ProjectInfo;
