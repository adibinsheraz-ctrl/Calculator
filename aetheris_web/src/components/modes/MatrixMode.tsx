import React, { useState } from 'react';
import { AetherisButton } from '../AetherisButton';
import * as math from 'mathjs';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const MatrixMode: React.FC = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrixA, setMatrixA] = useState<string[][]>([["0", "0"], ["0", "0"]]);
  const [result, setResult] = useState<any>(null);
  
  const [activeR, setActiveR] = useState(0);
  const [activeC, setActiveC] = useState(0);

  const resize = (r: number, c: number) => {
    if (r < 1 || r > 4 || c < 1 || c > 4) return;
    setRows(r);
    setCols(c);
    const newM = Array(r).fill("0").map(() => Array(c).fill("0"));
    for (let i = 0; i < Math.min(r, matrixA.length); i++) {
      for (let j = 0; j < Math.min(c, matrixA[0].length); j++) {
        newM[i][j] = matrixA[i][j];
      }
    }
    setMatrixA(newM);
    setResult(null);
    if (activeR >= r) setActiveR(r - 1);
    if (activeC >= c) setActiveC(c - 1);
  };

  const handleInput = (val: string) => {
    const newM = [...matrixA];
    let current = newM[activeR][activeC];
    
    if (val === "DEL") {
      newM[activeR][activeC] = current.length > 1 ? current.slice(0, -1) : "0";
    } else {
      if (current === "0" && val !== ".") {
        newM[activeR][activeC] = val;
      } else {
        newM[activeR][activeC] = current + val;
      }
    }
    setMatrixA(newM);
  };

  const getNumericMatrix = () => matrixA.map(row => row.map(cell => Number(cell) || 0));

  const calcDeterminant = () => { try { setResult(math.det(getNumericMatrix())); } catch { setResult("Error: Non-square"); } };
  const calcInverse = () => { try { setResult(math.inv(getNumericMatrix())); } catch { setResult("Error: Singular/Non-square"); } };
  const calcTranspose = () => { try { setResult(math.transpose(getNumericMatrix())); } catch { setResult("Error"); } };
  const calcTrace = () => { try { setResult(math.trace(getNumericMatrix())); } catch { setResult("Error: Non-square"); } };

  return (
    <div className="flex flex-col gap-3 z-20 h-full">
      <div className="flex justify-between items-center font-button-label text-on-surface-variant text-[10px]">
        <span>DIM: {rows}x{cols}</span>
        <div className="flex gap-1">
          <button onClick={() => resize(rows - 1, cols)} className="px-2 py-1 bg-surface-container rounded hover:bg-surface-bright">-R</button>
          <button onClick={() => resize(rows + 1, cols)} className="px-2 py-1 bg-surface-container rounded hover:bg-surface-bright">+R</button>
          <button onClick={() => resize(rows, cols - 1)} className="px-2 py-1 bg-surface-container rounded hover:bg-surface-bright">-C</button>
          <button onClick={() => resize(rows, cols + 1)} className="px-2 py-1 bg-surface-container rounded hover:bg-surface-bright">+C</button>
        </div>
      </div>

      <div className="aetheris-lcd" style={{ minHeight: "100px", height: "auto", padding: "8px" }}>
        <div className="lcd-scanlines"></div>
        <div className="lcd-grid-pattern"></div>
        <div className="aetheris-grid relative z-20" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "4px", paddingTop: "0" }}>
          {matrixA.map((row, r) => 
            row.map((cell, c) => (
              <div 
                key={`${r}-${c}`}
                onClick={() => { setActiveR(r); setActiveC(c); }}
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  padding: "4px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: activeR === r && activeC === c ? "#00e639" : "rgba(0, 230, 57, 0.4)",
                  backgroundColor: activeR === r && activeC === c ? "rgba(0, 230, 57, 0.1)" : "transparent",
                  border: activeR === r && activeC === c ? "1px solid #00e639" : "1px solid transparent",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="aetheris-lcd" style={{ height: "80px", marginTop: "12px", padding: "8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="lcd-scanlines"></div>
        <div className="lcd-grid-pattern"></div>
        <div style={{ position: "relative", zIndex: 20, color: "#00e639", fontSize: "12px" }}>
          {result !== null ? (
            Array.isArray(result) ? (
              result.map((row: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  {row.map((val: any, j: number) => (
                    <span key={j} style={{ textAlign: "center", flexGrow: 1 }}>{typeof val === 'number' ? math.round(val, 4) : val}</span>
                  ))}
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>{typeof result === 'number' ? math.round(result, 4) : result}</div>
            )
          ) : <div style={{ textAlign: "center", opacity: 0.4 }}>OUTPUT</div>}
        </div>
      </div>

      <div className="aetheris-grid grid-cols-4" style={{ marginTop: "12px" }}>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("7")}>7</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("8")}>8</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("9")}>9</AetherisButton>
        <AetherisButton onClick={() => setActiveR(Math.max(0, activeR - 1))} style={{ color: "#00e639" }}><ArrowUp size={20}/></AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("4")}>4</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("5")}>5</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("6")}>6</AetherisButton>
        <AetherisButton onClick={() => setActiveR(Math.min(rows - 1, activeR + 1))} style={{ color: "#00e639" }}><ArrowDown size={20}/></AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("2")}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("3")}>3</AetherisButton>
        <AetherisButton onClick={() => setActiveC(Math.max(0, activeC - 1))} style={{ color: "#00e639" }}><ArrowLeft size={20}/></AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("0")}>0</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("-")}>-</AetherisButton>
        <AetherisButton onClick={() => handleInput("DEL")} style={{ color: "#ffb4ab" }}>DEL</AetherisButton>
        <AetherisButton onClick={() => setActiveC(Math.min(cols - 1, activeC + 1))} style={{ color: "#00e639" }}><ArrowRight size={20}/></AetherisButton>

        <AetherisButton onClick={calcDeterminant} style={{ fontSize: "10px", minHeight: "40px" }}>DET</AetherisButton>
        <AetherisButton onClick={calcInverse} style={{ fontSize: "10px", minHeight: "40px" }}>INV</AetherisButton>
        <AetherisButton onClick={calcTranspose} style={{ fontSize: "10px", minHeight: "40px" }}>TRANS</AetherisButton>
        <AetherisButton onClick={calcTrace} style={{ fontSize: "10px", minHeight: "40px" }}>TRACE</AetherisButton>
      </div>
    </div>
  );
};
