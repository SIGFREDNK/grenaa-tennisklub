// NEXT
import Head from 'next/head';

// REACT
import React from 'react';

// INTERFACE
interface Props {
    title: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// COMPONENTS
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import NavItem from 'components/NavItem';
import Logo from 'components/Logo';
import Footer from 'components/Footer';

// ICONS
import { FaBars } from 'react-icons/fa';

// STYLES
import styles from './Layout.module.scss';

const Layout: React.FC<Props> = ({ title, children, className, style }) => {
    return (
        <>
            <Head>
                <title>Grenå Tennisklub | {title}</title>
                <meta name="description" content="Greenå tennisklubs officielle hjemmeside" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header className={styles.header}>
                <Logo text="Grenå Tennisklub" href="#section1" />
                <Navigation className={styles.navigation}>
                    <NavItem href="/traening" text="Træning" />
                    <NavItem href="/turneringer" text="Turneringer" />
                    <NavItem href="#section4" text="Bestyrelsen" />
                    <NavItem href="/fonden" text="Fonden" />
                    <NavItem href="/andet" text="Andet" />
                </Navigation>
                <button className={styles.hamburger}>
                    <FaBars />
                </button>
            </Header>
            <main className={`${className} ${styles.layout}`} style={{ ...style }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

Layout.defaultProps = {
    className: ''
};

export default Layout;
