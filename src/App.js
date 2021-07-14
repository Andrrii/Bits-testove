import React,{useEffect,useState} from 'react'
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import AddOrEdit from './components/AddOrEdit'
import BitsService from "./service/BitsService"


function App() {

  const [booksList,setList] = useState([])

  /*
    Змінював state оскільки після перезапису файлу в json-server його тоеба кожен раз
    перезагружати
  
  */ 

  useEffect(() => {
      const bits = new BitsService();
      bits.getResource("http://localhost:4000/books")
      .then(books => {
          setList(books)
      })
  },[])

  const saveModal = (item,id) => {
    const itemIndex = booksList.findIndex(item => item.id === id)
    const changed =  [
                         ...booksList.slice(0,itemIndex),
                         item,
                         ...booksList.slice(itemIndex+1)
                      ]
    setList(changed)

  }

  const onDelete = id => {
    const itemIndex = booksList.findIndex(item => item.id === id)
    const changed =  [
                         ...booksList.slice(0,itemIndex),
                         ...booksList.slice(itemIndex+1)
                      ]
    setList(changed)

  }

  const  addNewBook = (item,id) => {
    const changed = [
      ...booksList,
      item
    ]
    setList(changed)
  }


  return (
    <div className="App">
      <Router>
              <Switch>
                  <Route path = '/' exact render = {() => (<Dashboard booksList = {booksList} onDelete = {onDelete} />)}/>
                  <Route path = '/edit/:id?' exact component = {() => (<AddOrEdit saveModal = {saveModal} addNewBook = {addNewBook}/>)}/>
              </Switch>
            </Router>
    </div>
  );
}

export default App;
