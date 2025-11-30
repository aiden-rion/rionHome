import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { References } from './components/References';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import ChatButton from './components/Chat/ChatButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* <MouseEffect /> */}
      <Header />
      <main>
        <Hero />
        <About />
        <References />
        <Contact />
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
}
