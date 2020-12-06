# COVID tracer system

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack) [![Website](https://img.shields.io/badge/View-Website-blue)](https://code-and-response.github.io/Project-Sample/)



## Short description
COVID Tracer is a non-contact surveillance-based system to fine COVID patience using  Computer vision,  Thermal image , Oximeter ,  Heartbeat and Face detection and recognition followed by notification mechanism.

### What's the problem?

Automated  COVID tracer system, with minimum human interaction  and providing a fast  COVID detection system

### How can technology help?

As the  number of COVID patience are increasing exponentially, it is very important that we identify  and isolate COVID patience. The current system of swab testing it is time consuming.  For this purpose, we are building  video-based surveillance system which will be working on  Thermal image , face detection and Image recognition.   Using pulse oximeter framework, we can get the heart beat and saturation level of oxygen in blood.

### The idea

The idea is to use, thermal image, OpenCV python  libraries,  IBM Watson  image recognition an IBM service for sending notification

## Demo video

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/IBM-interview-video-image.png)](https://www.youtube.com/watch?v=2n2ZB2MoXu0)

## The architecture

1.	Employee/Security Guard will send thermal picture of the employee image in app/website.
2.	The Node js web service calls api exposed in Cloud platform to get the temperature and oximeter reading . 
3.	Node application will then invoke the  IBM waston api for face recognition and score is derived.  
4.	IBM Cloud function is then invoked to send the  notification with all the details embedded. 


## Long description
The idea is based on the Thermal image processing as well as pulse oximeter.
	In actual implementation we shall be having a system of Thermal camera , which can be kept at the entrance or common location from where moment of people can be monitored and corrective action can be taken as well.  The thermal camera can take the  image of the person and using the OpenCV library we can get the temperature of the person.  There will be threshold value if the  temperature is above the threshold  then user will be flagged as COVID  patience.  For analysis we are cropping the face of the person and temperature is read based on the face. 

Apart from  facial temperature  the camera , based on video frame and pulse oximeter implementation can provide the heart beat and blood oxygen  values.  The blood oxygen values if less than threshold values then we can conclude that the person is having covid. 
symptom of Covid-19. It is the condition when the lungs fill up with fluid and pus, causing a person to struggle to breathe. The rapid breathing rate tires the lung muscles, which results in the level of oxygen falling while the level of carbon dioxide rises within the body.
So, with the help of oximeter we can detect the covid patients if their oxygen level came below 88 

The first thing was to figure out how to read data from the webcam. Webcams generate digital images. The amount of light received by the camera in a particular pixel location is represented by a numerical value. We decided to use a small rectangular region of the image to measure the brightness of the skin at any given moment. When we look at this rectangle multiple times a second, we can see the brightness changing over time. The brightness changes as blood fills the capillary bed of the skin. There are a few areas where this capillary bed is close to the skin surface. If we keep the rectangle on such an area on my forehead, we can see the photoplethysmogram or ppg if we plot the brightness as a function of time. 

A ppg is a waveform that corresponds to the pulsing of blood through the body over time. The amount of blood in the capillary bed at any one time causes the amount of reflected light to vary slightly. This is the origin of the ppg as the camera sees light reflected off the skin.
 Most webcams take images, or frames, 30 or 60 times per second. This frame rate determines the quality or time-resolution of the signal. However, lots of other factors add things to the signal. This creates a poor signal to noise ratio. Some things can be done to mitigate the poor S/N: using a bright, broad-spectrum light near the face; holding the face still while keeping a rectangle over the same region of the forehead; placing the face close to the camera; using the green band of the red-blue-green image.


Based on temperature and oximeter we shall derive if the person is COVID suspect or not.  The  next scenario is to identify the person. For this we shall be using the  IBM Watson Image recognition APIs, we have trained our data set model with the images of the known person.  
Consider that the system is installed in the entrance of office then all the member of the office images needs to be trained  to get a perfect model.  For image training we are using a scaled down  black and white image of the face portion only and using that we are training the model . The image recognition APIs will give a score based on the score the name of the person will be shown.

Once we have confirmed person, we shall be having notification mechanism by which the  image of the person, name as identified by Waston, Temperature reading, Oximeter reading all will be send as notification. 



## Project roadmap

Currently the  Oximeter and Temperature checking is happening independently and analysis is being done using the normal image.
In future release it will be using T

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Prerequisites 

The below  software needs to be installed for development of this tool

1.	Node JS 
2.	Python
3.	OpenCV 

9.	Installing
 There are two modules for this tool. 
1.	The front end application which is developed in node JS 

Download the source code from the below URL
 
https://eu-gb.git.cloud.ibm.com/sanu_s/covidtracker-ui.git

a)	Install Node.js
b)	cd into this project's root directory
c)	Run npm install to install the app's dependencies
d)	Run npm start to start the app
e)	Access the running app in a browser at http://localhost:6001

2.	The service layer which is written  in Python can be downloaded from the below URL

https://eu-gb.git.cloud.ibm.com/sanu_s/covidtracker-service 
f)	Install python
g)	cd into this project’s root directory
h)	Run python server.py
i)	Access the application  in a browser at http://localhost:8000

## Running the tests


Run both the front end application and python service app,  in the home page we have file upload functionality. Click on the file upload and upload the image.

The image will be cropped and show, click on process to get the  temperature detail and  face recognition call towards IBM waston. 



You can find a running system to test at [callforcode.mybluemix.net](http://callforcode.mybluemix.net/)

## Built with

* Node JS  - The web framework used
* Python  - The service framework used
* OpenCV – Image processing framework used
* IBM  Watson  - Image recognition part



## Versioning

We have used IBM cloud GIT for version control

## Authors

•	Ben Sebastine
•	Jeffy Kurian 
•	Suraj Waragade
•	Naveen Dasari
•	Sanu S
