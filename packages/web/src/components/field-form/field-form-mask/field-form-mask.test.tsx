import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@/testing-library';

import FieldFormMask from './field-form-mask';
import type { FieldFormMaskProps } from './types';

type FormProps = {
  onSubmit: SubmitHandler<any>;
} & Omit<FieldFormMaskProps<any>, 'control'>;

const Form = ({ onSubmit, ...props }: FormProps) => {
  const methods = useForm();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FieldFormMask {...props} control={methods.control} />
      <button type="submit">submit</button>
    </form>
  );
};

const makeSut = ({
  label = faker.lorem.word(),
  maskOpts = { mask: '000.000.000-00' },
  name = faker.lorem.word(),
  onSubmit = jest.fn(),
  ...props
}: Partial<FormProps>) => {
  render(
    <Form
      label={label}
      maskOpts={maskOpts}
      name={name}
      onSubmit={onSubmit}
      {...props}
    />,
  );
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
    makeSut({ label: 'mask_label' });

    const label = screen.getByLabelText('mask_label');

    expect(label).toBeInTheDocument();
  });

  it('should render a textbox with maskedValue', async () => {
    makeSut({ maskOpts: { mask: '000.000.000-00' } });

    const field = screen.getByRole('textbox');

    await user.type(field, '12345678910');

    expect(field).toHaveValue('123.456.789-10');
  });

  it('should submit form with value unmasked', async () => {
    const onSubmit = jest.fn();

    makeSut({ name: 'mask', onSubmit });

    const field = screen.getByRole('textbox');
    const button = screen.getByText('submit');

    await user.type(field, '12345678910');
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith(
      { mask: '12345678910' },
      expect.anything(),
    );
  });
});
