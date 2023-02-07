import { RootState } from '../..';

export const selectCurrentBrand = (state: RootState) =>
  state.products.selectedBrand;
