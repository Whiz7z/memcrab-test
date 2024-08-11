
import React, { useState } from "react";
import { useMatrix } from "../context/MatrixContext";
import style from "../styles/ControlPanel.module.scss";

const ControlPanel: React.FC = () => {
  const { setMatrixSize, setX, addRow } = useMatrix();
  const [m, setM] = useState<number>();
  const [n, setN] = useState<number>();
  const [xValue, setXValue] = useState<number>(5);

  const handleGenerate = () => {
    setMatrixSize(m, n);
    setX(xValue);
  };

  const addNewRowHandler = () => {
    addRow();
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.controlPanel}>
        <div>
          <label htmlFor="m">M - </label>
          <input
            type="number"
            id="m"
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            placeholder="M (rows)"
          />
        </div>

        <div>
          <label htmlFor="n">N - </label>
          <input
            type="number"
            id="n"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            placeholder="N (columns)"
          />
        </div>
        <div>
          <label htmlFor="x">X - </label>
          <input
            type="number"
            id="x"
            value={xValue}
            onChange={(e) => setXValue(Number(e.target.value))}
            placeholder="X"
          />
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.button} onClick={handleGenerate}>
          Generate Matrix
        </button>

        <button onClick={() => addNewRowHandler()}>Add new row</button>
      </div>
    </div>
  );
};

export default ControlPanel;
