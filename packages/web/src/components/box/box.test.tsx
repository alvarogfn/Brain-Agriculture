import { faker } from '@faker-js/faker/locale/pt_BR';

import type { RenderOptions } from '@/testing-library';
import { render, screen } from '@/testing-library';

import { Box } from '.';
import type { BoxProps } from '.';

const makeSut = (props: Partial<BoxProps>): Omit<RenderOptions, 'wrapper'> => {
  const component = <Box {...props} />;

  return render(component);
};

describe('Box', () => {
  it('should render the component', () => {
    makeSut({ children: 'Box' });

    const box = screen.getByTestId('box');

    expect(box).toBeInTheDocument();
  });

  it('should render the component with correct text', () => {
    const children = faker.lorem.words(1);
    makeSut({ children });

    const box = screen.getByTestId('box');

    expect(box).toHaveTextContent(children);
  });
});
