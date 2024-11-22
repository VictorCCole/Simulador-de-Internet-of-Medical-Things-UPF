import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 83px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const HeaderBox = styled.header`
  background-color: #6486ff;
  border: 2px solid #a7a7a7;
  border-radius: 13px;
  box-shadow: 0px 4px 8.1px -2px #00000040;
  height: 83px;
  left: 10px;
  position: absolute;
  top: 14px;
  width: 1880px;
`;

export const NavButton = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  position: absolute;
  top: 5px;
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  cursor: pointer;
`;

export const Icon = styled.img`
  height: 48px;
  position: relative;
  width: 48px;
`;

export const Text = styled.div`
  color: #ffffff;
  font-family: "Impact", Helvetica;
  font-size: 29px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
`;
