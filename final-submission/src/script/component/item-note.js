import { deleteNoteAPI, archiveNoteAPI } from "../../data/note-api";
import { showLoadingIndicator, hideLoadingIndicator } from "./loading-indicator";


const BASE_URL = 'https://notes-api.dicoding.dev/v2';

document.addEventListener("DOMContentLoaded", function () {
  const notesList = document.getElementById("notes-list");
  const displayNotesFromAPI = async () => {
    try {
      showLoadingIndicator();
      const response = await fetch(`${BASE_URL}/notes`);
      const { data: notes } = await response.json();
      notesList.innerHTML = "";
      notes.forEach((note) => {
        addNoteToList(note);
      });
      hideLoadingIndicator();
    } catch (error) {
      console.error('Error:', error);
      showResponseMessage('Failed to fetch notes. Please try again later.');
      hideLoadingIndicator();
    }
  };

  function addNoteToList(note) {
    const noteElement = document.createElement("item-catatan");
    const noteId = note.id;
    const isArchived = note.archive ? "true" : "false";

    noteElement.innerHTML = `
        <style>
            /* Style for buttons */
            .button-container {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }

            .button-delete,
            .button-archive {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .button-delete {
                background-color: #dc3545;
                color: white;
            }

            .button-delete:hover {
                background-color: #c82333;
            }

            .button-archive {
                background-color: #6c757d;
                color: white;
            }

            .button-archive:hover {
                background-color: #5a6268;
            }
        </style>
        <h3 slot="title">${note.title}</h3>
        <p slot="body">${note.body}</p>
        <div class="button-container">
        <button type="button" class="button-delete" data-id="${noteId}" data-archive="${isArchived}">Delete</button>
        <button type="button" class="button-archive" data-id="${noteId}" data-archive="${isArchived}">Archive</button>
        </div>
    `;

    // Menambahkan event listener untuk tombol delete
    noteElement.querySelector(".button-delete").addEventListener("click", async (event) => {
      const noteId = event.target.dataset.id;
      try {
        await deleteNoteAPI(noteId);
        noteElement.remove();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    });

    // Menambahkan event listener untuk tombol archive
    noteElement.querySelector(".button-archive").addEventListener("click", async (event) => {
      const noteId = event.target.dataset.id;
      try {
        await archiveNoteAPI(noteId);
        noteElement.remove();
      } catch (error) {
        console.error("Error archiving note:", error);
      }
    });

    // Menambahkan catatan ke dalam notesList
    notesList.appendChild(noteElement);
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-danger');
    alert.textContent = message;
    document.body.appendChild(alert);
  };

  // Event listener untuk tombol "Fetch All Notes"
  document.getElementById("fetch-notes-btn").addEventListener("click", async () => {
    await displayNotesFromAPI();
  });

  // Tangkap event "addNote" yang di dispatch oleh element "input-catatan"
  document.addEventListener("addNote", async function (event) {
    const newNote = event.detail;
    addNoteToList(newNote);
  });
});

