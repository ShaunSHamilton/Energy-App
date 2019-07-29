let elecCon = document.getElementById("electricity-consumption").innerHTML;
let gasCon = document.getElementById("gas-consumption").innerHTML;

function update() {
    elecCon = 30;
    gasCon = 10;
}

document.getElementById("testBt").addEventListener("click", () => {
    update();
})

// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}