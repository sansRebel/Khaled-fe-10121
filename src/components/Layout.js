import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box as="main" mt="4" p={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
