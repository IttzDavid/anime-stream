"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSafeRouter } from "../lib/useSafeRouter";

export default function Navbar() {
  const { push } = useSafeRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    if (pathname !== path) {
      // Pass true if this navigation needs the special "allow-navigation" flag
      push(path, true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => handleNavigate("/")}
        >
          AnimeStream
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span
                className={`nav-link ${pathname === "/search" ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/search")}
              >
                Search
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`nav-link ${pathname === "/profile" ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/profile")}
              >
                Profile
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
