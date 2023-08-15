document.addEventListener("DOMContentLoaded", () => {
    const rosterTable = document.querySelector("#roster-table");

    function populateRoster() {
        fetch("http://localhost:8080/api/roster/")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(rosterData => {
            console.log(rosterData);
            rosterData.forEach(player => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td></td>
                <td class="table-name">${player.name}</td>
                <td>${player.role}</td>
                <td>${player.height}</td>
                <td>${player.weight}</td>
                <td>${player.age}</td>
                <td>${player.accolades}</td>
                <td>${player.contact}</td>
                `
                rosterTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching roster:', error));
    }

    populateRoster();
});