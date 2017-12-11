import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
//import Draggable from 'react-draggable'

class Home extends Component {
    
  drop = (event,status) => {
        event.preventDefault()
        document.getElementById(status).childNodes[1].classList.remove('active')
        let data = event.dataTransfer.getData('text')
        this.props.moveTo(data,status)
    
      }
    dragover = (e,key) => {
     e.preventDefault()
     document.getElementById(key).childNodes[1].classList.add('active')
    }
    onOut=(e,key) => {
      e.preventDefault()
      document.getElementById(key).childNodes[1].classList.remove('active')
    }

    render(){  
        const books=this.props.books
        const status = [
          ["currentlyReading","Currently Reading"],
          ["wantToRead", "Want to Read"],
          ["read","Read"]
        ]
        
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

             {status.map(status => {
               return(
                <div className="bookshelf" key={status[0]} id={status[0]} onDragLeave={(e) => {this.onOut(e,status[0])}} onDragOver={(e) => {this.dragover(e,status[0])}} onDrop={(e) => {this.drop(e,status[0])}}>
                  <h2 className="bookshelf-title">{status[1]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter(p => p.shelf === status[0]).map(b => {
                     return(<Book key={b.id}  moveTo={this.props.moveTo} api={b}/>)
                    })}
                    </ol>
                  </div>
                </div>

            )/*END OF MAP STATUS*/})}


              </div>
            </div>
            <div className="open-search">
            {/*<Link route="/add" >Add a book</Link>
             < <Route exact path="/add" component="searchPage"/>*/}
              <Link to="/add">Add a book</Link>
            </div>
          </div>
        )
    }
}

export default Home;