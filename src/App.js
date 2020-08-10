import React from 'react';
import './App.css';
import axios from 'axios';
import './index.css';
import ImageUploader from 'react-images-upload';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: null,
      xray :null,
      response: '',
      post: '',
      responseToPost: '',
      defaultImage: null,
      name: null,
      score:null,
      temperature:null,
      xray_result:null,
      covid_result:null,
      display:0

    }
    this.onDropImage = this.onDropImage.bind(this);
    this.onDropXray = this.onDropXray.bind(this);
}
//handleSubmit= async event => {
  /* event.preventDefault();
  const response = await fetch('/api/world', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: this.state.image ,xray:this.state.xray }),
  });
  const body = await response.text();
  
  this.setState({ responseToPost: body }); */


   // Create an object of formData 
  /*  const formData = new FormData(); 
     
   // Update the formData object 
   formData.append( 
     "image", 
     this.state.image
   ); 
   formData.append( 
    "xray", 
    this.state.xray
  );  */
  
  
   // Request made to the backend api 
   // Send formData object 
   //axios.post("api/uploadfile", formData); 

 /*   axios.post("http://localhost:8000/uploadImage", formData, { // receive two parameter endpoint url ,form data 
   onUploadProgress: ProgressEvent => {
    this.setState({
      loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
  })
},
  })
  .then(res => { // then print response status
    alert(res.statusText);
    console.log(res.statusText)
  }) */

  handleSubmit= event => {
  let imageDetails={
    image:this.state.image,
    xray:this.state.xray

  }
  axios.post("http://localhost:8080/", imageDetails)
    .then(res => res.json)
      .then(json=> { 
          alert(json.data.temperature);
          this.setState({
              name:json.data.name,
              score:json.data.score,
              xray_result:json.data.xrayresult,
              temperature:json.data.temperature,
              covid_result:json.data.covidresult,
              display:1
   })
 })
}


handleReset = event => {
  this.setState({
      image: null,
      xray :null,
      response: '',
      post: '',
      responseToPost: '',
      loaded: 0,
      name: null,
      score:null,
      temperature:null,
      xray_result:null,
      covid_result:null,
      display:0
  })
}

onDropImage= picture => {
  if(picture.length===0){
    this.setState({
      image: this.state.defaultImage
   });
  }else{
    this.setState({
      image: picture
   });
  }
}

onDropXray= picture => {
  if(picture.length===0){
    this.setState({
      xray: this.state.defaultImage
   });
  }else{
    this.setState({
      xray: picture
   });
  }
}

	render() {  
	    return (
		          <form><h2>COVID TRACER</h2>
                <table>
 
                  <tbody>
                    <tr>                    
                        <td>
                          <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        buttonText="Upload Image"
                        onChange={this.onDropImage}
                        value={this.state.image}
                        imgExtension={[".jpg", ".jpeg"]}
                        maxFileSize={1048576}
                        fileSizeError=" file size is too big"
                        withLabel={true}
                        label="Max file size: 5mb, accepted: jpg"
                        fileTypeError= " is not supported file extension"
                        singleImage={true}
                      />
                      </td>

                      <td>
                        <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        value={this.state.xray}
                        buttonText="Upload X-Ray"
                        onChange={this.onDropXray}
                        imgExtension={[".jpg", ".jpeg"]}
                        maxFileSize={1048576}
                        fileSizeError=" file size is too big"
                        withLabel={true}
                        label="Max file size: 5mb, accepted: jpg"
                        fileTypeError= " is not supported file extension"
                        singleImage={true}
                      />   
                      </td>
                    </tr>
                    </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td><input id="submitbutton" className="button" type="submit"  onClick = {this.handleSubmit} value="SUBMIT" disabled={(this.state.xray ===null || this.state.image === null) ? true : false} /> </td>    
                      <td><input id="resetbutton"className="button" type="submit" onClick = {this.handleReset}  value="RESET" />  </td>  									 
                    </tr>
                  </tbody>
                </table>
                <div  className="covidDetails" display="{this.state.display}===1 ? true :false" >
                <table>
                  <thead>
                    <tr align="center" colSpan="2"><td><h2>Covid Report</h2></td></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name : </td>
                      <td>{this.state.name}</td>
                    </tr>
                    <tr>
                      <td>Score : </td>
                      <td>{this.state.score}</td>
                    </tr>
                    <tr>
                      <td>Temperature : </td>
                      <td>{this.state.temperature}</td>
                    </tr>
                    <tr>
                      <td>X-ray Result : </td>
                      <td>{this.state.xray_result} </td>
                    </tr>
                    <tr>
                      <td>Covid Result : </td>
                      <td>{this.state.covid_result}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>);
	  
        	}
  }

export default App;
