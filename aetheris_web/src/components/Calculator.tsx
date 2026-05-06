"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { create, all } from "mathjs";
import { AetherisButton } from "./AetherisButton";
import { Settings, Menu, Calculator as CalcIcon, FlaskConical, Terminal, LineChart, Grid3x3, BarChart, ArrowRightLeft } from "lucide-react";
import { BasicScientificMode } from "./modes/BasicScientificMode";
import { ProgrammerMode } from "./modes/ProgrammerMode";
import { GraphingMode } from "./modes/GraphingMode";
import { MatrixMode } from "./modes/MatrixMode";
import { StatisticsMode } from "./modes/StatisticsMode";
import { ConverterMode } from "./modes/ConverterMode";

// Create a configured mathjs instance with 64-bit BigNumber precision
const math = create(all, { number: 'BigNumber', precision: 64 });

type Mode = "BASIC" | "SCIENTIFIC" | "PROGRAMMER" | "GRAPHING" | "MATRIX" | "STATISTICS" | "CONVERTER" | "ABOUT";

export const Calculator = ({ apiKey = "AIzaSyDRjfZ3Dga_wL5V0asSCaXIE4w4hsQ3ZEs" }: { apiKey?: string }) => {
  const [mode, setMode] = useState<Mode>("BASIC");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<{expr: string, res: string}[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShifted, setIsShifted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Math Logic Controller (Shared)
  const handleInput = (val: string) => {
    if (result !== "0" && result !== "Error" && expression === "") {
      if (/[+\-*/&|^~<>]/.test(val)) {
        setExpression(result + val);
      } else {
        setExpression(val);
      }
      setResult("0");
    } else {
      setExpression(prev => prev + val);
    }
  };

  const calculateResult = () => {
    try {
      if (!expression) return;
      let sanitizedExpr = expression.replace(/×/g, "*").replace(/÷/g, "/");
      const evaluated = math.evaluate(sanitizedExpr);
      const formattedResult = math.format(evaluated, { precision: 14 });
      setHistory(prev => [...prev.slice(-4), { expr: expression, res: formattedResult }]);
      setResult(formattedResult);
      setExpression("");
    } catch (e) {
      setResult("Error");
    }
  };

  const clear = () => {
    setExpression("");
    setResult("0");
  };

  const backspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const isStandardLCD = ["BASIC", "SCIENTIFIC", "PROGRAMMER"].includes(mode);

  return (
    <div className="aetheris-chassis">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "48px", zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Menu className="cursor-pointer" style={{ color: "#c4c7c7", width: "24px", height: "24px" }} onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
          <h1 style={{ fontSize: "clamp(16px, 5vw, 20px)", fontWeight: "bold", letterSpacing: "2px", color: "#e2e2e2", margin: 0 }}>AETHERIS</h1>
        </div>
        <Settings className="cursor-pointer" style={{ color: "#c4c7c7", width: "20px" }} onClick={() => setMode("ABOUT")} />
      </header>

      {isStandardLCD && (
        <section className="aetheris-lcd">
          <div className="lcd-scanlines"></div>
          <div className="lcd-grid-pattern"></div>
          
          <div className="lcd-status-bar">
            <div>DEG | MATH | FIX</div>
            {isShifted && <div style={{ color: "#00e639" }}>SHIFT</div>}
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", opacity: 0.6, zIndex: 20, overflow: "hidden", fontSize: "11px", color: "#c4c7c7", flexGrow: 1 }}>
            {history.slice(-2).map((h, i) => (
              <div key={i}>{h.expr} = {h.res}</div>
            ))}
            <div style={{ color: "#00e639", marginTop: "4px" }}>{expression}</div>
          </div>

          <div className="lcd-glow-text">
            {result}
          </div>
        </section>
      )}

      {mode === "ABOUT" && (
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "16px", zIndex: 20, padding: "20px" }}>
          <h2 style={{ fontSize: "24px", color: "#00e639" }}>ADIAGENCY</h2>
          <div style={{ color: "#c4c7c7", fontSize: "14px" }}>
            <p>Aetheris Physical Product Plate</p>
            <p>Lead Developer: ADI BIN SHERAZ</p>
            <p>adi.binsheraz@gmail.com</p>
          </div>
          <AetherisButton onClick={() => setMode("BASIC")} style={{ width: "100%", padding: "12px", marginTop: "20px" }}>Back to Calculator</AetherisButton>
        </div>
      )}

      {(mode === "BASIC" || mode === "SCIENTIFIC") && (
        <BasicScientificMode 
          mode={mode} 
          setMode={setMode} 
          handleInput={handleInput} 
          calculateResult={calculateResult} 
          clear={clear} 
          backspace={backspace} 
          setExpression={setExpression}
          isShifted={isShifted}
          setIsShifted={setIsShifted}
        />
      )}

      {mode === "PROGRAMMER" && (
        <ProgrammerMode handleInput={handleInput} clear={clear} backspace={backspace} setExpression={setExpression} result={result} setResult={setResult} />
      )}

      {mode === "GRAPHING" && <div style={{ flexGrow: 1, marginTop: "16px", minHeight: 0 }}><GraphingMode /></div>}
      {mode === "MATRIX" && <div style={{ flexGrow: 1, marginTop: "16px", minHeight: 0 }}><MatrixMode /></div>}
      {mode === "STATISTICS" && <div style={{ flexGrow: 1, marginTop: "16px", minHeight: 0 }}><StatisticsMode /></div>}
      {mode === "CONVERTER" && <div style={{ flexGrow: 1, marginTop: "16px", minHeight: 0 }}><ConverterMode apiKey={apiKey} /></div>}

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.nav 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", backgroundColor: "#1e2020", borderTop: "1px solid #444748", padding: "clamp(16px, 5vw, 24px)", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", boxShadow: "0 -10px 50px rgba(0,0,0,0.5)", zIndex: 100, boxSizing: "border-box" }}
          >
            <div style={{ width: "40px", height: "4px", backgroundColor: "#444748", borderRadius: "2px", margin: "0 auto 24px", cursor: "pointer" }} onClick={() => setIsDrawerOpen(false)}></div>
            <h2 style={{ color: "#e2e2e2", fontSize: "18px", marginBottom: "16px", fontWeight: "600" }}>MODES</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { m: "BASIC", label: "Basic" },
                { m: "SCIENTIFIC", label: "Scientific" },
                { m: "PROGRAMMER", label: "Programmer" },
                { m: "GRAPHING", label: "Graphing" },
                { m: "MATRIX", label: "Matrix" },
                { m: "STATISTICS", label: "Statistics" },
                { m: "CONVERTER", label: "Converter" },
              ].map(item => (
                <div key={item.m} onClick={() => {setMode(item.m as Mode); setIsDrawerOpen(false);}} style={{ padding: "14px", backgroundColor: mode === item.m ? "#121212" : "rgba(255,255,255,0.03)", color: mode === item.m ? "#00e639" : "#c4c7c7", borderRadius: "12px", cursor: "pointer", fontWeight: mode === item.m ? "bold" : "500", fontSize: "14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
