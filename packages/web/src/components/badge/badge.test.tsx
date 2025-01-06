import { faker } from '@faker-js/faker/locale/pt_BR';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@/testing-library';

import Badge from './badge';
import type { BadgeProps } from './types';

const makeSut = ({
  children = faker.lorem.word(),
  ...props
}: Partial<BadgeProps>) => {
  return render(<Badge {...props}>{children}</Badge>);
};

describe('Badge', () => {
  it('should render the badge with children', () => {
    const children = faker.lorem.word();
    makeSut({ children });

    const badge = screen.getByText(children);

    expect(badge).toBeInTheDocument();
  });

  it('should render the remove button when showRemoveButton is true', () => {
    makeSut({ showRemoveButton: true });

    const removeButton = screen.getByRole('button');

    expect(removeButton).toBeInTheDocument();
  });

  it('should not render the remove button when showRemoveButton is false', () => {
    makeSut({ showRemoveButton: false });

    const removeButton = screen.queryByRole('button');

    expect(removeButton).not.toBeInTheDocument();
  });

  it('should call onRemove when remove button is clicked', async () => {
    const onRemove = jest.fn();
    makeSut({ onRemove, showRemoveButton: true });

    const removeButton = screen.getByRole('button');
    await userEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalled();
  });

  it('should display the title attribute with children text', () => {
    const children = faker.lorem.word();
    makeSut({ children });

    const badge = screen.getByText(children);

    expect(badge).toHaveAttribute('title', children);
  });
});
