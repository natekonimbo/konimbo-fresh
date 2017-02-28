'use strict';

var app = angular.module('konimbo_freshdesk_app', ['ngMaterial']),
    ENV = 'production';

/*
 * fetch data service
 */
// app.service('dataService', function($scope, $http, id) {
//     var data = this;
// 
//     data.getTickets = function(id) {
//         $http.get("/tickets/:id").then(function(response) {
//             response.data.data;
//         });
//     }
// 
//     return data;
// });

app.controller('TicketsController', function($scope, $http) {
    // filters
    $scope.titleLimit = 10;
    $scope.letterLimit = 30;

    // fetch tickets
    if (ENV === 'production') {
        _fetchData('328121')
        // $scope.ticketsList = dataService.getTickets(328122)
    } else {
        _fetchFakeData()
    }

    function _fetchFakeData() {
        $http.get("test/fake_data.json").then(function(response) {
            $scope.ticketsList = response.data;
        });
    }

    function _fetchData(id) {
        $scope.ticketsList = null;
        $http.get("/tickets/" + id).then(function(response) {
            $scope.ticketsList = response.data.data;
        });
    }

    $scope.fetchData = function(id) {
        _fetchData(id);
    }
});

/**
 * $http request loader
 * @type {ngDirective}
 */
app.directive('loading', function($http) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/loader.html',
        link: function($scope, $element, $attributes) {
            $scope.loadingOverlay = false;
            $scope.isLoading = function() {
                if ($http.pendingRequests.length > 0) {
                    $element.addClass($http.pendingRequests[0].url);
                }
                return $http.pendingRequests.length > 0;
            };
            $scope.$watch($scope.isLoading, function(isLoading) {
                $scope.loadingOverlay = isLoading;
            });
        }
    };
});

/**
 * tickets directive
 * @type {String}
 */
app.directive('ticket', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ticket: '=ticket'
        },
        templateUrl: 'templates/ticket.html',
        link: function(scope, elm, attr) {}
    };
});

/**
 * tickets wrapper directive
 * @type {String}
 */
app.directive('ticketsWrapper', function() {
    return {
        restrict: 'A',
        controller: 'TicketsController',
        scope: {
            ticketstitle: '@',
            ticketsList: '@'
        },
        templateUrl: 'templates/tickets_wrapper.html',
        link: function(scope, element, attribute) {

        }
    }
});

/**
 * footer directive
 */
app.directive('footer', function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/footer.html'
    }
});

/**
 * header directive
 */
app.directive('header', function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/header.html'
    }
});

/**
 * sidenav directive
 */
app.directive('sidenav', function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/sidenav.html',
        link: function(scope, element, attribute) {
          
        }
    }
});