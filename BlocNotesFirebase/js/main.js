document.addEventListener("DOMContentLoaded", function() {
    let appsList = document.getElementById("appsList");
    apps.forEach(app => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = app.path;
        a.textContent = app.name;
        li.appendChild(a);
        appsList.appendChild(li);
    });
});