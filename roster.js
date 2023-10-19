document.addEventListener("DOMContentLoaded", () => {
    const rosterTable = document.querySelector("#roster-table");

    function populateRoster() {
        fetch("https://trog-manager-bcfe3b731fee.herokuapp.com/api/roster")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(rosterData => {
            console.log(rosterData);
            rosterData.forEach(player => {
                let accolades = "";
                player.accolades.split(',').forEach(accolade => {
                    accolades += `<p>${accolade}</p>`;
                })
                const row = document.createElement("tr");
                row.innerHTML = `
                <td><img src="images/players/${player.id}.jpeg"></td>
                <td class="table-name">${player.name}</td>
                <td>${player.role}</td>
                <td>${player.height}</td>
                <td>${player.weight}</td>
                <td>${player.age}</td>
                <td class="accolades">${accolades}</td>
                <td>${player.contact}</td>
                `
                rosterTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching roster:', error));
    }

    populateRoster();
});