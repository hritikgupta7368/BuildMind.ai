//@ts-nocheck
import { useState } from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">BuildMind</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
              Preview
            </button>
            <button className="rounded-md bg-green-600 px-4 py-2 text-white">
              Publish
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}