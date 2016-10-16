

function JointJSControllerWrapper(n){
  function Wrapper(c){
    return c;
    var m = {};
    m[n] = c;
    return m;
  };
  return Wrapper;
}

module.exports = JointJSControllerWrapper;