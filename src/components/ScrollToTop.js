import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
        behavior: "instant",
        top: 0
      });

    // window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}