/* eslint-disable @typescript-eslint/no-explicit-any */
import {createPortal} from "react-dom";
import cn from "../../utils/cn";
import {ChangeEvent, MouseEvent, ReactNode, useContext, useRef, useState} from "react";
import {ModalContext} from "../../App";
import {TTask} from "../../type";

type TModal = {
  isOpen : boolean;
  onClose: () => void;
  // children: ReactNode
}
const Modal = ({isOpen, onClose} : TModal) => {

  const containerRef = useRef<HTMLDivElement>(null);

  const closeModalFromOutside = (e: MouseEvent) => {
    if(!containerRef.current?.contains(e.target as Node)) {
      onClose()
    }
  }

  const {taskList, setTaskList, addTask} = useContext(ModalContext)

 
  const [taskData, setTaskData] = useState<TTask>({
    name: '',
    priority: 'high',
    status: 'to-do'
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskData({...taskData, [e.target.name]:e.target.value});
  }

 

  return createPortal(
    <div onClick={closeModalFromOutside} className={cn("flex justify-center items-center fixed inset-0 bg-gray-800/40 invisible z-[999]",{visible: isOpen})}>
      <div ref={containerRef} className="bg-white w-full max-w-[500px] px-10 py-10 rounded-2xl">
        <div className="flex justify-between items-center pb-9">
          <h3 className="text-2xl text-gray-600 font-semibold">Add new task</h3>
          <button onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="white"/>
            <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="pb-2 text-gray-600">
          <form onSubmit={(e) => {
            e.preventDefault();
            addTask(taskData)
          }}>
            <div className="mb-6">
              <input onChange={handleInputChange} type="text" name="name" placeholder="Enter task name" className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="px-2">
              {/* <p className="block text-base font-medium mb-3">Select Priority</p> */}
              <div className="flex items-center gap-x-8">
                <div className="flex items-center gap-1">
                  <input onChange={handleInputChange} type="radio" name="priority" id="high" value='high' className="block border border-gray-500 rounded-full checked:bg-green-500 checked:border-green-500 text-green-500 focus:ring-1 focus:ring-green-500" />
                  <label htmlFor="high" className="font-medium text-sm">High</label>
                </div>
                <div className="flex items-center gap-1">
                  <input onChange={handleInputChange} type="radio" name="priority" id="medium" value="medium" className="block border border-gray-500 rounded-full checked:bg-green-500 checked:border-green-500 text-green-500 focus:ring-1 focus:ring-green-500" />
                  <label htmlFor="medium" className="font-medium text-sm">Medium</label>
                </div>
                <div className="flex items-center gap-1">
                  <input onChange={handleInputChange} type="radio" name="priority" id="low" value="low" className="block border border-gray-500 rounded-full checked:bg-green-500 checked:border-green-500 text-green-500 focus:ring-1 focus:ring-green-500" />
                  <label htmlFor="low" className="font-medium text-sm">Low</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button type="submit" className="bg-green-600 px-4 py-2 rounded-md text-white">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>, document.getElementById('portal') as Element
  );
};

export default Modal;