import { createStyles, Group, Paper, SimpleGrid, Text, rem, Modal } from '@mantine/core';


import { useQuery } from 'react-query';
import { getAllProjects, getNotCompletedTask, getTaskByStatus } from '../uitl/api';
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

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  // console.log(date)


  const totalProjects = useQuery('projects', getAllProjects);

  // useQuery(['todo', 5], ...)
  // useQuery(['todos', todoId], () => fetchTodoById(todoId))
  const completedTasks = useQuery(['completedTasks', 'Completed'], () => getTaskByStatus('Completed'));
  const todoTasks = useQuery(['todoTasks', 'Todo'], () => getTaskByStatus('Todo'));
  const inCompleteTasks = useQuery(['incompleteTasks', 'Incomplete'], () => getTaskByStatus('Incomplete'));

  const notCompletedTasks = useQuery('notCompleted', getNotCompletedTask)
  const overdue = notCompletedTasks?.data?.data?.data.filter((task) => {
    return task.due_date < date
  });


  var _projects = totalProjects?.data?.data?.data?.length > 0 ? totalProjects?.data?.data?.data?.length : 0;
  var _completed = completedTasks?.data?.data?.data?.length > 0 ? completedTasks?.data?.data?.data?.length : 0;
  var _incomplete = inCompleteTasks?.data?.data?.data?.length > 0 ? inCompleteTasks?.data?.data?.data?.length : 0;
  var _overdue = overdue?.length;

  const _data = [
    {
      title: "Total Projects",
      // icon: <IconUserPlus />,
      value: `${_projects}`,
      diff: 20
    },
    {
      title: "Completed Tasks",
      // icon: <IconUserPlus />,
      value: `${_completed}`,
      diff: 20
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

  if (totalProjects.isLoading || completedTasks.isLoading || todoTasks.isLoading) {
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