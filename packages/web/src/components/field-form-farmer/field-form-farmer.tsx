import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryInfiniteFarmerFindAll } from '@/api/farmer-find-all';
import { FieldForm } from '@/components/field-form';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

import type { FieldFormFarmerProps } from './types';

function FieldFormFarmer<FormValues extends FieldValues>(
  props: FieldFormFarmerProps<FormValues>,
) {
  const [searchTerm, setSearchTerm] = useState('');

  const { data } = useInfiniteQuery(
    queryInfiniteFarmerFindAll([{ searchTerm }], {
      throwOnError: false,
    }),
  );

  const content = data?.pages.flatMap((page) => page.content);

  const handleSearchTerm = useDebouncedCallback(
    (value) => setSearchTerm(value),
    1000,
  );

  return (
    <FieldForm
      {...props}
      items={content || []}
      itemToKey={(item) => item?.id ?? ''}
      itemToString={(item) => item?.name ?? ''}
      onInputValueChange={handleSearchTerm}
      onSelectedItemChange={(value) => handleSearchTerm(value.name)}
      type="combobox"
    />
  );
}

export default FieldFormFarmer;
