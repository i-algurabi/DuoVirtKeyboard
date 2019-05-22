var tools = {
  "getLocalStorage": function(sync) {
    /** @namespace chrome.storage */
    /** @namespace chrome.storage.sync */
    if (sync && chrome && chrome.storage)
      return chrome.storage.sync;
    if (window.localStorage)
      return window.localStorage;

    return null;
  },
  "saveToLocalStorage": function(parameter, value) {
    let localStorage = userInfo.tools.getLocalStorage(true);
    if (localStorage) {
      localStorage["keyboard." + parameter] = JSON.stringify(value);
      return true;
    }
    return false;
  },
  "clearLocalStorage": function(parameter) {
    let localStorage = userInfo.tools.getLocalStorage(true);
    if (localStorage) {
      localStorage.removeItem("keyboard." + parameter);
      return true;
    }
    return false;
  },
  "getFromLocalStorage": function(parameter) {
    let localStorage = userInfo.tools.getLocalStorage(true);
    if (localStorage) {
      let param = localStorage["keyboard." + parameter];
      if (param)
        return JSON.parse(param);
    }
    return false;
  }
}
// Saves options to chrome.storage
function save_options() {
  settings.apply = document.getElementById('apply').checked;
  settings.show = document.getElementById('show').checked;
  tools.saveToLocalStorage("settings", settings);
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  var settings = tools.getFromLocalStorage("settings");
  document.getElementById('apply').checked = settings.apply;
  document.getElementById('show').checked = settings.show;
  document.getElementById('stringify').innerText = JSON.stringify(settings);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
