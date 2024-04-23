import { unarchiveNoteAPI, deleteNoteAPI } from "../../data/note-api";
import { hideLoadingIndicator, showLoadingIndicator } from "./loading-indicator";

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

document.addEventListener('DOMContentLoaded', function () {
  const archiveList = document.getElementById("archived-list");

  const archiveNotesFromAPI = async () => {
    try {
      showLoadingIndicator();
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const { data: notes } = await response.json();
      archiveList.innerHTML = "";
      notes.forEach((note) => {
        addArchiveNoteToList(note);
      });
      hideLoadingIndicator();
    } catch (error) {
      console.error("Error", error);
      showResponseMessage('Failed to fetch archive. Please try again later.');
      hideLoadingIndicator();
    }
  };

  function addArchiveNoteToList(note) {
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
        .button-unarchive {
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

        .button-unarchive {
          background-color: #6c757d;
          color: white;
        }

        .button-unarchive:hover {
          background-color: #5a6268;
        }
      </style>
      <h3 slot="title">${note.title}</h3>
      <p slot="body">${note.body}</p>
      <div class="button-container">
        <button type="button" class="button-delete" data-id="${noteId}" data-archive="${isArchived}">Delete</button>
        <button type="button" class="button-unarchive" data-id="${noteId}" data-archive="${isArchived}">Unarchive</button>
      </div>
    `;

    noteElement.querySelector(".button-delete").addEventListener("click", async (event) => {
      const noteId = event.target.dataset.id;
      try {
        await deleteNoteAPI(noteId);
        noteElement.remove();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    });

    noteElement.querySelector(".button-unarchive").addEventListener("click", async (event) => {
      const noteId = event.target.dataset.id;
      try {
        await unarchiveNoteAPI(noteId, false);
        noteElement.remove();
      } catch (error) {
        console.error("Error unarchiving note:", error);
      }
    });

    archiveList.appendChild(noteElement);
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-danger');
    alert.textContent = message;
    document.body.appendChild(alert);
  };

  // Event listener for button "Fetch All Archive Notes"
  document.getElementById("getArchiveButton").addEventListener("click", async () => {
    await archiveNotesFromAPI();
  });
});
