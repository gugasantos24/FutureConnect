import Logo from "../../assets/Logo.png";
import { Sun, Moon } from "lucide-react";

export default function Header({ darkMode }) {
  return (
    <div className={darkMode ? "dark" : ""}>
      <header className="container mx-auto flex justify-between items-center p-3">
        <img
          src={Logo}
          alt="Logo"
          className="w-3xs h-3xs object-contain justify-between"
        />
      </header>
    </div>
  );
}
