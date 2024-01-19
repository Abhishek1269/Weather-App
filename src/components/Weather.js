import React, { Component } from 'react'
import Search from "./Search";
import Result from "./Result";
import axios from "axios";
import Recent from "./Recent"
export class Weather extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         lat: "",
         lon: "",
         weatherData: "",
         city: "",
         isSearched: false,
         recent: [],
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

researchHandler = (lat, lon,city) =>{
    this.setState({lat, lon,city}, () => {
        if (city.trim() !== "") {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=44d4c272ffd1c535bfbbd154a097fe7a`)
                .then((result) => {
                    this.setState({
                        city: result.data.name,
                        weatherData: result.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (lat !== "" && lon !== "") {
            // If no city name is provided, use latitude and longitude for the search
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=44d4c272ffd1c535bfbbd154a097fe7a`)
                .then((result) => {
                    this.setState({
                        city: result.data.name,
                        weatherData: result.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });
};

searchHandler = () =>{
    const { lat, lon, city } = this.state;
    if (city.trim() !== "") {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=44d4c272ffd1c535bfbbd154a097fe7a`)
            .then((result) => {
                this.setState({
                    city: result.data.name,
                    weatherData: result.data,
                }, () => {
                    this.addDataToRecent();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    } else if (lat !== "" && lon !== "") {
        // If no city name is provided, use latitude and longitude for the search
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=44d4c272ffd1c535bfbbd154a097fe7a`)
            .then((result) => {
                this.setState({
                    city: result.data.name,
                    weatherData: result.data,
                }, () => {
                    this.addDataToRecent();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

handleCityChange = (event) => {
    const cityName = event.target.value;
    this.setState({ city: cityName,
    isSearched: true,
    });
    // Remove the search call from here
}

addDataToRecent =() => {
    let recent = this.state.recent;
    recent.push({
        lat: this.state.lat,
        lon: this.state.lon,
        city: this.state.city,
    });
    this.setState({ recent });
};

locationHandler = () => {
    this.setState({
        lat: "",
        lon: "",
        city: "",
        isSearched: true,
        weatherData: null,
    })
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (res) => {
                setTimeout(() => {
                    this.setState({
                        lat: res.coords.latitude,
                        lon: res.coords.longitude,
                    });
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=44d4c272ffd1c535bfbbd154a097fe7a`)
                    .then((result) => {
                        this.setState({
                            city: result.data.name,
                            weatherData: result.data,
                        }, () => {
                            this.addDataToRecent();
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
        <div className='container pt-4' style={{ height: "500px" }}>
        <div className="row">
          <div className="col-md-3">
            <Recent
            recent = {this.state.recent}
            research = {this.researchHandler}
            />
          </div>
          <div className="col-md-9">
            <Search
              lat={this.state.lat}
              lon={this.state.lon}
              city={this.state.city}
              weatherData={this.state.weatherData}
              change={this.changeHandler}
              getLocation={this.locationHandler}
              search={this.searchHandler}
              handleCityChange={this.handleCityChange}
            ></Search>
            <Result
              isSearched={this.state.isSearched}
              weatherData={this.state.weatherData}
            ></Result>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather;