import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

  state={ query:'' , search:[]}

  onQuery = (query) => {
    this.setState({query, search:[]})
    if(query){
    BooksAPI.search(query).then((search) => {
      console.log(query)
      if(search.error) {
        if(query === this.state.query)
        this.setState({search:[]})
      }else{
        if(query === this.state.query)
        this.setState({search})
      }
      console.log(search)
  })}}

  

    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.query} onChange={(s) => {this.onQuery(s.target.value)}} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
            <center>Mostrando {this.state.search.length} resultados</center>
              <ol className="books-grid">

                {this.state.search.map(b => {
                  //Get shelf from current state if exists
                  this.props.books.filter((o) => {
                    if(o.id === b.id){
                      b.shelf=o.shelf;return true;
                    }
                    return false
                  })
                  return(<Book moveTo={this.props.moveTo} key={b.id} api={b}/>)})}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchPage