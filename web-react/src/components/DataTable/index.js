import React from "react";
import { 
  TableContainer, 
  TableContent, 
  HeaderCell, 
  CellText, 
  SortingIcon,
  Divider 
} from "./styles";
import sortingIcon from "../../img/sorting.png";

const columns = [
  { id: 'user', text: 'Usuário', left: 41, width: 175, hasIcon: true },
  { id: 'date', text: 'Data e Hora', left: 338, width: 225, hasIcon: true },
  { id: 'type', text: 'Tipo', left: 684, width: 131, hasIcon: true },
  { id: 'value1', text: 'Valor1', left: 937, width: 157, hasIcon: true },
  { id: 'value2', text: 'Valor2', left: 1216, width: 157, hasIcon: true },
  { id: 'home', text: 'Em Casa', left: 1494, width: 140, hasIcon: false }
];

const DataTable = () => {
  return (
    <TableContainer>
      <TableContent>
        {columns.map(column => (
          <HeaderCell key={column.id} left={column.left} width={column.width}>
            <CellText>{column.text}</CellText>
            {column.hasIcon && <SortingIcon src={sortingIcon} alt="Ordenar" />}
          </HeaderCell>
        ))}
        <Divider />
      </TableContent>
    </TableContainer>
  );
};

export default DataTable;