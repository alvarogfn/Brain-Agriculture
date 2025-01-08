import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import type { FarmerFindAllResponseContent } from 'brain-agriculture-backend-types';

import { fetchFarmerFindAll } from '@/api/farmer-find-all';
import { render, screen, waitFor } from '@/testing-library';

import FieldFormFarmer from './field-form-farmer';
import type { FieldFormFarmerProps } from './types';

interface FormValues {
  value: null | Partial<FarmerFindAllResponseContent>;
}

type FormProps = {
  defaultValues?: FormValues;
  onSubmit?: SubmitHandler<any>;
} & Omit<FieldFormFarmerProps<FormValues>, 'control'>;

jest.mock('@/hooks/use-debounced-callback');
jest.mock('@/api/farmer-find-all');

const Form = ({
  defaultValues,
  onSubmit = () => null,
  ...props
}: FormProps) => {
  const methods = useForm<FormValues>({ defaultValues });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FieldFormFarmer control={methods.control} {...props} />
      <button type="submit">submit</button>
    </form>
  );
};

const makeSut = ({
  label = faker.lorem.word(),
  name = 'value',
  ...props
}: Partial<FormProps>) => {
  return render(<Form label={label} name={name} {...props} />);
};

let user = userEvent.setup();

beforeEach(() => {
  user = userEvent.setup();
});

describe('[Components:FieldForm] FieldFormFarmer', () => {
  it('should render component', async () => {
    makeSut({});

    const field = await screen.findByRole('combobox');

    expect(field).toBeInTheDocument();
  });

  it('should not call query with empty searchTerm', async () => {
    makeSut({});

    await waitFor(() => {
      expect(fetchFarmerFindAll).not.toHaveBeenCalled();
    });
  });

  it('should refetch query when update search term', async () => {
    makeSut({});

    const searchTerm = faker.lorem.word();
    const input = await screen.findByRole('combobox');
    await user.type(input, searchTerm);

    await waitFor(() => {
      expect(fetchFarmerFindAll).toHaveBeenCalledWith(
        {
          page: 0,
          searchTerm,
          size: 10,
          sort: ['id', 'ASC'],
        },
        { enabled: true, throwOnError: false },
      );
    });
  });
});
