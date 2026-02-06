import { useState } from 'react';
import Modal from './Modal';

type AssistanceState = 'idle' | 'confirming' | 'loading' | 'success';

interface TopBarProps {
    cartItemCount: number;
    onCartClick?: () => void;
}

export function TopBar({ cartItemCount, onCartClick }: TopBarProps) {
    const [assistanceState, setAssistanceState] = useState<AssistanceState>('idle');

    const handleRequestClick = () => {
        setAssistanceState('confirming');
    };

    const handleConfirm = () => {
        setAssistanceState('loading');
        // Simulate API call with exact timing requested by user (2.033s)
        setTimeout(() => {
            setAssistanceState('success');
        }, 2033);
    };

    const handleCancel = () => {
        setAssistanceState('idle');
    };

    const handleClose = () => {
        setAssistanceState('idle');
    };

    return (
        <>
            <div className="top-bar">
                {/* Assistance Button - Left */}
                <button
                    className="top-bar__assistance"
                    onClick={handleRequestClick}
                    aria-label="Pedir assistência à mesa"
                >
                    <span className="top-bar__icon" aria-hidden="true">🔔</span>
                    <span className="top-bar__text">Assistência</span>
                </button>

                {/* Cart Button - Right */}
                <button
                    className="top-bar__cart"
                    onClick={onCartClick}
                    aria-label={`Carrinho com ${cartItemCount} itens`}
                >
                    {cartItemCount > 0 && (
                        <span className="top-bar__cart-badge">{cartItemCount}</span>
                    )}
                    <span className="top-bar__icon" aria-hidden="true">🛒</span>
                </button>
            </div>

            {/* Assistance Modal */}
            <Modal
                isOpen={assistanceState !== 'idle'}
                onClose={handleClose}
                ariaLabel="Pedido de assistência"
            >
                {assistanceState === 'confirming' && (
                    <div className="modal__content modal__content--center">
                        <div className="modal__media">
                            <img
                                src="/images/menu/bell.png"
                                alt=""
                                className="modal__image"
                            />
                        </div>
                        <h2 className="modal__title">Pedir Assistência</h2>
                        <p className="modal__text">
                            Tem a certeza que pretende pedir assistência?
                        </p>
                        <div className="modal__actions">
                            <button
                                className="modal__btn modal__btn--secondary"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                className="modal__btn modal__btn--primary"
                                onClick={handleConfirm}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}

                {assistanceState === 'loading' && (
                    <div className="modal__content modal__content--center">
                        <div className="modal__media">
                            <img
                                key="playing-bell"
                                src={`/images/menu/bell.gif?t=${Date.now()}`}
                                alt=""
                                className="modal__image"
                            />
                        </div>
                        <div className="modal__spinner" aria-label="A processar..."></div>
                        <p className="modal__text">A processar o seu pedido...</p>
                    </div>
                )}

                {assistanceState === 'success' && (
                    <div className="modal__content modal__content--center">
                        <div className="modal__media">
                            <img
                                src="/images/menu/helper.png"
                                alt=""
                                className="modal__image"
                            />
                        </div>
                        <h2 className="modal__title">A caminho!</h2>
                        <p className="modal__text">
                            Vamos avisar um funcionário. Por favor aguarde um momento.
                        </p>
                        <button
                            className="modal__btn modal__btn--primary"
                            onClick={handleClose}
                        >
                            Fechar
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default TopBar;
