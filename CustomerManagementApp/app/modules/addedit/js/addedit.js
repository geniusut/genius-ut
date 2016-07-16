angular.module('addedit',[])
.controller('addEditController', ['$scope', '$location', '$routeParams', 'services', 'user',
    function ($scope,  $location, $routeParams, services, user) {

       
        var userId = ($routeParams.userId) ? parseInt($routeParams.userId) : 0;
        $scope.title = (userId > 0) ? 'Edit Customer' : 'Add Customer';
        $scope.buttonText = (userId > 0) ? 'Update Customer' : 'Add New Customer';
        var original = userId > 0 ? (user.data[0] != undefined ? user.data[0] : {}) : {};
        original._id = userId;
        $scope.user = angular.copy(original);
        $scope.user._id = userId;

        $scope.isClean = function () {
            return angular.equals(original, $scope.user);
        }

        $scope.deleteCustomer = function (user) {
            $location.path('/');
            if (confirm("Are you sure to delete customer number: " + $scope.user._id) == true)
                services.deleteCustomer($scope.user._id);
        };

        $scope.saveCustomer = function (user) {
            $location.path('/');
            if (userId <= 0) {
                services.insertCustomer(user);
            }
            else {
                services.updateCustomer(userId, user);
            }
          
        };
    }])

.directive('phoneValidation', function () {
    return {
        restrice: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            ctrl.$validators.phone = function phoneNumberValidator(modelValue) {

                var phone_regex = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}[)]{0,1}$/;
               
                if (phone_regex.test(modelValue)) {
                        ctrl.$setValidity('numberValidator', true);
                    } else {
                        ctrl.$setValidity('numberValidator', false);
                    }
                return modelValue;
            }
        }
    }
})
//.directive('myPosts', function () {
//    return {
//        restrict: 'E',
//        scope:
//            {
//                customerPost: '='
//            },
//        templateUrl: 'modules/addedit/views/CustomerPosts.html'
//    };
//});