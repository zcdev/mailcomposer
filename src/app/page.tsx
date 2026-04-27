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
      <main className="bg-white dark:bg-black p-6 rounded-lg border border-black dark:border-white">
        <Header />
        <Content />
        <section className="p-2">
          <Anchor href="/professional" className={primaryButtonStyle}>Professional</Anchor>
          <Anchor href="/personal" className={primaryButtonStyle}>Personal</Anchor>
        </section>
      </main>
      <Footer />
    </Wrapper>
  );
}
