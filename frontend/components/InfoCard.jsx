import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

function InfoCard() {
  const { taskSeted } = useContext(AppContext);

  return (
    <div className="bg-white mr-4 p-4 rounded-md">
      <h2 className="text-3xl font-bold">{ taskSeted.task }</h2>
      <p>{ taskSeted.description }</p>
      <h3>{ taskSeted.feeling }</h3>
      <h3>Status: { taskSeted.priority }</h3>
    </div>
  )
}

export default InfoCard