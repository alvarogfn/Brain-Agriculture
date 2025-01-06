import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '@/testing-library';

import { MultiSelect } from '.';
import type { MultiSelectProps } from '.';

const items = ['Apple', 'Banana', 'Orange', 'Mango'];

async function makeSut({
  itemToKey = String,
  itemToString = String,
  ...props
}: Partial<MultiSelectProps<string>>) {
  return render(
    <MultiSelect<string>
      items={items}
      itemToKey={itemToKey}
      itemToString={itemToString}
      renderInput={({
        getInputProps,
        getLabelProps,
        getToggleButtonProps,
        selectedItems,
      }) => (
        <div>
          <input {...getInputProps()} />
          <label {...getLabelProps()}>{selectedItems.join(', ')}</label>
          <button {...getToggleButtonProps()}></button>
        </div>
      )}
      renderItem={({ getItemProps, item }) => (
        <li key={item} {...getItemProps()}>
          {item}
        </li>
      )}
      renderMenu={({ children, getMenuProps, isOpen }) => (
        <ul
          {...getMenuProps()}
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          {children}
        </ul>
      )}
      {...props}
    />,
  );
}

describe('MultiSelect', () => {
  let user = userEvent.setup();

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render the component', async () => {
    await makeSut({});

    const multiSelectComponent = await screen.findByRole('combobox');

    expect(multiSelectComponent).toBeVisible();
  });

  it('should call onSelectedItemsChange when click on option', async () => {
    const onSelectedItemsChange = jest.fn();

    await makeSut({
      onSelectedItemsChange: onSelectedItemsChange,
    });

    const input = await screen.findByRole('combobox');
    await user.click(input);

    const options = screen.getAllByRole('option');

    await user.click(options[0]);

    expect(onSelectedItemsChange).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedItems: [items[0]],
      }),
    );
  });

  it('should render list on click component', async () => {
    await makeSut({});

    const input = await screen.findByRole('combobox');
    await user.click(input);

    const list = screen.getByRole('listbox');

    await waitFor(() => expect(list).toBeVisible());
  });

  it('should close list on removing focus', async () => {
    await makeSut({});

    const input = await screen.findByRole('combobox');
    await user.click(input);

    const list = screen.getByRole('listbox');

    await user.tab();

    await waitFor(() => expect(list).not.toBeVisible());
  });
});
