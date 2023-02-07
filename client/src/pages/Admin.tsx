import { Container, Button } from '@mui/material';
import CreateBrand from '../components/modals/CreateBrand';
import CreateProduct from '../components/modals/CreateProduct';
import CreateType from '../components/modals/CreateType';
import { useState } from 'react';

const AdminPage = () => {
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Button
          variant="outlined"
          sx={{ mt: 3, width: '50%' }}
          onClick={() => setTypeModalVisible(true)}
        >
          Add type
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 3, width: '50%' }}
          onClick={() => setBrandModalVisible(true)}
        >
          Add brand
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 3, width: '50%' }}
          onClick={() => setProductModalVisible(true)}
        >
          Add product
        </Button>

        <CreateType
          isOpen={typeModalVisible}
          onClose={() => setTypeModalVisible(false)}
        />
        <CreateProduct
          isOpen={productModalVisible}
          onClose={() => setProductModalVisible(false)}
        />
        <CreateBrand
          isOpen={brandModalVisible}
          onClose={() => setBrandModalVisible(false)}
        />
      </Container>
    </>
  );
};

export default AdminPage;
