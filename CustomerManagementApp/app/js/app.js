angular.module('myApp', ['ngRoute', 'mainmodule','addedit','myService'])
.config(['$routeProvider','$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        title: 'Customers',
        templateUrl: 'modules/main/views/customers.html',
        controller: 'mainModuleController'
      })
      .when('/edit-customer/:userId', {
        title: 'Edit Customers',
        templateUrl: 'modules/addedit/views/addedit.html',
        controller: 'addEditController',
        resolve: {
            user: function (services, $route) {
                var obj = {};
                if (userId > 0) {
                    var userId = $route.current.params.userId;
                    return services.getCustomer(userId);
                } else return obj;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode(true);
  }])
.run(['$rootScope', function ($rootScope) {
    $rootScope.message = {success:false,error:false}
}])