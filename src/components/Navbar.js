// src/components/Navbar.js
import { Box, Flex, Button, Heading, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

const Navbar = () => {
  return (
    <Box bg="black" color="yellow" px="4" py="2" boxShadow="md">
      <Flex align="center" maxW="1200px" mx="auto">
        <NextLink href="/" passHref>
          <ChakraLink _hover={{ textDecoration: 'none' }}>
            <Heading size="md" color="yellow">Movies Website</Heading>
          </ChakraLink>
        </NextLink>
        <Flex ml="auto">
          {['genre', 'timeslot', 'specific_theater', 'search_performer', 'rate_movie', 'login', 'register'].map((route) => (
            <NextLink key={route} href={`/${route}`} passHref>
              <ChakraLink _hover={{ textDecoration: 'none' }}>
                <Button as="span" bg="yellow" color="black" _hover={{ bg: "yellow.500" }} variant="solid" mr="4">
                  {route.replace('_', ' ')}
                </Button>
              </ChakraLink>
            </NextLink>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
