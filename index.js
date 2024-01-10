document.addEventListener('DOMContentLoaded', function() {
    // Sample people data
    const people = ['Tim', 'Sophie', 'Kim','Nina','Volker','Karin', 'Kurt', 'Basti', 'Moritz', 'Jona', 'Arne'];

    // Get the list element
    const peopleList = document.getElementById('peopleList');

    // Load counters from localStorage or initialize to zero
    const counters = JSON.parse(localStorage.getItem('counters')) || Array(people.length).fill(0);

    // Function to update list and counters
    const updateList = function() {
        // Sort people based on counters
        const sortedPeople = people.slice().sort((a, b) => counters[people.indexOf(b)] - counters[people.indexOf(a)]);

        // Clear the list
        peopleList.innerHTML = '';

        // Display people with counters and buttons
        sortedPeople.forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                    <div class="name">
                        <div class="text nameItem">${person}
                        </div>
                    </div>
                    <div class="increase-decrease">
                        <button class="decrement" onclick="decrementCounter(${people.indexOf(person)})">
                            <div class="text2">-</div>
                        </button>
                        <button class="increment" onclick="incrementCounter(${people.indexOf(person)})">
                            <div class="text3">+</div>
                        </button>
                    </div>
                    <div class="counter" id="counter${people.indexOf(person)}">${counters[people.indexOf(person)]}
                    </div>
            `;
            peopleList.appendChild(listItem);
        });

        // Save counters to localStorage
        localStorage.setItem('counters', JSON.stringify(counters));
    };

    // Function to increment counter
    window.incrementCounter = function(index) {
        // Ask for confirmation before incrementing
        var confirmIncrement = confirm("Soll ein Strich gemacht werden?");
        
        if (confirmIncrement) {
            counters[index]++;
            updateList();
            const messages = ["Hochfahren!", "Wohlsein!", "Weiter So!", "Tornado! Tornado!", "Schüttbier!", "Gutes Tempo!"]
            var n = Math.floor(Math.random() * (messages.length));
                alert(messages[n])
        }
    };

    // Function to decrement counter
    window.decrementCounter = function(index) {
        if (counters[index] > 0) {
            counters[index]--;
            updateList();
            alert("Buuuuh");
        }
    };

    // Initialize the list
    updateList();
});

// Function to filter names
function filterNames() {
        const filterValue = document.getElementById('nameFilter').value.toLowerCase();
        const nameList = document.getElementById('peopleList');
        const names = nameList.getElementsByClassName('nameItem');

            for (const name of names) {
                const textValue = name.textContent || name.innerText;
                const isVisible = textValue.toLowerCase().indexOf(filterValue) > -1;
                name.style.display = isVisible ? '' : 'none';
            }
            }
