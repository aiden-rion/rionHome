import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import logoImage from "figma:asset/bc3f732a00ceb510e66417398cc47d684cdbbe79.png";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img
              src={logoImage}
              alt="RION"
              className="h-5 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 max-w-md">
              NEW WAVE 2025 DIGITAL EXPERIENCE
            </p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>new@rion.kr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+82 10-3446-9920</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>
                  경기도 용인시 기흥구 신갈동 SK V1 B동 15층
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-white transition-colors"
                >
                  회사소개
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("references")}
                  className="hover:text-white transition-colors"
                >
                  레퍼런스
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-white transition-colors"
                >
                  문의하기
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Web Service</li>
              <li>UI/UX</li>
              <li>Develop</li>
              <li>Used-Car Service</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © 2025 RION Agency. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400">
            <button className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}