import { useQuery } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from '@/testing-library';

import { queryUserMe } from './query';

vi.mock('./fetch');

describe('[API]: UserMe', () => {
  it('should fetch user data', async () => {
    const { result } = renderHook(() => useQuery(queryUserMe([])));

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({ permissions: ['admin'] });
  });
});
