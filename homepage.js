document.addEventListener("DOMContentLoaded", () => {
    const scoreboard = document.querySelector("#season-record-score");

    fetch("https://trog-manager-bcfe3b731fee.herokuapp.com/api/record")
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            return res.json();
        }
    })
    .then(data => {
        scoreboard.textContent = `${data[0].won} - ${data[0].lost}`;
    })
    .catch(error => console.error('Error fetching score:', error));
});