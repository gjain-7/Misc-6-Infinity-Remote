# Misc-6-Infinity-Remote

## Update Thursday, 08/07/2021:

## Objectives Completed:
1. Implemented UI for the remote (this will need to be fixed when we will add other functionalities for search page and video navigation on videoscreen)
2. Implemented features for movement of highlighter (including carrot down menu) on panelscreen 
3. Implementing authorisation/ ids to enforce a 1 to 1 connection between remote and extension, and changing the qrcode depending upon the id
4. Implemented features for pausing, playing, volume, mute, forward, step forward, captions and full screen (although not working now after connecting with socket).
5. The html page now works fine after socket is used (Buttons not getting collected at the top of screen)
6. The state of html page depends on the url of site running
7. Press and hold feature for navigation buttons 


Added popup.html that now gives a QR code, and a popup.js for that (using QRious). Added background.js and server.js that will be acting as middlemen between content.js and index.js (js file for remote). 

## How to implement: 
Try downloading the whole folder named Project, and then in the same folder, applying "npm install", followed by load unpacking the extension in chrome://extensions. Open youtube on a tab, then initiate the server using "node server.js" in the command line, followed by opening "mainpage.html". Required: You need to enable this in your chrome - chrome://flags/#extensions-on-chrome-urls

## Objectives To do (as per priority):
1. Implementing PWA scanner with good UI
2. Implementing the server using Heroku/Firebase
3. Implementing a remote for the search page, and videos that are present on the videoscreen (or the second screen)

## Difficulties being faced:
1. Problem with search box - ( Solution - Entire result search query )
2. Now fullscreen also not working

## Fixes Used (Jugaad, although working, but should not have been used)
1. Volume regulation
2. Keyboard Shortcuts rather than API
3. chrome://flags/#extensions-on-chrome-urls (Will need to be fixed or feature to be added for its permission)
