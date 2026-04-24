'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/app/components/layout/header';
import Content from '@/src/app/components/layout/content';
import Footer from './components/layout/footer';

export default function Home() {

  return (
    <div className="flex w-full min-h-full items-center justify-center bg-slate-100 p-6">
      <div className="flex-col w-full max-w-6xl">
        <main className="bg-white p-6 rounded-lg border border-black">
          <Header />
          <Content />
        </main>
        <Footer />
      </div>
    </div>
  );
}
