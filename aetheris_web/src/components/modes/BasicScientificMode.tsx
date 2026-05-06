import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { AetherisButton } from '../AetherisButton';
import { History, Delete, Divide, X, Minus, Plus, Equal } from 'lucide-react';

interface Props {
  mode: "BASIC" | "SCIENTIFIC";
  setMode: (mode: any) => void;
  handleInput: (val: string) => void;
  calculateResult: () => void;
  clear: () => void;
  backspace: () => void;
  setExpression: (expr: string) => void;
  isShifted: boolean;
  setIsShifted: (val: boolean) => void;
}

export const BasicScientificMode: React.FC<Props> = ({ 
  mode, setMode, handleInput, calculateResult, clear, backspace, setExpression, isShifted, setIsShifted 
}) => {
  const isScientific = mode === "SCIENTIFIC";

  const handleSciInput = (val: string) => {
    handleInput(val);
    if (isShifted) setIsShifted(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px", zIndex: 20 }}>
        <div style={{ display: "flex", backgroundColor: "#121212", borderRadius: "24px", padding: "4px", border: "1px solid #333535" }}>
          <button 
            onClick={() => setMode("BASIC")}
            className={`aetheris-btn ${mode === "BASIC" ? "aetheris-btn-primary" : ""}`}
            style={{ minHeight: "32px", width: "80px", fontSize: "10px", borderRadius: "20px", boxShadow: mode === "BASIC" ? "0 2px 4px rgba(0,0,0,0.5)" : "none", background: mode === "BASIC" ? "" : "transparent" }}
          >
            BASIC
          </button>
          <button 
            onClick={() => setMode("SCIENTIFIC")}
            className={`aetheris-btn ${mode === "SCIENTIFIC" ? "aetheris-btn-primary" : ""}`}
            style={{ minHeight: "32px", width: "80px", fontSize: "10px", borderRadius: "20px", boxShadow: mode === "SCIENTIFIC" ? "0 2px 4px rgba(0,0,0,0.5)" : "none", background: mode === "SCIENTIFIC" ? "" : "transparent" }}
          >
            SCIENTIFIC
          </button>
        </div>
      </div>

      <div className={`aetheris-grid ${isScientific ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {/* Row 1 */}
        {isScientific && (
          <AetherisButton 
            onClick={() => setIsShifted(!isShifted)} 
            className={`aetheris-btn-shift`}
            style={isShifted ? { filter: "brightness(1.2)", boxShadow: "0 0 10px #00e639" } : {}}
          >
            SHIFT
          </AetherisButton>
        )}
        <AetherisButton onClick={() => setExpression("")}><History size={20} /></AetherisButton>
        <AetherisButton onClick={backspace}><Delete size={20} /></AetherisButton>
        <AetherisButton onClick={clear} style={{ color: "#ffb4ab" }}>C</AetherisButton>
        <AetherisButton onClick={() => handleSciInput("/")} style={{ color: "#00e639" }}><Divide size={20} /></AetherisButton>

        {/* Row 2 */}
        {isScientific && (
          <AetherisButton onClick={() => handleSciInput(isShifted ? "asin(" : "sin(")} style={{ fontSize: "10px", color: "#00e639" }}>
            {isShifted ? "sin⁻¹" : "sin"}
          </AetherisButton>
        )}
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("7")}>7</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("8")}>8</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("9")}>9</AetherisButton>
        <AetherisButton onClick={() => handleSciInput("*")} style={{ color: "#00e639" }}><X size={20} /></AetherisButton>

        {/* Row 3 */}
        {isScientific && (
          <AetherisButton onClick={() => handleSciInput(isShifted ? "acos(" : "cos(")} style={{ fontSize: "10px", color: "#00e639" }}>
            {isShifted ? "cos⁻¹" : "cos"}
          </AetherisButton>
        )}
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("4")}>4</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("5")}>5</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("6")}>6</AetherisButton>
        <AetherisButton onClick={() => handleSciInput("-")} style={{ color: "#00e639" }}><Minus size={20} /></AetherisButton>

        {/* Row 4 */}
        {isScientific && (
          <AetherisButton onClick={() => handleSciInput(isShifted ? "atan(" : "tan(")} style={{ fontSize: "10px", color: "#00e639" }}>
            {isShifted ? "tan⁻¹" : "tan"}
          </AetherisButton>
        )}
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("2")}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("3")}>3</AetherisButton>
        <AetherisButton onClick={() => handleSciInput("+")} style={{ color: "#00e639" }}><Plus size={20} /></AetherisButton>

        {/* Row 5 */}
        {isScientific && (
          <AetherisButton onClick={() => handleSciInput(isShifted ? "log10(" : "log(")} style={{ fontSize: "10px", color: "#00e639" }}>
            {isShifted ? "log₁₀" : "ln"}
          </AetherisButton>
        )}
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("(")}>(</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput("0")}>0</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleSciInput(")")}>)</AetherisButton>
        {!isScientific && <AetherisButton variant="elevated-primary" onClick={() => handleSciInput(".")}>.</AetherisButton>}
        {isScientific && (
           <AetherisButton variant="elevated-tertiary" onClick={calculateResult}>
            <Equal size={24} />
          </AetherisButton>
        )}
        {!isScientific && (
          <AetherisButton variant="elevated-tertiary" onClick={calculateResult}>
            <Equal size={24} />
          </AetherisButton>
        )}

        {/* Row 6 (Scientific Only) */}
        {isScientific && (
          <>
            <AetherisButton onClick={() => handleSciInput(isShifted ? "sqrt(" : "^")} style={{ fontSize: "10px", color: "#00e639" }}>
              {isShifted ? "√" : "xʸ"}
            </AetherisButton>
            <AetherisButton onClick={() => handleSciInput("pi")}>π</AetherisButton>
            <AetherisButton onClick={() => handleSciInput("e")}>e</AetherisButton>
            <AetherisButton onClick={() => handleSciInput(".")}>.</AetherisButton>
            <AetherisButton onClick={() => handleSciInput("!")}>n!</AetherisButton>
          </>
        )}
      </div>
    </>
  );
};
