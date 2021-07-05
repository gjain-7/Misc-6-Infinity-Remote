# Misc-6-Infinity-Remote

The files index.html, styles.css, index.js, and cross.png show the UI for the remote along with basic functionalities.
The file console.js is the one which we will be injecting into the console using the extension.

It would be great if you open youtube in your browser and copy paste the console.js code and see the functionalities with your arrows.


Update Monday, 28/06/2021:
Added Extension with popup.html, try to download the whole folder and load unpack in chrome://extensions, and then see its working.
It has a few problems now, which includes:
1. search button
2. volume button
3. Carrot down menu in youtube
4. Buttons when the extension is first opened


**
Update Monday, 05/07/2021:**

Objectives Completed:
1. Implemented UI for the remote (this will need to be fixed when we will add functionalities for search page and video navigation on videoscreen)
2. Implemented features for movement of highlighter (including carrot down menu) on panelscreen 
3. Implemented features for pausing, playing, volume, mute, forward, step forward, captions and full screen (although not working now after connecting with socket).
4. The html page now works fine after socket is used (Buttons not getting collected at the top of screen)
5. The state of html page depends on the url of site running
6. Press and hold feature for navigation buttons 


Added popup.html that now gives a QR code, and a popup.js for that (using QRious). Added background.js and server.js that will be acting as middlemen between content.js and index.js (js file for remote). 
How to implement: Try downloading the whole folder named extensionss (having double s in the end), and then in the same folder, applying "npm install", followed by load unpacking the extension in chrome://extensions. Open youtube on a tab, then initiate the server using "node server.js" in the command line, followed by opening "mainpage.html" using live server. Required: You need to enable this in your chrome - chrome://flags/#extensions-on-chrome-urls

Objectives To do (as per priority):
1. Implementing authorisation/ ids to enforce a 1 to 1 connection between remote and extension, and changing the qrcode depending upon the id
2. Implementing the server using Heroku/Firebasee
3. Implementing a database in order to store data
4. Implementing a remote for the search page, and videos that are present on the videoscreen (or the second screen)

Difficulties being faced:
1. Problem with search box
2. Now fullscreen also not working

Fixes Used (Jugaad, although working, but should not have been used)
1. Volume regulation
2. Keyboard Shortcuts rather than API
3. chrome://flags/#extensions-on-chrome-urls (Will need to be fixed or feature to be added for its permission)
