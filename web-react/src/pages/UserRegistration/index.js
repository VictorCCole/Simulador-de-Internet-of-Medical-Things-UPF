import React, { useState } from "react";
import {
  TitleContainer,
  TitleBox,
  TitleText,
  FormBackground,
  IconContainer,
  FormContainer,
  InputGroup,
  InputRectangle,
  InputFrame,
  InputField,
  SelectField,
  CreateButton
} from "./styles";
import userBlackIcon from "../../img/userblack.png";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData);
    // backend
  };

  return (
    <div>
      <TitleContainer>
        <TitleBox>
          <TitleText>CADASTRAR USUÁRIO</TitleText>
        </TitleBox>
      </TitleContainer>
      <FormBackground>
        <IconContainer>
          <img src={userBlackIcon} alt="Ícone Usuário" />
        </IconContainer>
        <FormContainer>
          <InputGroup>
            <InputRectangle />
            <InputFrame>Digite seu Nome</InputFrame>
            <InputField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="..."
            />
          </InputGroup>

          <InputGroup>
            <InputRectangle />
            <InputFrame>Data de Nascimento</InputFrame>
            <InputField
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder="..."
            />
          </InputGroup>

          <InputGroup>
            <InputRectangle />
            <InputFrame>Escolha seu Sexo</InputFrame>
            <SelectField
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </SelectField>
          </InputGroup>

          <CreateButton onClick={handleSubmit}>
            Criar
          </CreateButton>
        </FormContainer>
      </FormBackground>
    </div>
  );
};

export default UserRegistration;