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
