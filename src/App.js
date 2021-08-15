import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

let placeURL = `https://eu1.locationiq.com/v1/search.php?key=pk.b72f636506faa3cf5c9f31dbb231730b&q=irbid&format=json`

let resultData = await axios.get(placeURL)


this.setState({
cityData:resultData.data[0],
showData:true
})
}



render(){
return (

<div>
  <h1>City-Explorer</h1>

   <form onSubmit={this.selectLocation} class="form-group">
  
    <input type="text" class="form-control" placeholder='Enter city' name='city' />
    <button type="submit" class="btn btn-primary">Explore!</button>
     </form>



{this.state.showData && 
<p>{this.state.searchCity} <br/>
Latitude : {this.state.cityData.lat} <br/>
 Longitude : {this.state.cityData.lon} </p>

}


</div>


)
}
}


export default App;