import { RootState } from '../..';

export const selectTotalCount = (state: RootState) => state.products.totalCount;
