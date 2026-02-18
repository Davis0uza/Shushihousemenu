import React, { useRef } from "react";

// ARViewer Component using <model-viewer>
// Ensure <model-viewer> script is included in index.html

interface ARViewerProps {
  modelUrl: string;
  iosModelUrl?: string;
  posterUrl?: string; // Image to show while loading
  altText: string;
}

export const ARViewer: React.FC<ARViewerProps> = ({
  modelUrl,
  iosModelUrl,
  posterUrl,
  altText,
}) => {
  const modelViewerRef = useRef<HTMLElement>(null);

  return (
    <div
      className="ar-viewer-container"
      style={{
        width: "100%",
        height: "100%", // Changed to 100% to fill parent logic
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {React.createElement(
        "model-viewer",
        {
          ref: modelViewerRef,
          src: modelUrl,
          "ios-src": iosModelUrl,
          poster: posterUrl,
          alt: altText,
          "shadow-intensity": "1",
          "camera-controls": true,
          "auto-rotate": true,
          ar: true,
          "ar-modes": "webxr scene-viewer quick-look", // Prioritize WebXR for seamless browser experience
          "ar-scale": "auto",
          "ar-placement": "floor",
          "touch-action": "pan-y",
          loading: "eager", // Load model immediately when component mounts
          "seamless-poster": true, // Smooth transition from image to model
          "environment-image": "neutral", // Consistent lighting across devices
          "skybox-image": "/images/restaurant_env.jpg", // 360 Environment (Local)
          exposure: "1",
          "camera-orbit": "45deg 55deg 2.5m", // Lower angle (table view) instead of top-down
          "field-of-view": "30deg", // Slight zoom for better framing
          style: { width: "100%", height: "100%" },
        } as any,
        <div
          slot="ar-prompt"
          style={{
            position: "absolute",
            top: "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            background: "rgba(0,0,0,0.8)",
            padding: "12px 24px",
            borderRadius: "30px",
            pointerEvents: "none",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            zIndex: 9999,
            width: "200px",
          }}
        >
          👇 Toque para fixar o prato!
        </div>,
        <div
          slot="ar-button"
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #dadce0",
            padding: "8px 16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
            fontFamily: "sans-serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#4285f4",
            zIndex: 100,
          }}
        >
          Toque para ver em AR 🧊
        </div>,
      )}
    </div>
  );
};
