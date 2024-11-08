document.addEventListener('DOMContentLoaded', () => {
    const dateTimeInput = document.getElementById('date-time');
    const participantList = document.getElementById('participant-ul');
    const nameInput = document.getElementById('name');
    const addButton = document.getElementById('add-participant');

    let currentDateTime = '';

    // Function to calculate next Saturday at 8:00 AM
    function getNextSaturday8am() {
        const now = new Date();
        const nextSaturday = new Date();
        nextSaturday.setDate(now.getDate() + (6 - now.getDay())); // Set to next Saturday (6 = Saturday)
        nextSaturday.setHours(8, 0, 0, 0); // Set to 8:00 AM

        return nextSaturday;
    }

    // Set the datetime-local input to next Saturday at 8:00 AM
    const nextSaturday = getNextSaturday8am();
    const formattedDate = nextSaturday.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
    dateTimeInput.value = formattedDate;

    // Disable the input to prevent users from changing the time
    dateTimeInput.disabled = true;

    // Ensure the input can only select the upcoming Saturday at 8:00 AM
    const minDate = formattedDate;
    const maxDate = nextSaturday.toISOString().slice(0, 16); // Same as min, so only this Saturday at 8:00 AM is allowed
    dateTimeInput.setAttribute('min', minDate);
    dateTimeInput.setAttribute('max', maxDate);

    // Automatically load participants for the next Saturday at 8:00 AM
    currentDateTime = dateTimeInput.value; // Use the pre-set date/time
    loadParticipants();

    // Handle the 'Add Your Name' button click
    addButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name || !currentDateTime) {
            alert('Please enter your name and select a date/time.');
            return;
        }

        const participants = JSON.parse(localStorage.getItem(currentDateTime)) || [];
        if (!participants.includes(name)) {
            participants.push(name);
            localStorage.setItem(currentDateTime, JSON.stringify(participants));
            loadParticipants();
        } else {
            alert('You are already signed up!');
        }
        nameInput.value = '';
    });

    // Function to load participants from localStorage
    function loadParticipants() {
        const participants = JSON.parse(localStorage.getItem(currentDateTime)) || [];
        participantList.innerHTML = '';  // Clear the list first
        participants.forEach((name, index) => {
            const li = document.createElement('li');
            li.textContent = name;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                participants.splice(index, 1);
                localStorage.setItem(currentDateTime, JSON.stringify(participants));
                loadParticipants();
            });
            li.appendChild(removeBtn);
            participantList.appendChild(li);
        });
    }
});
