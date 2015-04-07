#Uberdoku

A Sedoku board game that demonstrates a highly modular workflow using the latest from EcmaScript 6, Sass modules, and Webpack without the use of a modern framework. With a basic html skeleton wrapped in a highly responsive CSS Flexbox Layout, this project is highly customizable. It also comes with a very lightweight Eventing System for creating custom events. Feel free to use this as a template/starter kit for your own projects. The app structure is well suited to builds of both Angular and React.


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
|   ├── ├── ├── ├── header.templ.html
|   ├── ├── ├── game/
|   ├── ├── ├── ├── game.module.es6
|   ├── ├── ├── ├── game.style.scss
|   ├── ├── ├── ├── game.templ.html
|   ├── ├── ├── board/
|   ├── ├── ├── ├── board.module.es6
|   ├── ├── ├── ├── board.style.scss
|   ├── ├── ├── ├── board.templ.html
|   ├── ├── ├── footer/
|   ├── ├── ├── ├── footer.module.es6
|   ├── ├── ├── ├── footer.style.scss
|   ├── ├── ├── ├── footer.templ.html
|   ├── ├── ├── utils/
|   ├── ├── ├── ├── EventSystem.es6
|   ├── ├── ├── ├── DataService.es6
|   ├── ├── ├── ├── defaultProps.es6
|   ├── ├── ├── ├── lodash.min.js
|   ├── ├── ├── stores/
|   ├── ├── ├── ├── data/
|   ├── ├── ├── ├── ├── games.json
|   ├── ├── assets/
|   ├── ├── ├── ├── stylesheets/
|   ├── ├── ├── ├── ├── config/
|   ├── ├── ├── ├── ├── ├── colors.scss
|   ├── ├── ├── ├── ├── ├── config.scss
|   ├── ├── ├── ├── ├── ├── flexbox.scss
|   ├── ├── ├── ├── ├── utilities/
|   ├── ├── ├── ├── ├── ├── normalize.scss
|   ├── ├── ├── ├── ├── base.scss
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
├── webpack.config.js
├── package.json
├── firebase.json
├── .jshintrc
├── .gitignore
├── README.md

``` 

## Features

* Compilation with webpack
* Write Next Gen JavaScript with Babel compiler
* Stylesheets with CSS, SASS or mixed
* Responsive FlexBox layout
* Modular Architecture to build upon
* Use of Promises with ES6 Polyfill 
* Embedded resources like images or fonts
* Lodash Functions
  
**Development**
  * Development server
  * Optional Hot Module Replacement dev server (LiveReload for Stylesheets

**Stylesheets** 
  * Modular Sass, organized stylesheets that allow you to create styles 
  next to your components
  * Custom Mixins for FlexBox
  * Uses SourceUrl for performance, but can switch to SourceMaps
  * Css autoprefixer for vendor prefixes
  
**Eventing System**
  * Comes with customizable lightweight eventing system - on, off, and emit functionality.
  * Create custom events and functions with ease.
  
**Production**
  * Long Term Caching through file hashes enabled
  * Generate separate css file to avoid FOUC
  * Uglified, Minified, and Mangled CSS and javascript

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
##### *Hot Module Loadings(fastest)*

```bash
$ npm run hotbox
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


### **Testing**
```bash
...coming soon
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