import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source
            src="/src/resource/hero_background.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Left side - Main text */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1
                  className="text-white tracking-wider mb-6 opacity-60"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                  }}
                >
                  DIGITAL EXPERIENCE
                </h1>
                <h2
                  className="text-[5rem] sm:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-none text-white mb-0"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                  }}
                >
                  The new
                </h2>
                <h2
                  className="text-[5rem] sm:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-none text-white"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                  }}
                >
                  digital era
                </h2>
              </motion.div>
            </div>

            {/* Right side - Description and CTA */}
            <div className="col-span-12 lg:col-span-5 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="space-y-8"
              >
                {/* <div className="border-l-2 border-white/30 pl-6">
                  <p className="text-white/90 text-lg leading-relaxed">
                    RION은 혁신적인 웹 솔루션을 통해
                    <br />
                    브랜드의 가치를 극대화합니다.
                  </p>
                  <p className="text-white/70 mt-4">
                    전략, 디자인, 개발의 완벽한 조화로
                    <br />
                    최고의 디지털 경험을 선사합니다.
                  </p>
                </div> */}

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:gap-5 group"
                >
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    START PROJECT
                  </span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/*<motion.div*/}
      {/*  initial={{ opacity: 0 }}*/}
      {/*  animate={{ opacity: 1 }}*/}
      {/*  transition={{ duration: 1, delay: 1.2 }}*/}
      {/*  className="absolute bottom-10 left-1/2 -translate-x-1/2"*/}
      {/*>*/}
      {/*  <div className="flex flex-col items-center gap-2">*/}
      {/*    <span*/}
      {/*      className="text-white/50 text-sm tracking-wider"*/}
      {/*      style={{ fontFamily: "Montserrat, sans-serif" }}*/}
      {/*    >*/}
      {/*      SCROLL*/}
      {/*    </span>*/}
      {/*    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 animate-bounce">*/}
      {/*      <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</motion.div>*/}
    </section>
  );
}