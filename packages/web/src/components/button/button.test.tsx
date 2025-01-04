import { faker } from '@faker-js/faker/locale/pt_BR';

import type { RenderOptions } from '@/testing-library';
import { render, screen } from '@/testing-library';

import type { ButtonProps } from './types';

import { Button } from '.';

const makeSut = (
  props: Partial<ButtonProps>,
): Omit<RenderOptions, 'wrapper'> => {
  const component = <Button {...props} />;

  return render(component);
};

describe('Button', () => {
  it('should render the component button', () => {
    const children = faker.lorem.words(1);
    makeSut({ children });

    const button = screen.getByText(children);

    expect(button).toHaveTextContent(children);
  });
});
