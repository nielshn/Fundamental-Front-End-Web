class GetArchiveButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        /* Style untuk tombol get archive */
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }
      </style>
      <button id="getArchiveButton">Get Archived Notes</button>
    `;
    shadow.appendChild(template.content.cloneNode(true));

    // Menambahkan event listener untuk menampilkan catatan yang telah diarsipkan saat tombol diklik
    const getArchiveButton = this.shadowRoot.getElementById('getArchiveButton');
    getArchiveButton.addEventListener('click', () => {
      const archivedNotesElement = document.createElement('get-archive-notes');
      document.body.appendChild(archivedNotesElement);
    });
  }
}

customElements.define('get-archive-button', GetArchiveButton);
