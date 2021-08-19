import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Movie from "./components/Movie.js";
import Weather from "./components/weather.js";
import { Carousel } from "react-bootstrap";


import "./Main.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityData: {},
      searchCity: "",
      showData: false,
      Obweather: [],
      Obmovie: [],
    };
  }

  selectLocation = async (e) => {
    e.preventDefault();

    await this.setState({
      searchCity: e.target.search.value,
    });
    // http://localhost:3001/weather?cName=seattle

    let placeURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchCity}&format=json`;

    let placeURL2 = `${process.env.REACT_APP_SERVER_LINK}/weather?searchQuery=${this.state.searchCity}`;

    let placeURL3 = `${process.env.REACT_APP_SERVER_LINK}/movie?searchQuery=${this.state.searchCity}`;

    let resultData = await axios.get(placeURL);
    let resultData2 = await axios.get(placeURL2);
    let resultData3 = await axios.get(placeURL3);

    let proDataForSplice = resultData3.data;

    for (let index = 0; index < proDataForSplice.length; index++) {
      if (
        proDataForSplice[index].poster ===
          "https://image.tmdb.org/t/p/original//cJy32F0ZCgKrLeamdx4IrAWXJFa.jpg" ||
        proDataForSplice[index].poster ===
          "https://image.tmdb.org/t/p/original//1NUOprbP7LLfKPArLJY7wziUiHT.jpg" ||
        proDataForSplice[index].poster ===
          "https://image.tmdb.org/t/p/original//6tn0pNVvTfFTREKOfixksU8QCSV.jpg"
      ) {

        proDataForSplice.splice(index, 1);
      }
    }

    this.setState({
      Obweather: resultData2.data,
      Obmovie: proDataForSplice,
      cityData: resultData.data[0],

      showData: true,
    });
  };

  render() {
    return (
      <div className="main">
        <>
        <h1>City-Explorer</h1>

        <Form onSubmit={this.selectLocation}>
          <Form.Select name="search" aria-label="Default select example">
            <option value="Paris">Paris</option>
            <option value="Amman">Amman</option>
            <option value="Seattle">Seattle</option>
          </Form.Select>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        <div className="imgto">
          <div className="tab2">
          <Carousel>

            {this.state.showData &&
              this.state.Obmovie.map((item, i) => {
                return (
                  <Carousel.Item>

                    <Movie
                      key={i}
                      title={item.title}
                      poster={item.poster}
                      state={this.state}
                    />
                  </Carousel.Item>

                );
              })}
              </Carousel>
          </div>

          <div className="para">
            {this.state.showData && (
              <p>
                {this.state.searchCity} <br />
                Latitude : {this.state.cityData.lat} <br />
                Longitude : {this.state.cityData.lon}{" "}
              </p>
            )}
          </div>

          <div className="img">
            {this.state.showData && (
              <Image
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`}
              />
            )}
          </div>
        </div>

        <div className="tab">
          {this.state.showData &&
            this.state.Obweather.map((item, i) => {
              return (
                <Weather
                  key={i}
                  date={item.date}
                  description={item.description}
                />
              );
            })}
        </div>
        </>
      </div>
    );
  }
}

export default App;
