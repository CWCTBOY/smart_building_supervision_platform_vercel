import styled from "@emotion/styled";
import { IBasicFormType } from "../../../interface/formInterface";
import { IUserType } from "../../../interface/userInterface";

const Container = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 105%;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px inset;
  background-color: white;
`;

const ListContainer = styled.li`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .title {
    width: 100%;
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-right: 5px;
  }
  .email {
    width: 100%;
    font-size: ${({ theme }) => theme.fonts.size.small};
  }
`;

const ManagerModal = ({
  managerData,
  basicForm,
  setBasicForm,
  setIsManagerSelected,
}: {
  managerData: IUserType[];
  basicForm: IBasicFormType;
  setBasicForm: (basicForm: IBasicFormType) => void;
  setIsManagerSelected: (isManagerSelected: boolean) => void;
}) => {
  const handleManagerClick = (id: number) => {
    setBasicForm({
      ...basicForm,
      managerId: id,
    });
    setIsManagerSelected(true);
  };
  return (
    <Container>
      {managerData.map(({ id, name, email }, i) => (
        <ListContainer key={id} onClick={() => handleManagerClick(id)}>
          <span className="title">
            {i + 1}. {name}
          </span>
          <span className="email">{email}</span>
        </ListContainer>
      ))}
    </Container>
  );
};

export default ManagerModal;
