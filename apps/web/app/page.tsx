"use client";
import Header from './components/Layout/Header';
import Sidebar from './components/Builder/Sidebar';
import Canvas from './components/Builder/Canvas';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex">
        <Sidebar />
        <Canvas />
      </main>
    </div>
  );
}