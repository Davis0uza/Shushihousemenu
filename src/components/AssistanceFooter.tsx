import { useState } from 'react';
import Modal from './Modal';

type AssistanceState = 'idle' | 'confirming' | 'loading' | 'success';

export function AssistanceFooter() {
    const [state, setState] = useState<AssistanceState>('idle');

    const handleRequestClick = () => {
        setState('confirming');
    };

    const handleConfirm = () => {
        setState('loading');
        // Simulate API call
        setTimeout(() => {
            setState('success');
        }, 1500);
    };

    const handleCancel = () => {
        setState('idle');
    };

    const handleClose = () => {
        setState('idle');
    };

    return (
        <>
            <footer className="assistance-footer">
                <p>Precisa de ajuda?</p>
                <button
                    className="assistance-footer__btn"
                    onClick={handleRequestClick}
                    aria-label="Pedir assistência à mesa"
                >
                    Pedir assistência à mesa
                </button>
            </footer>

            <Modal
                isOpen={state !== 'idle'}
                onClose={handleClose}
                ariaLabel="Pedido de assistência"
            >
                {state === 'confirming' && (
                    <div className="modal__content">
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

                {state === 'loading' && (
                    <div className="modal__content modal__content--center">
                        <div className="modal__spinner" aria-label="A processar..."></div>
                        <p className="modal__text">A processar o seu pedido...</p>
                    </div>
                )}

                {state === 'success' && (
                    <div className="modal__content modal__content--center">
                        <div className="modal__success-icon" aria-hidden="true">✓</div>
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

export default AssistanceFooter;
