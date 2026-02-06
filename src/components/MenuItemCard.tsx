import type { MenuItem } from '../types';

interface MenuItemCardProps {
    item: MenuItem;
    quantity: number;
    onQuantityChange: (delta: number) => void;
    onClick: () => void;
    viewMode?: 'list' | 'grid';
}

export function MenuItemCard({
    item,
    quantity,
    onQuantityChange,
    onClick,
    viewMode = 'list',
}: MenuItemCardProps) {
    const handleQuantityClick = (e: React.MouseEvent, delta: number) => {
        e.stopPropagation();
        onQuantityChange(delta);
    };

    return (
        <article
            className={`menu-card menu-card--${viewMode}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`${item.name}, ${item.description}`}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
        >
            <div className="menu-card__image">
                <img src={item.image} alt={item.name} />
                {/* Pieces Badge - Prominent position */}
                {item.piecesLabel && (
                    <span className="menu-card__badge">{item.piecesLabel}</span>
                )}
            </div>
            <div className="menu-card__content">
                <h3 className="menu-card__name">{item.name}</h3>
                <p className="menu-card__description">
                    {item.description}
                </p>
                {item.price !== undefined && (
                    <p className="menu-card__price">€{item.price.toFixed(2)}</p>
                )}

                {/* Quantity Controls */}
                <div className="menu-card__quantity">
                    <button
                        className="qty-btn qty-btn--minus"
                        onClick={(e) => handleQuantityClick(e, -1)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                        −
                    </button>
                    <span className="qty-value" aria-live="polite">
                        {quantity}
                    </span>
                    <button
                        className="qty-btn qty-btn--plus"
                        onClick={(e) => handleQuantityClick(e, 1)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}

export default MenuItemCard;
