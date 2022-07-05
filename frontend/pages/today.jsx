import { useContext, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import TaskCard from "../components/TaskCard";
import getTasks from "../services/tasksRequest";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";

export default function Tasks() {
  const { setTasks, tasks, setTaskSeted } = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem('login')).token;
      getTasks(token).then((e) => {
        setTasks(e);
        setTaskSeted(e[0])
      })
    } catch (error) {
      router.push('/');
    }
    
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="mx-auto pt-6 max-w-screen-lg flex">
        <div className="w-3/6">
          <InfoCard />
        </div>
        <div className="w-3/6">
          {
            tasks.map((e, i) => (
              <TaskCard key={i} task={e} />
            ))
          }
        </div>
      </div>
    </div>
  );
}