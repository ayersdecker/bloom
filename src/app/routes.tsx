import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AppShell } from '@/app/AppShell';
import { BackstoryPage } from '@/features/backstory/BackstoryPage';
import { CharacterDetailPage } from '@/features/characters/CharacterDetailPage';
import { CharactersPage } from '@/features/characters/CharactersPage';
import { DirectoryPage } from '@/features/directory/DirectoryPage';
import { LecternPage } from '@/features/lectern/LecternPage';
import { MapsPage } from '@/features/maps/MapsPage';

export const tabItems = [
  { key: 'directory', label: 'Directory', to: '/' },
  { key: 'characters', label: 'Characters', to: '/characters' },
  { key: 'backstory', label: 'Backstory', to: '/backstory' },
  { key: 'maps', label: 'Maps', to: '/maps' },
  { key: 'lectern', label: 'Lectern', to: '/lectern' }
] as const;

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DirectoryPage /> },
      { path: 'characters', element: <CharactersPage /> },
      { path: 'characters/:slug', element: <CharacterDetailPage /> },
      { path: 'backstory', element: <BackstoryPage /> },
      { path: 'maps', element: <MapsPage /> },
      { path: 'lectern', element: <LecternPage /> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
];
