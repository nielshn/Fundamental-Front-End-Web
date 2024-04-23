const BASE_URL = 'https://notes-api.dicoding.dev/v2';

document.addEventListener("DOMContentLoaded", function () {
  const notesList = document.getElementById("notes-list");

  const displayNotesFromAPI = async () => {
    try {
      const response = await fetch(`${BASE_URL}/notes`)
      const { data: notes } = await response.json();
      notesList.innerHTML = "";
      notes.forEach((note) => {
        addNoteToList(note);
      });
    } catch (error) {
      console.error('Error:', error);
      showResponseMessage('Failed to fetch notes. Please try again later.');
    }
  }

  function addNoteToList(note) {
    const noteElement = document.createElement("item-catatan");
    noteElement.innerHTML = `
            <h3 slot="title">${note.title}</h3>
            <p slot="body">${note.body}</p>
            <button type="button" class="btn btn-danger button-delete" data-id="${note.id}">Delete</button>
            <button type="button" class="btn btn-secondary button-archive" data-id="${note.id}">Archive</button>
        `;

    // Tambahkan elemen catatan ke dalam notesList
    notesList.appendChild(noteElement);
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-danger');
    alert.textContent = message;
    document.body.appendChild(alert);
  };

  customElements.define(
    "item-catatan",
    class extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const template = document.createElement("template");
        template.innerHTML = `
                    <style>
                        /* Styling untuk item catatan */
                        :host {
                            display: block;
                            background-color: #f0f0f0;
                            border-radius: 8px;
                            padding: 10px;
                            margin-bottom: 10px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            transition: transform 0.2s ease;
                        }

                        :host(:hover) {
                            transform: translateY(-3px);
                        }

                        h3 {
                            margin-top: 0;
                            margin-bottom: 10px;
                        }

                        p {
                            margin: 0;
                        }
                    </style>
                    <div>
                        <h3><slot name="title">Judul Catatan</slot></h3>
                        <p><slot name="body">Isi Catatan</slot></p>
                    </div>
                `;
        shadow.appendChild(template.content.cloneNode(true));
      }
    }
  );

  displayNotesFromAPI();

  // Tangkap event "addNote" yang di dispatch oleh element "input-catatan"
  document.addEventListener("addNote", async function (event) {
    const newNote = event.detail;
    addNoteToList(newNote);
    await displayNotesFromAPI(); // Reload tampilan notes setelah menambahkan catatan baru
  });

  // Tangkap event "click" pada tombol delete
  notesList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("button-delete")) {
      const noteId = event.target.dataset.id;
      await deleteNoteAPI(noteId);
      await displayNotesFromAPI(); // Reload tampilan notes setelah menghapus catatan
    }
  });

  // Tangkap event "click" pada tombol archive
  notesList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("button-archive")) {
      const noteId = event.target.dataset.id;
      await archiveNoteAPI(noteId);
      await displayNotesFromAPI(); // Reload tampilan notes setelah mengarsipkan catatan
    }
  });
});
