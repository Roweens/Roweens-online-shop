import { useTypedSelector } from './useTypedSelector';
import { selectBrands } from '../store/products/selectors/selectBrands';
import { Brand } from '../store/products/types/brand';

export const useBrandById = (id: number): Brand | null => {
  const brands = useTypedSelector(selectBrands);

  const brand = brands.find((brand) => brand.id === id);
  if (brand) return brand;
  return null;
};
