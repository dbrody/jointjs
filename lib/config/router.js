
var fsp = require('fs-promise');
var shelljs = require('shelljs');

function Router(routes){
  var here = fsp.readdirSync('./');
  
  var routeList = [];
  function RouterDive(obj, pre, path){
    if(typeof obj === 'object'){
      Object.keys(obj).forEach( key => {
        RouterDive(obj[key], pre + '  ', path + '.' + key);
      });
    } else {
      routeList.push({
        path: path,
        obj: obj
      });
    }
  }

  RouterDive(routes, '', 'routes');
  
  routeList.forEach(route => {
    var path = route.path.replace(/\./g, '/');
    var depth = (path.match(/\//g) || []).length;
    var prefix = Array(depth + 1).join('../');
    var pathname = path.split('/').slice(-1)[0].toLowerCase();
    var pathdir = './tmp/' + path.split('/').slice(0, -1).join('/');
    shelljs.mkdir('-p', pathdir);



    var CallerContents = "" +
      "let c = require('" + prefix + "controllers/" + route.obj + ".js');\n" +
      "exports.handler = function(event, context) {\n" +
      "  return (new c())."+pathname + "();\n" +
      "};\n" +
      "module.exports = exports;";

    var file = pathdir + "/" + pathname + ".js";
    fsp.writeFileSync(file, CallerContents);
    console.log("  + " + pathname.toUpperCase() + ": " + path.split('/').slice(1, -1).join('/'));

  })  

  return routes;
};

module.exports = Router;