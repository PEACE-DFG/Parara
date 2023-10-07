import  { useEffect } from 'react'
import Index from '../Component/Index'
import { useState } from 'react'
import axios from 'axios'

function Home() {
    const [products, setProducts]=useState([]);
    function fetchProducts(){
        axios.get('https://dummyjson.com/products')
        .then(response=>{
            setProducts(response.data.products)
            console.log(response.data.products)
        })
    }
    useEffect(()=>{
        fetchProducts()
    },[])
  return (
    <div>
        <div className="container-fluid "  >
            <div className="new" style={{ display:'flex',flexWrap:'wrap',margin:'auto' }}>
                {
                    (products.length >0)?
                    products.map((value,index)=>{
                        return(
                            <div key={index}>
                                   <Index {...value}/>

                             </div>
                        )
                    }):
                    <h2><i>Products Loading...</i></h2>
                }
            </div>
        </div>
    </div>
  )
}

export default Home