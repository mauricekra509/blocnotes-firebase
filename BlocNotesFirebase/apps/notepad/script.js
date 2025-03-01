function saveNote() {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() === "") {
        alert("Veuillez écrire une note !");
        return;
    }

    let noteId = Date.now();
    database.ref("notes/" + noteId).set({
        text: noteText,
        timestamp: new Date().toISOString()
    }).then(() => {
        document.getElementById("noteInput").value = "";
        loadNotes();
    }).catch(error => console.error("Erreur :", error));
}

function loadNotes() {
    database.ref("notes").once("value")
        .then(snapshot => {
            let notesList = document.getElementById("notesList");
            notesList.innerHTML = "";
            snapshot.forEach(childSnapshot => {
                let note = childSnapshot.val();
                let li = document.createElement("li");
                li.textContent = note.text;
                notesList.appendChild(li);
            });
        })
        .catch(error => console.error("Erreur lors du chargement des notes :", error));
}

document.addEventListener("DOMContentLoaded", loadNotes);