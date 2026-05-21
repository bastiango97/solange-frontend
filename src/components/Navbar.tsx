"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { clearStoredUser, getStoredUser, type AuthUser } from "@/lib/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("solange-auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("solange-auth-change", syncUser);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();

    if (query !== "") {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    setIsOpen(false);
    setIsAccountOpen(false);
    router.push("/");
  };

  return (
    <nav className="fixed left-0 top-0 z-50 h-[64px] w-full border-b border-[#DDE1D8] bg-[#FAFAFA]/95 backdrop-blur-md">
      <div className="flex h-full w-full items-center px-4 py-3 lg:px-8">
        <div className="flex w-1/3 justify-start">
          <Link href="/" className="flex items-center" aria-label="Inicio Solange">
            <Image src="/logo.png" alt="Solange" width={120} height={30} className="h-auto w-auto" priority />
          </Link>
        </div>

        <div className="mr-auto flex w-1/3 grow justify-center">
          <form onSubmit={handleSearch} className="w-full max-w-[400px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar campañas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-[#DDE1D8] bg-white px-4 py-2 text-[#151713] outline-none placeholder:text-[#687066] focus:border-[#2D6E4E]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687066] hover:text-[#2D6E4E]"
                aria-label="Buscar campañas"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="hidden w-1/3 justify-end lg:flex">
          <div className="nav-account-dropdown">
            <button
              type="button"
              className="nav-account-trigger"
              onClick={() => setIsAccountOpen((current) => !current)}
              aria-label="Abrir menú de perfil"
              aria-expanded={isAccountOpen}
            >
              <FiUser size={26} />
            </button>

            {isAccountOpen && (
              <div className="nav-account-menu">
                {user ? (
                  <>
                    <div className="nav-account-user">
                      <strong>{user.fullName}</strong>
                      <span>{user.email}</span>
                    </div>
                    <Link href="/profile" onClick={() => setIsAccountOpen(false)}>
                      <FiUser size={18} />
                      <span>Perfil</span>
                    </Link>
                    <button type="button" onClick={handleLogout}>
                      <FiLogOut size={18} />
                      <span>Cerrar sesión</span>
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsAccountOpen(false)}>
                    <FiUser size={18} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          className="ml-4 text-[#151713] focus:outline-none lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          {isOpen ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-[64px] z-50 w-full border-b border-[#DDE1D8] bg-[#FAFAFA] p-6 shadow-md lg:hidden">
          {user ? (
            <div className="mobile-account">
              <Link href="/profile" className="flex items-center space-x-2 py-2 text-[#151713] hover:text-[#2D6E4E]">
                <FiUser size={20} />
                <span>Perfil</span>
              </Link>
              <button type="button" onClick={handleLogout}>
                <FiLogOut size={18} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center space-x-2 py-2 text-[#151713] hover:text-[#2D6E4E]">
              <FiUser size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
