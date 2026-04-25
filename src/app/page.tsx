'use client';

import Link from 'next/link';
import Wrapper from './components/layout/wrapper';
import Header from '@/src/app/components/layout/header';
import Content from '@/src/app/components/layout/content';
import Footer from './components/layout/footer';

export default function Home() {

  return (
    <Wrapper>
      <main className="bg-white dark:bg-black p-6 rounded-lg border border-black dark:border-white">
        <Header />
        <Content />
        <section className="p-2">
          <Link href="/professional" className="primary-button inline-flex items-center justify-center px-6 py-3 mt-4 mr-8 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition">Professional</Link>
          <Link href="/personal" className="primary-button inline-flex items-center justify-center px-6 py-3 mt-4 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition">Personal</Link>
        </section>
      </main>
      <Footer />
    </Wrapper>
  );
}
