import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@/testing-library';

import type { FieldFormComboboxProps } from '.';
import { FieldFormCombobox } from '.';

interface FormValues {
  value: { label: string; value: number } | null;
}

type Item = { label: string; value: number };

const mockItems: Item[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

type FormProps = {
  defaultValues?: FormValues;
  onSubmit?: SubmitHandler<any>;
} & Omit<
  FieldFormComboboxProps<FormValues, { label: string; value: number }>,
  'control'
>;

const Form = ({
  defaultValues,
  onSubmit = () => null,
  ...props
}: FormProps) => {
  const methods = useForm<FormValues>({ defaultValues });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FieldFormCombobox control={methods.control} {...props} />
      <button type="submit">submit</button>
    </form>
  );
};

const makeSut = ({
  items = mockItems,
  itemToString = (value) => value?.label ?? '',
  label = faker.lorem.word(),
  name = 'value',
  ...props
}: Partial<FormProps>) => {
  return render(
    <Form
      items={items}
      itemToString={itemToString}
      label={label}
      name={name}
      {...props}
    />,
  );
};

let user = userEvent.setup();

beforeEach(() => {
  user = userEvent.setup();
});

describe('[Components:FieldForm] FieldFormCombobox', () => {
  it('should render the combobox input', async () => {
    makeSut({});

    const input = await screen.findByRole('combobox');

    expect(input).toBeInTheDocument();
  });

  it('should display the default selected item if provided', async () => {
    makeSut({ defaultValues: { value: { label: 'option 1', value: 1 } } });

    const input = await screen.findByRole('combobox');

    expect(input).toHaveValue('option 1');
  });

  it('should select an item and update the input value', async () => {
    makeSut({});

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const option = await screen.findAllByRole('option');
    await user.click(option[0]);

    expect(combobox).toHaveValue('Option 1');
  });

  it('should call onSelectedItemChange callback when an item is selected', async () => {
    const onSelectedItemChange = jest.fn();
    makeSut({ onSelectedItemChange });

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const option = await screen.findAllByRole('option');
    await user.click(option[0]);

    expect(onSelectedItemChange).toHaveBeenCalledWith({
      label: 'Option 1',
      value: 1,
    });
  });

  it('should render the select as disabled when disabled prop is true', async () => {
    makeSut({ disabled: true });

    const combobox = await screen.findByRole('combobox');
    expect(combobox).toBeDisabled();
  });
});
