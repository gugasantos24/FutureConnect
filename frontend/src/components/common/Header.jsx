import Logo from "../../assets/Logo.png";
import { Sun, Moon } from "lucide-react";

export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="container mx-auto flex justify-between items-center p-5">
      <img
        src={Logo}
        alt="Logo"
        className="w-3xs h-3xs object-contain justify-between"
      />
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}