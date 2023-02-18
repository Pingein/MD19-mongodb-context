import { createContext, useContext } from "react";


export type Task = {
    _id?: string
    title: string
    content: string 
    date?: Date
    isDone?: Boolean
}

type TaskContextType = {
    tasks: Task[]
    setTasks?: React.Dispatch<React.SetStateAction<Task[]>>
}

export const TaskContext = createContext<TaskContextType>({
    tasks: []
})

export const useTaskContext = () => {
    const { tasks, setTasks } = useContext(TaskContext)

    if (!setTasks) {
        throw Error('must provide setTasks function')
    }

    return { tasks, setTasks }
}