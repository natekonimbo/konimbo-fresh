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

    // fetch upcoming
    if (ENV === 'production') {
        $http.get("/tickets/328122").then(function(response) {
            $scope.ticketsList = response.data.data;
        });
        // $scope.ticketsList = dataService.getTickets(328122)
    } else {
        $scope.ticketsList = _fetchFakeData()
    }

    // fetch tasks
    if (ENV === 'production') {
        // $scope.ticketsList = fetchDataService.tickets()
    } else {
        $scope.ticketsList = _fetchFakeData()
    }

    function _fetchFakeData() {
        $http.get("test/fake_data.json").then(function(response) {
            return response.data;
        });
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
                    console.log($http.pendingRequests[0].url);
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
        restrict: 'E',
        controller: 'TicketsController',
        scope: {
            ticketstitle: '@',
            ticketsList: '@'
        },
        templateUrl: 'templates/tickets_wrapper.html',
        link: function(scope, element, attribute) {
            console.log(scope.ticketstitle);
        }
    }
});

/**
 * footer directive
 */
app.directive('footer', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/footer.html'
    }
});

/**
 * footer directive
 */
app.directive('sideNav', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/sidenav.html'
    }
});