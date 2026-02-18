import React, { useRef } from "react";

// ARViewer Component using <model-viewer>
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
  const modelViewerRef = useRef<any>(null);

  return (
    <div
      className="ar-viewer-container"
      style={{
        width: "100%",
        height: "100%",
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
          ar: true,
          "ar-modes": "webxr scene-viewer quick-look", // Prefer WebXR for custom prompt support
          "ar-scale": "auto", // Allow user scaling
          "ar-placement": "floor", // Surface tracking
          "touch-action": "pan-y",
          loading: "eager",
          "seamless-poster": true,
          "environment-image": "neutral",
          "skybox-image": "/images/restaurant_env.jpg",
          exposure: "1",
          "camera-orbit": "0deg 75deg auto", // 3D View: Grounded angle
          "interaction-prompt": "auto", // Enable prompt so our custom slot shows
          "interaction-prompt-threshold": "0", // Show prompt immediately
          style: { width: "100%", height: "100%" },
        } as any,
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
        /* Custom AR Prompt (Reticle) - Shows when waiting for interaction */
        <div
          slot="ar-prompt"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* Reticle Box */}
          <div
            style={{
              width: "250px",
              height: "250px",
              border: "3px dashed rgba(255, 255, 255, 0.9)",
              borderRadius: "16px",
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.4)", // Screen Dimmer
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginBottom: "-60px",
                color: "white",
                background: "rgba(0,0,0,0.8)",
                padding: "10px 20px",
                borderRadius: "30px",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Toque no prato para fixar
            </div>
          </div>
        </div>,
      )}
    </div>
  );
};
