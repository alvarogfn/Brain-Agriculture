import { faker } from '@faker-js/faker/locale/pt_BR';

import { render, screen } from '@/testing-library';
import type { RenderOptions } from '@/testing-library';

import type { MenuProps } from './types';

import { Menu } from '.';

const makeSut = (props: Partial<MenuProps>): Omit<RenderOptions, 'wrapper'> => {
  const component = <Menu {...props} />;

  return render(component);
};

describe('Menu', () => {
  it('should render the component', () => {
    makeSut({ children: 'Menu' });

    const box = screen.getByRole('list');

    expect(box).toBeInTheDocument();
  });

  it('should render the component with correct text', () => {
    const children = faker.lorem.words(1);
    makeSut({ children });

    const box = screen.getByRole('list');

    expect(box).toHaveTextContent(children);
  });
});
