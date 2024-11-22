import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer, HeaderBox, NavButton, Icon, Text } from "./styles";
import dashboardIcon from "../../img/icon.png";
import criarDadosIcon from "../../img/image.png";
import editarDadosIcon from "../../img/icon-2.png";
import userIcon from "../../img/usericon.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderBox>
        <NavButton 
          width={278} 
          left={14} 
          onClick={() => navigate("/dashboard")} 
          style={{ cursor: 'pointer' }}
        >
          <Icon src={dashboardIcon} alt="Dashboard" />
          <Text>Dashboard</Text>
        </NavButton>
        
        <NavButton 
          width={289} 
          left={292} 
          onClick={() => navigate("/criar-dados")}
          style={{ cursor: 'pointer' }}
        >
          <Icon src={criarDadosIcon} alt="Criar Dados" />
          <Text>Criar dados</Text>
        </NavButton>
        
        <NavButton 
          width={302} 
          left={581} 
          onClick={() => navigate("/editar-dados")}
          style={{ cursor: 'pointer' }}
        >
          <Icon src={editarDadosIcon} alt="Editar Dados" />
          <Text>Editar dados</Text>
        </NavButton>

        <NavButton 
          width={302} 
          left={910} 
          onClick={() => navigate("/cadastrar-usuarios")}
          style={{ cursor: 'pointer' }}
        >
          <Icon src={userIcon} alt="Cadastrar Usuários" />
          <Text>Cadastrar Usuários</Text>
        </NavButton>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
