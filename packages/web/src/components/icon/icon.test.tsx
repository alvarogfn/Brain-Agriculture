import userEvent from '@testing-library/user-event';

import { render, screen } from '@/testing-library';

import Icon from './icon';
import type { IconProps } from './types';

jest.mock('@/icons', () => ({
  'arrow-drop-down': (props: any) => (
    <svg data-testid="mocked-test-icon" {...props} />
  ),
}));

describe('Icon', () => {
  const makeSut = (
    props: Partial<IconProps> = {},
    ref?: React.Ref<SVGSVGElement>,
  ) => {
    const defaultProps: IconProps = {
      color: '',
      'data-testid': 'icon',
      name: 'arrow-drop-down',
      ...props,
    };

    return render(<Icon {...defaultProps} ref={ref} />);
  };

  it('should render the Icon component with the correct icon', () => {
    makeSut({ name: 'arrow-drop-down' });

    const icon = screen.getByTestId('icon-arrow-drop-down');

    expect(icon).toBeInTheDocument();
  });

  it('should throw an error if the icon name does not exist', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => makeSut({ name: undefined })).toThrowError(
      'Icon "undefined" not found',
    );

    consoleErrorSpy.mockRestore();
  });

  it('should handle SVG click events', async () => {
    const handleClick = vi.fn();
    makeSut({ name: 'arrow-drop-down', onClick: handleClick });

    const icon = screen.getByTestId('icon-arrow-drop-down');

    await userEvent.click(icon);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
