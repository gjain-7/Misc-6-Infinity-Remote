# Misc-6-Infinity-Remote

### Update Friday, 23/07/2021:

### Objectives Completed:
1. Implemented UI for the remote
2. Implemented features for movement of highlighter (including carrot down menu) on panelscreen 
3. Implementing authorisation/ ids to enforce a 1 to 1 connection between remote and extension, and changing the qrcode depending upon the id
4. Implemented features for pausing, playing, volume, mute, forward, step forward, captions and full screen (although not working now after connecting with socket).
5. The html page now works fine after socket is used (Buttons not getting collected at the top of screen)
6. The state of html page depends on the url of site running
7. Search functionality implemented.
8. Video Navigation functionality implemented.
9. Made a few error pages.
10. Used an icon from Google as remote icon.
11. Implemented PWA (UI still to be designed)
12. Implemented the server using Heroku (https://mysterious-anchorage-10324.herokuapp.com)


### How to implement: 
Try downloading the whole folder named Project, and then in the same folder, applying "npm install", followed by load unpacking the extension in chrome://extensions. Open youtube on a tab, then initiate the server using "node server.js" in the command line, followed by opening "mainpage.html". Required: You need to enable this in your chrome - chrome://flags/#extensions-on-chrome-urls

### Objectives To do (as per priority):
1. Improving UI of PWA scanner.
2. Fixing Errors
3. Need to make presentation and finalize the project

### Difficulties being faced:
1. Press and hold feature for navigation buttons 

### Fixes Used (Jugaad, although working, but should not have been used)
1. Volume regulation (uncoventional, although working)
2. chrome://flags/#extensions-on-chrome-urls (Will need to be fixed or feature to be added for its permission or removed completely)
3. Theatre mode in place of Full Screen Mode 


