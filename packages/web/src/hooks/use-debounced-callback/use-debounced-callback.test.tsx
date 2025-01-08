import { act, renderHook } from '@/testing-library';

import useDebouncedCallback from './use-debounced-callback';

beforeAll(() => {
  jest.useFakeTimers();
});

describe('useDebouncedCallback', () => {
  it('should call the function when passing timeout', () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockFunction, 200),
    );

    expect(mockFunction).not.toHaveBeenCalled();

    act(() => {
      result.current();
      jest.advanceTimersByTime(200);
    });

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should not call the function when timeout not compatible', () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockFunction, 200),
    );

    act(result.current);

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should not call the function when timeout not compatible and is restart', () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockFunction, 200),
    );

    act(() => {
      result.current();
      jest.advanceTimersByTime(50);
      result.current();
    });

    expect(mockFunction).not.toHaveBeenCalled();
  });
});
