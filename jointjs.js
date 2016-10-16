#! /usr/bin/env node

console.log("Welcome to JointJS!");
console.log("-------------------");


var path = process.argv[2];
if(!path){
  path = '.';
  // console.log("Please specify a path.");
  // console.log("Correct usage: `./jointjs.js <path>`");
  // return;
}

console.log("Project Path: " + path);
console.log("");


var shelljs = require('shelljs');
var fsp = require('fs-promise');

shelljs.mkdir('-p', './tmp/controllers/');
shelljs.mkdir('-p', './tmp/config/');

// This step takes each controller definition and exports it as
// a JointJSController module.
var controllerModules = {};
var controllers = fsp.readdirSync('./app/controllers');
controllers.forEach(controller => {
  var name = controller.split('.')[0];
  var fname = './app/controllers/' + controller;
  var fnameDest = './tmp/controllers/' + controller;
  var contents = fsp.readFileSync(fname);
  
  var contentsWrapped = "" +
    "var JointJS = require('../../lib/jointjs.js');\n" +
    "var JointJSController = JointJS.JointJSController;\n" +
    contents.toString() + "\n" +
    "module.exports = " + name + ";\n";

  // var contentsWrapped = "" + 
  //   "var JointJS = require('../../lib/jointjs.js');\n" +
  //   "va r JointJSController = JointJS.JointJSController;\n" +
  //   "module.exports = JointJS.JointJSControllerWrapper(\"" + name + "\")(\n" +
  //   contents.toString() + "\n" +
  //   ")";
  


  fsp.writeFileSync(fnameDest, contentsWrapped);

  // Include the new controller module
  controllerModules[name] = require(fnameDest);
});

console.log("Created Controllers:");
Object.keys(controllerModules).forEach(controllername => {
  console.log("  + " + controllername);
});

// This now takes each route and creates the correct file.
var routes = fsp.readFileSync('./config/routes.js');
var routesContent = routes.toString();
routesContent = routesContent.replace('JointJS.Router', 'var rs = JointJS.Router');
var routesWrapped = "" + 
    "var JointJS = require('../../lib/jointjs.js');\n" +
    routesContent + "\n" +
    "module.exports = rs;\n";
fsp.writeFileSync('./tmp/config/routes.js', routesWrapped);
console.log('');
console.log("Created Routes: ");
var parsedRoutes = require('./tmp/config/routes.js');