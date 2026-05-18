'use client';

import { primaryButtonStyle } from './components/ui';
import Wrapper from '@/components/layout/wrapper';
import Header from '@/components/layout/header';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import Anchor from '@/components/ui/Anchor';

export default function Home() {

  return (
    <Wrapper>
      <main className="flex flex-col max-w-6xl bg-white dark:bg-black px-4 py-6 md:p-6 rounded-lg border border-black dark:border-white">
        <Header />
        <Content />
        <section className="p-2 flex gap-2 justify-center md:justify-start">
          <Anchor href="/professional" className={`${primaryButtonStyle} mr-4 md:mr-8`}>Professional</Anchor>
          <Anchor href="/personal" className={primaryButtonStyle}>Personal</Anchor>
        </section>
      </main>
      <Footer />
    </Wrapper>
  );
}
