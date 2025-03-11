"use client";

import React from "react";

const Header = ({ isAuthenticated, email }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-zinc-800">
      <h1 className="text-xl font-bold">Meu App</h1>
      <nav>
        {isAuthenticated ? (
          <ul className="flex gap-4">
            <li>
              <a className="hover:underline" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/profile">
                {email}
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/api/auth/signout">
                Sair
              </a>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-4">
            <li>
              <a className="hover:underline" href="/signin">
                Sign in
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/register">
                Register
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
