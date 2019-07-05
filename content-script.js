// Because all browsers' clipboard operation APIs lack advanced featurs,
// here I won't do anything to modify the clipboard data
// only transfer a global variable hodling the source URL just like Microsoft OneNote does.
// and this variable is pure string and is gbobal as window.purl, which means easy to use.

let purl;

// document.oncopy = ""; // Do nothing to the pages' own script

document.oncopy = function (ev) {
    let msg = { purl: window.location.href };
    purl = msg.purl;
    browser.runtime.sendMessage(msg);
    console.log('purl sent 1---> @' + new Date());

    // let oldData = '';
    // navigator.clipboard.readText().then(data => {
    //     oldData = data;
    //     console.log('purl=??', purl);
    //     let newData = [
    //         oldData,
    //         '<a href="',
    //         purl,
    //         '">from:',
    //         purl,
    //         '</a>'
    //     ].join('');
    //     console.log(newData);
    //     navigator.clipboard.writeText(newData);
    // });
};

// receive the purl value from the background script, which has been updated from any other copy operations in any tabs inside the browser window.

browser.runtime.onMessage.addListener(msg => {
    purl = msg.purl;
    window.wrappedJSObject.purl = cloneInto( //public and update the global variable.
        purl,
        window,
        { cloneFunctions: false }
    );
    console.log('window.purl updated.');
    // eval('console.log("New global value arrived! window.purl = ", purl);');
});


// all the following codes are deprecated as a earlier try.

// document.onpaste = ev => {
//     // let d = ev.clipboardData.getData('text/html');
//     // d += purl;
//     // // ev.clipboardData.setData('text/html',d);
//     // ev.clipboardData.items.push(purl);
//     // // navigator.clipboard.writeText(d);
//     // console.dir(ev.clipboardData);
//     });
// };

//port mode
// document.oncopy = "";

// let oncopy = ev => {
//     // event.stopImmediatePropagation();
//     // event.preventDefault();
//     console.log('xcopy!');
//     myPort.postMessage({ url: window.location.href, action: 'upload' });
// };

// document.oncopy = oncopy;

// document.onpaste = ev => {
//     myPort.postMessage({ action: 'download' }).then(res => {
//         console.log(res);
//     });
// };