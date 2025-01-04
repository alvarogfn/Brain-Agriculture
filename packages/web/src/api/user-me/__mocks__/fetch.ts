import { vi } from 'vitest';

import { mocked } from './mock';

export const fetchUserMe = vi.fn(() => mocked.generate());
