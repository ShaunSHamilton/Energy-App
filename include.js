function includeHTML() {
    let z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                        sidebarColour();
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

function sidebarColour() {
    let page = document.getElementsByTagName('a');
    let currentURL = window.location.href;
    console.log(page, currentURL);
    for (let tag of page) {
        console.log(tag.href);

        if ((tag.href == currentURL) && (tag.className.includes('bar-item button padding'))) {
            tag.className = 'bar-item button padding blue';
            console.log(tag.href, tag.className);
        } else {
            tag.className = 'bar-item button padding';
        }
    }
}

includeHTML();