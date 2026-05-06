import React, { useState, useRef, useEffect } from 'react';
import { AetherisButton } from '../AetherisButton';
import * as math from 'mathjs';

export const GraphingMode: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [equations, setEquations] = useState<string[]>(["sin(x)"]);
  const [activeEq, setActiveEq] = useState(0);
  
  // Pan and Zoom state
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(20);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const colors = ["#00e639", "#ff00ff", "#00ffff"]; // Tertiary, Magenta, Cyan

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 + offsetX;
    const originY = height / 2 + offsetY;

    // Draw grid
    ctx.strokeStyle = "rgba(142, 145, 146, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Dynamic grid spacing based on scale
    const gridSpacing = scale > 50 ? scale / 2 : scale < 10 ? scale * 5 : scale;

    for (let x = originX % gridSpacing; x <= width; x += gridSpacing) {
      ctx.moveTo(x, 0); ctx.lineTo(x, height);
    }
    for (let y = originY % gridSpacing; y <= height; y += gridSpacing) {
      ctx.moveTo(0, y); ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Draw axes
    ctx.strokeStyle = "#8e9192";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY); ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0); ctx.lineTo(originX, height);
    ctx.stroke();

    // Draw plots
    equations.forEach((eq, index) => {
      if (!eq) return;
      ctx.strokeStyle = colors[index % colors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      try {
        const node = math.parse(eq);
        const compiled = node.compile();
        
        let prevY: number | null = null;
        let firstPoint = true;

        for (let x = 0; x <= width; x++) {
          const mathX = (x - originX) / scale;
          const mathY = compiled.evaluate({ x: mathX });
          
          if (typeof mathY !== 'number' || isNaN(mathY)) continue;
          
          const y = originY - mathY * scale;

          // Asymptote detection: if y jumps dramatically, don't connect
          if (prevY !== null && Math.abs(y - prevY) > height) {
            ctx.stroke();
            ctx.beginPath();
            firstPoint = true;
          }

          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
          prevY = y;
        }
        ctx.stroke();
      } catch (e) {
        // Invalid equation
      }
    });
  };

  useEffect(() => {
    drawGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equations, offsetX, offsetY, scale]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.1;
    const zoomFactor = e.deltaY > 0 ? (1 - zoomSensitivity) : (1 + zoomSensitivity);
    setScale(prev => Math.max(5, Math.min(200, prev * zoomFactor)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setOffsetX(prev => prev + dx);
    setOffsetY(prev => prev + dy);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const updateActiveEq = (val: string) => {
    const newEqs = [...equations];
    newEqs[activeEq] += val;
    setEquations(newEqs);
  };

  const clearEq = () => {
    const newEqs = [...equations];
    newEqs[activeEq] = "";
    setEquations(newEqs);
  };

  const deleteLast = () => {
    const newEqs = [...equations];
    newEqs[activeEq] = newEqs[activeEq].slice(0, -1);
    setEquations(newEqs);
  };

  return (
    <div className="flex flex-col gap-4 z-20 h-full">
      <div 
        className="bg-[#080808] border border-black rounded-xl overflow-hidden lcd-recess p-2 relative h-48 shrink-0 cursor-move touch-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 scanlines opacity-30 z-10 pointer-events-none"></div>
        <canvas ref={canvasRef} width={360} height={180} className="w-full h-full relative z-20 bg-[#080808]" />
        <div className="absolute bottom-2 left-2 z-30 text-[9px] text-tertiary font-button-label opacity-70 pointer-events-none">Scroll: Zoom | Drag: Pan</div>
      </div>
      
      <div className="flex gap-2 items-center text-xs font-button-label">
        {equations.map((eq, i) => (
          <div 
            key={i} 
            onClick={() => setActiveEq(i)}
            className={`cursor-pointer px-2 py-1 rounded border-b-2 ${activeEq === i ? 'border-tertiary text-tertiary font-bold' : 'border-transparent text-on-surface-variant'}`}
            style={{ color: activeEq === i ? colors[i % colors.length] : undefined, borderColor: activeEq === i ? colors[i % colors.length] : undefined }}
          >
            Y{i+1}
          </div>
        ))}
        {equations.length < 3 && (
          <button onClick={() => setEquations([...equations, ""])} className="text-on-surface-variant hover:text-tertiary">+</button>
        )}
      </div>

      <div className="bg-[#080808] border border-black lcd-recess p-3 rounded-xl relative overflow-hidden flex items-center shadow-inner">
        <div className="absolute inset-0 scanlines opacity-30 z-10 pointer-events-none"></div>
        <div 
          className="font-lcd-main w-full text-2xl relative z-20 overflow-x-auto whitespace-nowrap"
          style={{ color: colors[activeEq % colors.length] }}
        >
          Y{activeEq+1} = {equations[activeEq] || <span className="opacity-30">_</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-button-gap mt-auto">
        <AetherisButton onClick={() => updateActiveEq("x")}>x</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("sin(")}>sin</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("cos(")}>cos</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("tan(")}>tan</AetherisButton>
        
        <AetherisButton onClick={() => updateActiveEq("^")}>^</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("sqrt(")}>√</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("(")}>(</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq(")")}>)</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => updateActiveEq("1")}>1</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => updateActiveEq("2")}>2</AetherisButton>
        <AetherisButton variant="elevated-primary" onClick={() => updateActiveEq("3")}>3</AetherisButton>
        <AetherisButton onClick={deleteLast} className="text-error">DEL</AetherisButton>

        <AetherisButton variant="elevated-primary" onClick={() => updateActiveEq("0")}>0</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("+")}>+</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("-")}>-</AetherisButton>
        <AetherisButton onClick={() => updateActiveEq("*")}>*</AetherisButton>
      </div>
    </div>
  );
};
