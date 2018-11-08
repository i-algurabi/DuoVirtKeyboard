// Saves options to chrome.storage
function save_options() {
    settings.apply = document.getElementById('apply').checked;
    settings.show = document.getElementById('show').checked;
    saveToLocalStorage("settings", settings);
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
        status.textContent = '';
    }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    var settings = getFromLocalStorage("settings");
    document.getElementById('apply').checked = settings.apply;
    document.getElementById('show').checked = settings.show;
}

function saveToLocalStorage(parameter, value) {
    if (window.localStorage !== undefined) {
        var localStorage = window.localStorage;
        localStorage["keyboard." + parameter] = JSON.stringify(value);
        return true;
    }
    return false;
}

function getFromLocalStorage(parameter) {
	return virtKeyboard.getFromLocalStorage(parameter);
    if (window.localStorage !== undefined) {
        var localStorage = window.localStorage;
        var status = document.getElementById('status');
        var str = "";
        for (var z in localStorage) {
            str += z + ":" + localStorage[z] + "\n";
        }
	//str += "</pre>";
        status.textContent = str;
        var param = localStorage["keyboard." + parameter];
        if (param)
            console.info(param);
        return JSON.parse(param);
    }
    return false;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);