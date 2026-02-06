import { useState } from 'react';

interface OnboardingProps {
    onComplete: (consent: boolean) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
    const [consent, setConsent] = useState(true);


    return (
        <div className="onboarding">
            <div className="onboarding-bg" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=1600&h=1200&fit=crop')`
            }}></div>
            <div className="onboarding-overlay"></div>

            <div className="onboarding-content">
                <div className="onboarding-card">
                    <div className="onboarding-logo">
                        <img src="/images/menu/logoshome.png" alt="Sushi Home Logo" />
                    </div>

                    <div className="onboarding-welcome">
                        <h2>Bem-vindo ao Sushi House</h2>
                        <p>A melhor experiência de rodízio japonês à sua mesa.</p>
                    </div>

                    <div className="onboarding-pricing">
                        <div className="price-item">
                            <span className="price-label">Almoço</span>
                            <span className="price-value">15,99€</span>
                        </div>
                        <div className="price-item">
                            <span className="price-label">Jantar</span>
                            <span className="price-value">17,99€</span>
                        </div>
                        <div className="price-item price-item--highlight">
                            <span className="price-label">Fins de Semana <small>(Sex, Sáb, Dom)</small></span>
                            <span className="price-value">17,99€</span>
                        </div>
                    </div>

                    <div className="onboarding-consent">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                            />
                            <span className="checkmark"></span>
                            Aceito cookies para tracking da mesa e do meu pedido
                        </label>
                    </div>

                    <button
                        className="onboarding-btn"
                        onClick={() => onComplete(consent)}
                        disabled={!consent}
                    >
                        Avançar
                    </button>
                </div>
            </div>
        </div>
    );
}
