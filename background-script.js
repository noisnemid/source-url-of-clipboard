// background-script.js

//just forward the url to public
browser.runtime.onMessage.addListener(msg => {
    browser.tabs.query({ currentWindow: true }).then(tabs => {
        for (t of tabs) {
            // console.dir(t);
            // message can be filtered by tab title or url
            // if(t.url.match...etc)
            browser.tabs.sendMessage(t.id, msg)
                .then(res => {
                    console.dir(res);
                })
                .catch(err => {
                    console.error(err);
                }
                );
        }
        console.log(msg.purl, 'forwarded.');
    });
});
