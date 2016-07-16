angular.module('myService', [])
.factory("services", ['$http','$rootScope','$timeout', function ($http,$rootScope,$timeout) {
    var serviceBase = 'http://jsonplaceholder.typicode.comT/'
    var obj = {};
    obj.getCustomers = function () {
        return $http.get(serviceBase + 'users');
    }

    obj.getCustomer = function (userId) {
        return $http.get(serviceBase + 'users?id=' + userId)
    }

    obj.insertCustomer = function (customer) {
        return $http.post(serviceBase + 'users', customer).then(function (response) {
            $rootScope.message.success = true;
            $timeout(function () {
                $rootScope.message.success = false;
            }, 3000);
            console.log('Success');
            return response.data;
        }, function (response) {
            console.log("fail");
        });
    };

    obj.updateCustomer = function (id, user) {
        return $http.put(serviceBase + 'users/' + id, { id: id, data: user }).then(function (response) {
            $rootScope.message.success = true;
            $timeout(function () {
                $rootScope.message.success = false;
            }, 3000);
            console.log('Success');
            return response.data;
        }, function (response) {
            console.log("fail");
        });
    };

    obj.deleteCustomer = function (id) {
        return $http.delete(serviceBase + 'users/' + id).then(function (response) {
            $rootScope.message.success = true;
            $timeout(function () {
                $rootScope.message.success = false;
            }, 3000);
            console.log('Success');
            console.log('Success')
            return response.data;
        }, function (response) {
            console.log("fail");
        });
    };

    obj.getUserPosts = function (id) {
        return $http.get(serviceBase+'posts?userId='+ id)
    }
    
    return obj;
}]);