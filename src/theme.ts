import { ThemeOverride } from '@chakra-ui/react';

// In this file, we can customize fonts, colors, etc used by the ChakraUI component library. For more information, see
// https://chakra-ui.com/docs/theming/customize-theme

export const GOOGLE_FONTS_LOAD = [
  'Nunito:ital,wght@0,400;0,700;1,400;1,700',
];

export const theme: ThemeOverride = {
  styles: {
    global: {
      body: {
        color: 'black',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'heading'
      },
    },
  },
  fonts: {
    heading: `'Nunito', Consolas, serif`,
    body: `'Nunito', Georgia, serif`,
  },
  colors: {
    black: '#5b5971',
  },
}
