// NEXT
import type { AppProps } from 'next/app';

// TYPES
import NextPageWithLayout from 'interfaces/NextPageWithLayout';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default AppPropsWithLayout;
