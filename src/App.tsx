import { useState } from 'react';
import './App.css';
import type { MenuItem, SectionType, AppView, CartItem, Order } from './types';
import { SECTIONS } from './types';
import { getItemsBySection, menuItems } from './data/menuData';
import {
  TopBar,
  SectionNav,
  SectionGrid,
  ItemDetailPanel,
  CartPage,
  CartActionBar,
  PinModal,
  OrderHistoryPage,
  Onboarding,
} from './components';

function App() {
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('sushi_onboarding_seen') !== 'true';
  });

  // Current view (menu, cart, or history)
  const [currentView, setCurrentView] = useState<AppView>('menu');

  // Current section selected in navbar
  const [currentSection, setCurrentSection] = useState<SectionType>(SECTIONS[0]);

  // Currently selected item for detail view (null = list view)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Quantities per item ID (persists across section changes)
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

  // Order history
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  // PIN modal state
  const [showPinModal, setShowPinModal] = useState(false);

  // Get items for current section
  const currentItems = getItemsBySection(currentSection);

  // Calculate total cart items count
  const totalCartItems = Object.values(cartQuantities).reduce((sum, qty) => sum + qty, 0);

  // Get cart items with full details
  const getCartItems = (): CartItem[] => {
    return Object.entries(cartQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, quantity]) => {
        const menuItem = menuItems.find((item) => item.id === itemId);
        return {
          itemId,
          name: menuItem?.name || 'Item',
          quantity,
          image: menuItem?.image || '',
          price: menuItem?.price,
        };
      });
  };

  // Handlers
  const handleSectionChange = (section: SectionType) => {
    setCurrentSection(section);
    setSelectedItem(null);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setCartQuantities((prev) => {
      const current = prev[itemId] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [itemId]: newQty };
    });
  };

  const handleCartClick = () => {
    setCurrentView('cart');
    setSelectedItem(null);
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleConfirmClick = () => {
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    // Create new order
    const newOrder: Order = {
      id: String(Date.now()).slice(-4),
      items: getCartItems(),
      timestamp: new Date(),
      status: 'confirmed',
    };

    // Add to history and clear cart
    setOrderHistory((prev) => [newOrder, ...prev]);
    setCartQuantities({});
    setShowPinModal(false);
    setCurrentView('history');
  };

  const handlePinClose = () => {
    setShowPinModal(false);
  };

  const handleFinishOnboarding = (consent: boolean) => {
    console.log('User consent for tracking:', consent);
    localStorage.setItem('sushi_onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  // Render based on current view
  if (showOnboarding) {
    return <Onboarding onComplete={handleFinishOnboarding} />;
  }

  if (currentView === 'history') {
    return (
      <div className="app">
        <main className="app-content app-content--full">
          <OrderHistoryPage orders={orderHistory} onBack={handleBackToMenu} />
        </main>
      </div>
    );
  }

  if (currentView === 'cart') {
    const cartItems = getCartItems();
    return (
      <div className="app">
        <header className="app-header">
          <div className="cart-page-header">
            <button className="cart-page-header__back" onClick={handleBackToMenu}>
              ←
            </button>
            <h1 className="cart-page-header__title">Carrinho</h1>
          </div>
        </header>

        <main className="app-content">
          <CartPage
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onBackToMenu={handleBackToMenu}
          />
        </main>

        <CartActionBar
          onHistory={handleViewHistory}
          onConfirm={handleConfirmClick}
          hasItems={cartItems.length > 0}
        />

        <PinModal
          isOpen={showPinModal}
          onClose={handlePinClose}
          onSuccess={handlePinSuccess}
        />
      </div>
    );
  }

  // Default: Menu view
  return (
    <div className="app">
      {/* Fixed Header - Always visible at top */}
      <header className="app-header">
        {/* SectionHeader removed - moved to SectionGrid */}
        <TopBar
          cartItemCount={totalCartItems}
          onCartClick={handleCartClick}
        />
      </header>

      {/* Scrollable Content Area */}
      <main className="app-content">
        {selectedItem ? (
          <ItemDetailPanel item={selectedItem} onClose={handleCloseDetail} />
        ) : (
          <SectionGrid
            section={currentSection}
            items={currentItems}
            quantities={cartQuantities}
            onQuantityChange={handleQuantityChange}
            onItemClick={handleItemClick}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <SectionNav
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
    </div>
  );
}

export default App;
