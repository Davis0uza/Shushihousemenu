import type { SectionType } from '../types';
import { sectionInfo } from '../data/menuData';

interface SectionHeaderProps {
    currentSection: SectionType;
}

export function SectionHeader({ currentSection }: SectionHeaderProps) {
    const info = sectionInfo[currentSection];

    return (
        <div className="section-header">
            <img
                src={info.icon}
                alt=""
                className="section-header__icon"
                aria-hidden="true"
            />
            <h2 className="section-header__name">{currentSection}</h2>
        </div>
    );
}

export default SectionHeader;
