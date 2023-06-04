import { AiOutlineHome } from 'react-icons/ai';
import { GrBookmark } from 'react-icons/gr';
import { LinksType } from '../types/trendingCrypto';

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
