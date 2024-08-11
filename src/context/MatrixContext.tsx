
import React, { createContext, useContext, useState } from "react";

export type Cell = {
  id: number;
  amount: number;
};

type MatrixContextType = {
  matrix: Cell[][];
  nearest: { id: number; difference: number; amount: number }[];
  findNearest: (cellId: number, amount: number, quantity: number) => void;
  clearNearest: () => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  updateCell: (rowIndex: number, colIndex: number) => void;
  setMatrixSize: (m: number | undefined, n: number | undefined) => void;
  calculateAverage: (colIndex: number) => number;
  calculatePercentage: (rowIndex: number, amount: number) => number | string;
  x: number;
  setX: (value: number) => void;
};

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error("useMatrix must be used within a MatrixProvider");
  }
  return context;
};

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [x, setX] = useState<number>(5);
  const [nearest, setNearest] = useState<
    { id: number; difference: number; amount: number }[]
  >([]);

  const setMatrixSize = (m: number | undefined, n: number | undefined) => {
    const newMatrix = [];
    let cellId = 1;

    if(typeof m === 'number' && typeof n === 'number'){
      for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
          row.push({
            id: cellId++,
            amount: Math.floor(Math.random() * 900) + 100,
          });
        }
        newMatrix.push(row);
      }
      setMatrix(newMatrix);
    }
    
  };

  const findNearest = (cellId: number, amount: number, quantity: number) => {
    const flattenedCells = matrix.flat();
    const otherCells = flattenedCells.filter((cell) => cell.id !== cellId);

    const cellsWithDifference = otherCells.map((cell) => ({
      ...cell,
      difference: Math.abs(cell.amount - amount),
    }));

    const sortedCells = cellsWithDifference.sort(
      (a, b) => a.difference - b.difference
    );

    const nearest = sortedCells.slice(0, quantity);

    setNearest([...nearest]);
  };

  const clearNearest = () => {
    setNearest([]);
  };

  const calculateAverage = (colIndex: number) => {
    const sum = matrix.reduce((acc, row) => acc + row[colIndex].amount, 0);
    return sum / matrix.length;
  };

  const calculatePercentage = (rowIndex: number, amount: number) => {
    const row = matrix[rowIndex];

    const rowSum = row.reduce((acc, cell) => acc + cell.amount, 0);
    const percentage = (amount / rowSum) * 100;

    return percentage.toFixed(2);
  };

  const addRow = () => {
    setMatrix((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      const numColumns = prevMatrix[0]?.length || 0;

      const newRow: Cell[] = [];
      let cellId = prevMatrix.flat().length + 1;

      for (let j = 0; j < numColumns; j++) {
        newRow.push({
          id: cellId++,
          amount: Math.floor(Math.random() * 900) + 100,
        });
      }
      newMatrix.push(newRow);

      return newMatrix;
    });
  };

  const removeRow = (rowIndex: number) => {
    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.filter((_, index) => index !== rowIndex);

      return newMatrix;
    });
  };

  const updateCell = (rowIndex: number, colIndex: number) => {
    setMatrix((prev) => {
      const newMatrix = [...prev];
      newMatrix[rowIndex][colIndex].amount++;
      return newMatrix;
    });
  };

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        nearest,
        findNearest,
        addRow,
        removeRow,
        updateCell,
        setMatrixSize,
        calculatePercentage,
        clearNearest,

        calculateAverage,
        x,
        setX,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
