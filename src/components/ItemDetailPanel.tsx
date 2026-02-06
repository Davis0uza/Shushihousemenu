import type { MenuItem } from '../types';

interface ItemDetailPanelProps {
    item: MenuItem;
    onClose: () => void;
}

export function ItemDetailPanel({ item, onClose }: ItemDetailPanelProps) {
    return (
        <section className="item-detail" aria-label="Detalhes do item">
            <button
                className="item-detail__close"
                onClick={onClose}
                aria-label="Voltar à lista"
            >
                ← Voltar
            </button>

            <div className="item-detail__hero">
                <img src={item.image} alt={item.name} />
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
