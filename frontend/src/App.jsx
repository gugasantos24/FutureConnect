import { useState, useEffect } from "react";
import FeedPage from "./pages/FeedPage.jsx";

export default function App() {
  // 1. O estado vive aqui, no topo da aplicação
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. O efeito que controla o <html> vive aqui
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 3. A função que altera o estado vive aqui
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // 4. O App.jsx agora "embrulha" (wraps) a página com
  //    o div que dá o fundo e o texto.
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <FeedPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
