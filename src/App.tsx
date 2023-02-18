import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery, QueryClient, useMutation } from 'react-query'
import styles from './App.module.css'
import TaskList from './components/TaskList/TaskList'

import { Task, TaskContext, useTaskContext } from './context/tasksContext'
import { queryClient } from './main'


const URL = 'http://localhost:3000'


const App = () => {

    const [ tasks, setTasks ] = useState<Task[]>([])

    const taskQuery = useQuery({
        queryKey: ["tasks"],
        queryFn: () => axios.get(URL+'/tasks')
                            .then(({data}) => setTasks(data as Task[]))
    })

    const taskMutate = useMutation({
        mutationFn: (task:Task) => axios.post(URL+'/tasks', task),
        onSuccess: () => queryClient.invalidateQueries()
    })


    if (taskQuery.isLoading) {
        return <h1>Loading...</h1>
    }

    if (taskQuery.isError) {
        return <pre>{JSON.stringify(taskQuery.error)}</pre>
    }


    return (
        <div>
            <TaskContext.Provider value={
                { tasks, setTasks }
            }>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    const titleInputEl = e.currentTarget.childNodes[0] as HTMLInputElement
                    const taskInputEl = e.currentTarget.childNodes[1] as HTMLInputElement

                    const title = titleInputEl.value
                    const content = taskInputEl.value

                    taskMutate.mutate({title, content})
                }}>
                    <input type="text" 
                        placeholder='Task'/>
                    <input type="text" 
                        placeholder='Content'/>
                    <button>
                        Add Task
                    </button>
                </form>
                
                <TaskList/>

            </TaskContext.Provider>
        </div>
    )
}


export default App