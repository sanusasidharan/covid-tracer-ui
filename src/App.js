import React from 'react';
import './App.css';
import './index.css';
import axios from'axios';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      image: null,
      xray :null,
      imageUrl: null,
      xrayUrl :null,
      name: null,
      score:null,
      temperature:null,
      xray_result:null,
      covid_result:null,
      display:false,
      displayError:false,
      errorMessage:null
    }

    this.imageRef = React.createRef()
    this.xrayRef = React.createRef()
    this.handleChangeImage = this.handleChangeImage.bind(this)
    this.handleChangeXray = this.handleChangeXray.bind(this)
    this.handleChangeXray = this.handleChangeXray.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
}

handleSubmit= event => {
  event.preventDefault();

  let formData= new FormData();
  formData.append("image",  this.state.image); 
  formData.append("xray",  this.state.xray);

  const BFF_ENDPOINT = "http://covid-tracer-bff-node-covid-tracker.sandbox-ocp431-one-89dadfe96916fcd27b299431d0240c37-0000.eu-gb.containers.appdomain.cloud/";
  axios.post(BFF_ENDPOINT+'uploadImage', formData,)
      .then(res => { 
        // then set response data
        console.log(res.data);
        console.log(res.statusText);
        this.setState({
          name:res.data.name,
          score:res.data.score,
          xray_result:res.data.xrayresult,
          temperature:res.data.temperature,
          covid_result:res.data.covidresult,
          display:true,
          displayError:false,
          
      });
      //set error message
      if(res.data.errorMessage!==null && res.data.errorMessage!==undefined){
        console.log("in errorMessage response:");
        this.setState({
          errorMessage:res.data.errorMessage,
          display:false,
          displayError:true,
      });} 
  }).catch(error => {
    console.log(error);
    this.setState({
      display:false,
      errorMessage:error,
      displayError:true, });
    });
console.log("displayError:"+this.state.displayError);
console.log("display:"+this.state.display);
}

 validateFileType = file => {
  const types = ['image/jpg', 'image/jpeg']
  
  if(file.size> 1000000){
    alert("File is too large .Please upload file less than 1 MB ");  
    return false;
  }
  
  if(types.every(type => file.type!==type)){
    alert("File is not a supported format! Only images in jpg/jpeg format supported");  
    return false;
  }

  return true;
} 

handleChangeXray= event => {
  const file = event.target.files[0];
  
  if(file!==undefined){
    if(this.validateFileType(file)){
      this.setState({
        xray: file,
        xrayUrl:URL.createObjectURL(file)
      })
    }
    else{
      this.setState({
        xray: null,
        xrayUrl: null
      })
    }
  }
}

handleChangeImage = event => {
  const file = event.target.files[0];

  if(file!==undefined){
    if(this.validateFileType(file)){
      this.setState({
        image: file,
        imageUrl:URL.createObjectURL(file)
      })
    } else{
      this.setState({
        image: null,
        imageUrl: null
      })
    }
  }
  

}

handleReset = event => {
  this.setState({
      image: null,
      xray :null,
      imageUrl: null,
      xrayUrl :null,
      name: null,
      score:null,
      temperature:null,
      xray_result:null,
      covid_result:null,
      display:false,
      displayError:false,
      errorMessage:null

  })
}

	render() {  
	    return (
		          <form><h2>COVID TRACER</h2>
                <table>
                  <thead>
                    <tr>
                      <td>
                        <img src={this.state.imageUrl} size='10x' alt=""/>
                      </td>
                      <td>
                        <img src={this.state.xrayUrl} size='10x' alt=""/>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>                    
                        <td>
                          <input id="image"
                            style={{display:'none'}}
                          className="input"  
                          type="file" 
                          ref={imageRef=> this.imageRef = imageRef} 
                          onChange={this.handleChangeImage} 
                          accept="image/*"/>
                      </td>
                      <td>                       
                        <input id="xray"  
                        style={{display:'none'}} 
                        type="file" 
                        ref={xrayRef=> this.xrayRef = xrayRef} 
                        onChange={this.handleChangeXray} 
                        accept="image/*"/>                       
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="image" className="upload" >Upload Image</label></td>
                      <td><label htmlFor="xray" className="upload" >Upload X-Ray</label></td>                   
                    </tr>
                    </tbody>
                </table>
                <table className="buttons">
                  <tbody>
                    <tr>
                      <td><input id="submitbutton" className="button" type="submit"  onClick = {this.handleSubmit} value="SUBMIT" disabled={(this.state.xray ===null || this.state.image === null) ? true : false} /> </td>    
                      <td><input id="resetbutton"className="button" type="submit" onClick = {this.handleReset}  value="RESET" />  </td>  									 
                    </tr>
                  </tbody>
                </table>
                { this.state.display ?  
                    <div  className="covidDetails" >
                    <table>
                      <thead>
                        <tr>
                          <td colSpan="3"><h2>Covid Report</h2></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Name </td>
                          <td> : </td>
                          <td>{this.state.name}</td>
                        </tr>
                        <tr>
                          <td>Score </td>
                          <td> : </td>
                          <td>{this.state.score}</td>
                        </tr>
                        <tr>
                          <td>Temperature </td>
                          <td> : </td>
                          <td>{this.state.temperature}</td>
                        </tr>
                        <tr>
                          <td>X-ray Result </td>
                          <td> : </td>
                          <td>{this.state.xray_result} </td>
                        </tr>
                        <tr>
                          <td>Covid Result </td>
                          <td> : </td>
                          <td>{this.state.covid_result}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> 
                : null }
              { this.state.displayError ? 
                    <div className="errorDetails"><h3>{this.state.errorMessage}</h3></div> 
                : null}
            </form>);
	  
        	}
  }

export default App;
