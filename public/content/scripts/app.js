var app = angular.module('konimbo_freshdesk_app', []),
    ENV_DEV = false;

app.controller('TicketsController', function($scope, $http) {
    $scope.titleLimit = 10;
    $scope.letterLimit = 30;
    // fetch upcoming
    if (!ENV_DEV) {
        $http.get("/upcoming").then(function(response) {
            $scope.ticketsList = response.data.data;
        });
    } else {
        $http.get("test/fake_data.json").then(function(response) {
            console.log(response);
            $scope.ticketsList = response.data;
        });
    }
    // fetch tasks
    if (!ENV_DEV) {
        $http.get("/tasks").then(function(response) {
            $scope.tasksList = response.data.data;
        });
    } else {
        
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
        link: function(scope, elm, attr) {},
        scope: {
            ticket: '=ticket'
        },
        templateUrl: 'templates/ticket.html'
    };
});

/**
 * tickets wrapper directive
 * @type {String}
 */
app.directive('ticketsWrapper', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/tickets_wrapper.html'
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