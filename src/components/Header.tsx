import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/bc3f732a00ceb510e66417398cc47d684cdbbe79.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check if we're still in the hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        setIsInHeroSection(window.scrollY < heroBottom - 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="block"
            >
              <img 
                src={logoImage} 
                alt="RION" 
                className="h-5 w-auto transition-all duration-300"
                style={{
                  filter: isInHeroSection ? 'brightness(0) invert(1)' : 'none'
                }}
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-12">
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-colors hover:text-blue-600 ${
                isInHeroSection ? 'text-white' : 'text-gray-900'
              }`}
            >
              회사소개
            </button>
            <button
              onClick={() => scrollToSection('references')}
              className={`transition-colors hover:text-blue-600 ${
                isInHeroSection ? 'text-white' : 'text-gray-900'
              }`}
            >
              레퍼런스
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-colors hover:text-blue-600 ${
                isInHeroSection ? 'text-white' : 'text-gray-900'
              }`}
            >
              문의하기
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isInHeroSection ? 'text-white' : 'text-gray-900'} />
            ) : (
              <Menu className={isInHeroSection ? 'text-white' : 'text-gray-900'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              회사소개
            </button>
            <button
              onClick={() => scrollToSection('references')}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              레퍼런스
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              문의하기
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}