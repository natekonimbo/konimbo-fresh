var app = angular.module('konimbo_freshdesk_app', []),
    ENV_DEV = true;

app.controller('TicketsController', function($scope, $http) {
    $scope.titleLimit = 10;
    $scope.letterLimit = 30;
    // fetch upcoming
    if (!ENV_DEV) {
        $http.get("/upcoming").then(function(response) {
            $scope.ticketsList = response.data.data;
        });
    } else {
        $scope.ticketsList = getFakeData();
    }
    // fetch tasks
    if (!ENV_DEV) {
        $http.get("/tasks").then(function(response) {
            $scope.tasksList = response.data.data;
        });
    } else {
        $scope.tasksList = getFakeData();
    }
});

// $http request loader
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

// tickets directive
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

function getFakeData() {
    return [
        {
            "associates_rdb": null,
            "association_type": null,
            "cc_email": {
                "cc_emails": [
                    "eli@konimbo.co.il", "oliya@konimbo.co.il"
                ],
                "fwd_emails": [],
                "bcc_emails": [],
                "reply_cc": ["eli@konimbo.co.il"],
                "tkt_cc": []
            },
            "created_at": "2017-01-03T11:05:59+02:00",
            "deleted": false,
            "delta": true,
            "description": "הניוזלטר הגיע רק ל 1800 מתוך 16000 נמענים. \n   \n בדחיפות יתרה.. \n   \n דיברתי עם דור ב 11:00 ב 3.1.17",
            "description_html": "<div dir=\"rtl\">\n<div>הניוזלטר הגיע רק ל 1800 מתוך 16000 נמענים.</div>\n<div><br></div>\n<div>בדחיפות יתרה..</div>\n<div><br></div>\n<div>דיברתי עם דור ב 11:00 ב 3.1.17</div>\r\n</div>",
            "dirty": 0,
            "display_id": 66053,
            "due_by": "2017-01-10T11:05:59+02:00",
            "email_config_id": null,
            "frDueBy": "2017-01-04T11:05:59+02:00",
            "fr_escalated": false,
            "group_id": 4000006549,
            "id": 4058610570,
            "internal_agent_id": null,
            "internal_group_id": null,
            "isescalated": false,
            "owner_id": 4000185716,
            "parent_ticket_id": null,
            "priority": 1,
            "requester_id": 4018106666,
            "responder_id": 4018106975,
            "sl_escalation_level": null,
            "sl_manual_dueby": null,
            "sl_merge_parent_ticket": null,
            "sl_product_id": null,
            "sl_skill_id": null,
            "sl_sla_policy_id": null,
            "sla_state": 0,
            "source": 2,
            "spam": false,
            "st_survey_rating": null,
            "status": 23,
            "subject": "ניוזלטר שנשלח ב 2.1.17 ותוקפו עד 10.1.17 - ספורט דיפו ",
            "ticket_type": null,
            "to_email": null,
            "trained": false,
            "updated_at": "2017-01-09T09:22:33+02:00",
            "urgent": false,
            "status_name": "צד שרת - תקלות פרוססינג ",
            "requester_status_name": "הכרטיס בבדיקה בפיתוח",
            "priority_name": "נמוך",
            "source_name": "פורטל",
            "requester_name": "איל אינסל",
            "responder_name": "דור שיטרית",
            "to_emails": null,
            "product_id": null,
            "custom_field": {
                "יוצר_הכרטיס_54477": "דור"
            }
        }, {
            "associates_rdb": null,
            "association_type": null,
            "cc_email": {
                "cc_emails": [],
                "fwd_emails": [],
                "bcc_emails": [],
                "reply_cc": [],
                "tkt_cc": []
            },
            "created_at": "2017-01-08T10:20:44+02:00",
            "deleted": false,
            "delta": true,
            "description": "איתן בוקר טוב,\r\n\r\nבהמשך לשיחתנו מהבוקר\r\n\r\nא. אבקש להסיר את המייל niznaz@gmail.com מרשימת  הלקוחות שלנו,\r\n\r\nהנ\"ל טוען שנשלחו אליו 2 מיילים מאותם שרתים והוא מעולם לא נכנס לאתר שלנו ולא\r\nנרשם , והוא העביר מכתב לפני תביעה ,,ונתן לנו שבוע חשוב לי לדעת איך הוא הגיע\r\nלרשימת התפוצה שלנו?\r\nבמייל נוסף אשלח לכם את ההתקשרות שלו איתנו.\r\n\r\nבבקשה אבקש את טיפולכם המיידי ועדכונכם\r\n\r\nבברכה\r\n\r\nדורית פתאי-מולקולה פרפיום\r\n",
            "description_html": "<div dir=\"rtl\">איתן בוקר טוב,<div><br></div>\n<div>בהמשך לשיחתנו מהבוקר</div>\n<div><br></div>\n<div>א. אבקש להסיר את המייל <a href=\"mailto:niznaz@gmail.com\" rel=\"noreferrer\">niznaz@gmail.com</a> מרשימת  הלקוחות שלנו,</div>\n<div><br></div>\n<div>הנ\"ל טוען שנשלחו אליו 2 מיילים מאותם שרתים והוא מעולם לא נכנס לאתר שלנו ולא נרשם , והוא העביר מכתב לפני תביעה ,,ונתן לנו שבוע חשוב לי לדעת איך הוא הגיע לרשימת התפוצה שלנו? </div>\n<div>במייל נוסף אשלח לכם את ההתקשרות שלו איתנו.</div>\n<div><br></div>\n<div>בבקשה אבקש את טיפולכם המיידי ועדכונכם</div>\n<div><br></div>\n<div>בברכה</div>\n<div><br></div>\n<div>דורית פתאי-מולקולה פרפיום</div>\n</div>\r\n",
            "dirty": 0,
            "display_id": 66370,
            "due_by": "2017-01-15T10:20:44+02:00",
            "email_config_id": 67766,
            "frDueBy": "2017-01-09T10:20:44+02:00",
            "fr_escalated": false,
            "group_id": 187730,
            "id": 4058908602,
            "internal_agent_id": null,
            "internal_group_id": null,
            "isescalated": false,
            "owner_id": null,
            "parent_ticket_id": null,
            "priority": 1,
            "requester_id": 4019343007,
            "responder_id": null,
            "sl_escalation_level": null,
            "sl_manual_dueby": null,
            "sl_merge_parent_ticket": null,
            "sl_product_id": null,
            "sl_skill_id": null,
            "sl_sla_policy_id": null,
            "sla_state": 0,
            "source": 1,
            "spam": false,
            "st_survey_rating": null,
            "status": 23,
            "subject": "הסרת מייל מרשימת הלקוחות שלנו -מולקולה פרפיום",
            "ticket_type": null,
            "to_email": "konimbocoilsupport@konimbo.freshdesk.com",
            "trained": false,
            "updated_at": "2017-01-08T16:48:19+02:00",
            "urgent": false,
            "status_name": "צד שרת - תקלות פרוססינג ",
            "requester_status_name": "הכרטיס בבדיקה בפיתוח",
            "priority_name": "נמוך",
            "source_name": "דוא\"ל",
            "requester_name": "דניאל",
            "responder_name": "No Agent",
            "to_emails": ["support@konimbo.co.il"],
            "product_id": null,
            "custom_field": {
                "יוצר_הכרטיס_54477": null
            }
        }
    ];
}