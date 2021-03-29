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
      variants: {
        milkyWay: {
          backgroundColor: '#a0aec0',
          color: '#071536',
        },
      }
    },
  },
  fonts: {
    heading: `'Nunito', Consolas, serif`,
    body: `'Nunito', Georgia, serif`,
  },
  colors: {
    black: '#5b5971',
    milkyWay: '#071536',
    milkyWayText: '#a0aec0',
    milkyWayAlpha: 'rgb(7, 21, 54, 0.9)',
  },
}
