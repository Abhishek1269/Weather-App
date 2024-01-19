import React from 'react'
import Loader from "./loader"

export default function Result(props) {
    const { weatherData: data } = props;
    function kToC(k) {
        return (k - 273.15).toFixed(2) + "° C";
    }

    function getThedate(stamp) {
        const date = new Date(stamp * 1000);
        return date.toLocaleTimeString();
    }
    let showOnPage;
    if (data == null || !data.weather || !data.weather[0]) {
        if(props.isSearched == true)
        showOnPage = <Loader/>
        else
        showOnPage =( <div className='Container'>
                        <h1 className='text-center mt-2'>Please Search a City</h1>
                    </div>
        );
    }else {
        showOnPage = (
            <div className='row'>
                <div className='col'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='card-title'>
                                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='' />
                                {data.name} ( {kToC(data.main.temp)} )
                                <span className='pl-2'>{data.weather[0].description}</span>
                            </h4>
                            <div className='row'>
                                <div className='col'>
                                    <div className='row'>
                                        <table className='table'>
                                            <tbody>
                                                <tr>
                                                    <th>Feels like</th>
                                                    <td>{kToC(data.main.feels_like)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Min Temp.</th>
                                                    <td>{kToC(data.main.temp_min)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Max temp.</th>
                                                    <td>{kToC(data.main.temp_max)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Sun Rise</th>
                                                    <td>{getThedate(data.sys.sunrise)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Sun Set</th>
                                                    <td>{getThedate(data.sys.sunset)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return( <>
        {/* <Loader/> */}
        {showOnPage}{" "}
        </>
    );
}