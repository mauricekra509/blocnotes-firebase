// Importer Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC9XA-TUiO7LTXfDhrOFpqZaZ1lV6fZqes",
    authDomain: "blocnotesfirebase.firebaseapp.com",
    projectId: "blocnotesfirebase",
    storageBucket: "blocnotesfirebase.firebasestorage.app",
    messagingSenderId: "904726869569",
    appId: "1:904726869569:web:ac665e452115e2519438c0",
    measurementId: "G-RRC3E31FBP"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase initialisé !");



function saveTestData() {
    set(ref(database, "test/"), {
        message: "Ceci est un test Firebase !"
    }).then(() => {
        console.log("✅ Données envoyées à Firebase !");
    }).catch(error => {
        console.error("❌ Erreur Firebase :", error);
    });
}

// Exécuter la fonction pour tester
saveTestData();
