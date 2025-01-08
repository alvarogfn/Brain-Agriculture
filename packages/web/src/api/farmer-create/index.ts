import type { AxiosError, AxiosResponse } from 'axios';
import type {
  FarmerCreateRequestBody,
  FarmerCreateResponse,
  FarmerFindAllResponse,
} from 'brain-agriculture-backend-types';

import { HttpError } from '@/helpers/http-error';
import { mountURL } from '@/helpers/mount-url';
import axios from '@/lib/axios';

export const PATH_FARMER_CREATE = '/farmer';

export async function fetchFarmerCreate(
  body: FarmerCreateRequestBody,
): Promise<AxiosResponse<FarmerCreateResponse>> {
  try {
    return await axios.post<FarmerCreateResponse>(
      mountURL(PATH_FARMER_CREATE),
      body,
    );
  } catch (error) {
    throw new HttpError(error as AxiosError);
  }
}
