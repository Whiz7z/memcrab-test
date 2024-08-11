// src/components/MatrixTable.tsx
import React from "react";
import { useMatrix } from "../context/MatrixContext";
import TableRow from "./TableRow";
import "../styles/MatrixTable.scss";

const MatrixTable: React.FC = () => {
  const { matrix, calculateAverage } = useMatrix();

  if(!matrix.length) return (<p style={{margin: '0 auto', textAlign: 'center'}}>Matrix is empty</p>)

  return (
    <table className="matrix-table">
      <thead>
        <tr>
          <th className="head-n-cell"></th>
          {matrix[0] &&
            matrix[0].map((_, colIndex) => (
              <th className="head-n-cell" key={colIndex}>
                Cell values N={colIndex + 1}
              </th>
            ))}
          <th>Sum values</th>
        </tr>
      </thead>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <TableRow key={rowIndex} rowIndex={rowIndex} row={row} />
        ))}
        <tr className="average-row">
          <td>Average values</td>
          {matrix[0] &&
            matrix[0].map((_, colIndex) => (
              <td key={colIndex}>
                {matrix && calculateAverage(colIndex).toFixed(1)}
              </td>
            ))}
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default MatrixTable;
