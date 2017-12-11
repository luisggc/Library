import React, {Component} from 'react'

class Book extends Component{

    dragStart = (e) => {
        e.dataTransfer.setData('text', this.props.api.id);
    }
    
    render(){
        let b=this.props.api
        if(!b.authors) b.authors=['Unknown']
        if(!b.shelf) b.shelf='none'
         if(!b.imageLinks) b.imageLinks={thumbnail:'http://search.ontariojewisharchives.org/content/img/no-img.jpg?width=128&height=193'}
        
        return(
        <li>
        <div className="book">
        <div className="book-top">
            <div className="book-cover" onDragStart={this.dragStart} draggable='true' style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
            <select value={b.shelf} onChange={(v) => {this.props.moveTo(b.id,v.target.value)}} >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div className="book-title">{b.title}</div>
        <div className="book-authors">{b.authors.join(", ")}</div>
        </div>
        </li>
    )}
}

export default Book