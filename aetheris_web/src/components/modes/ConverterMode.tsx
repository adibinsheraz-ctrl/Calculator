import React, { useState, useEffect } from 'react';
import { AetherisButton } from '../AetherisButton';

type Category = "Length" | "Weight" | "Temp" | "Currency";

const units = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048, mi: 1609.34 },
  Weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
  Temp: { C: "C", F: "F", K: "K" },
  Currency: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.12, PKR: 278.50 }
};

export const ConverterMode: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  const [category, setCategory] = useState<Category>("Length");
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [result, setResult] = useState("0");

  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>(units.Currency);

  useEffect(() => {
    if (category === "Currency") {
      fetch(`https://open.er-api.com/v6/latest/USD`)
        .then(res => res.json())
        .then(data => {
          if (data && data.rates) {
            setCurrencyRates(data.rates);
          }
        })
        .catch((err) => console.error("Currency fetch failed:", err));
    }
  }, [category, apiKey]);

  useEffect(() => {
    const val = parseFloat(amount) || 0;
    if (category === "Temp") {
      let c = 0;
      if (fromUnit === "C") c = val;
      else if (fromUnit === "F") c = (val - 32) * 5/9;
      else if (fromUnit === "K") c = val - 273.15;

      let res = 0;
      if (toUnit === "C") res = c;
      else if (toUnit === "F") res = (c * 9/5) + 32;
      else if (toUnit === "K") res = c + 273.15;
      
      setResult(res.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }));
    } else {
      let rates: any = units[category as keyof typeof units];
      if (category === "Currency") rates = currencyRates;

      const baseVal = val / rates[fromUnit]; // Convert to base (USD for currency)
      const finalVal = baseVal * rates[toUnit]; // Convert from base
      
      setResult(finalVal.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 6 
      }));
    }
  }, [amount, fromUnit, toUnit, category, currencyRates]);


  const handleCatChange = (cat: Category) => {
    setCategory(cat);
    const keys = Object.keys(cat === "Currency" ? currencyRates : units[cat]);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
    setAmount("0");
  };

  const handleInput = (val: string) => {
    if (val === "DEL") {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (val === "CLR") {
      setAmount("0");
    } else {
      setAmount(prev => (prev === "0" && val !== ".") ? val : prev + val);
    }
  };

  const cycleFromUnit = () => {
    const keys = Object.keys(category === "Currency" ? currencyRates : units[category]);
    const idx = keys.indexOf(fromUnit);
    setFromUnit(keys[(idx + 1) % keys.length]);
  };

  const cycleToUnit = () => {
    const keys = Object.keys(category === "Currency" ? currencyRates : units[category]);
    const idx = keys.indexOf(toUnit);
    setToUnit(keys[(idx + 1) % keys.length]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", zIndex: 20, height: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
        {(["Length", "Weight", "Temp", "Currency"] as Category[]).map(c => (
          <button key={c} onClick={() => handleCatChange(c)} style={{ padding: "8px 4px", fontSize: "clamp(8px, 2vw, 10px)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: category === c ? "#00e639" : "rgba(255,255,255,0.05)", color: category === c ? "#003907" : "#c4c7c7", fontWeight: category === c ? "bold" : "normal", transition: "all 0.2s" }}>{c.toUpperCase().slice(0,4)}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", backgroundColor: "#080808", borderRadius: "12px", padding: "12px", border: "1px solid #000", position: "relative", flexShrink: 0 }}>
        <div className="lcd-scanlines" style={{ opacity: 0.2 }}></div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 20 }}>
          <div style={{ fontSize: "9px", letterSpacing: "1px", color: "rgba(0, 230, 57, 0.4)" }}>FROM:</div>
          <div style={{ color: "#00e639", fontSize: "20px", fontWeight: "bold" }}>{amount}</div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 20, marginTop: "8px", paddingTop: "8px", borderTop: "1px solid rgba(0, 230, 57, 0.1)" }}>
          <div style={{ fontSize: "9px", letterSpacing: "1px", color: "rgba(0, 230, 57, 0.4)" }}>TO:</div>
          <div style={{ color: "#00e639", fontSize: "20px", fontWeight: "bold", textShadow: "0 0 10px rgba(0, 230, 57, 0.5)" }}>{result}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", flexShrink: 0 }}>
        <AetherisButton onClick={cycleFromUnit} style={{ minHeight: "40px", fontSize: "11px" }}>UNIT 1: {fromUnit.toUpperCase()}</AetherisButton>
        <AetherisButton onClick={cycleToUnit} style={{ minHeight: "40px", fontSize: "11px" }}>UNIT 2: {toUnit.toUpperCase()}</AetherisButton>
      </div>

      <div className="aetheris-grid grid-cols-4" style={{ marginTop: "auto" }}>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("7")}>7</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("8")}>8</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("9")}>9</AetherisButton>
        <AetherisButton onClick={() => handleInput("CLR")} style={{ color: "#ffb4ab", fontSize: "12px" }}>CLR</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("4")}>4</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("5")}>5</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("6")}>6</AetherisButton>
        <AetherisButton onClick={() => handleInput("DEL")} style={{ color: "#00e639", fontSize: "12px" }}>DEL</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("2")}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput("3")}>3</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => handleInput(".")} style={{ gridRow: "span 2", minHeight: "100%" }}>.</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => handleInput("0")} style={{ gridColumn: "span 3" }}>0</AetherisButton>
      </div>
    </div>
  );
};
