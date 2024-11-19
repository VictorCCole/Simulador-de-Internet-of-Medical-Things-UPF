import styled from "styled-components";

export const TableContainer = styled.div`
  height: 883px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TableContent = styled.div`
  background-color: #e9ecef;
  border: 2px solid #a7a7a7;
  border-top: none;
  box-shadow: 0px 4px 8.1px -2px #00000040;
  height: 883px;
  left: 10px;
  position: absolute;
  top: 39px;
  width: 1880px;
`;

export const HeaderCell = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  height: 49px;
  justify-content: center;
  padding: 10px;
  position: absolute;
  top: -1px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
`;

export const CellText = styled.div`
  color: #636363;
  font-family: "Arial-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  width: fit-content;
`;

export const SortingIcon = styled.img`
  height: 26px;
  width: 26px;
`;

export const Divider = styled.hr`
  height: 2px;
  left: -2px;
  position: absolute;
  top: 48px;
  width: 1880px;
  background: #a7a7a7;
  border: none;
`;