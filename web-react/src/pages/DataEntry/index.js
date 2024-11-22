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
import dataIcon from "../../img/dataiconblack.png"; // Você pode substituir por um ícone de dados

const DataEntry = () => {
  const [formData, setFormData] = useState({
    user: "",
    dateTime: "",
    type: "",
    value1: "",
    value2: "",
    atHome: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData);
    // Aqui você pode adicionar a lógica para enviar os dados para seu backend
  };

  return (
    <div>
      <TitleContainer>
        <TitleBox>
          <TitleText>CRIAR DADOS</TitleText>
        </TitleBox>
      </TitleContainer>
      <FormBackground>
        <IconContainer>
          <img src={dataIcon} alt="Ícone Dados" />
        </IconContainer>
        <FormContainer>
          {/* Campo Usuário */}
          <InputGroup>
            <InputRectangle />
            <InputFrame>Usuário</InputFrame>
            <InputField
              type="text"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              placeholder="..."
            />
          </InputGroup>

          {/* Campo Data e Hora */}
          <InputGroup>
            <InputRectangle />
            <InputFrame>Data e Hora</InputFrame>
            <InputField
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
            />
          </InputGroup>

          {/* Campo Tipo */}
          <InputGroup>
            <InputRectangle />
            <InputFrame>Tipo</InputFrame>
            <SelectField
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="">...</option>
              <option value="tipo1">Tipo 1</option>
              <option value="tipo2">Tipo 2</option>
              <option value="tipo3">Tipo 3</option>
            </SelectField>
          </InputGroup>

          {/* Campo Valor1 */}
          <InputGroup>
            <InputRectangle />
            <InputFrame>Valor 1</InputFrame>
            <InputField
              type="number"
              name="value1"
              value={formData.value1}
              onChange={handleInputChange}
              placeholder="..."
            />
          </InputGroup>

          {/* Campo Valor2 */}
          <InputGroup>
            <InputRectangle />
            <InputFrame>Valor 2</InputFrame>
            <InputField
              type="number"
              name="value2"
              value={formData.value2}
              onChange={handleInputChange}
              placeholder="..."
            />
          </InputGroup>

          {/* Campo Em Casa */}
          <InputGroup>
            <InputRectangle />
            <InputFrame>Em Casa</InputFrame>
            <SelectField
              name="atHome"
              value={formData.atHome}
              onChange={handleInputChange}
            >
              <option value="">...</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </SelectField>
          </InputGroup>

          {/* Botão Criar */}
          <CreateButton onClick={handleSubmit}>
            Criar
          </CreateButton>
        </FormContainer>
      </FormBackground>
    </div>
  );
};

export default DataEntry;