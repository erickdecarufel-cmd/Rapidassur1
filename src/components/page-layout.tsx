import React from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn('flex flex-col flex-grow', className)}>
      {children}
    </div>
  );
}

function Main({ children, className }: PageLayoutProps) {
  return (
    <main className={cn('flex-grow', className)}>
      {children}
    </main>
  );
}

PageLayout.Main = Main;

export { PageLayout };
export default PageLayout;
