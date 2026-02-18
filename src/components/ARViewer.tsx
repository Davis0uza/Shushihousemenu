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
      {React.createElement("model-viewer", {
        ref: modelViewerRef,
        src: modelUrl,
        "ios-src": iosModelUrl,
        poster: posterUrl,
        alt: altText,
        "shadow-intensity": "1",
        "camera-controls": true,
        "touch-action": "pan-y",
        loading: "eager",
        "seamless-poster": true,
        "environment-image": "neutral",
        "skybox-image": "/images/restaurant_env.jpg",
        exposure: "1",
        "camera-orbit": "0deg 75deg auto", // Grounded view
        "interaction-prompt": "auto",
        style: { width: "100%", height: "100%" },
      } as any)}
    </div>
  );
};
