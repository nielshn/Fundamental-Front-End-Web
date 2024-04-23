const BASE_URL = 'https://notes-api.dicoding.dev/v2';

async function getNotes() {
    try {
        const response = await fetch(`${BASE_URL}/notes`);
        const responseData = await response.json();
        if (responseData.status === 'success') {
            return responseData.data;
        } else {
            throw new Error('Failed to fetch notes. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch notes. Please try again later.');
    }
}

async function getArchivedNotes() {
    try {
        const response = await fetch(`${BASE_URL}/notes/archived`);
        const responseData = await response.json();
        if (responseData.status === 'success') {
            return responseData.data;
        } else {
            throw new Error('Failed to fetch archived notes. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch archived notes. Please try again later.');
    }
}

async function createNote(title, body) {
    try {

        const response = await fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
        });
        const responseData = await response.json();
        if (responseData.status === 'success') {
            return responseData.data;
        } else {
            throw new Error('Failed to create note. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create note. Please try again later.');
    }
}

async function deleteNoteAPI(noteId) {
    try {
        const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
            method: 'DELETE',
        });
        const responseData = await response.json();
        if (response.ok) {
            return responseData.message;
        } else {
            throw new Error(responseData.message || 'Failed to delete note. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete note. Please try again later.');
    }
}


async function archiveNoteAPI(noteId) {
    try {
        const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
            method: 'POST',
        });
        const responseData = await response.json();
        if (responseData.status === 'success') {
            return responseData.message;
        } else {
            throw new Error(responseData.message || 'Failed to archive note. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to archive note. Please try again later.');
    }
}
async function unarchiveNoteAPI(noteId) {
    try {
        const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
            method: 'POST',
        });
        const responseData = await response.json();
        if (responseData.status === 'success') {
            return responseData.message;
        } else {
            throw new Error('Failed to unarchive note. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to unarchive note. Please try again later.');
    }
}

async function getSingleNoteAPI(noteId) {
    try {
        const response = await fetch(`${BASE_URL}/notes/${noteId}`);
        const responseData = await response.json();
        if (responseData.status === 'success') {
            return responseData.data;
        } else {
            throw new Error('Failed to fetch note. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch note. Please try again later.');
    }
}

export { getNotes, getArchivedNotes, createNote, deleteNoteAPI, archiveNoteAPI, unarchiveNoteAPI, getSingleNoteAPI };
