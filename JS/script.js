document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('date-form');
    const dateInput = document.getElementById('date');
    const dateDisplay = document.getElementById('date-display');
    const previousDatesList = document.getElementById('previous-dates');
    const gradeDisplay = document.getElementById('grade-display');

    let previousDates = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const dateValue = dateInput.value;

        console.log('Date selected:', dateValue);

        const dateElement = document.createElement('p');
        dateElement.textContent = 'Date selected: ' + dateValue;

        const countdownElement = document.createElement('p');
        const targetDate = new Date(dateValue);
        const today = new Date();
        const timeDifference = targetDate - today;

        if (timeDifference >= 0) {
            let daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            let hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.textContent = 'Time remaining: ' + daysRemaining + 'd ' + hoursRemaining + 'h ' + minutesRemaining + 'm ' + secondsRemaining + 's';
        } else {
            countdownElement.textContent = 'The selected date is in the past.';
        }

        dateDisplay.innerHTML = '';
        dateDisplay.appendChild(dateElement);
        dateDisplay.appendChild(countdownElement);

        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance >= 0) {
                const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hoursRemaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

                countdownElement.textContent = 'Time remaining: ' + daysRemaining + 'd ' + hoursRemaining + 'h ' + minutesRemaining + 'm ' + secondsRemaining + 's';
            } else {
                countdownElement.textContent = 'The selected date is in the past.';
                clearInterval(countdownInterval);
            }
        }, 1000);

        // Add the selected date to the previous dates array and display it
        previousDates.push(dateValue);
        displayPreviousDates();
        calculateGrade();
    });

    function displayPreviousDates() {
        // Clear the previous dates list
        previousDatesList.innerHTML = '';

        // Iterate over the previous dates array and create list items
        previousDates.forEach(function(date) {
            const li = document.createElement('li');
            li.textContent = date;
            previousDatesList.appendChild(li);
        });
    }

    function calculateGrade() {
        const totalDates = 100; // Assuming 100% corresponds to checking in every day since the user started using the application
        const checkInPercentage = (previousDates.length / totalDates) * 100;

        // Display the grade
        gradeDisplay.textContent = 'Grade: ' + checkInPercentage.toFixed(2) + '%';
    }
    const originalDiv = document.getElementById('cloneNode');
        const clonedDiv = originalDiv.cloneNode(true); 
        document.body.appendChild(clonedDiv);
});