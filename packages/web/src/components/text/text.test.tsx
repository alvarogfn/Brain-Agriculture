import { faker } from '@faker-js/faker/locale/pt_BR';

import type { RenderOptions } from '@/testing-library';
import { render, screen } from '@/testing-library';

import { Text } from '.';
import type { TextProps } from '.';

const makeSut = (props: Partial<TextProps>): Omit<RenderOptions, 'wrapper'> => {
  const component = <Text {...props} />;

  return render(component);
};

describe('Text', () => {
  it('should render the component with correct text', () => {
    const children = faker.lorem.words(1);
    makeSut({ children });

    const text = screen.getByText(children);

    expect(text).toHaveTextContent(children);
  });
});
