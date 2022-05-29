// REACT
import React, { useEffect, useState } from 'react';

// NEXT
import Link from 'next/link';

// TYPES
import NextPageWithLayout from 'interfaces/NextPageWithLayout';

// ICONS
import { FaAngleDoubleDown } from 'react-icons/fa';

// COMPONENTS
import Layout from 'components/Layout';
import Slider from 'components/Slider';
import Slide from 'components/Slide';
import Button from 'components/Button';
import Banner from 'components/Banner';
import Sponsor from 'components/Sponsor';
import Modal from 'components/Modal';
import Form from 'components/Form';
import Input from 'components/Input';
import Select from 'components/Select';
import Option from 'components/Option';
import Carousel from 'components/Carousel';
import Person from 'components/Person';

// CONFIG
import {
    TENNIS_MEMBERSHIP_PRIZE_SUMMER_SCHEMA,
    TENNIS_MEMBERSHIP_PRIZE_WINTER_SCHEMA,
    PADEL_MEMBERSHIP_PRIZE_SCHEMA
} from 'config/memberships';

// STYLES
import styles from '../styles/Home.module.scss';

const Home: NextPageWithLayout = () => {
    const [modal, setModal] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [playType, setPlayType] = useState('PADEL');
    const [membership, setMembership] = useState('JUNIOR MEDLEM');
    const [season, setSeason] = useState('SOMMER');

    const getPrice: (ms: string, pt: string, s: string | undefined) => number = (ms, pt, s) => {
        // @ts-ignore
        if (pt === 'PADEL') return PADEL_MEMBERSHIP_PRIZE_SCHEMA[ms];

        // @ts-ignore
        if (s === 'SOMMER') return TENNIS_MEMBERSHIP_PRIZE_SUMMER_SCHEMA[ms];

        // @ts-ignore
        return TENNIS_MEMBERSHIP_PRIZE_WINTER_SCHEMA[ms];
    };

    const [price, setPrice] = useState(getPrice(membership, playType, season));

    const handleSubmit: (event: React.FormEvent) => void = event => {
        const data = {
            firstname,
            lastname,
            phone,
            mail,
            playType,
            membership,
            season,
            price
        };

        fetch('/api/mail', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async res => {
            const data = await res.json();
            console.log(data, res.status);
            if (res.status === 200) {
                setFirstname('');
                setLastname('');
                setMail('');
                setPhone('');
            } else {
                // TODO: ADD ERROR MESSAGE
            }
        });

        setModal(false);
    };

    const handlePlayTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = event => {
        setPlayType(event.target.value);
        setMembership('JUNIOR MEDLEM');
    };
    const handleMembershipChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = event => {
        setMembership(event.target.value);
    };

    useEffect(() => {
        setPrice(getPrice(membership, playType, season));
    }, [membership, playType, season]);

    return (
        <div className={styles.page}>
            <section className={styles.sectionOne} id="section1">
                <Slider interval={3}>
                    <Slide src="/images/cover-1.jpeg" alt="coverbillede 1" priority={true} />
                    <Slide src="/images/cover-2.jpeg" alt="coverbillede 2" priority={true} />
                    <Slide src="/images/cover-3.jpeg" alt="coverbillede 3" priority={true} />
                    <Slide src="/images/cover-4.jpeg" alt="coverbillede 4" priority={true} />
                    <Slide src="/images/cover-5.jpeg" alt="coverbillede 5" priority={true} />
                </Slider>
                <div className={styles.center}>
                    <h2>Grenå Tennisklub</h2>
                    <div className={styles.cta}>
                        <Button
                            text="Book tid"
                            backgroundColor="cornflowerblue"
                            href="https://bookingportal.com/grenaa-tennis-klub"
                            type="WEB"
                        />
                        <Button
                            text="Bliv medlem"
                            backgroundColor="mediumseagreen"
                            onClick={() => setModal(true)}
                            type="BUTTON"
                        />
                    </div>
                </div>
                <div className={styles.sponsorTitle}>
                    <span className={styles.thanks}>Tak til vores sponsorer</span>
                    <span className={styles.arrow}>
                        <FaAngleDoubleDown />
                    </span>
                </div>
                <Modal open={modal} title="Indmeldelse" onClose={() => setModal(false)} className={styles.modal}>
                    <Form method="dialog" onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            name="firstname"
                            label="Fornavn"
                            onChange={event => setFirstname(event.target.value)}
                            value={firstname}
                            required
                        />
                        <Input
                            name="lastname"
                            label="Efternavn"
                            onChange={event => setLastname(event.target.value)}
                            value={lastname}
                            required
                        />
                        <Input
                            name="phone"
                            label="Telefonnummer"
                            onChange={event => setPhone(event.target.value)}
                            value={phone}
                            required
                        />
                        <Input
                            name="mail"
                            label="Mail"
                            onChange={event => setMail(event.target.value)}
                            value={mail}
                            required
                        />
                        <Select title="Spiltype" onChange={handlePlayTypeChange} value={playType}>
                            <Option text="Padel" value="PADEL" />
                            <Option text="Tennis" value="TENNIS" />
                        </Select>
                        {playType === 'TENNIS' && (
                            <Select title="Sæson" onChange={event => setSeason(event.target.value)} value={season}>
                                <Option text="Sommer" value="SOMMER" />
                                <Option text="Vinter" value="VINTER" />
                            </Select>
                        )}
                        <Select title="Medlemskab" onChange={handleMembershipChange} value={membership}>
                            <Option text="Junior (født 2004 eller senere)" value="JUNIOR MEDLEM" />
                            <Option text="Studerende (under 25 år)" value="STUDERENDE MEDLEM" />
                            <Option text="Senior (født 2003 eller tidligere)" value="SENIOR MEDLEM" />
                            {playType === 'PADEL' && (
                                <>
                                    <Option text="Tennismedlem" value="ALLEREDE TENNISMEDLEM" />
                                    <Option text="Familie med 1 barn (2 voksne + 1 barn)" value="FAMILIE MED 1 BARN" />
                                    <Option text="Familie med 2 børn (2 voksne + 2 børn)" value="FAMILIE MED 2 BØRN" />
                                    <Option text="En fast ugentlig time" value="FAST UGENTLIG" />
                                </>
                            )}
                            {playType === 'TENNIS' && (
                                <>
                                    <Option text="Mini (født 2010 eller senere)" value="MINI MEDLEM" />
                                    {season === 'SOMMER' && (
                                        <>
                                            <Option text="Passivt Medlemskab" value="PASSIVT MEDLEMSKAB" />
                                            <Option
                                                text="Familie med 1 barn (2 voksne + 1 barn)"
                                                value="FAMILIE MED 1 BARN"
                                            />
                                            <Option
                                                text="Familie med 2 børn (2 voksne + 2 børn)"
                                                value="FAMILIE MED 2 BØRN"
                                            />
                                        </>
                                    )}
                                    {season === 'VINTER' && (
                                        <>
                                            <Option text="Faste haltimer" value="FASTE HALTIMER" />
                                        </>
                                    )}
                                </>
                            )}
                        </Select>
                        <span className={styles.terms}>
                            <small>
                                Jeg har læst og accepterer
                                <Link href="/betingelser">
                                    <a>betingelserne</a>
                                </Link>
                            </small>
                            <input type="checkbox" required />
                        </span>
                        <span className={styles.total}>
                            <small>Samlet pris: {price} kr.</small>
                        </span>
                        <span className={styles.account}>
                            <small>
                                Beløbet indbetales til: <span className={styles.number}>7320 1228860</span>
                            </small>
                        </span>
                    </Form>
                </Modal>
            </section>
            <Banner duration={20} width={300} height={100}>
                <Sponsor
                    src="/images/louis-nielsen-grenaa.jpeg"
                    alt="Louis Nielsen Grenå"
                    href="https://www.louisnielsen.dk/"
                />
                <Sponsor
                    src="/images/food-diagnostics.jpeg"
                    alt="Food Diagnostics"
                    href="https://www.fooddiagnostics.dk/"
                />
                <Sponsor
                    src="/images/hansen-furniture.jpeg"
                    alt="Hansen Furniture"
                    href="https://www.facebook.com/Hansen-Furniture-Aps-140917349651768/"
                />
                <Sponsor
                    src="/images/home.jpeg"
                    alt="Home Ejendomsmægler"
                    href="https://home.dk/ejendomsmaegler/612-home-grenaa/"
                />
                <Sponsor
                    src="/images/henrik-lemkow.jpeg"
                    alt="Henrik Lemkow tandtekniker"
                    href="https://www.lemkow.dk/"
                />
                <Sponsor
                    src="/images/djurslands-bank.jpeg"
                    alt="Djurslands Bank"
                    href="https://www.djurslandsbank.dk/"
                />
                <Sponsor src="/images/per-moeller-aps.jpeg" alt="Per Møller ApS" href="https://www.permoeller.dk/" />
                <Sponsor
                    src="/images/aalsrode.jpeg"
                    alt="Ålsrode Smede & Maskinfabrik"
                    href="https://www.aalsrode.dk/da/"
                />
                <Sponsor src="/images/lb-consult.jpeg" alt="LB Consult" href="https://www.lb-consult.dk/" />
                <Sponsor src="/images/grenaa-bil-center.jpeg" alt="Grenaa Bil Center" href="https://www.gbc.dk/" />
            </Banner>
            <section id="section2" className={styles.traening}></section>
            <section id="section3" className={styles.turneringer}></section>
            <section id="section4" className={styles.bestyrelsen}>
                <h2>Bestyrelsen</h2>
                <Carousel>
                    <Person
                        src="/images/lissy.jpeg"
                        name="Lissy Nørgaard"
                        position="Næstformand og sekretær"
                        phone="21 40 96 77"
                        mail="lissy.noergaard@gmail.com"
                        street="Skovsvinget 25"
                        city="8500 Grenaa"
                    />
                    <Person
                        src="/images/niels-peter.jpeg"
                        name="Niels-Peter Meldgaard"
                        position="Kasserer"
                        phone="51 94 04 60"
                        mail="nielspeter@hotmail.com"
                        street="Søren Kannes Vej 7"
                        city="8500 Grenaa"
                    />
                    <Person
                        src="/images/birgitte.jpeg"
                        name="Birgitte Nørsten"
                        position="Bestyrelsesmedlem"
                        phone="28 99 65 49"
                        mail="birgitte.noersten@stofanet.dk"
                        street="Møgelbjerg 43"
                        city="8500 Grenaa"
                    />
                    <Person
                        src="/images/erik.jpeg"
                        name="Erik Christiansen"
                        position="Bestyrelsesmedlem"
                        phone="24 48 69 01"
                        mail="mec.gr@stofanet.dk"
                        street="Sommerlyst 5b"
                        city="8500 Grenaa"
                    />
                    <Person
                        src="/images/jan.jpeg"
                        name="Jan Møgelvang Hansen"
                        position="Bestyrelsesmedlem"
                        phone="28 56 44 23"
                        mail="havkat50@gmail.com"
                        street="Ikke angivet"
                        city="Ikke angivet"
                    />
                    <Person
                        src="/images/jens.jpeg"
                        name="Jens Aarkrog"
                        position="Hjemmeside"
                        phone="30 91 51 08"
                        mail="jaa@gtk.dk"
                        street="Bredgade 23"
                        city="8500 Grenaa"
                    />
                </Carousel>
            </section>
            <section id="section5" className={styles.fonden}></section>
        </div>
    );
};

Home.getLayout = function getLayout(page) {
    return <Layout title="Forside">{page}</Layout>;
};

export default Home;
