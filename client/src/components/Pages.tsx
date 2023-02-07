import { useTypedSelector } from '../hooks/useTypedSelector';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { selectTotalCount } from '../store/products/selectors/selectTotalCount';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { setPage } from '../store/products/products-slice';
import { selectPage } from '../store/products/selectors/selectPage';

export const Pages = () => {
  const totalCount = useTypedSelector(selectTotalCount);
  const dispatch = useTypedDispatch();
  const page = useTypedSelector(selectPage);
  const limit = 2;

  const pageCount = Math.ceil(totalCount / limit);

  const handlePages = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    dispatch(setPage(value));
  };

  return (
    <Stack spacing={2} sx={{ mt: 5, alignItems: 'center' }}>
      <Pagination
        count={pageCount}
        color="primary"
        page={page}
        onChange={handlePages}
      />
    </Stack>
  );
};
