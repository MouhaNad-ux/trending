import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ItemDetails() {
  let{id,media_type} = useParams();

  const [details,setDetails]=useState({});

  async function getTrending(id,media_type){
    let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=5a0bf42495cc9ddfc1247df5d74d1db1&language=en-US`);
    setDetails(data);
    console.log(data);
  }

  useEffect(()=>{
    getTrending(id,media_type);

  },[id,media_type])
  return (
    <>
    { details.id ? <div className="row my-5 gy-5">
      <div className="col-md-3 ">
      {details.poster_path?<img src={`https://image.tmdb.org/t/p/w500`+details.poster_path} className='w-100' alt="" />:<img src={`https://image.tmdb.org/t/p/w500`+details.profile_path} className='w-100' alt="" />}
      </div>
      <div className="col-md-6 align-items-center d-flex">
        <div>
          <h2>{details.title} {details.name}</h2>
          <p className='text-muted my-3'>{details.overview} {details.biography}</p>
          {details.vote_average?<h4>Vote average: {details.vote_average}</h4>:""}
          {details.vote_count?<h4>Vote count: {details.vote_count}</h4>:""}
          

        </div>
      </div>
    </div>:<div className='vh-100 d-flex align-items-center justify-content-center '><i className='fas fa-spinner fa-spin fa-8x'></i></div>}

    </>
  )
}
