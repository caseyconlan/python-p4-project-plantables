fetch('https://perenual.com/docs/api')
    .then(response => response.json())
    .then(data => {
        // data is the plant info. You can use it in your game.
        console.log(data);
    });

document.addEventListener("DOMContentLoaded", function(){
    for (let i = 1; i <= 6; i++) {
        let plantElement = document.getElementById('plant' + i);
        plantElement.addEventListener('click', function() {
            openMenu(i); // This function is called when a plant is clicked.
        });
    }
});

function openMenu(plantNumber) {
    // Open the menu for the specified plant.
    // You can replace this with your actual menu opening logic.
    console.log('Opening menu for plant ' + plantNumber);
}

document.addEventListener("DOMContentLoaded", function(){
    for (let i = 1; i <= 6; i++) {
        let plantElement = document.getElementById('plant' + i);
        let plantActionElement = plantElement.querySelector('.plant-action');
        
        plantActionElement.addEventListener('change', function(event) {
            performAction(i, event.target.value); 
        });
    }
});

function performAction(plantNumber, action) {
    console.log('Performing action ' + action + ' on plant ' + plantNumber);
    // Add the logic for each action here.
}

let gameState = {
    tokens: 1000,
    plants: [null, null, null, null, null, null] // No plants at the start
};
