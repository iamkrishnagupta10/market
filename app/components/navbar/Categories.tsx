'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { CosmeticBrush, Music, Chess, Code, Robot, English, MusicCd, Flask, Pencil, Bookshelf, Cooking, Soccer, BookOne, FileEditingOne, ChessOne, SourceCode, PlayBasketball } from '@icon-park/react';

import CategoryBox from "../CategoryBox";
import Container from '../Container';

export const categories = [
  {
    label: 'Academics',
    icon: () => <BookOne theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs focused on academic enrichment.'
  },
  {
    label: 'Arts',
    icon: () => <CosmeticBrush theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to arts and crafts.'
  },
  {
    label: 'Music',
    icon: () => <Music theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to music education.'
  },
  {
    label: 'Sports',
    icon: () => <PlayBasketball theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to sports activities.'
  },
  {
    label: 'Chess',
    icon: () => <ChessOne theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to chess and strategy games.'
  },
  {
    label: 'Coding',
    icon: () => <SourceCode theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to computer programming.'
  },
  {
    label: 'Robotics',
    icon: () => <Robot theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to robotics and engineering.'
  },
  {
    label: 'Language',
    icon: () => <English theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to language learning.'
  },
  {
    label: 'Guitar',
    icon: () => <Music theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to guitar lessons.'
  },
  {
    label: 'Science',
    icon: () => <Flask theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to science experiments.'
  },
  {
    label: 'Writing',
    icon: () => <FileEditingOne theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to creative writing.'
  },
  {
    label: 'Reading',
    icon: () => <Bookshelf theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to reading and literature.'
  },
  {
    label: 'Cooking',
    icon: () => <Cooking theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to cooking and baking.'
  },
  {
    label: 'Soccer',
    icon: () => <Soccer  theme="two-tone" fill={['#333', '#d0021b']} strokeWidth={2} size={32} />,
    description: 'Programs related to soccer training.'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;
