import React from 'react';
import { createStyles, Paper, Text } from '@mantine/core';
import NavCardsContainer from './NavCardsContainer';
import AllProjectsTable from './AllProjects';
// import NavHeader from './NavHeader';
import { useFocusWithin, useFullscreen } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        width: '100vw',
        // height: '100vh',
        padding: theme.spacing.lg,

    },

    paddingHeading: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl
    }


}));

const MyAppShell = () => {

    const { toggle } = useFullscreen();
    const { ref } = useFocusWithin();



    const { classes } = useStyles();


    return (


        <div ref={ref} onClick={toggle} className={classes.wrapper} >



            <NavCardsContainer />

            {/* {
                focused ? () => toggle : null
            } */}

            {/* <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
                {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </Button> */}


            <Text className={classes.paddingHeading} fz="xl" fw={700}>All Projects</Text>

            <Paper withBorder p="md" radius="md" >
                <AllProjectsTable />

            </Paper>


        </div>
    )
}

export default MyAppShell