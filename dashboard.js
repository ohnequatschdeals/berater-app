// Dashboard Testscript
document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");

    // API testen
    fetch("/api/status")
        .then(res => res.json())
        .then(data => {
            contentDiv.innerHTML = `
                <h2>API Antwort</h2>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        })
        .catch(err => {
            contentDiv.innerHTML = `<p style="color:red;">Fehler beim Laden: ${err}</p>`;
        });
});