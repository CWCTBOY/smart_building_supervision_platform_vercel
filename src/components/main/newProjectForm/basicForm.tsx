import { FormContainer, Input, Select } from "../../../styles/common/textInput";
import addNewFormProperties from "./data";

const BasicForm = () => {
  return (
    <FormContainer>
      {addNewFormProperties.map(({ name, type, placeholder, options }) =>
        type === "select" ? (
          <Select key={name}>
            <span className="title">{placeholder}</span>
            <select name={name} required>
              <option value="none" selected disabled hidden></option>
              {options?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </Select>
        ) : (
          <Input key={name}>
            <span className="title">{placeholder}</span>
            <input className="input" type={type} required />
          </Input>
        )
      )}
    </FormContainer>
  );
};

export default BasicForm;
