var app = angular.module('konimbo_freshdesk_app', []);

app.controller('TicketsController', function($scope, $http) {
    $scope.titleLimit = 10;
    $scope.letterLimit = 30;
    // fetch upcoming
    $http.get("/upcoming").then(function(response) {
        // expose to scope
        $scope.ticketsList = response.data.data;
    });
    // fetch tasks
    $http.get("/tasks").then(function(response) {
        // expose to scope
        $scope.tasksList = response.data.data;
    });
});

// $http request loader
app.directive('loading', [
    '$http',
    function($http) {
        return {
            restrict: 'E',
            template: '<div class="loading-spiner"></div>',
            link: function($scope, $element, $attributes) {
                $scope.loadingOverlay = false;
                $scope.isLoading = function() {
                    return $http.pendingRequests.length > 0;
                };
                $scope.$watch($scope.isLoading, function(isLoading) {
                    $scope.loadingOverlay = isLoading;
                });
            }
        };
    }
]);