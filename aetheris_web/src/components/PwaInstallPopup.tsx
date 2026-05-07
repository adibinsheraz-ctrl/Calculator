"use client";

import React, { useState, useEffect } from "react";
import { AetherisButton } from "./AetherisButton";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PwaInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Only show the popup if the user hasn't dismissed it in this session
      const isDismissed = sessionStorage.getItem("pwa-dismissed");
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("pwa-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 z-[100]"
        >
          <div className="pwa-popup-card">
            <div className="pwa-accent-bar"></div>
            
            <button 
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-white/30 hover:text-white/60 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 items-start mb-4">
              <div className="w-12 h-12 bg-black rounded-xl border border-white/5 flex items-center justify-center shrink-0">
                <img src="/icon.png" alt="Aetheris" className="w-10 h-10 rounded-lg" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Install Aetheris</h3>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">
                  Add Aetheris to your home screen for a full-screen, native experience.
                </p>
              </div>
            </div>

            <AetherisButton 
              variant="elevated-tertiary" 
              onClick={handleInstall}
              className="w-full py-3 flex items-center justify-center gap-2 text-xs"
            >
              <Download size={14} />
              INSTALL NOW
            </AetherisButton>
          </div>
        </motion.div>

      )}
    </AnimatePresence>
  );
};
