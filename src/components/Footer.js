// src/components/Footer.js
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="black" color="yellow" py="4" textAlign="center">
      <Text>&copy; {new Date().getFullYear()} Movies Website. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
