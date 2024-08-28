document.addEventListener('DOMContentLoaded', function() {
    // Initially disable buttons
    toggleButtons(false);

    // Add event listener to enable buttons when input is detected
    document.getElementById('jsonInput').addEventListener('input', function() {
        const inputContent = this.value.trim();
        if (inputContent) {
            toggleButtons(true);
        } else {
            toggleButtons(false);
        }
    });

    // Ensure the scientific buttons are hidden initially
    document.getElementById('scientific-buttons').style.display = 'none';
});

function formatJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const formattedJSON = JSON.stringify(jsonObject, null, 4);
        document.getElementById('jsonOutput').textContent = formattedJSON;
        document.getElementById('jsonOutput').style.color = "#ffffff";
        document.getElementById('jsonOutput').setAttribute('data-valid', 'true');
        document.getElementById('jsonOutput').setAttribute('data-json', formattedJSON);
    } catch (e) {
        document.getElementById('jsonOutput').textContent = "Invalid JSON:\n" + e.message;
        document.getElementById('jsonOutput').style.color = "#ff4f4f";
        document.getElementById('jsonOutput').setAttribute('data-valid', 'false');
        document.getElementById('jsonOutput').removeAttribute('data-json');
    }
}

function compactJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        const compactJSON = JSON.stringify(jsonObject);
        document.getElementById('jsonOutput').textContent = compactJSON;
        document.getElementById('jsonOutput').style.color = "#ffffff";
        document.getElementById('jsonOutput').setAttribute('data-valid', 'true');
        document.getElementById('jsonOutput').setAttribute('data-json', compactJSON);
    } catch (e) {
        document.getElementById('jsonOutput').textContent = "Invalid JSON:\n" + e.message;
        document.getElementById('jsonOutput').style.color = "#ff4f4f";
        document.getElementById('jsonOutput').setAttribute('data-valid', 'false');
        document.getElementById('jsonOutput').removeAttribute('data-json');
    }
}

function validateJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        JSON.parse(jsonInput);
        document.getElementById('jsonOutput').textContent = "Valid JSON";
        document.getElementById('jsonOutput').style.color = "#00ff00";
        document.getElementById('jsonOutput').setAttribute('data-valid', 'true');
        document.getElementById('jsonOutput').setAttribute('data-json', jsonInput);
    } catch (e) {
        document.getElementById('jsonOutput').textContent = "Invalid JSON:\n" + e.message;
        document.getElementById('jsonOutput').style.color = "#ff4f4f";
        document.getElementById('jsonOutput').setAttribute('data-valid', 'false');
        document.getElementById('jsonOutput').removeAttribute('data-json');
    }
}

function clearJSON() {
    document.getElementById('jsonInput').value = "";
    document.getElementById('jsonOutput').textContent = "";
    document.getElementById('jsonOutput').setAttribute('data-valid', 'false');
    document.getElementById('jsonOutput').removeAttribute('data-json');
    toggleButtons(false);  // Disable buttons after clearing the input
}

function showNotification(message, color = "#00ff00") {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.color = color;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Function to copy JSON output to clipboard when clicked
document.getElementById('jsonOutput').addEventListener('click', function() {
    const isValid = document.getElementById('jsonOutput').getAttribute('data-valid') === 'true';
    const jsonToCopy = document.getElementById('jsonOutput').getAttribute('data-json');
    if (isValid && jsonToCopy) {
        navigator.clipboard.writeText(jsonToCopy).then(() => {
            showNotification('JSON copied to clipboard!');
        }).catch(err => {
            showNotification('Failed to copy', '#ff4f4f');
        });
    } else {
        showNotification('Invalid JSON cannot be copied', '#ff4f4f');
    }
});

// Utility function to enable or disable buttons
function toggleButtons(enable) {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.disabled = !enable;
        button.style.opacity = enable ? 1 : 0.5;  // Visual feedback when buttons are disabled
    });
}
