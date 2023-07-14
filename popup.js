document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("downloadBtn");
    console.log(downloadBtn);
    downloadBtn.addEventListener("click", downloadCSV);
});

function downloadCSV() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
    });
}
