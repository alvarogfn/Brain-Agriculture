import type { PropsWithChildren } from 'react';

import { render, screen } from '@/testing-library';

import Icon from './icon';
import type { IconProps } from './types';

jest.mock('@/icons', () => ({
  close: (props: PropsWithChildren) => <svg {...props} />,
}));

function makeSut({ name = 'close', ...props }: Partial<IconProps>) {
  return render(<Icon name={name} {...props} />);
}

describe('[Components]: Icon', () => {
  it('should render the correct icon', () => {
    makeSut({ name: 'close' });

    const icon = screen.getByTestId('icon-close');

    expect(icon).toBeInTheDocument();
  });

  it('should throw an error if the icon was not found', () => {
    expect(() => makeSut({ name: null as any })).toThrow();
  });
});
