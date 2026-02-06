import { useRef, useState, useCallback } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import type { SectionType } from '../types';
import { SECTIONS } from '../types';
import { sectionInfo } from '../data/menuData';

interface SectionNavProps {
    currentSection: SectionType;
    onSectionChange: (section: SectionType) => void;
}

export function SectionNav({ currentSection, onSectionChange }: SectionNavProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Prevent click when dragging
    const dragThreshold = 5;
    const [dragDistance, setDragDistance] = useState(0);

    // Mouse handlers
    const handleMouseDown = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setDragDistance(0);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = x - startX;
        setDragDistance(Math.abs(walk));
        containerRef.current.scrollLeft = scrollLeft - walk;
    }, [isDragging, startX, scrollLeft]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Touch handlers
    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setDragDistance(0);
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging || !containerRef.current) return;
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = x - startX;
        setDragDistance(Math.abs(walk));
        containerRef.current.scrollLeft = scrollLeft - walk;
    }, [isDragging, startX, scrollLeft]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Click handler - only trigger if not dragging
    const handleSectionClick = useCallback((section: SectionType) => {
        if (dragDistance < dragThreshold) {
            onSectionChange(section);
        }
    }, [dragDistance, onSectionChange]);

    return (
        <nav className="section-nav" role="navigation" aria-label="Menu sections">
            <div
                ref={containerRef}
                className={`section-nav__container ${isDragging ? 'section-nav__container--dragging' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {SECTIONS.map((section) => (
                    <button
                        key={section}
                        className={`section-nav__item ${section === currentSection ? 'section-nav__item--active' : ''}`}
                        onClick={() => handleSectionClick(section)}
                        aria-pressed={section === currentSection}
                        aria-label={`Secção ${section}`}
                    >
                        <img
                            src={sectionInfo[section].icon}
                            alt={section}
                            className="section-nav__icon"
                            aria-hidden="false"
                            draggable="false"
                        />
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default SectionNav;
