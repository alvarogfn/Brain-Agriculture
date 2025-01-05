import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@/testing-library';

import type { FieldFormTextProps } from './field-form-text';
import { FieldFormText } from './field-form-text';

type FormProps = {
  onSubmit: SubmitHandler<any>;
} & Omit<FieldFormTextProps<any>, 'control'>;

const Form = ({ onSubmit, ...props }: FormProps) => {
  const methods = useForm();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FieldFormText {...props} control={methods.control} />
      <button type="submit">submit</button>
    </form>
  );
};

const makeSut = ({
  label = faker.lorem.word(),
  name = faker.lorem.word(),
  onSubmit = jest.fn(),
  ...props
}: Partial<FormProps>) => {
  render(<Form label={label} name={name} onSubmit={onSubmit} {...props} />);
};

let user = userEvent.setup();

beforeEach(() => {
  user = userEvent.setup();
});

describe('[Components:FieldForm] FieldFormMask', () => {
  it('should render a textbox', async () => {
    makeSut({});

    const field = screen.getByRole('textbox');

    expect(field).toBeInTheDocument();
  });

  it('should render a textbox with a label', async () => {
    makeSut({ label: 'text_label' });

    const label = screen.getByLabelText('text_label');

    expect(label).toBeInTheDocument();
  });

  it('should submit form with value', async () => {
    const onSubmit = jest.fn();

    makeSut({ name: 'text', onSubmit });

    const field = screen.getByRole('textbox');
    const button = screen.getByText('submit');

    await user.type(field, 'hello, world!');
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith(
      { text: 'hello, world!' },
      expect.anything(),
    );
  });
});
