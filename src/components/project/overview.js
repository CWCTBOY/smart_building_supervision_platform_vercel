import styled from "@emotion/styled";
import caution from "../../assets/img/project/overview/caution_icon.png";
import normal from "../../assets/img/project/overview/normal_icon.png";
import healthy from "../../assets/img/project/overview/healthy_icon.png";

const OverviewBoxForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  padding-top: 10px;
  width: calc(100vw / 5);
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 2px solid ${({ countColor }) => countColor};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  .box {
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  .count {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 5px;
    color: ${({ countColor }) => countColor};
  }
  .label {
    font-size: 13px;
    color: #757575;
  }
`;

const OverviewIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const OverviewBox = ({ className, iconName, boxLabel, countColor }) => {
  let path = "";

  switch (iconName) {
    case "caution":
      path = caution;
      break;
    case "normal":
      path = normal;
      break;
    case "healthy":
      path = healthy;
      break;
    default:
  }

  return (
    <OverviewBoxForm
      className={className}
      countColor={countColor}
      windowWidth={window.windowWidth}
    >
      <OverviewIcon
        style={{
          backgroundImage: `url(${path})`,
        }}
      />
      <div className="box">
        {/* TODO: overview 분류 별 프로젝트 개수 표시 */}
        <span className="count" style={{ color: countColor }}>
          Num
        </span>
        <span className="label">{boxLabel}</span>
      </div>
    </OverviewBoxForm>
  );
};

export default OverviewBox;