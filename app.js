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
  FormController.$inject = ["$scope"];
  function FormController($scope) {

    // Store all form data in this object:
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
      alert('Awesome!');
    };

  }

//////////////////////////////////////////////////
})();
