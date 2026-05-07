"use client";

import React from "react";
import { AetherisButton } from "../AetherisButton";
import { Globe, Github, Mail, ShieldCheck, Cpu, Code2 } from "lucide-react";
import { motion } from "framer-motion";

interface AboutModeProps {
  onBack: () => void;
}

export const AboutMode: React.FC<AboutModeProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="about-screen-container"
    >
      <div className="product-plate">
        <div className="plate-header">
          <div className="status-indicator">
            <div className="status-led"></div>
            <span>SYSTEM ACTIVE</span>
          </div>
          <div className="serial-number">SN: AE-2024-05-07</div>
        </div>

        <div className="plate-content">
          <h2 className="brand-title">ADIAGENCY</h2>
          <p className="product-tagline">Aetheris Professional Computational Unit</p>
          
          <div className="specs-grid">
            <div className="spec-item">
              <ShieldCheck size={14} className="text-tertiary" />
              <span>Version 1.0.4</span>
            </div>
            <div className="spec-item">
              <Cpu size={14} className="text-tertiary" />
              <span>Next.js 14 Engine</span>
            </div>
            <div className="spec-item">
              <Code2 size={14} className="text-tertiary" />
              <span>Math.js Powered</span>
            </div>
          </div>

          <div className="dev-section">
            <div className="dev-label">LEAD DEVELOPER</div>
            <div className="dev-name">ADI BIN SHERAZ</div>
          </div>

          <div className="links-container">
            <a href="https://adibinsheraz.netlify.app" target="_blank" rel="noopener noreferrer" className="plate-link">
              <Globe size={18} />
              <span>Website</span>
            </a>
            <a href="https://github.com/adibinsheraz-ctrl" target="_blank" rel="noopener noreferrer" className="plate-link">
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href="mailto:adi.binsheraz@gmail.com" className="plate-link">
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="plate-footer">
          <AetherisButton onClick={onBack} variant="elevated-primary" className="w-full py-3">
            RETURN TO INTERFACE
          </AetherisButton>
        </div>
      </div>
      
      <div className="tech-footer">
        &copy; 2026 ADI BIN SHERAZ. ALL RIGHTS RESERVED.
      </div>
    </motion.div>
  );
};
