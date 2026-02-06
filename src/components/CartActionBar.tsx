interface CartActionBarProps {
    onHistory: () => void;
    onConfirm: () => void;
    hasItems: boolean;
}

export function CartActionBar({ onHistory, onConfirm, hasItems }: CartActionBarProps) {
    return (
        <nav className="cart-action-bar">
            <button
                className="cart-action-bar__btn cart-action-bar__btn--secondary"
                onClick={onHistory}
            >
                <span className="cart-action-bar__icon">📋</span>
                <span>Histórico</span>
            </button>
            <button
                className="cart-action-bar__btn cart-action-bar__btn--primary"
                onClick={onConfirm}
                disabled={!hasItems}
            >
                <span>Confirmar Pedido</span>
            </button>
        </nav>
    );
}

export default CartActionBar;
