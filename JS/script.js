document.addEventListener("DOMContentLoaded", function() {
    // Get references to the form, date input elements, and display element
    var form = document.getElementById('date-form');
    var dateInput = document.getElementById('date');
    var dateDisplay = document.getElementById('date-display');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the date input value
        var dateValue = dateInput.value;

        // Log the date input value to the console
        console.log('Date selected:', dateValue);

        // Create a new element to display the date
        var dateElement = document.createElement('p');
        dateElement.textContent = 'Date selected: ' + dateValue;

        // Calculate the countdown
        var countdownElement = document.createElement('p');
        var targetDate = new Date(dateValue);
        var today = new Date();
        var timeDifference = targetDate - today;

        if (timeDifference >= 0) {
            var daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            var hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            var secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownElement.textContent = 'Time remaining: ' + daysRemaining + 'd ' + hoursRemaining + 'h ' + minutesRemaining + 'm ' + secondsRemaining + 's';
        } else {
            countdownElement.textContent = 'The selected date is in the past.';
        }

        // Clear any previous date display
        dateDisplay.innerHTML = '';

        // Append the new elements to the dateDisplay div
        dateDisplay.appendChild(dateElement);
        dateDisplay.appendChild(countdownElement);

        // Update countdown every second
        var countdownInterval = setInterval(function() {
            var now = new Date().getTime();
            var distance = targetDate - now;

            if (distance >= 0) {
                daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
                hoursRemaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

                countdownElement.textContent = 'Time remaining: ' + daysRemaining + 'd ' + hoursRemaining + 'h ' + minutesRemaining + 'm ' + secondsRemaining + 's';
            } else {
                countdownElement.textContent = 'The selected date is in the past.';
                clearInterval(countdownInterval);
            }
        }, 1000);
    });
});