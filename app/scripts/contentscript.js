chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'tab switched' && request.url.indexOf('https://liferay-support.zendesk.com/agent/tickets/') == 0) {
            console.log(request.url);

            const currentURL = window.location.href;
            const ticketID = currentURL.substr(currentURL.lastIndexOf('/') + 1);
        }
    });


/*$(window).bind("load", function() {
    builder();
});*/