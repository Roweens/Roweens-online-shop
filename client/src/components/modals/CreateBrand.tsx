import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { productAPI } from '../../services/productService';

interface CreateBrandProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBrand = ({ isOpen, onClose }: CreateBrandProps) => {
  const [brandName, setBrandName] = useState('');
  const [addBrand] = productAPI.useCreateBrandMutation();

  const handleAddBrand = async () => {
    await addBrand({ name: brandName })
      .unwrap()
      .then(() => setBrandName(''));
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
          Add new brand
        </Typography>
        <TextField
          id="outlined-basic"
          type="text"
          label="Brand"
          variant="outlined"
          fullWidth
          sx={{ mt: 4, mb: 4 }}
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleAddBrand}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateBrand;
