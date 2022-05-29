// NEXT
import type { NextPage } from 'next';

// REACT
import type { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export default NextPageWithLayout;
