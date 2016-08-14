(function() {
  'use strict';

  angular
    .module('formApp', [
      // Third party modules
      'ngAnimate',
      'ui.router'
    ])
    .controller('FormController', FormController)
    .config(configFunction);


//////////////////////////////////////////////////

  // configuring our routes
  configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configFunction($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('form', {
        url: '/form',
        templateUrl: 'form.html',
        controller: 'FormController'
      })

      .state('form.profile', {
        url: '/profile',
        templateUrl: 'form-profile.html'
      })

      .state('form.interests', {
        url: '/interests',
        templateUrl: 'form-interests.html'
      })

      .state('form.payment', {
        url: '/payment',
        templateUrl: 'form-payment.html'
      });

    // catch all route and send users to the form page
    $urlRouterProvider.otherwise('/form/profile');
  }


//////////////////////////////////////////////////
  FormController.$inject = ['$scope', '$http'];
  function FormController($scope, $http) {

    // Store all form data in this object:
    $scope.formData = {};

    // function to process the form
    $scope.submitForm = function(isValid) {
      $scope.submitted = true;
      // check to make sure that the form is completely valid
      if(isValid){
        $http({
          method: 'POST',
          url: 'process.php',
          data: $.param($scope.formData),   // pass in data as strings
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .then(function success(data) {
          console.log(data);
          if(!data.success) {
            // If not successful, bind errors to error variables
            $scope.errorName = data.errors.name;
            $scope.errorSuperhero = data.errors.superheroAlias;
          } else {
            // if successful, bind success message to message
            $scope.message = data.message;
          }
        });
      }
    };
  }

//////////////////////////////////////////////////
})();
