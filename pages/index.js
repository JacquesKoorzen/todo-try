import {useState} from 'react'
import { nanoid } from 'nanoid'

const isBrowser = () => typeof window !== "undefined"

isBrowser()

const myStorage = isBrowser.localStorage;

const nanoId = nanoid();

function Index() {

  const [userInput, setUserInput] = useState('');
  const [todolist, setTodoList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();

    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList([
      userInput,
      ...todolist
    ]);

    

    const title = userInput;

    const isCompleted = false;

    const inputObj = { 'title': title, 'id': nanoId, 'completed': isCompleted };

    const stringifiedObj = JSON.stringify(inputObj)
    localStorage.setItem(inputObj.id, stringifiedObj)
    console.log(localStorage)

    setUserInput('');

  };

  const handleDelete = (todo,idKey) => {
    console.log(idKey)
    console.log(todolist)
    const updatedArr = todolist.filter(todoItem => todolist.indexOf(todoItem) !== todolist.indexOf(todo));

    setTodoList(updatedArr)

    // Om die data wat in localStorage is ?

    localStorage.removeItem(JSON.stringify(idKey))
    console.log(localStorage)
  };

  return (
    <div class="container-1">

      <div class="box-1">
      <h3>TODO List</h3>
      </div>

      <div class="box-2">
      <form>
      <input type="text" value={userInput} placeholder='Enter a TODO' onChange={handleChange} /><button onClick={handleSubmit}>Submit</button>
      
      </form>
      </div>

      <div class="box-3">
      <ul>
         {todolist.length >= 1 ? todolist.map((todo, nanoId) => {
          return <li key={nanoId}><input type="checkbox" />{todo}<button onClick={(e) => {
            e.preventDefault();
            const idKey =  nanoId
            handleDelete(todo,idKey);
          } }>Delete</button></li>;
          
        })
             : 'Enter a TODO item'}

      </ul>
      </div>
    </div>
  );
}
export default Index





// const obj = {'title': "TITLE", 'id': "asjcbsjdbc", 'completed':false};
// const stringifiedObj = JSON.stringify(obj);
// localStorage.setItem(obj.id, stringifiedObj);

// const storageString = localStorage.getItem(obj.id);
// const storageObj = JSON.parse(storageString);