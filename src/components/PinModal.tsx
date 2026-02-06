import { useState } from 'react';
import Modal from './Modal';

interface PinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type ModalState = 'pin' | 'loading' | 'success';

const CORRECT_PIN = '0000';
const LOADING_DURATION = 2000; // 2 seconds

export function PinModal({ isOpen, onClose, onSuccess }: PinModalProps) {
    const [modalState, setModalState] = useState<ModalState>('pin');
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setPin(value);
        setError(false);
    };

    const handleSubmit = () => {
        if (pin === CORRECT_PIN) {
            setError(false);
            setModalState('loading');

            // Transition to success after loading
            setTimeout(() => {
                setModalState('success');
            }, LOADING_DURATION);
        } else {
            setError(true);
        }
    };

    const handleClose = () => {
        setPin('');
        setError(false);
        setModalState('pin');
        onClose();
    };

    const handleSuccessClose = () => {
        setPin('');
        setError(false);
        setModalState('pin');
        onSuccess();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} ariaLabel="Confirmação de pedido">
            {/* PIN Entry State */}
            {modalState === 'pin' && (
                <div className="modal__content modal__content--center">
                    <h2 className="modal__title">Confirmar Pedido</h2>
                    <p className="modal__text">
                        Introduza o código de 4 dígitos para confirmar
                    </p>
                    <div className="pin-input-container">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            value={pin}
                            onChange={handleInputChange}
                            className={`pin-input ${error ? 'pin-input--error' : ''}`}
                            placeholder="0000"
                            autoFocus
                        />
                        {error && (
                            <p className="pin-error">Código incorreto. Tente novamente.</p>
                        )}
                    </div>
                    <div className="modal__actions">
                        <button
                            className="modal__btn modal__btn--secondary"
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="modal__btn modal__btn--primary"
                            onClick={handleSubmit}
                            disabled={pin.length !== 4}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {modalState === 'loading' && (
                <div className="modal__content modal__content--center">
                    <div className="modal__spinner" aria-label="A processar..."></div>
                    <p className="modal__text">Estamos a processar o seu pedido...</p>
                </div>
            )}

            {/* Success State */}
            {modalState === 'success' && (
                <div className="modal__content modal__content--center">
                    <div className="modal__media">
                        <img
                            src="/images/menu/ready.png"
                            alt=""
                            className="modal__image"
                        />
                    </div>
                    <h2 className="modal__title">A caminho!</h2>
                    <p className="modal__text">
                        O seu pedido foi confirmado com sucesso.
                    </p>
                    <button
                        className="modal__btn modal__btn--primary"
                        onClick={handleSuccessClose}
                    >
                        Fechar
                    </button>
                </div>
            )}
        </Modal>
    );
}

export default PinModal;
