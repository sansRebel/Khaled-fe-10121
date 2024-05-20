// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#fff7d4',
      100: '#ffec9c',
      200: '#ffe066',
      300: '#ffd52f',
      400: '#ffcc00',
      500: '#e6b800',
      600: '#b38f00',
      700: '#806600',
      800: '#4d3d00',
      900: '#1a1400',
    },
    black: '#000000',
    yellow: '#ffd700',
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'yellow',
      },
      a: {
        color: 'yellow',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export default customTheme;
