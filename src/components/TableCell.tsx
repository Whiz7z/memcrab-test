import React from "react";
import { useMatrix } from "../context/MatrixContext";

type TableCellProps = {
  cell: { id: number; amount: number };
  rowIndex: number;
  colIndex: number;
  isRowHovered: boolean;
  percentage: number;
};

const TableCell: React.FC<TableCellProps> = ({
  cell,
  rowIndex,
  colIndex,
  isRowHovered,
  percentage,
}) => {
  const { findNearest, nearest, x, clearNearest , updateCell} = useMatrix();

    const handleClick = () => {
      updateCell(rowIndex, colIndex);
    };

  const handleMouseEnter = () => {
    findNearest(cell.id, cell.amount, x);
  };

  const handleMouseLeave = () => {
    clearNearest();
  };

  const isNearest = nearest.find((n) => n.id === cell.id);

  const backgroundStyle = isRowHovered
    ? {
        background: isNearest
          ? `linear-gradient(to top, #9ebe9f ${percentage}%, transparent ${percentage}%)`
          : `linear-gradient(to top, #555 ${percentage}%, transparent ${percentage}%)`,
        color: isNearest ? "inherit" : "inherit",
      }
    : isNearest
    ? { backgroundColor: "#9ebe9f", color: "black" }
    : {};

  return (
    <td
      className="table-cell"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={backgroundStyle}
      onClick={handleClick}
    >
      {isRowHovered
        ? `${cell.amount} -> ${percentage.toFixed(1)}%`
        : cell.amount}
    </td>
  );
};

export default TableCell;
