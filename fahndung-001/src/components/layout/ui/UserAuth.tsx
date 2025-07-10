"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface UserAuthProps {
  variant?: "desktop" | "mobile";
  size?: "default" | "compact";
  className?: string;
}

/**
 * UserAuth Component mit NextAuth.js
 * Zeigt je nach Login-Status Avatar/Initialen mit Dropdown oder Sign-In-Button.
 */
export default function UserAuth({
  variant = "desktop",
  className = "",
}: UserAuthProps) {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const isLoggedIn = status === "authenticated";
  const userImage = session?.user?.image || null;

  // Dropdown schließt bei Klick außerhalb
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Tastatursteuerung für Dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        avatarButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [dropdownOpen]);

  // Dropdown beim Scrollen schließen (nur mobile)
  useEffect(() => {
    if (!dropdownOpen || variant !== "mobile") return;
    const handleScroll = () => setDropdownOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [dropdownOpen, variant]);

  const handleLogout = () => {
    setDropdownOpen(false);
    signOut({ callbackUrl: "/" });
  };

  // NICHT eingeloggt: Sign-In-Button
  if (!isLoggedIn) {
    // Mobil und Desktop: Nur Icon anzeigen (kompakt, rahmenlos)
    if (variant === "mobile" || variant === "desktop") {
      return (
        <Link
          href="/login"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-transparent p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 ${className}`}
          tabIndex={0}
          aria-label="Anmelden"
        >
          <User className="h-5 w-5" />
        </Link>
      );
    }
    // Fallback (falls weitere Varianten hinzukommen)
    return null;
  }

  // EINGELOGGT: Avatar/Initialen + Dropdown
  return (
    <div
      className={`relative flex items-center ${className}`}
      ref={dropdownRef}
      // Für mobile Geräte: nur per Klick öffnen/schließen, kein Hover
      onMouseEnter={
        variant === "desktop"
          ? () => {
              if (closeTimeout.current) clearTimeout(closeTimeout.current);
              setDropdownOpen(true);
            }
          : undefined
      }
      onMouseLeave={
        variant === "desktop"
          ? () => {
              closeTimeout.current = setTimeout(
                () => setDropdownOpen(false),
                200,
              );
            }
          : undefined
      }
    >
      {/* Avatar oder Initialen */}
      <div className="flex-shrink-0">
        <button
          ref={avatarButtonRef}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700`}
          tabIndex={0}
          aria-label="Benutzermenü öffnen"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((open) => !open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setDropdownOpen((open) => !open);
              setTimeout(() => firstMenuItemRef.current?.focus(), 0);
            }
          }}
        >
          {userImage ? (
            <Image
              src={userImage}
              alt="Profilbild"
              className="h-full w-full rounded-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <span className="text-base font-medium">
              {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
            </span>
          )}
        </button>
      </div>
      {/* Dropdown-Menü */}
      {dropdownOpen && (
        <div
          className={
            variant === "mobile"
              ? "animate-fade-in fixed top-16 left-1/2 z-20 max-h-[70vh] w-[95vw] max-w-sm min-w-0 -translate-x-1/2 overflow-y-auto rounded-xl border border-gray-200 bg-white px-1 py-2 shadow-2xl focus:outline-none dark:border-gray-700 dark:bg-gray-900"
              : "animate-fade-in absolute top-10 right-0 z-20 min-w-[260px] rounded-xl border border-gray-200 bg-white py-2 shadow-2xl focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          }
          role="menu"
          onMouseEnter={
            variant === "desktop"
              ? () => {
                  if (closeTimeout.current) clearTimeout(closeTimeout.current);
                  setDropdownOpen(true);
                }
              : undefined
          }
          onMouseLeave={
            variant === "desktop"
              ? () => {
                  closeTimeout.current = setTimeout(
                    () => setDropdownOpen(false),
                    200,
                  );
                }
              : undefined
          }
        >
          {/* Dashboard - NEUE OPTION */}
          <Link
            href="/dashboard"
            ref={firstMenuItemRef}
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 outline-none hover:bg-gray-100 focus:bg-blue-50 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-blue-900/30"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium">
              <span>📊</span> Dashboard
            </span>
            <span className="ml-6 text-xs text-gray-500 dark:text-gray-400">
              Übersicht & Statistiken
            </span>
          </Link>

          {/* Neue Fahndung */}
          <Link
            href="/fahndung/erstellen"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 outline-none hover:bg-gray-100 focus:bg-blue-50 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-blue-900/30"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium">
              <span>➕</span> Neue Fahndung
            </span>
            <span className="ml-6 text-xs text-gray-500 dark:text-gray-400">
              Fahndung erstellen
            </span>
          </Link>
          {/* Meine Fahndungen */}
          <Link
            href="/fahndung/meine"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 outline-none hover:bg-gray-100 focus:bg-blue-50 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-blue-900/30"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium">
              <span>🗂️</span> Meine Fahndungen
            </span>
            <span className="ml-6 text-xs text-gray-500 dark:text-gray-400">
              Übersicht anzeigen
            </span>
          </Link>
          {/* Hilfe */}
          <Link
            href="/hilfe"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 outline-none hover:bg-gray-100 focus:bg-blue-50 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-blue-900/30"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium">
              <span>❓</span> Hilfe
            </span>
            <span className="ml-6 text-xs text-gray-500 dark:text-gray-400">
              FAQ & Support
            </span>
          </Link>
          {/* Einstellungen */}
          <Link
            href="/profil/einstellungen"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 outline-none hover:bg-gray-100 focus:bg-blue-50 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-blue-900/30"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium">
              <span>⚙️</span> Einstellungen
            </span>
            <span className="ml-6 text-xs text-gray-500 dark:text-gray-400">
              Profil verwalten
            </span>
          </Link>
          {/* Profil verwalten */}
          <Link
            href="/profil"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 outline-none hover:bg-gray-100 focus:bg-blue-50 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-blue-900/30"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium">
              <span>👤</span> Profil verwalten
            </span>
            <span className="ml-6 text-xs text-gray-500 dark:text-gray-400">
              Persönliche Daten
            </span>
          </Link>
          <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 outline-none hover:bg-red-50 focus:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 dark:focus:bg-red-900/40"
            tabIndex={0}
            role="menuitem"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      )}
    </div>
  );
}
