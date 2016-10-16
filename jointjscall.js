#! /usr/bin/env node

var path = process.argv[2];

if(!path){
  console.log("JointJSCall");
  console.log("-----------");
  console.log("Must be called with `node jointjscall <callpath> <method>`");
  console.log("<method> will default to GET if not supplied.");
  console.log("");
  console.log("Example to GET api/v1/hello");
  console.log("  node jointjscall api/v1/hello get");
  return;
}

var method = process.argv[3];
if(!method){
  method = 'GET';
}

var filepath = "./tmp/routes/" + path + "/" + method.toLowerCase() + '.js';
var caller = require(filepath);

console.log("Calling Method.");
console.log("-----Log Output------");
var r = caller.handler();
console.log("-----Response------");
console.log(r);