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
                        <button class="decrement ${people.indexOf(person)}" onclick="decrementCounter(${people.indexOf(person)})">
                            <div class="text2">-</div>
                        </button>
                        <button class="increment ${people.indexOf(person)}" onclick="incrementCounter(${people.indexOf(person)})">
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
        
        // Generate a motivation message
        const messages = ["Hochfahren!", "Wohlsein!", "Weiter So!", "Tornado! Tornado!", "Schüttbier!", "Gutes Tempo!"]
        var n = Math.floor(Math.random() * (messages.length));
        
        // Ask for confirmation before incrementing
        var confirmIncrement = confirm(messages[n] + " - Soll ein Strich gemacht werden?");
        
        if (confirmIncrement) {
            counters[index]++;
            updateList();
        }

        $("button.increment."+index).animate({opacity: 0.3});
        setTimeout(function(){
            $("button.increment."+index).animate({opacity: 1.0});
        }, 200);

        $("#counter"+index).addClass("counterAnimation");
        setTimeout(function(){
            $("#counter"+index).removeClass("counterAnimation");
        }, 1000);
    };

    // Function to decrement counter
    window.decrementCounter = function(index) {
        if (counters[index] > 0) {
            counters[index]--;
            updateList();
            alert("Buuuuh");
        }

        $("button.decrement."+index).animate({opacity: 0.3});
        setTimeout(function(){
            $("button.decrement."+index).animate({opacity: 1.0});
        }, 200);

        $("#counter"+index).addClass("counterAnimation");
        setTimeout(function(){
            $("#counter"+index).removeClass("counterAnimation");
        }, 1000);
    };

    // Initialize the list
    updateList();
});

// Function to filter names
function filterNames() {
    const filterValue = document.getElementById('nameFilter').value.toLowerCase(); // Input in the search
    const nameList = document.getElementById('peopleList'); // unstructured list object in HTML

    Array.from(nameList.children).forEach(name => {     // Create an array for every child (li) of the unstructured list and execute the function for each
        const textValue = name.textContent || name.innerText;       // Capture the text inside each list object (li)
        const isVisible = textValue.toLowerCase().indexOf(filterValue) > -1;        // Compare search input with text of list object (li)
        name.style.display = isVisible ? '' : 'none';        // set list Objects (li) to either visible or not visible depending on the result for isVisible
    });
}

