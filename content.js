(() => {
    const dates = getDataFromElement(".data-wrapper > div").map((string) =>
        string.substring(0, 10)
    );
    const descriptions = getDataFromElement(".description-wrapper > div").map(
        (text) => text.replace("\n    \n\n ", "").replace(/\s{2,}/g, " ")
    );
    const amounts = getDataFromElement(
        ".amount-wrapper:not(.balance-wrapper) > div"
    ).map((amount) => amount.replace(",", "."));

    const csvContent = convertToCSV([dates, descriptions, amounts]);

    downloadCSV(csvContent);
    function getDataFromElement(el) {
        return Array.from(document.querySelectorAll(el)).map(
            (element) => element.textContent
        );
    }

    function convertToCSV(dataArrays) {
        const headers = ["Data", "Descrição", "Montante"];
        const rows = [headers];

        const rowsLength = Math.max(...dataArrays.map((arr) => arr.length));

        for (let i = 0; i < rowsLength; i++) {
            const row = dataArrays.map((arr) => arr[i]);
            rows.push(row);
        }
        return rows.map((row) => row.join(",")).join("\n");
    }

    function downloadCSV(csvContent) {
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "myedenred.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
})();
