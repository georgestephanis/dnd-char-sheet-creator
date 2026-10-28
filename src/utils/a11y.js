// Keyboard activation for non-button elements that act as buttons (role="button").
// Enter and Space trigger the element's own click handler.
export function activateOnKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    e.currentTarget.click();
  }
}
