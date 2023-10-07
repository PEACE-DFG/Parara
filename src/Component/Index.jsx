import { Link } from "react-router-dom"
function Index(props) {
  return (
    <div style={{ margin:'auto' }}>
       <div className="card" style={{ width:'16rem' }}>
  <img src={props.images[0]} className="card-img-top img-fluid w-100" alt="..."/>
  <div className="card-body">
  <h5 className="card-title">Title: {props.title}</h5>
  <h5 className="card-title">Brand: {props.brand}</h5>
  <h5 className="card-title">Price: ${props.price}</h5>
    <p className="card-text">Description: {props.description}</p>
    <button>
      <Link to={`../details/${props.id}`} >Details</Link>
    </button>

  </div>
</div>
    </div>
  )
}

export default Index