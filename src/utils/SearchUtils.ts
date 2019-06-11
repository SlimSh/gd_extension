export default {
    handleOmnibox: (a) => {
        return new Promise(function(b) {
            Browser.addOmniBoxInputListener(function(c) {
                var d = a.searchUrl + c;
                BrowserTabs.queryTabs({
                    currentWindow: !0,
                    active: !0
                }, function(a) {
                    BrowserTabs.updateTab(a[0].id, d, !0);
                    b(c)
                })
            })
        })
    }
}