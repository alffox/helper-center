chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'tab switched' && request.url.indexOf('https://liferay-support.zendesk.com/agent/tickets/') == 0) {
            console.log(request.url);

            const currentURL = window.location.href;
            const ticketID = currentURL.substr(currentURL.lastIndexOf('/') + 1);
            const ticketURL = "https://liferay-support.zendesk.com/api/v2/tickets/" + ticketID + ".json";
            const customerURL = "https://help.liferay.com/hc/en-us/requests/" + ticketID;

           $.ajax({
                url: `${ticketURL}`,
                method: "GET",
                error: function() {
                    console.log("error");
                },
                success: function(data) {
                    console.log(data);
                }
            });
        }
    });


/*$(window).bind("load", function() {
    builder();
});*/