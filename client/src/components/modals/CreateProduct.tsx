import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
} from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectBrands } from '../../store/products/selectors/selectBrands';
import { selectTypes } from '../../store/products/selectors/selectTypes';
import { useState } from 'react';
import { Description } from '../../store/products/types/description';
import { selectCurrentBrand } from '../../store/products/selectors/selectCurrentBrand';
import { selectCurrentType } from '../../store/products/selectors/selectCurrentType';
import { productAPI } from '../../services/productService';

interface CreateBrandProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProduct = ({ isOpen, onClose }: CreateBrandProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [desc, setDesc] = useState<Description[]>([]);
  const [typeId, setTypeId] = useState<string | null>(null);
  const [brandId, setBrandId] = useState<string | null>(null);

  const types = useTypedSelector(selectTypes);
  const brands = useTypedSelector(selectBrands);

  const [createProduct] = productAPI.useCreateProductMutation();

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const addDesc = () => {
    setDesc([...desc, { title: '', description: '', number: Date.now() }]);
  };

  const removeDesc = (number: number) => {
    setDesc(desc.filter((info) => info.number !== number));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleAddDesc = (key: string, value: string, number: number) => {
    setDesc(
      desc.map((item) =>
        item.number === number ? { ...item, [key]: value } : item
      )
    );
  };

  const addProduct = async () => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    formData.append('img', file as File);
    formData.append('brandId', brandId as string);
    formData.append('typeId', typeId as string);
    formData.append('info', JSON.stringify(desc));

    await createProduct(formData).unwrap().then();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new product
        </Typography>
        <TextField
          id="outlined-basic"
          type="text"
          label="Product name"
          variant="outlined"
          fullWidth
          sx={{ mt: 4 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="number"
          label="Price"
          variant="outlined"
          fullWidth
          sx={{ mt: 4 }}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextField
          id="outlined-basic"
          type="file"
          variant="outlined"
          fullWidth
          sx={{ mt: 4 }}
          onChange={handleFile}
        />
        <InputLabel id="type-select" sx={{ mt: 2 }}>
          Type
        </InputLabel>
        <Select
          labelId="type-select"
          id="type-select"
          label="Type"
          fullWidth
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          {types.map((type) => {
            return (
              <MenuItem value={type.id} key={type.id}>
                {type.name}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id="brand-select" sx={{ mt: 2 }}>
          Brand
        </InputLabel>
        <Select
          labelId="brand-select"
          id="brand-select"
          label="Brand"
          fullWidth
          sx={{ mb: 5 }}
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          {brands.map((brand) => {
            return (
              <MenuItem value={brand.id} key={brand.id}>
                {brand.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button variant="outlined" sx={{ mr: 2 }} fullWidth onClick={addDesc}>
          Add new description
        </Button>
        {desc.map((info) => {
          return (
            <Grid container sx={{ mt: 2 }} key={info.number}>
              <Grid item xs={4} sx={{ p: 2 }}>
                {' '}
                <TextField
                  id="outlined-basic"
                  type="text"
                  variant="filled"
                  label="Name"
                  value={info.title}
                  onChange={(e) =>
                    handleAddDesc('title', e.target.value, info.number)
                  }
                />
              </Grid>
              <Grid item xs={4} sx={{ p: 2 }}>
                {' '}
                <TextField
                  id="outlined-basic"
                  type="text"
                  variant="filled"
                  label="Desc"
                  value={info.description}
                  onChange={(e) =>
                    handleAddDesc('description', e.target.value, info.number)
                  }
                />
              </Grid>
              <Grid item xs={4} sx={{ p: 2 }}>
                {' '}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeDesc(info.number)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          );
        })}
        <Divider sx={{ mb: 3, mt: 2 }} />
        <Button variant="contained" sx={{ mr: 2 }} onClick={addProduct}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProduct;
