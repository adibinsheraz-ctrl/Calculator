import React, { useState } from 'react';
import { AetherisButton } from '../AetherisButton';
import * as math from 'mathjs';
import { X } from 'lucide-react';

export const StatisticsMode: React.FC = () => {
  const [dataset, setDataset] = useState<number[]>([]);
  const [currentInput, setCurrentInput] = useState("0");

  const handleInput = (val: string) => {
    if (val === "DEL") {
      setCurrentInput(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else {
      setCurrentInput(prev => (prev === "0" && val !== ".") ? val : prev + val);
    }
  };

  const addData = () => {
    if (currentInput !== "0" && currentInput !== "") {
      setDataset([...dataset, Number(currentInput)]);
      setCurrentInput("0");
    }
  };

  const removeData = (index: number) => {
    setDataset(dataset.filter((_, i) => i !== index));
  };

  const clearData = () => {
    setDataset([]);
    setCurrentInput("0");
  };

  let stats = { mean: 0, median: 0, std: 0, variance: 0, mode: [0] as any[], q1: 0, q3: 0, iqr: 0 };
  
  if (dataset.length > 0) {
    stats.mean = Number(math.mean(dataset)) || 0;
    stats.median = Number(math.median(dataset)) || 0;
    stats.std = Number(math.std(dataset)) || 0;
    stats.variance = Number(math.variance(dataset)) || 0;
    
    const computedMode = math.mode(dataset);
    stats.mode = Array.isArray(computedMode) ? computedMode : [computedMode];
    
    if (dataset.length >= 4) {
      stats.q1 = Number(math.quantileSeq(dataset, 0.25)) || 0;
      stats.q3 = Number(math.quantileSeq(dataset, 0.75)) || 0;
      stats.iqr = stats.q3 - stats.q1;
    }
  }

  return (
    <div className="flex flex-col gap-3 z-20 h-full">
      <div className="aetheris-lcd" style={{ minHeight: "50px", height: "auto", padding: "12px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
        <div className="lcd-scanlines"></div>
        <div className="lcd-grid-pattern"></div>
        <div style={{ fontSize: "9px", color: "rgba(0, 230, 57, 0.5)", letterSpacing: "0.2em", marginBottom: "4px" }}>STAGING</div>
        <div style={{ fontSize: "24px", color: "#00e639", fontWeight: "600", position: "relative", zIndex: 20 }}>
          {currentInput}
        </div>
      </div>

      <div className="aetheris-lcd" style={{ height: "96px", marginTop: "12px", padding: "12px", overflowY: "auto" }}>
        <div className="lcd-scanlines"></div>
        <div className="lcd-grid-pattern"></div>
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {dataset.map((val, i) => (
            <div key={i} style={{ backgroundColor: "#1e2020", color: "#00e639", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", border: "1px solid rgba(0, 230, 57, 0.2)", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>{val}</span>
              <X size={12} style={{ cursor: "pointer", opacity: 0.6 }} onClick={() => removeData(i)} />
            </div>
          ))}
          {dataset.length === 0 && <span style={{ opacity: 0.4, fontSize: "10px" }}>DATASET EMPTY</span>}
        </div>
      </div>

      <div className="aetheris-grid grid-cols-2" style={{ gap: "8px", paddingTop: "12px" }}>
        {[
          { label: "MEAN", value: math.round(stats.mean, 4) },
          { label: "MEDIAN", value: math.round(stats.median, 4) },
          { label: "STD DEV", value: math.round(stats.std, 4) },
          { label: "MODE", value: stats.mode.join(", ") || 0 },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: "#121212", padding: "8px", borderRadius: "8px", border: "1px solid #333535", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "9px", opacity: 0.6 }}>{s.label}</span>
            <span style={{ color: "#00e639", fontSize: "12px" }}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="aetheris-grid grid-cols-4" style={{ marginTop: "auto" }}>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("7")}>7</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("8")}>8</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("9")}>9</AetherisButton>
        <AetherisButton onClick={clearData} style={{ color: "#ffb4ab" }}>CLR</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("4")}>4</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("5")}>5</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("6")}>6</AetherisButton>
        <AetherisButton onClick={() => handleInput("DEL")} style={{ color: "#00e639" }}>DEL</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("2")}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("3")}>3</AetherisButton>
        <div style={{ gridRow: "span 2" }}>
          <AetherisButton variant="elevated-tertiary" onClick={addData} style={{ height: "100%" }}>ADD</AetherisButton>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <AetherisButton variant="elevated-primary" onClick={() => handleInput("0")}>0</AetherisButton>
        </div>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput(".")}>.</AetherisButton>
      </div>
    </div>
  );
};
