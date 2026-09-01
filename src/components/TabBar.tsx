import { BookOpen, Compass, Library, Map, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { tabItems } from '@/app/routes';

const icons = {
  directory: Library,
  characters: Users,
  backstory: BookOpen,
  maps: Map,
  lectern: Compass
};

export function TabBar() {
  return (
    <nav aria-label="Primary" className="rounded-full border border-brass/30 bg-paper/90 p-2 shadow-card">
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {tabItems.map((item) => {
          const Icon = icons[item.key];
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-3 text-lg font-semibold transition-colors',
                    isActive ? 'bg-wax text-paper' : 'bg-parchment/70 text-ink hover:bg-parchment'
                  ].join(' ')
                }
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
