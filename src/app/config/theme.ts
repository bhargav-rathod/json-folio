import { Inter, Poppins, Raleway, Montserrat, Source_Sans_3 } from 'next/font/google';

// Available font configurations - uncomment the one you want to use
// and comment out the others

// 1. Modern & Clean
// export const primaryFont = Montserrat({
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-primary',
// });

// 2. Professional
export const primaryFont = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-primary',
  preload: true,
});

// 3. Elegant
// export const primaryFont = Raleway({
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-primary',
// });

// 4. Minimal
// export const primaryFont = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-primary',
// });

// 5. Contemporary
// export const primaryFont = Source_Sans_3({
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-primary',
// }); 