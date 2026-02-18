import React, { useRef, useState, useEffect } from "react";

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
  const [isPlaced, setIsPlaced] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Check valid device OS
  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );
  }, []);

  // Handle AR Session Start/End
  useEffect(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;

    const onARStatus = (event: any) => {
      // session-started logic
      if (event.detail.status === "session-started") {
        setArMode(true);
        setIsPlaced(false);
        // Initially hide the model to simulate "Reticle Only" mode
        mv.model.materials.forEach((mat: any) => {
          mat.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0]); // Transparent
        });
      }
      // not-presenting logic
      else if (event.detail.status === "not-presenting") {
        setArMode(false);
        setIsPlaced(false);
        // Reset opacity for 3D viewer
        mv.model.materials.forEach((mat: any) => {
          mat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // Opaque
        });
      }
    };

    mv.addEventListener("ar-status", onARStatus);
    return () => mv.removeEventListener("ar-status", onARStatus);
  }, []);

  // Handle Placement (Tap)
  const handlePlace = () => {
    if (!arMode || isPlaced) return;

    setIsPlaced(true);
    const mv = modelViewerRef.current;
    if (!mv) return;

    // Reveal Model
    mv.model.materials.forEach((mat: any) => {
      mat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // Opaque
    });

    // Spawn Animation
    let progress = 0;
    const duration = 1000; // 1s animation
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      progress = Math.min(elapsed / duration, 1);

      // Easing (EaseOutBack for pop effect)
      const ease = (t: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };

      const scaleVal = ease(progress);
      mv.scale = `${scaleVal} ${scaleVal} ${scaleVal}`;

      // Rotate from -360 to 0
      const rotationY = -360 * (1 - ease(progress));
      mv.orientation = `0deg ${rotationY}deg 0deg`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

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
      {/* 
        AR OVERLAY SYSTEM 
        Only visible when AR is active and model is NOT yet placed.
        We stick a transparent div over everything to capture the "Place" tap anywhere on screen.
        Note: This only works if the browser supports DOM Overlay in WebXR (Chrome Android usually does).
      */}
      {arMode && !isPlaced && !isIOS && (
        <div
          onClick={handlePlace} // Capture tap anywhere
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto", // Ensure it captures clicks
          }}
        >
          {/* The Visual Reticle (Target) */}
          <div
            style={{
              width: "200px",
              height: "200px",
              border: "2px dashed rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)", // Dim background focus effect
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                marginBottom: "-50px",
                color: "white",
                background: "rgba(0,0,0,0.8)",
                padding: "12px 24px",
                borderRadius: "30px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                fontSize: "16px",
              }}
            >
              Toque na tela para confirmar
            </div>
          </div>
        </div>
      )}

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
          "ar-modes": "webxr scene-viewer quick-look",
          "ar-scale": "fixed",
          "ar-placement": "floor",
          "touch-action": "pan-y",
          loading: "eager",
          "seamless-poster": true,
          "environment-image": "neutral",
          "skybox-image": "/images/restaurant_env.jpg",
          exposure: "1",
          "camera-orbit": "0deg 75deg auto",
          "interaction-prompt": "none",
          style: { width: "100%", height: "100%" },
          // Fallback click handler if overlay fails or for non-AR interaction
          onClick: handlePlace,
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
      )}
    </div>
  );
};
