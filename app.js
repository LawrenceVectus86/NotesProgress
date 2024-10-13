// Fungsi untuk memuat data dari Local Storage saat halaman pertama kali dimuat
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        addNoteToDOM(note.text, note.progress, note.completed, index);
    });
}

// Fungsi untuk menyimpan data ke Local Storage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Fungsi untuk menambahkan catatan ke DOM (tampilan halaman)
function addNoteToDOM(noteText, progressValue, isCompleted, index) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    if (isCompleted) {
        noteDiv.classList.add('completed');
    }

    const noteParagraph = document.createElement('p');
    noteParagraph.textContent = noteText;
    noteDiv.appendChild(noteParagraph);
    
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.style.width = progressValue + '%';
    
    const progressLabel = document.createElement('span');
    progressLabel.classList.add('progress-label');
    progressLabel.textContent = progressValue + '%';
    
    progressBar.appendChild(progress);
    noteDiv.appendChild(progressBar);
    noteDiv.appendChild(progressLabel);
    
    // Tombol centang, edit, dan hapus
    const noteButtons = document.createElement('div');
    noteButtons.classList.add('note-buttons');

    // Centang
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', function() {
        toggleComplete(index);
    });
    noteButtons.appendChild(checkbox);

    // Tombol edit
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function() {
        editNote(index);
    });
    noteButtons.appendChild(editButton);

    // Tombol delete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        deleteNote(index);
    });
    noteButtons.appendChild(deleteButton);
    
    noteDiv.appendChild(noteButtons);
    document.getElementById('notesList').appendChild(noteDiv);
}

// Fungsi saat tombol Add Note ditekan
document.getElementById('addNote').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput').value;
    const progressInput = document.getElementById('progressInput').value;
    
    if (noteInput && progressInput >= 0 && progressInput <= 100) {
        // Ambil catatan dari Local Storage
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        
        // Tambahkan catatan baru ke array notes
        const newNote = {
            text: noteInput,
            progress: progressInput,
            completed: false
        };
        notes.push(newNote);
        
        // Simpan array notes ke Local Storage
        saveNotes(notes);
        
        // Tambahkan catatan ke DOM
        addNoteToDOM(noteInput, progressInput, false, notes.length - 1);
        
        // Reset input setelah menambahkan note
        document.getElementById('noteInput').value = '';
        document.getElementById('progressInput').value = '';
    } else {
        alert('Please enter a valid note and progress (0-100%)');
    }
});

// Fungsi untuk menghapus catatan
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Hapus note pada index
    saveNotes(notes);
    document.getElementById('notesList').innerHTML = ''; // Kosongkan tampilan
    loadNotes(); // Muat ulang catatan yang tersisa
}

// Fungsi untuk mengedit catatan
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const newText = prompt('Edit your note:', notes[index].text);
    const newProgress = prompt('Edit progress (0-100):', notes[index].progress);

    if (newText && newProgress >= 0 && newProgress <= 100) {
        notes[index].text = newText;
        notes[index].progress = newProgress;
        saveNotes(notes);
        document.getElementById('notesList').innerHTML = ''; // Kosongkan tampilan
        loadNotes(); // Muat ulang catatan yang diperbarui
    } else {
        alert('Please enter a valid note and progress (0-100%)');
    }
}

// Fungsi untuk menandai catatan sebagai selesai
function toggleComplete(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index].completed = !notes[index].completed; // Toggle completed status
    saveNotes(notes);
    document.getElementById('notesList').innerHTML = ''; // Kosongkan tampilan
    loadNotes(); // Muat ulang catatan yang diperbarui
}

// Panggil fungsi loadNotes saat halaman dimuat
window.onload = loadNotes;
