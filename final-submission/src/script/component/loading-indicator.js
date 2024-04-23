function showLoadingIndicator() {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}
class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .spinner-container {
          display: grid;
          place-items: center;
          height: 100%;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 8px solid #3498db;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
export { showLoadingIndicator, hideLoadingIndicator }