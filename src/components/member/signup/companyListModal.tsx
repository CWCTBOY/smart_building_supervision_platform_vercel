import styled from "@emotion/styled";
import { ICompanyType } from "../../../interface/userInterface";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 399px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px inset;
  border-radius: 5px;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: inherit;
  height: inherit;
  border-radius: 5px;
  padding: 10px;
  overflow-y: scroll;
  .header {
    width: 340px;
    height: 30px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

const ListContainer = styled.ul`
  position: absolute;
  top: 60px;
  width: 340px;
  .company {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    cursor: pointer;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .title {
      width: 100%;
      font-size: ${({ theme }) => theme.fonts.size.small};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
      margin: 3px;
    }
    .address {
      width: 100%;
      font-size: ${({ theme }) => theme.fonts.size.small};
    }
  }
`;

const CompanyListModal = ({
  companyName,
  setCompanyName,
  companyList,
  setCompanyId,
  setIsCompanyListModalOpen,
}: {
  companyName: string;
  setCompanyName: (companyName: string) => void;
  companyList: ICompanyType[];
  setCompanyId: (companyId: number) => void;
  setIsCompanyListModalOpen: (isCompanyListModalOpen: boolean) => void;
}) => {
  return (
    <Container>
      <Modal>
        <span className="header">
          "{companyName}"에 대한 검색결과: 총 {companyList.length}개
        </span>
        <ListContainer>
          {companyList.map(({ companyId, companyName, companyAddress }) => (
            <li
              className="company"
              key={companyId}
              onClick={() => {
                setCompanyId(companyId);
                setIsCompanyListModalOpen(false);
                setCompanyName(companyName);
              }}
            >
              <span className="title">{companyName}</span>
              <span className="address">주소: {companyAddress}</span>
            </li>
          ))}
        </ListContainer>
      </Modal>
    </Container>
  );
};

export default CompanyListModal;
