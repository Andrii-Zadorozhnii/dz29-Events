// Get the text container and create a new textarea
var textContainer = document.getElementById("text-container");
var textarea = document.createElement("textarea");

// When Ctrl+E is pressed, replace the div with a textarea
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        textarea.value = textContainer.innerText;
        textContainer.replaceWith(textarea);
    }
});

// When Ctrl+S is pressed inside the textarea, replace the textarea with a div
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "s" && textarea.parentNode !== null) {
        event.preventDefault();
        textContainer.innerText = textarea.value;
        textarea.replaceWith(textContainer);
    }
});



//*************************************************************
function sortTable(column) {
    var table = document.getElementById("myTable");
    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody > tr'));

    rows.sort(function (rowA, rowB) {
        var cellA = rowA.cells[column].textContent.trim();
        var cellB = rowB.cells[column].textContent.trim();

        // перевіряємо, якщо значення у стовпці числове
        if (!isNaN(cellA) && !isNaN(cellB)) {
            return cellA - cellB;
        } else {
            return (cellA > cellB) ? 1 : -1;
        }
    });

    // змінюємо порядок рядків у таблиці
    for (var i = 0; i < rows.length; i++) {
        table.querySelector('tbody').appendChild(rows[i]);
    }
}

//*************************************************************

const block = document.getElementById("block");
let isResizing = false;
let lastX = 0;
let lastY = 0;

block.addEventListener("mousedown", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const width = parseInt(getComputedStyle(block, null).getPropertyValue("width"));
    const height = parseInt(getComputedStyle(block, null).getPropertyValue("height"));

    if (width - x < 10 && height - y < 10) { // if mouse click near bottom-right corner
        lastX = x;
        lastY = y;
        isResizing = true;
    }
});

block.addEventListener("mousemove", (event) => {
    if (isResizing) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        const width = parseInt(getComputedStyle(block, null).getPropertyValue("width"));
        const height = parseInt(getComputedStyle(block, null).getPropertyValue("height"));
        block.style.width = `${width + dx}px`;
        block.style.height = `${height + dy}px`;
        lastX = event.clientX;
        lastY = event.clientY;
    }
});

block.addEventListener("mouseup", () => {
    isResizing = false;
});