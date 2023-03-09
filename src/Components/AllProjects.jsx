import { createStyles, Table, Progress, Text, Group, ScrollArea, rem, Badge } from '@mantine/core';
import { nanoid } from 'nanoid';
import { useQuery } from 'react-query';
import { getAllProjects } from '../uitl/api';


const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `${rem(3)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
                }`,
        },
    },

    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));



// fetch all projects from the cloud server 







// {
//     "project_name": "Pioneer Villa",
//     "createdAt": "2023-03-08T14:49:36.995Z",
//     "updatedAt": "2023-03-08T14:55:01.696Z",
//     "publishedAt": "2023-03-08T14:49:40.130Z",
//     "location": "Harare",
//     "scope": "Project Management, Facilitate Council Approval of all designs, Carry out site inspections and writing progress reports.\n",
//     "client_contact_person": "Ronald Mashura",
//     "status": "Ongoing",
//     "priority": "High",
//     "progress": 0,
//     "client": "Sakunda Holdings"
// }


export default function AllProjectsTable() {

    const allProjects = useQuery('projects', getAllProjects);

    // const projects = allProjects?.data?.data?.data?.map()

    const _data = allProjects?.data?.data?.data;

    console.log(_data)




    const { classes, theme } = useStyles();

    const rows = _data?.map((row) => {
        return (

            <tr key={row.title + nanoid(5)}>
                <td>

                    {row.id}

                </td>
                <td>{row.attributes?.project_name}</td>
                <td>

                    {row.attributes?.location}

                </td>
                <td>{row.attributes?.scope}</td>
                <td>{
                    // row.attributes?.leader?.data?.attributes?.username.charAt(0).toUpperCase() + row.attributes?.leader?.data?.attributes?.username.slice(1)


                    row.attributes?.leaders?.data?.map(leader => {
                        return `${leader?.attributes?.username} `
                    })
                }</td>
                <td>{row.attributes?.client}</td>
                <td>

                    <Badge color="teal">{row.attributes?.status}</Badge>


                </td>
                <td>
                    <Group position="apart">
                        <Text fz="xs" c="teal" weight={700}>
                            {row.attributes?.progress}%
                        </Text>

                    </Group>
                    <Progress
                        classNames={{ bar: classes.progressBar }}
                        sections={[
                            {
                                value: row.attributes.progress,
                                color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
                            }

                        ]}
                    />
                </td>
            </tr>




        );
    });

    return (
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                <thead>
                    <tr>
                        <th>Job Number</th>
                        <th>Project Name</th>
                        <th>Location</th>
                        <th>Project scope</th>
                        <th>Leaders</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}