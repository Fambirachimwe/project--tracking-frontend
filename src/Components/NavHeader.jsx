import { useState } from 'react';
import { createStyles, Header, Container, Anchor, Group, Burger, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import Logo from './logo.png';

const HEADER_HEIGHT = rem(100);



const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colors.red[7],
        // theme.colorScheme === 'dark' ? theme.colors.red[7] : theme.colors.red[7],
        borderBottom: 0,
        marginBottom: 0
    },

    logo: {
        width: '100px'
    },

    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: "100%"
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    links: {
        paddingTop: theme.spacing.lg,
        height: HEADER_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    mainLinks: {
        marginRight: -theme.spacing.sm,
    },

    mainLink: {
        textTransform: 'uppercase',
        fontSize: rem(13),
        color: theme.white,
        padding: `${rem(7)} ${theme.spacing.sm}`,
        fontWeight: 700,
        borderBottom: `${rem(2)} solid transparent`,
        transition: 'border-color 100ms ease, opacity 100ms ease',
        opacity: 0.9,
        borderTopRightRadius: theme.radius.sm,
        borderTopLeftRadius: theme.radius.sm,

        '&:hover': {
            opacity: 1,
            textDecoration: 'none',
        },
    },

    secondaryLink: {
        color: theme.colors[theme.primaryColor][0],
        fontSize: theme.fontSizes.xs,
        textTransform: 'uppercase',
        transition: 'color 100ms ease',

        '&:hover': {
            color: theme.white,
            textDecoration: 'none',
        },
    },

    mainLinkActive: {
        color: theme.white,
        opacity: 1,
        borderBottomColor:
            theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][5],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
}));




const mainLinks = [
    {
        "link": "#",
        "label": "Book a demo"
    },
    {
        "link": "#",
        "label": "Documentation"
    },
    {
        "link": "#",
        "label": "Community"
    },
    {
        "link": "#",
        "label": "Academy"
    },
    {
        "link": "#",
        "label": "Forums"
    }
]

export default function NavHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes, cx } = useStyles();
    // const [active, setActive] = useState(0);





    return (
        <Header height={HEADER_HEIGHT} mb={20} className={classes.header}>
            <Container className={classes.inner}>
                <div style={{ color: '#fff' }}>
                    <img className={classes.logo} src={Logo} />
                    {/* <Logo size={34} inverted /> */}
                </div>

                <div className={classes.links}>

                    <Group spacing={0} position="right" className={classes.mainLinks}>
                        <Text color={'#fff'} fz="xl" fw={700}>UIP Africa Project Registry</Text>
                    </Group>
                </div>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    color="#fff"
                />
            </Container>
        </Header>
    );
}