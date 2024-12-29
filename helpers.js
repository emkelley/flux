/**
 * Helper functions for the Flux mod
 */

/**
 * Dispatches an HTML event on a target element
 * @param {HTMLElement} target - The target element to dispatch the event on
 * @param {string} type - The type of event to dispatch (e.g. 'click')
 */
function dispatchEvent(target, type) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  if (target) {
    target.dispatchEvent(e);
  }
}

/**
 * Updates the status text and classes of a button
 * @param {HTMLElement} button - The button element to update
 * @param {boolean} status - The new status (true for on, false for off)
 */
function setButtonStatus(button, status) {
  const statusTextEl = button.getElementsByClassName("flux-status-text")[0];
  if (!statusTextEl) return;

  statusTextEl.classList.remove(status ? "flux-status-off" : "flux-status-on");
  statusTextEl.classList.add(status ? "flux-status-on" : "flux-status-off");
  statusTextEl.innerHTML = status ? "ON" : "OFF";
}

/**
 * Sets up a button with text and click handler
 * @param {HTMLElement} button - The button element to set up
 * @param {string} text - The button text
 * @param {Function} eventCallback - The click event callback
 * @param {Object} context - The context to bind the callback to
 */
function setButtonProps(button, text, eventCallback, context) {
  button.className = "flux-button";

  const textEl = document.createElement("p");
  textEl.className = "flux-button-text font-merriweather text-center";
  textEl.innerHTML = text.trim();

  const statusTextEl = document.createElement("p");
  statusTextEl.innerHTML = "OFF";
  statusTextEl.className = "flux-status-text flux-status-off text-center font-black";

  button.addEventListener("click", eventCallback.bind(context));
  button.appendChild(textEl);
  button.appendChild(statusTextEl);
}

// Export the helpers as a global object
window.FluxHelpers = {
  dispatchEvent,
  setButtonStatus,
  setButtonProps,
};
