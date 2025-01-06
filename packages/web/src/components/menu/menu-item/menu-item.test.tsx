import { faker } from '@faker-js/faker/locale/pt_BR';

import { render, screen } from '@/testing-library';
import type { RenderOptions } from '@/testing-library';

import type { MenuItemProps } from '.';
import { MenuItem } from '.';

const makeSut = (
  props: Partial<MenuItemProps>,
): Omit<RenderOptions, 'wrapper'> => {
  const component = <MenuItem {...props} />;

  return render(component);
};

describe('MenuItem', () => {
  it('should render the component', () => {
    makeSut({ children: 'MenuItem' });

    const box = screen.getByRole('listitem');

    expect(box).toBeInTheDocument();
  });

  it('should render the component with correct text', () => {
    const children = faker.lorem.words(1);
    makeSut({ children });

    const box = screen.getByRole('listitem');

    expect(box).toHaveTextContent(children);
  });
});
