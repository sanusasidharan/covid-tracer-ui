import numpy as np
import cv2
import sys


faceCascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Our operations on the frame come here
    heatMap = cv2.applyColorMap(frame,cv2.COLORMAP_JET)
    gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
                #faces=faceCascade.detectMultiScale(heatMap,scaleFactor=1.1,minNeighbors=5,minSize=(30, 30),flags=cv2.cv.CV_HAAR_SCALE_IMAGE)
    faces = faceCascade.detectMultiScale(heatMap,1.3,5)
    for(x,y,w,h) in faces :
        face = cv2.rectangle(heatMap,(x,y),(x+w,y+h),(0,255,0),2)
        cv2.imwrite("face2.jpg",face)
    # Display the resulting frame
    cv2.imshow('frame',heatMap)
    cv2.imwrite("heatmap.jpg",heatMap);
                
                # Face detecting 

                # Display the resulting frame
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
print("covid +ve")
