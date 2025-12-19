import { type FC, useState, useEffect } from "react";

import styles from "./GoToTop.module.css";
import { FaArrowUp } from "react-icons/fa";

import type { GoToTopProps } from "./GoToTop.types";

const GoToTop: FC<GoToTopProps> = ({ ariaLabel, title }) => {
  const onClickHandler = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label={ariaLabel}
      title={title}
      onClick={onClickHandler}
      className={styles.goToTop}
      aria-hidden={!isVisible}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <FaArrowUp />
    </button>
  );
};

export default GoToTop;
