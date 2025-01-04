import { faker } from '@faker-js/faker/locale/pt_BR';
import { userEvent } from '@testing-library/user-event';

import type { RenderOptions } from '@/testing-library';
import { render, screen } from '@/testing-library';

import { Input } from '.';
import type { InputProps } from '.';

const makeSut = ({
  onChange = jest.fn(),
  ...props
}: InputProps): Omit<RenderOptions, 'wrapper'> => {
  const component = <Input onChange={onChange} {...props} />;

  return render(component);
};

let user = userEvent.setup();

beforeEach(() => {
  user = userEvent.setup();
});

describe('Input', () => {
  it('should render the Input component', () => {
    makeSut({});

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should render with a value passed by prop', () => {
    const value = faker.person.firstName();
    makeSut({ value });

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(value);
  });

  it('should call onChange when typing', async () => {
    const onChange = jest.fn();
    const value = faker.person.firstName();
    makeSut({ onChange });

    const input = screen.getByRole('textbox');
    await user.type(input, value);

    expect(onChange).toHaveBeenCalledTimes(value.length);
  });

  it('should update the value when typing', async () => {
    const value = faker.person.firstName();
    makeSut({});

    const input = screen.getByRole('textbox');
    await user.type(input, value);

    expect(input).toHaveValue(value);
  });

  it('should render the prefix correctly', () => {
    const prefix = faker.person.firstName();
    makeSut({ prefix });

    const prefixElement = screen.getByText(prefix);

    expect(prefixElement).toBeInTheDocument();
  });
});
