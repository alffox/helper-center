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
                    const accountCode = data.ticket.fields[4].value;
                    const OSBKey = data.ticket.custom_fields[1].value;
                    const patcherURL = "https://patcher.liferay.com/group/guest/patching/-/osb_patcher/accounts/view?_1_WAR_osbpatcherportlet_patcherBuildAccountEntryCode=" + accountCode;
                }
            });
        }
    });


/*$(window).bind("load", function() {
    builder();
});*/