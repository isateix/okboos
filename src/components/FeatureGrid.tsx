"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FaShoppingCart, FaShieldAlt, FaCogs, FaStar } from "react-icons/fa";
import Spinner from "./Spinner";
import { useLanguage } from "../context/LanguageContext";

const featureIcons = [FaShoppingCart, FaShieldAlt, FaCogs, FaStar];
const featureKeys = ["feature1", "feature2", "feature3", "feature4"];

export default function FeatureGrid() {
  const { t } = useLanguage();
  const [visibleFeatures, setVisibleFeatures] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreFeatures = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleFeatures((prev) => Math.min(prev + 4, featureKeys.length));
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        !isLoading &&
        visibleFeatures < featureKeys.length
      ) {
        loadMoreFeatures();
      }
    };

    const debouncedScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [isLoading, visibleFeatures, loadMoreFeatures]);

  function debounce(fn: () => void, delay: number) {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(), delay);
    };
  }

  return (
    <section
      className="w-full px-4 sm:px-6 py-12 md:py-20 relative z-20 -mt-8 md:-mt-12"
      style={{ backgroundColor: "#6f4e37" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1440px] mx-auto">
        {featureKeys.slice(0, visibleFeatures).map((key, index) => {
          const IconComponent = featureIcons[index];
          return (
            <motion.div
              key={key}
              className="bg-[#805e46] rounded-xl p-6 md:p-8 flex flex-col text-left shadow-2xl min-h-[300px] md:min-h-[460px] break-words"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={window.innerWidth >= 768 ? { scale: 1.05 } : {}}
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 bg-[#d2b48c] rounded-full flex items-center justify-center mb-3 md:mb-5"
                aria-label={t(`${key}_title`)}
              >
                <IconComponent className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>

              <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">
                {t(`${key}_title`)}
              </h3>
              <p className="text-white text-sm md:text-base">{t(`${key}_description`)}</p>
            </motion.div>
          );
        })}
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <Spinner />
        </div>
      )}
    </section>
  );
}
