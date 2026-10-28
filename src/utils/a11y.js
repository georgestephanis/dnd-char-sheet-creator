// Keyboard activation for non-button elements that act as buttons (role="button").
// Enter and Space trigger the element's own click handler, once per key press.
export function activateOnKey(e) {
  if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
  e.preventDefault();
  // Holding a key auto-repeats keydown; a native button activates only once
  if (e.repeat) return;
  e.currentTarget.click();
}
