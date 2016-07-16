
angular.module('mainmodule', []);
angular.module('mainmodule')
.controller('mainModuleController', ['$scope', 'services', function ($scope, services) {
    services.getCustomers().then(function (data) {
        $scope.users = data.data;
    }, function (response) { console.log('some error')});
}])
