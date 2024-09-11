import React, { Component } from 'react'
import News from './News'

export default class NewsItem extends Component {
  
  render() {
    let{title, description, imageUrl, newsUrl, author, date,source} = this.props;
    // this is syntax to get the props
    return (
      <div>
        <div className="card h-100" style={{width: "18rem;"}}>
  <img src={imageUrl ? imageUrl : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/live-breaking-news-design-template-8c0dbab5f447f2e1e39e0d19d90a5ec7_screen.jpg?ts=1689444194"}
   className="card-img-top" alt="..."/>
  <div className="card-body d-flex flex-column">
    <h5 className="card-title">{title}...</h5>
    <span className=" position-absolute top-0 translate-middle badge rounded-pill bg-primary " style={{left:'92%', zIndex:'1'}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
    <p className="card-text">{description}...</p>
    <p class="card-text"><small className="text-muted">By {!author?"unknown" : author} on {new Date(date).toGMTString() }</small></p>
    <a href={newsUrl} 
    target='_blank' 
    rel='noreferrer'
    className="btn btn-sm btn-primary"
    
    >
    Read more</a>
  </div>
</div>
        
      </div>
    )
  }
}
