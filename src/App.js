import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './searchPage'
import {Route} from 'react-router-dom'
import Home from './home'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelf: []
  }

  //get user shelf
  getAll = () => {
    BooksAPI.getAll().then(
      (books) => {
        this.setState({books})
        console.log(books)
      }
    )
  }

  //Trigged everytime specific book is modified somehow (change shelf or add to shelf)
  moveTo = (id,status) => {
    BooksAPI.update(id,status).then((b) => {
      this.setState((old) => {
        let found=false
        //CHANGE STATUS IF ID HAS BEEN FOUND ON CURRENT STATE.BOOK
        //Avoid unecessary use of API
        old.books.filter(b => {
          if(b.id === id){
            b.shelf=status
            found=true
            return false
          }
          return true
        })
        //IF NOT FOUND ON CURRENT STATE.BOOK
        if(!found){
          BooksAPI.get(id).then((b) => {
            this.setState((old) => old.books.push(b))
          })
        }
      })})
    
  }

  componentDidMount(){
    this.getAll()
  }


  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Home books={this.state.books} moveTo={this.moveTo} />
        )}/>
        <Route exact path="/add" render={() => (
          <SearchPage books={this.state.books} moveTo={this.moveTo} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
