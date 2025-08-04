import { useEffect, useState } from "react";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check if user already prefers dark or saved preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  return [isDark, setIsDark];
}


export default useDarkMode;