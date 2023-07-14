import React from 'react'
import {useToDoStore} from "../../data/stores/useToDoStore"
import styles  from "./index.module.scss"
import Input from '../components/Input/Input'

const App:React.FC = () => {

  // вот таким способом ты как в Redux можешь делать иморт в другие компоненты
  const [tasks,
         createTask,
         updateTask,
         removeTask] = useToDoStore(state => [
     state.tasks,
     state.createTask,
     state.updateTask,
     state.removeTask
         ])

  return (
    <div>
       <article className={styles.article}>
        <h1 className={styles.articleTitle}>To Do App</h1>
        <section className={styles.articleSection}>
           <Input
             onAdd={(title)=>{
               if(title) {
                createTask(title)
               }
             }}
           />
        </section>
        <section className={styles.articleSection}>
             {!tasks.length && (
             <p className={styles.text}>The are now tasks</p>
             )}
        </section>
       </article>
    </div>
  )
}

export default App
