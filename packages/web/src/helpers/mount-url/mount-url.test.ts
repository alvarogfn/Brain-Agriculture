import { mountURL } from './mount-url';

describe('[Helpers]: mountURL', () => {
  it('should return the base URL when no params are provided', () => {
    const base = 'http://example.com';
    const result = mountURL(base);
    expect(result).toBe(base);
  });

  it('should replace path params in the URL', () => {
    const base = 'http://example.com/{id}';
    const params = { pathParams: { id: 123 } };
    const result = mountURL(base, params);
    expect(result).toBe('http://example.com/123');
  });

  it('should append query params to the URL', () => {
    const base = 'http://example.com';
    const params = { queryParams: { search: 'test' } };
    const result = mountURL(base, params);
    expect(result).toBe('http://example.com?search=test');
  });

  it('should handle both path and query params', () => {
    const base = 'http://example.com/{id}';
    const params = { pathParams: { id: 123 }, queryParams: { search: 'test' } };
    const result = mountURL(base, params);
    expect(result).toBe('http://example.com/123?search=test');
  });

  it('should ignore empty query params', () => {
    const base = 'http://example.com';
    const params = { queryParams: { search: '' } };
    const result = mountURL(base, params);
    expect(result).toBe(base);
  });

  it('should handle array query params', () => {
    const base = 'http://example.com';
    const params = { queryParams: { ids: [1, 2, 3] } };
    const result = mountURL(base, params);
    expect(result).toBe('http://example.com?ids=1%2C2%2C3');
  });

  it('should handle multiple query params', () => {
    const base = 'http://example.com';
    const params = { queryParams: { page: 1, search: 'test' } };
    const result = mountURL(base, params);
    expect(result).toBe('http://example.com?page=1&search=test');
  });
});
