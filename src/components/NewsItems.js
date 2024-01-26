import React from 'react'

const NewsItems = (props) => {
  return (
    <div className='my-3'>
      <div className="card" style={{border:'5px solid white'}}>
      
   
      <span class="position-absolute top-0 start-50 translate-middle badge  bg-info" style ={{justifyContent:"center", fontSize:'15px', border:'3px solid yellow'}}>
      {props.newsso}
  </span>
 
  <img src={props.imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description}</p>
    <p className="card-text"><small className="text-muted">by {props.author}</small></p>
    <p className="card-text"><small className="text-muted">on {props.date}</small></p>

    <a href={props.newsurl} className=" d-grid gap-2 btn btn-sm btn-dark">Read more</a>
  </div>
</div>
    </div>
  )
}

export default NewsItems
