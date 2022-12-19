import styled from "@emotion/styled";
import Content from "../components/main";
import { MdAddCircleOutline } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { dummy } from "../data/dummyContentData";

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 3fr);
  .add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    border: 2px dotted ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      color: black;
      border: 2px dotted black;
    }
    .desc {
      font-size: ${({ theme }) => theme.fonts.size.large};
    }
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Main = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  return (
    <>
      {pathname === "/project" ? (
        <GridContainer>
          <div
            className="add"
            onClick={() => {
              nav("/project/new");
            }}
          >
            <MdAddCircleOutline size={150} />
            <div className="desc">Add New Project</div>
          </div>
          {dummy.map(
            ({
              id,
              projectName,
              startDate,
              endDate,
              processRate,
              alert,
              thumbnail,
            }) => (
              <Content
                key={id}
                id={id}
                projectName={projectName}
                startDate={startDate}
                endDate={endDate}
                processRate={processRate}
                thumbnail={thumbnail}
                alert={alert}
              />
            )
          )}
        </GridContainer>
      ) : (
        <Container>
          <Outlet />
        </Container>
      )}
    </>
  );
};

export default Main;
