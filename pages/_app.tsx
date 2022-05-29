// TYPES
import AppPropsWithLayout from 'interfaces/AppPropsWithLayout';

// STYLES
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? (page => page);

    return getLayout(<Component {...pageProps} />);
}
