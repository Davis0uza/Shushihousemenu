import type { SectionType } from '../types';
import { sectionInfo } from '../data/menuData';

interface BannerProps {
    currentSection: SectionType;
}

export function Banner({ currentSection }: BannerProps) {
    const info = sectionInfo[currentSection];

    return (
        <header className="banner">
            {/* Hero Section - Scrolls away */}
            <div
                className="banner__hero"
                style={{ backgroundImage: `url(${info.heroImage})` }}
            >
                <img
                    src="/images/logo.png"
                    alt="Sushi Menu Logo"
                    className="banner__logo"
                />
                <span className="banner__brand">MenuSushi</span>
                <div className="banner__text">
                    <h1>Bem-vindo</h1>
                    <p>Descubra a arte do sushi japonês autêntico</p>
                </div>
            </div>
        </header>
    );
}

export default Banner;
