import axios, { formToJSON } from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Task, TaskContext, useTaskContext } from '../../context/tasksContext'
import styles from './TaskList.module.scss'

const URL = 'http://localhost:3000'
interface TaskListParams {

}

const TaskList = ({}:TaskListParams) => {

    const { tasks, setTasks } = useTaskContext()

    return (
        <table>
            <thead>
                <tr>
                    <td className={`${styles.tableCell} ${styles.tableHead}`}>
                        Title 
                    </td>
                    <td className={`${styles.tableCell} ${styles.tableHead}`}>
                        Content
                    </td>
                    <td className={`${styles.tableCell} ${styles.tableHead}`}>
                        Date
                    </td>
                    <td className={`${styles.tableCell} ${styles.tableHead}`}>
                        Complete
                    </td>
                </tr>
            </thead>

                <tbody>
                    {tasks.map(task => {
                        return (
                            <tr key={task._id}>
                                <td className={`${styles.tableCell}`}>
                                    {task.title}
                                </td>
                                <td className={`${styles.tableCell}`}>
                                    {task.content}
                                </td>
                                <td className={`${styles.tableCell}`}>
                                    {task.date ? `${new Date(task.date).toUTCString()}` : ''}
                                </td>
                                <td className={`${styles.tableCell}`}>
                                    {task.isDone ? 'Yes' : 'No'}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

        </table>
    )
}


export default TaskList