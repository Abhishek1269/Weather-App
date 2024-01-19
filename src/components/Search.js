import React from 'react'

export default function Search(props) {
  return <div className='row'>
<div className='col-lg-5'>
    <div className='form-group'>
        <label htmlFor=''>Type City Name</label>
        <input type='text' className='form-control'
        name='city' value={props.city} onChange={props.handleCityChange} id='city' aria-describedby='helpId' placeholder=''></input>
    </div>
</div>
    <div className='col-lg-1 text-center'>
        <label htmlFor=''></label>
        <h5>Or</h5>
    </div>
    <div className='col-lg-5'>
        <div className='form-group'>
            <label htmlFor=''>Get Co-ordinate</label>
            <button className='btn fa fa-crosshairs' onClick={props.getLocation}></button>
            <div className='row'>
                <div className='bg-dark text-white rounded pt-1 pl-1 pr-1'>
                    Lat:
                </div>
                <input type='number' step="any" className='form-control col mr-1' name="lat" id='lat' value={props.lat} onChange={props.change}
                aria-describedby='helpId' placeholder=''></input>
                <div className='bg-dark text-white rounded pt-1 pl-1 pr-1'>
                    Lon:
                </div>
                <input type='number' step="any" className='form-control col mr-1' name="lon" id='lon' value={props.lon} onChange={props.change}
                aria-describedby='helpId' placeholder=''></input>
            </div>
        </div>
    </div>
    <div className='col-lg-1'>
        <label htmlFor=''>Search</label>
        <button onClick={props.search} className='btn btn-primary fa fa-search'></button>
    </div>
  </div>;
}
