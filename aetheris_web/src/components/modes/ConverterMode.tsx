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
      fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then(res => res.json())
        .then(data => setCurrencyRates(data.rates))
        .catch(() => {});
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
      
      setResult(res.toFixed(2));
    } else {
      let rates: any = units[category as keyof typeof units];
      if (category === "Currency") rates = currencyRates;

      const baseVal = val * rates[fromUnit];
      const finalVal = baseVal / rates[toUnit];
      setResult(finalVal.toFixed(4));
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
    <div className="flex flex-col gap-3 z-20 h-full font-button-label">
      <div className="grid grid-cols-4 gap-1">
        {(["Length", "Weight", "Temp", "Currency"] as Category[]).map(c => (
          <button key={c} onClick={() => handleCatChange(c)} className={`py-2 text-[10px] rounded-xl border transition-all ${category === c ? 'bg-tertiary text-[#003907] border-tertiary shadow-lg font-bold tracking-wider' : 'bg-surface-container text-on-surface-variant border-outline-variant/20 hover:bg-surface-container-high'}`}>{c.toUpperCase().slice(0,4)}</button>
        ))}
      </div>

      <div className="flex flex-col gap-2 bg-[#080808] lcd-recess p-3 rounded-xl border border-black relative shrink-0">
        <div className="absolute inset-0 scanlines opacity-30 z-10 pointer-events-none rounded-xl"></div>
        <div className="absolute inset-0 lcd-grid opacity-10 z-10 pointer-events-none rounded-xl"></div>
        
        <div className="flex justify-between items-center relative z-20">
          <div className="text-[10px] tracking-widest text-tertiary/50">FROM:</div>
          <div className="text-tertiary font-lcd-main text-2xl truncate">{amount}</div>
        </div>
        
        <div className="flex justify-between items-center relative z-20 mt-2 pt-2 border-t border-tertiary/10">
          <div className="text-[10px] tracking-widest text-tertiary/50">TO:</div>
          <div className="text-tertiary font-lcd-main text-2xl truncate lcd-glow">{result}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 shrink-0">
        <AetherisButton onClick={cycleFromUnit} className="h-10 text-xs">UNIT 1: {fromUnit.toUpperCase()}</AetherisButton>
        <AetherisButton onClick={cycleToUnit} className="h-10 text-xs">UNIT 2: {toUnit.toUpperCase()}</AetherisButton>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-auto">
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("7")}>7</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("8")}>8</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("9")}>9</AetherisButton>
        <AetherisButton className="text-xs h-12 text-error" onClick={() => handleInput("CLR")}>CLR</AetherisButton>

        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("4")}>4</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("5")}>5</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("6")}>6</AetherisButton>
        <AetherisButton className="text-xs h-12 text-tertiary" onClick={() => handleInput("DEL")}>DEL</AetherisButton>

        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("2")}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-12" onClick={() => handleInput("3")}>3</AetherisButton>
        <AetherisButton variant="elevated-primary" className="text-sm h-[104px] row-span-2" onClick={() => handleInput(".")}>.</AetherisButton>

        <AetherisButton variant="elevated-primary" className="text-sm h-12 col-span-3" onClick={() => handleInput("0")}>0</AetherisButton>
      </div>
    </div>
  );
};
