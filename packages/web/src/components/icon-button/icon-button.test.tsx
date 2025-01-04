import { userEvent } from '@testing-library/user-event';

import type { RenderOptions } from '@/testing-library';
import { render, screen } from '@/testing-library';

import { IconButton } from '.';
import type { IconButtonProps } from '.';

const makeSut = ({
  icon = 'group',
  ...props
}: Partial<IconButtonProps>): Omit<RenderOptions, 'wrapper'> => {
  const component = <IconButton icon={icon} {...props} />;

  return render(component);
};

describe('IconButton', () => {
  let user = userEvent.setup();

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should call mock when clicked', async () => {
    const onClick = vi.fn();
    makeSut({ onClick });

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
