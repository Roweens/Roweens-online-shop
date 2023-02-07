import { Container } from '@mui/material';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}
    >
      <div className="lds-dual-ring"></div>
    </Container>
  );
};
