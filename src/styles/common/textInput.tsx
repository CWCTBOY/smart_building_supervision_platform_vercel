import styled from "@emotion/styled";

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  .title {
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-bottom: 3px;
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: inherit;
  margin-bottom: 7px;
  .input {
    width: inherit;
    height: 35px;
    padding: 0;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
    text-indent: 5px;
    transition: all 0.3s;
    &:focus {
      outline: none;
      border: 2px solid purple;
    }
  }
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: inherit;
  margin-bottom: 5px;
  select {
    width: 101.3%;
    height: 35px;
    padding: 0;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
    text-indent: 5px;
    transition: all 0.3s;
    &:focus {
      outline: none;
      border: 2px solid purple;
    }
  }
`;

export { FormContainer, Input, Select };
