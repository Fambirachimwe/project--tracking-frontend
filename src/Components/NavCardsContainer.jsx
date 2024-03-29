import { createStyles, Group, Paper, SimpleGrid, Text, rem, Modal } from '@mantine/core';


import { useQuery } from 'react-query';
import { getAllProjects, getAllTasks, getNotCompletedTask, getTaskByStatus } from '../uitl/api';
import { Loader } from '@mantine/core';




const useStyles = createStyles((theme) => ({
  pad: {
    paddingTop: `calc(${theme.spacing.xl} * 1.5)`,
    paddingBottom: `calc(${theme.spacing.xl} )`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));


// var status =

export default function NavCardsContainer() {
  const { classes } = useStyles();

  const allTasks = useQuery('tasks', getAllTasks);
  const totalProjects = useQuery('projects', getAllProjects);
  const completedTasks = allTasks?.data?.data?.tasks?.filter(task => {
    return task.status === "Completed"
  })

  console.log(allTasks)

  const inCompleteTasks = allTasks?.data?.data?.tasks?.filter(task => {
    return task.status === "Pending" || task.status === "Ongoing"
  });


  const current = Date.now();
  const _overDueTasks = allTasks?.data?.data?.tasks?.filter(task => {
    if (task.dueDate < current) return task
  })

  // console.log(_overDueTasks)



  var _projects = totalProjects?.data?.data?.projects?.length > 0 ? totalProjects?.data?.data?.projects?.length : 0;
  var _completed = completedTasks?.length > 0 ? completedTasks?.length : 0;
  var _incomplete = inCompleteTasks?.length > 0 ? inCompleteTasks?.length : 0;


  var _overdue = _overDueTasks?.length > 0 ? _overDueTasks?.length : 0;



  const _data = [
    {
      title: "Total Projects",
      // icon: <IconUserPlus />,
      value: `${_projects}`,
      // diff: 20
    },
    {
      title: "Completed Tasks",
      // icon: <IconUserPlus />,
      value: `${_completed}`,
      // diff: 20
    }
    , {
      title: "Incomplete Tasks",
      // icon: <IconUserPlus />,
      value: `${_incomplete}`,
      diff: 20
    }, {
      title: "Overdue Tasks",
      // icon: <IconUserPlus />,
      value: `${_overdue}`,
      diff: 20
    }
  ];


  // console.log(totalProjects.isLoading);

  if (totalProjects?.isLoading || completedTasks?.isLoading) {
    return (
      // render a loader to the page 
      <Modal centered opened={true} >
        <Loader size="xl" position="center" />
      </Modal>

    )
  }

  // 


  const stats = _data.map((stat) => {
    // const Icon = icons[stat.icon];
    // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          {/* <Icon className={classes.icon} size="1.4rem" stroke={1.5} /> */}
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>

        </Group>

        <Text fz="xs" c="dimmed" mt={7}>

        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.pad}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}