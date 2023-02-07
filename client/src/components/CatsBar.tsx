import {
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  Box,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setSelectedType } from '../store/products/products-slice';
import { selectCurrentType } from '../store/products/selectors/selectCurrentType';
import { selectTypes } from '../store/products/selectors/selectTypes';
import { Type } from '../store/products/types/type';

const CatsBar = () => {
  const types = useTypedSelector(selectTypes);
  const selectedType = useTypedSelector(selectCurrentType);
  const dispatch = useTypedDispatch();

  const handleTypeSelect = (type: Type | null) => {
    dispatch(setSelectedType(type));
  };

  return (
    <List>
      <ListItem disablePadding onClick={() => handleTypeSelect(null)}>
        <ListItemButton selected={selectedType === null}>
          <ListItemText primary={'Все товары'} />
        </ListItemButton>
      </ListItem>
      {types.map((type) => {
        return (
          <Box key={type.id}>
            <ListItem disablePadding onClick={() => handleTypeSelect(type)}>
              <ListItemButton selected={type.id === selectedType?.id}>
                <ListItemText primary={type.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        );
      })}
    </List>
  );
};

export default CatsBar;
