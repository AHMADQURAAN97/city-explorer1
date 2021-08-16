import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./Main.css";

class App extends React.Component {

constructor(props){
super(props);

this.state = {
cityData:{},
searchCity:'',
showData:false
}
}

selectLocation = async (e) => {

  e.preventDefault();

  await this.setState ({

    searchCity:e.target.city.value


  })

let placeURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchCity}&format=json`

let resultData = await axios.get(placeURL)


this.setState({
cityData:resultData.data[0],
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
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="text" name="city" placeholder="Enter Your Location" />
   
  </Form.Group>

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
</div>


)
}
}


export default App;

