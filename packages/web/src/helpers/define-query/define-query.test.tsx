import { queryUserMe } from '@/api/user-me';

describe('[Helpers]: defineQuery', () => {
  it('should return query options', () => {
    expect(queryUserMe([])).toEqual(
      expect.objectContaining({
        queryFn: expect.any(Function),
        queryKey: [''],
      }),
    );
  });
});
