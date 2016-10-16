
JointJS.Router({
  api: {
    v1: {
      hello: {
        'get': 'WelcomeController',
        'post': 'WelcomeController'
      }
    }
  }
});