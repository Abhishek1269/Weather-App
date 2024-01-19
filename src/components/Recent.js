import React from 'react'

export default function Recent(props) {
    let data;
    if(props.recent == null){
        data = "";
    }else{
        data = props.recent.map((recentData, id) => {
            return <li onClick={() => props.research(recentData.lat, recentData.lon, recentData.city)} className='bg-dark text-white rounded pt-1 pl-1 pr-1 mb-2 text-center' key = {id}>{recentData.city}</li>
        });
    }
  return (
    <div className='recent-box'>
      <h2 className='bg-white rounded pt-1 pl-1 pr-1 mb-2 text-center'>Recent</h2>
      <ul className='text-left list-unstyled'>{data}</ul>
    </div>
  )
}
