import {create} from "zustand"

import { generateId } from "../helper";

// здесь ты создаешь описание типов данных которые ты будешь тспользовать
//для to do list
interface Task {
  id: string;
  title: string;
  createAt:number
}

//здесь ты уже описываешь действия которые будут в ToDoList
interface ToDoStore {
   tasks: Task[];
   createTask: (title: string) => void;
   updateTask: (id: string, title: string) => void;
   removeTask: (id: string) => void
}

//то есть тут ты уже оптсываешь все что у тебя есть
//в interface ToDoStore
export const useToDoStore = create<ToDoStore>((set, get) => ({
  // при помощи get мы получаем данные о текущей информации в нашем сторе
  tasks: [
    {
      id: "Some me",
      title: "Artem is the bet",
      createAt: 1212
    }
  ],
  createTask: (title) => {
    const {tasks} = get()
    const newTask = {
      id: generateId(),
      title,
      createAt: Date.now()
    }
    // здесь мы создаем уникальнёую задачу и затeм ту задачу которую мы создали
    // добавляем в новый массив
    set({
      tasks: [newTask].concat(tasks)
    })
  },
  updateTask: (id: string, title:string) => {
      const {tasks} = get()
      // здесь у нас идет обновление массива и менятеся только title и id
      // и затем когда мы обновили task у нас при помощи map создалась копия массива
      // с новым title при помощи map
      set({
           tasks: tasks.map((task)=> ({
              ...task,
              title: task.id === id ? title : task.title
           }))
      })
  },
  removeTask: (id:string) => {
    const {tasks} = get()
     // а здесь при помощи filter мы удаляем какой либо task
    set({
      tasks: tasks.filter((task)=> task.id !== id)
    })
  },
}))








