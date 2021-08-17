import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import "./Main.css";

class App extends React.Component {

constructor(props){
super(props);

this.state = {
cityData:{},
searchCity:'',
showData:false,
Obweather:[]
}
}

selectLocation = async (e) => {

  e.preventDefault();

  await this.setState ({

    searchCity:e.target.search.value,


  })
// http://localhost:3001/weather?cName=seattle

let placeURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchCity}&format=json`

let placeURL2 = `${process.env.REACT_APP_SERVER_LINK}/weather?cName=${this.state.searchCity}`;

let resultData = await axios.get(placeURL)
let resultData2 = await axios.get(placeURL2)

await this.setState({
cityData:resultData.data[0],
Obweather:resultData2.data,
showData:true
})
}



render(){
return (

<div className="imgp">
  <h1>City-Explorer</h1>
{/* 
   <form onSubmit={this.selectLocation} className="form-group">
  
    <input type="text" className="form-control" placeholder='Enter city' name='city' />
    <button type="submit" className="btn btn-primary">Explore!</button>
     </form> */}



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


<div className="para">
{this.state.showData && (
<p>{this.state.searchCity} <br/>
Latitude : {this.state.cityData.lat} <br/>
 Longitude : {this.state.cityData.lon} </p>

)}
</div>

<div className="img">
{this.state.showData && (

<Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`}  /> 
)}



</div>


<div>
{this.state.showData &&  this.state.Obweather.data.map((item, i) => {
              return (
                <Table striped bordered hover>
                  <tbody key={i}>
                    <tr>
                      <th>Date: {item.valid_date}</th>
                      <th>description: {item.weather.description}</th>
                      <th>H: {item.app_max_temp}</th>
                      <th>L: {item.app_min_temp}</th>
                    </tr>
                  </tbody>
                </Table>
              );
            })}
</div>
</div>




)
}
}


export default App;

