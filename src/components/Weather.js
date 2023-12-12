import React, { Component } from 'react'
import Search from "./Search";
import Result from "./Result";
import axios from "axios";
export class Weather extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         lat: "",
         lon: "",
         weatherData: "",
         city: "",
      }
    }
    
changeHandler = (event) => {
    const name = event.target.name;
    if(name === "city"){
        this.setState({city: event.target.value})
    }else if(name === "lat"){
        this.setState({lat: event.target.value})
    }else if(name === "lon"){
        this.setState({lon: event.target.value})
    }
};

searchHandler = () =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=7f041196f5e137476c26968c0b56c6fe`)
    .then((result) => {
        this.setState({
            city: result.data.name,
            weatherData: result.data,
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

locationHandler = () => {
    this.setState({
        lat: "",
        lon: "",
        city: "",
        // weatherData: null,
    })
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (res) => {
                setTimeout(() => {
                    this.setState({
                        lat: res.coords.latitude,
                        lon: res.coords.longitude,
                    });
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=7f041196f5e137476c26968c0b56c6fe`)
                    .then((result) => {
                        this.setState({
                            city: result.data.name,
                            weatherData: result.data,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    }); 
                }, 500);
            },
            (error) => {
                console.log(error);
            }
        )
    }else{
        console.log("Location not supported");
    }
};

  render() {
    return (
      <div className='container pt-4' style={{height: "500px"}}>
        <Search 
        lat={this.state.lat}
        lon={this.state.lon}
        city={this.state.city}
        weatherData={this.state.weatherData}
        change = {this.changeHandler}
        getLocation = {this.locationHandler}
        search = {this.searchHandler}
        ></Search>
        <Result weatherData={this.state.weatherData}></Result>
      </div>
    )
  }
}

export default Weather;