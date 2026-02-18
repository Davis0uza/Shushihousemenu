import { useState } from "react";
import { ARViewer } from "./ARViewer";
import type { MenuItem } from "../types";

interface ItemDetailPanelProps {
  item: MenuItem;
  onClose: () => void;
}

export function ItemDetailPanel({ item, onClose }: ItemDetailPanelProps) {
  const [show3D, setShow3D] = useState(false);

  return (
    <section className="item-detail" aria-label="Detalhes do item">
      <div
        className="item-detail__header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <button
          className="item-detail__close"
          onClick={onClose}
          aria-label="Voltar à lista"
          style={{ marginBottom: 0 }}
        >
          ← Voltar
        </button>

        {item.modelUrl && (
          <button
            onClick={() => setShow3D(!show3D)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "20px",
              border: show3D ? "1px solid #FF7054" : "1px solid #e0e0e0",
              backgroundColor: show3D ? "#FFF5F3" : "white",
              color: show3D ? "#FF7054" : "#666",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {show3D ? "Ver Foto 📷" : "Ver Modelo 3D 🧊"}
          </button>
        )}
      </div>

      <div className="item-detail__hero">
        {show3D && item.modelUrl ? (
          <ARViewer
            modelUrl={item.modelUrl}
            iosModelUrl={item.iosModelUrl}
            posterUrl={item.image}
            altText={`Modelo 3D de ${item.name}`}
          />
        ) : (
          <img src={item.image} alt={item.name} />
        )}
      </div>

      <div className="item-detail__content">
        <h2>{item.name}</h2>
        <p className="item-detail__description">{item.description}</p>
        <p className="item-detail__origin">{item.origin}</p>
      </div>
    </section>
  );
}

export default ItemDetailPanel;
