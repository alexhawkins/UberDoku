#Uberdoku

A Sudoku board game that demonstrates a highly modular workflow using the latest from EcmaScript 6, Sass modules, and Webpack without the use of a modern framework. With a basic html skeleton wrapped in a highly responsive CSS Flexbox Layout, this project is highly customizable. It also comes with a very lightweight Eventing System for creating custom events. 


###*Live Demo*
**[Visit Uberdoku online!](https://uber-doku.firebaseapp.com/)**

## Features

* Compilation with Webpack
* Write Next Generation JavaScript with Babel compiler
* Modular Stylesheets with SASS, CSS or mixed
* Responsive FlexBox layout
* Modular Code Architecture for hot swapping components, making it easy to update and add to the existing codebase
* Liberal Use of Promises with ES6 Polyfill
* Embedded resources like images or fonts
* Lodash Functions
* Easy Deployment to Firebase (see steps below)
  
**Development**
  * Development server
  * Optional Hot Module Replacement dev server (LiveReload for Stylesheets)

**Stylesheets** 
  * Modular Sass, organized stylesheets that allow you to create styles 
  with your components.
  * Custom Mixins for FlexBox and other common styles(see config.scss)
  * Uses SourceUrl for performance, but can switch to SourceMaps
  * Css autoprefixer for vendor prefixes
  
**Eventing System**
  * Comes with customizable lightweight eventing system - on, off, and emit functionality.
  * Create custom events and functions with ease.
  
**Production**
  * Generate separate css file to avoid FOUC
  * Uglified, Minified, and Mangled CSS and javascript
  * Easy Deploy to Firebase

**Testing**
  * Karma testing with Mocha and Chai and integrated with Webpack.


## Structure
###Code Architecture

```
├── src/
│   ├── app/
|   ├── ├── app.module.es6
|   ├── ├── modules/
|   ├── ├── ├── header/
|   ├── ├── ├── ├── header.module.es6
|   ├── ├── ├── ├── header.style.scss
|   ├── ├── ├── ├── header.tpl.html
|   ├── ├── ├── game/
|   ├── ├── ├── ├── game.module.es6
|   ├── ├── ├── ├── game.style.scss
|   ├── ├── ├── ├── game.tpl.html
|   ├── ├── ├── board/
|   ├── ├── ├── ├── board.module.es6
|   ├── ├── ├── ├── board.style.scss
|   ├── ├── ├── ├── board.tpl.html
|   ├── ├── ├── footer/
|   ├── ├── ├── ├── footer.module.es6
|   ├── ├── ├── ├── footer.style.scss
|   ├── ├── ├── ├── footer.tpl.html
|   ├── ├── utils/
|   ├── ├── ├── EventSystem.es6
|   ├── ├── ├── DataService.es6
|   ├── ├── ├── defaultProps.es6
|   ├── ├── ├── SudokuMaker.es6
|   ├── ├── ├── lodash.min.js
|   ├── ├── assets/
|   ├── ├── ├── stylesheets/
|   ├── ├── ├── ├── config/
|   ├── ├── ├── ├── ├── colors.scss
|   ├── ├── ├── ├── ├── config.scss
|   ├── ├── ├── ├── ├── flexbox.scss
|   ├── ├── ├── ├── utilities/
|   ├── ├── ├── ├── ├── normalize.scss
|   ├── ├── ├── ├── base.scss
├── ├── ├── stores/
|   ├── ├── ├── data/
|   ├── ├── ├── ├── games.json
├── public/
│   ├── index.html
|   ├── uberdoku.bundle.js
|   ├── uberdoku.bundle.css
|   ├── vendors.bundle.js
|   ├── vendors.bundle.css
|   ├── uberdoku.bundle.js.map
|   ├── uberdoku.bundle.css.map
|   ├── vendors.bundle.js.map 
|   ├── stores/
|   ├── |── data/
|   ├── ├── ├── games.json
├── test/
│   ├── app.module_test.es6
├── webpack.config.js
├── package.json
├── firebase.json
├── karma.conf.js
├── .jshintrc
├── .gitignore
├── README.md

``` 

## Requirements

### Local Installation
Install [node.js](https://nodejs.org) or [io.js](https://iojs.org)
* on OSX install [home brew](http://brew.sh/) and type `brew install node`
* on Windows install [chocolatey](https://chocolatey.org/) and type `choco install nodejs`

#### *Installing Node.js Packages*
- Open terminal
-Clone this repo and change the `origin` git remote.
- Type `npm install`

## Running
Runs locally, no database required.

### Dev Builds

#####*Build and Serve*

```bash
$ npm start  
 
# wait until the first compilation is successful
# open this url in your browser
http://localhost:8080/
```
##### *Auto Build Files*

```bash
$ npm run watch
```
##### *Single Build Files*

```bash
$ npm run build

# open this url in your browser
http://localhost:8080/
```
##### *Hot Module Loading(fastest)*

```bash
$ npm run hotbox

# open this url in your browser
http://localhost:8080/
```

#####*WebPack Config*

The configuration is `webpack.config.js`.

It automatically recompiles and refreshes the page when files are changed.
Also check the [webpack-dev-server documentation](http://webpack.github.io/docs/webpack-dev-server.html).


### Production compilation and server


Build the client bundle to your ```dist``` folder
``` bash
 npm run deploy
```
Copy the `index.html` file from the public folder into the `dist` folder, particularly if you plan to deploy to firebase.


### Deploy to Firebase

* Copy the `index.html` file from the public folder into the `dist` folder 

* Sign up with Firebase and create an App

* `npm install -g firebase-tools` or `sudo npm install -g firebase-tools`

* `cd` into your website directory and run `firebase init`

* When asked for your app directory, type `dist`

* Then deploy your website with `firebase deploy`. It's that simple


### **Testing your ES6 Code with  ES6 Code**
Feel free to customize `karma.conf.js`
. All tests can be found in the test directory and the filename must end with `_test.es6`

To run all tests and autowatch your code for when a test fails:
```bash
 npm test
``` 

To run  tests only once and then exit
```bash
 npm run test-once
``` 

### Loaders and file types

Many file types are preconfigured, not every loader is installed. If you get an error like `Cannot find module "xxx-loader"`, you'll need to install the loader with `npm install xxx-loader --save -D` and restart the compilation.


### Issues 

There is an issue with `node-sass` and `sass-loader`. Please do not install the latest version of either of these packages. Make sure that you have
    ```
    "node-sass": "sass/node-sass#v3.0.0-alpha.1",
    "sass-loader": "^0.4.2"
    ```
 in your `package.json`
  
If your app starts to fail, `ctrl-c` and `npm rebuild`

```
lsof -i TCP|fgrep LISTEN
kill -9 34608
```

### TODO LIST

- Refactor code
- Finish comments and testing
- Add more cool functionality to game
- Create an Uberdoku Class that extends core methods to all components. Similar to React.create
- Integrate custom Virtual Dom with diffing algorithm. Similar to React.
- Remove JQuery once Virtual Dom has been created.