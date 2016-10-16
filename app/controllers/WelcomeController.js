
class WelcomeController extends JointJSController {

  get(){
    console.log("GET!!!!");
    return {
      method: 'GET',
      status: 'success'
    };
  }

  post(){
    console.log("POST!!!");
    return {
      method: 'POST',
      status: 'success'
    };
  }
}