import { RootState } from '../..';

export const selectCurrentType = (state: RootState) =>
  state.products.selectedType;
