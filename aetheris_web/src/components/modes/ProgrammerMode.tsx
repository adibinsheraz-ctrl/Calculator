import React, { useState } from 'react';
import { AetherisButton } from '../AetherisButton';
import { Delete, X, Minus, Plus, Equal, Divide } from 'lucide-react';

interface Props {
  handleInput: (val: string) => void;
  clear: () => void;
  backspace: () => void;
  setExpression: (expr: string) => void;
  result: string;
  setResult: (res: string) => void;
}

export const ProgrammerMode: React.FC<Props> = ({ handleInput, clear, backspace, setExpression, result, setResult }) => {
  const [base, setBase] = useState<"HEX" | "DEC" | "OCT" | "BIN">("DEC");
  const [expr, setExpr] = useState("");

  // Use BigInt for 64-bit precision
  const safeEvaluateBigInt = (expression: string) => {
    try {
      const sanitized = expression.replace(/AND/g, '&').replace(/OR/g, '|').replace(/XOR/g, '^').replace(/NOT/g, '~').replace(/LSH/g, '<<').replace(/RSH/g, '>>');
      
      const bigIntExpr = sanitized.replace(/\b\d+\b/g, (match) => match + 'n');
      
      if (!/^[0-9n\s\+\-\*\/\&\^\|\~\<\>]+$/.test(bigIntExpr)) return "Error";
      
      // eslint-disable-next-line no-new-func
      const func = new Function(`return ${bigIntExpr}`);
      const res = func();
      
      // Apply 64-bit mask for true 64-bit emulation
      const mask64 = (1n << 64n) - 1n;
      const maskedRes = BigInt(res) & mask64;
      
      return maskedRes.toString();
    } catch {
      return "Error";
    }
  };

  const handleProgrammerInput = (val: string) => {
    setExpr(prev => prev + val);
  };

  const handleCalc = () => {
    if (!expr) return;
    const evaluated = safeEvaluateBigInt(expr);
    setResult(evaluated);
    setExpr("");
  };

  const handleClear = () => {
    setExpr("");
    clear();
  };

  const handleBackspace = () => {
    setExpr(prev => prev.slice(0, -1));
  };

  const convertValue = (val: string, targetBase: "HEX" | "DEC" | "OCT" | "BIN") => {
    try {
      if (!val || val === "Error") return "0";
      // Ensure we parse as BigInt
      const num = BigInt(val);
      if (targetBase === "HEX") return num.toString(16).toUpperCase();
      if (targetBase === "OCT") return num.toString(8);
      if (targetBase === "BIN") return num.toString(2);
      return num.toString(10);
    } catch {
      return "0";
    }
  };

  // Sync expression to upper LCD
  React.useEffect(() => {
    setExpression(expr);
  }, [expr, setExpression]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", zIndex: 20 }}>
      <div style={{ marginTop: "16px", marginBottom: "8px", display: "flex", justifyContent: "space-between", gap: "4px", zIndex: 20, width: "100%", fontSize: "clamp(8px, 2.5vw, 10px)", color: "#c4c7c7" }}>
        <div onClick={() => setBase("HEX")} style={{ cursor: "pointer", padding: "4px", borderRadius: "4px", width: "25%", textAlign: "center", backgroundColor: base === "HEX" ? "#00e639" : "rgba(255,255,255,0.05)", color: base === "HEX" ? "#003907" : "#c4c7c7", fontWeight: base === "HEX" ? "bold" : "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>HEX<br/>{convertValue(result, "HEX")}</div>
        <div onClick={() => setBase("DEC")} style={{ cursor: "pointer", padding: "4px", borderRadius: "4px", width: "25%", textAlign: "center", backgroundColor: base === "DEC" ? "#00e639" : "rgba(255,255,255,0.05)", color: base === "DEC" ? "#003907" : "#c4c7c7", fontWeight: base === "DEC" ? "bold" : "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>DEC<br/>{convertValue(result, "DEC")}</div>
        <div onClick={() => setBase("OCT")} style={{ cursor: "pointer", padding: "4px", borderRadius: "4px", width: "25%", textAlign: "center", backgroundColor: base === "OCT" ? "#00e639" : "rgba(255,255,255,0.05)", color: base === "OCT" ? "#003907" : "#c4c7c7", fontWeight: base === "OCT" ? "bold" : "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>OCT<br/>{convertValue(result, "OCT")}</div>
        <div onClick={() => setBase("BIN")} style={{ cursor: "pointer", padding: "4px", borderRadius: "4px", width: "25%", textAlign: "center", backgroundColor: base === "BIN" ? "#00e639" : "rgba(255,255,255,0.05)", color: base === "BIN" ? "#003907" : "#c4c7c7", fontWeight: base === "BIN" ? "bold" : "normal", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>BIN<br/>{convertValue(result, "BIN")}</div>
      </div>

      <div className="aetheris-grid grid-cols-4" style={{ marginTop: "8px" }}>
        <AetherisButton onClick={() => handleProgrammerInput("A")} disabled={base !== "HEX"}>A</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("B")} disabled={base !== "HEX"}>B</AetherisButton>
        <AetherisButton onClick={handleBackspace}><Delete size={20} /></AetherisButton>
        <AetherisButton onClick={handleClear} style={{ color: "#ffb4ab" }}>C</AetherisButton>

        <AetherisButton onClick={() => handleProgrammerInput("C")} disabled={base !== "HEX"}>C</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("D")} disabled={base !== "HEX"}>D</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput(" AND ")} style={{ color: "#00e639", fontSize: "12px" }}>AND</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput(" OR ")} style={{ color: "#00e639", fontSize: "12px" }}>OR</AetherisButton>

        <AetherisButton onClick={() => handleProgrammerInput("E")} disabled={base !== "HEX"}>E</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("F")} disabled={base !== "HEX"}>F</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput(" XOR ")} style={{ color: "#00e639", fontSize: "12px" }}>XOR</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput(" NOT ")} style={{ color: "#00e639", fontSize: "12px" }}>NOT</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("7")} disabled={base === "BIN"}>7</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("8")} disabled={base === "BIN" || base === "OCT"}>8</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("9")} disabled={base === "BIN" || base === "OCT"}>9</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("/")} style={{ color: "#00e639" }}><Divide size={20} /></AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("4")} disabled={base === "BIN"}>4</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("5")} disabled={base === "BIN"}>5</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("6")} disabled={base === "BIN"}>6</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("*")} style={{ color: "#00e639" }}><X size={20} /></AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("2")} disabled={base === "BIN"}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("3")} disabled={base === "BIN"}>3</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("-")} style={{ color: "#00e639" }}><Minus size={20} /></AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput(" LSH ")} style={{ color: "#00e639", fontSize: "12px" }}>LSH</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput("0")}>0</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleProgrammerInput(" RSH ")} style={{ color: "#00e639", fontSize: "12px" }}>RSH</AetherisButton>
        <AetherisButton onClick={() => handleProgrammerInput("+")} style={{ color: "#00e639" }}><Plus size={20} /></AetherisButton>

        <div style={{ gridColumn: "span 4" }}>
          <AetherisButton variant="elevated-tertiary" onClick={handleCalc}>
            <Equal size={24} />
          </AetherisButton>
        </div>
      </div>
    </div>
  );
};
