import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function People() {
  const [people,setPeople]=useState([]);

  let mediaType='person'
  let nums = new Array(10).fill(1).map((elem,index)=> index+1);

  async function getTrending(page){
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=5a0bf42495cc9ddfc1247df5d74d1db1&language=en-US&page=${page}`);
    setPeople(data.results);
    console.log(data.results);
  }

  useEffect(()=>{
    getTrending(1);

  },[])

  return (
    <>
  {people[0]?<>  <div className="row mt-5 py-5">
      {people.map((item ,index)=> 
        <div key={index} className="col-md-3">
        <Link className='text-decoration-none text-white' to={`/itemdetails/${item.id}/${mediaType}`}>
        <div className='position-relative'>
            <img src={`https://image.tmdb.org/t/p/w500`+item.profile_path} className='w-100' alt="" />
            
            <h3 className='h5 '>{item.name}</h3>
            
            
        </div>
        </Link>
    </div>
      )}

    </div>
    <nav className='py-5'>
      <ul className='pagination pagination-sm d-flex justify-content-center'>
        {nums.map((page,index)=>         <li key={page} onClick={()=>getTrending(page)} className='page-item p-1 '>
          <Link className='page-link bg-transparent text-white '>{page}</Link>
        </li>)}

      </ul>
    </nav></>
    :<div className='vh-100 d-flex align-items-center justify-content-center '><i className='fas fa-spinner fa-spin fa-8x'></i></div>}
    </>
  )
}
