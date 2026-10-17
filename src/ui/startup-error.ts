/** Remains in the entry bundle so a missing application chunk has a usable fallback. */
export function showStartupError(document: Document, location: Location) {
  const english = new URL(location.href).searchParams.get('lang') === 'en';
  const workspace = document.getElementById('workspace');
  if (!workspace) return;
  document.documentElement.lang = english ? 'en' : 'fi';
  workspace.replaceChildren();
  const error = document.createElement('div');
  error.className = 'card';
  error.setAttribute('role', 'alert');
  const title = document.createElement('h2');
  title.textContent = english
    ? 'The demo could not start'
    : 'Demo ei käynnistynyt';
  const message = document.createElement('p');
  message.textContent = english
    ? 'Reload the page to try again. No information was sent.'
    : 'Lataa sivu uudelleen. Mitään tietoja ei lähetetty.';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'primary-button';
  button.textContent = english ? 'Reload the page' : 'Lataa sivu uudelleen';
  button.addEventListener('click', () => location.reload());
  error.append(title, message, button);
  workspace.append(error);
}
