import React from 'react'
import {withRouter} from 'react-router-dom';
import { useHistory } from 'react-router';

import "./dash-board.css"

const Dashboard = ({booksList,onDelete}) => {

    const history = useHistory();


    return (
        <div className="w3-container">
        <h2>Book List</h2>
        <button className = "w3-btn w3-white w3-border w3-border-blue w3-round-large" onClick={() => {
                         const id = Math.random()
                         const newBook = {
                            id,author:"",language: "",link:"https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",title:"",ISBN:""
                        }
                          history.push(`/edit/${id}`,{  id,bookDetails:[newBook],addNew:true })
                    }}>
                        Add New Book</button>
        <table className="w3-table-all w3-hoverable">
          <thead>
            <tr className="w3-blue">
              <th>Book title</th>
              <th>Author name</th>
              <th>Language</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {booksList.map(book => (
                  <tr key={book.id}>
                  <td><a href = {book.link}>{book.title}</a></td>
                  <td>{book.author}</td>
                  <td>{book.language}</td>
                  <td>{book.ISBN}</td>
                  <td>
                      <button className = "w3-btn w3-button w3-border w3-border-orange w3-hover-orange w3-round-large" onClick={() => {
                          const bookDetails = [booksList.find(item => item.id === book.id)]

                          history.push(`/edit/${book.id}`,{  id: book.id,bookDetails })
                    }}>
                        Edit</button>
                      <button className = "w3-btn w3-button w3-border w3-border-red w3-hover-red w3-round-large"
                        onClick={() => {
                          onDelete(book.id)
                        }}
                      >
                        Delete
                      </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )

}

export default withRouter(Dashboard)