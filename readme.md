```
var url = "https://konimbo.freshdesk.com/helpdesk/tickets/view/328121.json"
  , username = "support@konimbo.co.il"
  , password = "mango7410";
$.ajax({
    url: url,
    method: "GET",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    },
    success: function(d) {
        console.log(d);
    }
})
```
