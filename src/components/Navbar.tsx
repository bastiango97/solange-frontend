"use client";
import { useState } from "react";
import { FiMenu, FiX, FiUser, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/search?q=${search}`);
    }
  };

  return (
<nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 h-[64px]">
  <div className="w-full px-4 lg:px-8 flex items-center py-3 h-full">
    
    {/* Sección 1: Logo (Pegado completamente a la izquierda) */}
    <div className="w-1/3 flex justify-start">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="SolarInvest Logo"
          width={120}
          height={30}
          className="h-auto w-auto"
          priority 
        />
      </Link>
    </div>

    {/* Sección 2: Barra de búsqueda (Centrada completamente) */}
    <div className="w-1/3 flex grow justify-center mr-auto">
      <form onSubmit={handleSearch} className="w-full max-w-[400px]">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar hoteles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 px-4 py-2 rounded-lg w-full outline-none text-gray-700"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600">
            <FiSearch size={20} />
          </button>
        </div>
      </form>
    </div>

    {/* Sección 3: Perfil (Pegado completamente a la derecha) */}
    <div className="w-1/3 flex justify-end hidden lg:flex">
      <Link href="/profile" className="text-gray-700 hover:text-indigo-600">
        <FiUser size={32} />
      </Link>
    </div>

    {/* Botón Menú Móvil */}
    <button
      className="lg:hidden text-gray-700 focus:outline-none ml-4"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <FiX size={32} /> : <FiMenu size={32} />}
    </button>
  </div>

  {/* Menú Móvil */}
  {isOpen && (
    <div className="lg:hidden bg-white shadow-md absolute top-[64px] left-0 w-full p-6 z-50">
      {/* Perfil en el menú móvil */}
      <Link href="/profile" className="block py-2 text-gray-700 hover:text-indigo-600 flex items-center space-x-2">
        <FiUser size={20} />
        <span>Perfil</span>
      </Link>
    </div>
  )}
</nav>

  );
};

export default Navbar;
