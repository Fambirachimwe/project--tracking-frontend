
import axios from 'axios';


const BASE_URL = process.env.PRODUCTION_URL;
// get all projects

export const getAllProjects = async () => {
    // the all the projects from the  deployed api 
    const projects = await axios.get(`${process.env.REACT_APP_BASE_URL_PRODUCTION_URL}/projects?populate=*&sort[0]=id`);
    return projects
}

// get all tasks 
export const getAllTasks = async () => {
    const tasks = await axios.get(`${BASE_URL}/tasks`);
    return tasks;
}

// get completed tasks
// /api/:pluralApiId?filters[field][operator]=value

export const getTaskByStatus = async (status) => {
    const tasks = await axios.get(`${process.env.REACT_APP_BASE_URL_PRODUCTION_URL}/tasks?filters[status][$eq]=${status}`);
    return tasks;
}

export const getNotCompletedTask = async () => {
    const tasks = await axios.get(`${process.env.REACT_APP_BASE_URL_PRODUCTION_URL}/tasks?filters[status][$ne]=Completed`);
    return tasks;
}


// get all tasks
// filter task by status

// get projects by status