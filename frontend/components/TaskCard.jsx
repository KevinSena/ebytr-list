import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

function TaskCard({ task }) {
  const { setTaskSeted } = useContext(AppContext)

  return (
    <div onClick={() => setTaskSeted(task)} className="bg-white ml-4 p-4 rounded-md cursor-pointer">
      <h2>{ task.task }</h2>
    </div>
  )
}

export default TaskCard