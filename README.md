# JointJS

Experimental framework to help larger Lambda nodeJS projects.

The Goal is to make Node and Lambda feel more like Rails.

## Installation / First Usage

+ Install required packages with `npm install`
+ Build project with `./jointjs.js`
+ Test Endpoints
  + `./jointjscall.js api/v1/hello`
  + `./jointjscall.js api/v1/hello POST`



## V 0.0.01

## Application code

This will reside in app/ and the configuration will be in /config.

Controllers will be in app/controllers.
Eventually Models will be in app/models.
Configuration is in config/
Routes are defined in config/routes.js

## Building

Building with `./jointjs.js` which will eventually be a command line tool.

Building generates files within ./tmp which compile into files more suitable for 
NodeJS and Lambda.

The routes folder contains files which will eventually be usable directly within Lambda.

## Calling / Usage

To test a call you can use `jointjscall.js`.

## Example App

Contains `WelcomeController` which has GET and POST defined.
Compiling makes various files.
Calling `./jointjscall.js api/v1/hello` and `./jointjscall.js api/v1/hello POST` will call the defined endpoints.

## Next Steps

+ Make output more suitable / compilable for Lambda.
+ Make a Node accessory which can host all these endpoints as a Local Node Server for testing.
+ Allow watching for recompiling as files are changed.
