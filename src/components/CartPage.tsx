import type { CartItem } from '../types';

interface CartPageProps {
    items: CartItem[];
    onQuantityChange: (itemId: string, delta: number) => void;
    onBackToMenu: () => void;
}

export function CartPage({ items, onQuantityChange, onBackToMenu }: CartPageProps) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="cart-page cart-page--empty">
                <div className="cart-empty">
                    <span className="cart-empty__icon">🛒</span>
                    <h2 className="cart-empty__title">Carrinho Vazio</h2>
                    <p className="cart-empty__text">Adicione itens do menu para começar</p>
                    <button className="cart-empty__btn" onClick={onBackToMenu}>
                        Ver Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h2 className="cart-header__title">Seu Pedido</h2>
                <span className="cart-header__count">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
            </div>

            <div className="cart-items">
                {items.map((item) => (
                    <div key={item.itemId} className="cart-item">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item__image"
                        />
                        <div className="cart-item__info">
                            <h3 className="cart-item__name">{item.name}</h3>
                            {item.price && (
                                <span className="cart-item__price">€{item.price.toFixed(2)}</span>
                            )}
                        </div>
                        <div className="cart-item__controls">
                            <button
                                className="cart-item__btn"
                                onClick={() => onQuantityChange(item.itemId, -1)}
                                aria-label="Remover um"
                            >
                                −
                            </button>
                            <span className="cart-item__qty">{item.quantity}</span>
                            <button
                                className="cart-item__btn"
                                onClick={() => onQuantityChange(item.itemId, 1)}
                                aria-label="Adicionar um"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CartPage;
