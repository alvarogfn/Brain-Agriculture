import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor, within } from '@/testing-library';

import type { FieldFormMultiSelectProps } from '.';
import { FieldFormMultiSelect } from '.';

interface FormValues {
  value: { label: string; value: number }[];
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
  FieldFormMultiSelectProps<FormValues, { label: string; value: number }>,
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
      <FieldFormMultiSelect control={methods.control} {...props} />
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

describe('[Components:FieldForm] FieldFormMultiSelect', () => {
  it('should render the multi-select input', async () => {
    makeSut({});

    const input = await screen.findByRole('combobox');

    expect(input).toBeInTheDocument();
  });

  it('should display the default selected items if provided', async () => {
    makeSut({ defaultValues: { value: [{ label: 'Option 1', value: 1 }] } });

    const input = await screen.findByRole('combobox');

    expect(input).toHaveValue('');
    const badgeList = await screen.findByRole('list');
    const badge = await within(badgeList).findByText('Option 1');
    expect(badge).toBeInTheDocument();
  });

  it('should select multiple items and update the input value', async () => {
    makeSut({});

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const options = await screen.findAllByRole('option');
    await user.click(options[0]);
    await user.click(options[1]);

    const badgeList = await screen.findByRole('list');
    const badges = await within(badgeList).findAllByText(/Option/);

    expect(badges).toHaveLength(2);
  });

  it('should call onSelectedItemsChange callback when items are selected', async () => {
    const onSelectedItemsChange = jest.fn();
    makeSut({ onSelectedItemsChange });

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const options = await screen.findAllByRole('option');
    await user.click(options[0]);

    expect(onSelectedItemsChange).toHaveBeenCalledWith([
      { label: 'Option 1', value: 1 },
    ]);
  });

  it('should render the select as disabled when disabled prop is true', async () => {
    makeSut({ disabled: true });

    const combobox = await screen.findByRole('combobox');
    expect(combobox).toBeDisabled();
  });

  it('should remove selected item when remove button is clicked', async () => {
    const onSelectedItemsChange = jest.fn();
    makeSut({
      defaultValues: { value: [{ label: 'Option 1', value: 1 }] },
      onSelectedItemsChange,
    });

    const badgeItem = await screen.findByRole('listitem');

    const removeButton = await within(badgeItem).findByRole('button');
    await user.click(removeButton);

    expect(onSelectedItemsChange).toHaveBeenCalledWith([]);
  });

  it('should close the list on removing focus', async () => {
    makeSut({});

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const list = screen.getByRole('listbox');
    await user.tab();

    await waitFor(() => expect(list).not.toBeVisible());
  });
});
