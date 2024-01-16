import {createContext, useEffect, useState} from "react";
import Modal from "./components/ui/Modal";
import {TTask} from "./type";

export const ModalContext = createContext(null)

const App = () => {
  const [modal, setModal] = useState(false);
  const[tasks, setTasks] = useState([])
  const [taskList, setTaskList] = useState<TTask[]>(tasks);

  const handleModal = () => {
    setModal(prev => !prev)
  }

  const addTask = (data) => {
    const taskId = "id" + Math.random().toString(16).slice(2)
    const task = {id: taskId, ...data}
    setTaskList([...taskList, task])
   
    handleModal()
  }

  useEffect(() => {
    if(taskList.length > 1){
      localStorage.setItem('tasks', JSON.stringify(taskList))
    }
    const getTasks = localStorage.getItem('tasks')
    setTasks(JSON.parse(getTasks))

    console.log(JSON.parse(getTasks), 'task')
  },[taskList])

  console.log(taskList, 'task from app')

  return (
  <ModalContext.Provider value={{taskList, setTaskList, addTask}}>
    <div className="w-full max-w-[800px] mx-auto pt-10">
      <div className="flex justify-between items-center bg-white rounded-2xl rounded-b-none px-8 py-5">
        <h2 className="text-2xl font-bold text-gray-700">Task List</h2>
        <button onClick={handleModal} className="bg-green-600 px-4 py-2 rounded-md text-white flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
          <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="inline-block pr-1 bg-green-600">Add Task</span>
        </button>
        {
          modal && 
          (<Modal isOpen={modal} onClose={handleModal}></Modal>)
        }
      </div>
      <div className="mt-5 bg-white rounded-2xl rounded-t-none p-5">
        <p className="text-center pt-5 text-lg text-gray-400 font-medium">Task list is empty 
        <button onClick={handleModal} className="underline text-green-600 text-base px-1">Add Task</button></p>
        <div className="w-full flex justify-center items-center opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" viewBox="0 0 24 24" fill="none">
          <path d="M15 18.5L20 13.5M20 18.5L15 13.5" stroke="#1C274C" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path opacity="0.5" d="M21 6L3 6" stroke="#1C274C" strokeWidth="1.3" strokeLinecap="round"/>
          <path opacity="0.5" d="M21 10L3 10" stroke="#1C274C" strokeWidth="1.3" strokeLinecap="round"/>
          <path opacity="0.5" d="M11 14L3 14" stroke="#1C274C" strokeWidth="1.3" strokeLinecap="round"/>
          <path opacity="0.5" d="M11 18H3" stroke="#1C274C" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  </ModalContext.Provider>
  );
};

export default App;