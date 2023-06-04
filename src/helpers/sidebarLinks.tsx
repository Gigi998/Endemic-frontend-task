import { AiOutlineHome } from 'react-icons/ai';
import { GrBookmark } from 'react-icons/gr';
import { ReactNode } from 'react';

type LinksType = {
  id: number;
  icon: ReactNode;
  url: string;
};

export const links: LinksType[] = [
  {
    id: 1,
    icon: <AiOutlineHome />,
    url: '/',
  },
  {
    id: 2,
    icon: <GrBookmark />,
    url: '/favorites',
  },
];
