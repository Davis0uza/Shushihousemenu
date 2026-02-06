import { useState } from 'react';
import type { MenuItem, SectionType } from '../types';
import { sectionInfo } from '../data/menuData';
import MenuItemCard from './MenuItemCard';

type ViewMode = 'list' | 'grid';

interface SectionGridProps {
    section: SectionType;
    items: MenuItem[];
    quantities: Record<string, number>;
    onQuantityChange: (itemId: string, delta: number) => void;
    onItemClick: (item: MenuItem) => void;
}

export function SectionGrid({
    section,
    items,
    quantities,
    onQuantityChange,
    onItemClick,
}: SectionGridProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <section className="section-grid" aria-label={`Itens em ${section}`}>
            {/* View Toggle Header */}
            <div className="section-grid__header">
                <div className="section-grid__title-area">
                    <img
                        src={sectionInfo[section].icon}
                        alt=""
                        className="section-grid__icon"
                        aria-hidden="true"
                    />
                    <h2 className="section-grid__title">{section}</h2>
                </div>

                <div className="view-toggle">
                    <button
                        className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
                        onClick={() => setViewMode('list')}
                        aria-pressed={viewMode === 'list'}
                        aria-label="Vista de lista"
                    >
                        <span className="view-toggle__icon" aria-hidden="true">☰</span>
                    </button>
                    <button
                        className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        aria-pressed={viewMode === 'grid'}
                        aria-label="Vista de grelha"
                    >
                        <span className="view-toggle__icon" aria-hidden="true">▦</span>
                    </button>
                </div>
            </div>

            {/* Items Container */}
            <div className={`section-grid__items section-grid__items--${viewMode}`}>
                {items.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={quantities[item.id] || 0}
                        onQuantityChange={(delta) => onQuantityChange(item.id, delta)}
                        onClick={() => onItemClick(item)}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        </section>
    );
}

export default SectionGrid;
