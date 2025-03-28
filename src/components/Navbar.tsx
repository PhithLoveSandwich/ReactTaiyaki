import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* โลโก้ */}
      <a href="#" className="navbar-logo">
        🍡 Mini-Taiyaki Store
      </a>

      {/* ปุ่มเปิด/ปิดเมนูในมือถือ */}
      <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* เมนู */}
      <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
      </ul>
    </nav>
  );
}

