import type { Order } from '../types';

interface OrderHistoryPageProps {
    orders: Order[];
    onBack: () => void;
}

export function OrderHistoryPage({ orders, onBack }: OrderHistoryPageProps) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="history-page">
            <div className="history-header">
                <button className="history-header__back" onClick={onBack}>
                    ←
                </button>
                <h2 className="history-header__title">Histórico de Pedidos</h2>
            </div>

            {orders.length === 0 ? (
                <div className="history-empty">
                    <span className="history-empty__icon">📋</span>
                    <p className="history-empty__text">Ainda não tem pedidos</p>
                </div>
            ) : (
                <div className="history-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-card__header">
                                <span className="order-card__id">Pedido #{order.id}</span>
                                <span className="order-card__time">{formatDate(order.timestamp)}</span>
                            </div>
                            <div className="order-card__items">
                                {order.items.map((item) => (
                                    <div key={item.itemId} className="order-card__item">
                                        <span className="order-card__item-qty">{item.quantity}x</span>
                                        <span className="order-card__item-name">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-card__status">
                                <span className={`order-status order-status--${order.status}`}>
                                    {order.status === 'confirmed' ? 'Confirmado' :
                                        order.status === 'completed' ? 'Concluído' : 'Pendente'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistoryPage;
