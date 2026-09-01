import { Outlet } from 'react-router-dom';
import { TabBar } from '@/components/TabBar';

export function AppShell() {
  return (
    <div className="app-shell mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6">
      <header className="space-y-3">
        <p className="font-display text-center text-5xl text-wax">The Last Bloom</p>
        <TabBar />
      </header>
      <main className="pb-6">
        <Outlet />
      </main>
    </div>
  );
}
