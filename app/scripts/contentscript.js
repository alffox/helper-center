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
                    const LESAlikeFormat = accountCode + "-" + ticketID;
                    const projectInfoURL = "https://customer.liferay.com/project-details?p_p_id=com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet_mvcRenderCommandName=/view_account_entry&_com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet_redirect=https://customer.liferay.com/project-details?p_p_id=com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet_cur=1&_com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet_delta=20&_com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet_keywords=carrefour&_com_liferay_osb_customer_account_entry_details_web_AccountEntryDetailsPortlet_accountEntryId=" + OSBKey;

                    $("#helper-center").remove();
                    $(".app_container").prepend('<div id="helper-center" style="display: block; order: 9999;"><div class="LRbl LRbm LRbn LRbo LRbp LRbq LRat LRbr LRbs"><div class="app_view_outer" style="display: block;"><div class="iframe_app_view_wrapper"><header class="app_header"><img class="logo" src="https://raw.githubusercontent.com/alffox/helper-center/master/app/images/icon-32.png?sanitize=true"><h3 class="title">Helper Center</h3></header><div class="app_view_wrapper"><div class="app_view apps_ticket_sidebar box">\
                        <div>Account Code: <span>' + accountCode + '</span></div><br>\
                        <a href="' + patcherURL + '" target="_blank">Go to Project on Patcher Portal >></a><br><br>\
                        Internal URL: <a href="' + currentURL + '" target="_blank">' + currentURL + '</a><br><br>\
                        Customer\'s URL: <a href="' + customerURL + '" target="_blank">' + customerURL + '</a><br><br>\
                        <a href="' + projectInfoURL + '" target="_blank">Go to Project details >></a><br><br>\
                        <div>LESA-like ticket name: <span>' + LESAlikeFormat + '</span></div><br>\
                        </div></div></div></div></div></div>');
                }
            });
        }
    });


/*$(window).bind("load", function() {
    builder();
});*/