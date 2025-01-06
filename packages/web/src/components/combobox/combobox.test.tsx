import { userEvent } from '@testing-library/user-event';

import { render, screen, waitFor } from '@/testing-library';

import { Combobox } from '.';
import type { ComboboxProps } from '.';

const items = ['José', 'Silva', 'Santos'];

async function makeSut({ ...props }: Partial<ComboboxProps<string>>) {
  return render(
    <Combobox<string>
      items={items}
      renderInput={({
        getInputProps,
        getLabelProps,
        getToggleButtonProps,
        selectedItem,
      }) => (
        <div>
          <input {...getInputProps()} />
          <label {...getLabelProps()}>{selectedItem}</label>
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

describe('Combobox', () => {
  let user = userEvent.setup();

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render the component', async () => {
    await makeSut({});

    const comboboxComponent = await screen.findByRole('combobox');

    expect(comboboxComponent).toBeVisible();
  });

  it('should call onSelectedItemChange when click on option', async () => {
    const onSelectedItemChange = jest.fn();

    await makeSut({
      onSelectedItemChange: onSelectedItemChange,
    });

    const input = await screen.findByRole('combobox');
    await user.click(input);

    const options = screen.getAllByRole('option');

    await user.click(options[0]);

    expect(onSelectedItemChange).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedItem: items[0],
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
