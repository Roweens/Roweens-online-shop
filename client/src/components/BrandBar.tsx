import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectBrands } from '../store/products/selectors/selectBrands';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Brand } from '../store/products/types/brand';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { setSelectedBrand } from '../store/products/products-slice';
import { selectCurrentBrand } from '../store/products/selectors/selectCurrentBrand';

const BrandBar = () => {
  const brands = useTypedSelector(selectBrands);
  const selectedBrand = useTypedSelector(selectCurrentBrand);
  const dispatch = useTypedDispatch();

  const handleBrandSelect = (brand: Brand | null) => {
    dispatch(setSelectedBrand(brand));
  };

  return (
    <Stack direction="row" spacing={2}>
      <Chip
        label={'Все бренды'}
        variant={selectedBrand === null ? 'filled' : 'outlined'}
        onClick={() => handleBrandSelect(null)}
        color={selectedBrand === null ? 'primary' : 'primary'}
      />
      {brands.map((brand) => {
        return (
          <Chip
            label={brand.name}
            variant={brand.id === selectedBrand?.id ? 'filled' : 'outlined'}
            onClick={() => handleBrandSelect(brand)}
            color={brand.id === selectedBrand?.id ? 'primary' : 'primary'}
            key={brand.id}
          />
        );
      })}
    </Stack>
  );
};

export default BrandBar;
