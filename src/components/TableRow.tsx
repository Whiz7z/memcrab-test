


import React, { useState } from "react";
import TableCell from "./TableCell";
import { useMatrix } from "../context/MatrixContext";
import type { Cell } from "../context/MatrixContext";
import "../styles/TableRow.scss";
import Bucket from "../svg/Bucket";

type TableRowProps = {
  row: Cell[];
  rowIndex: number;
};

const TableRow: React.FC<TableRowProps> = ({ row, rowIndex }) => {
  const [isRowHovered, setIsRowHovered] = useState(false);
  const { removeRow, calculatePercentage } = useMatrix();

  const sum = row.reduce((acc, cell) => acc + cell.amount, 0);

  const handleDelete = () => {
    removeRow(rowIndex);
  };

  return (
    <tr
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      <td>Cell Value M={rowIndex + 1}</td>
      {row.map((cell, colIndex) => (
        <TableCell
          key={cell.id}
          cell={cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
          isRowHovered={isRowHovered}
          percentage={parseFloat(calculatePercentage(rowIndex, cell.amount).toString())}
        />
      ))}
      <td className="table-sub-cell">{sum}</td>
      <td className="table-action-cell">
        <button className="delete-button" onClick={handleDelete}>
          <Bucket/>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;


