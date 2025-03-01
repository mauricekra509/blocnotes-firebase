// Services and Activities with Attachments
const storedData = JSON.parse(localStorage.getItem('dailyActivities')) || {};
let selectedDate = new Date().toISOString().split('T')[0]; // Default to today

// Get references
const servicesContainer = document.getElementById('services-container');
const activityForm = document.getElementById('activity-form');
const datePicker = document.getElementById('date-picker');

// Initialize date picker
datePicker.value = selectedDate;
datePicker.addEventListener('change', function () {
    selectedDate = this.value;
    renderServices();
});

// Render services and their activities
function renderServices() {
    servicesContainer.innerHTML = ''; // Clear existing cards
    const dailyActivities = storedData[selectedDate] || getEmptyServices();

    for (const [serviceName, activities] of Object.entries(dailyActivities)) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h2>${serviceName}</h2>
            <ul>
                ${activities.map((activity, index) => `
                    <li>
                        ${activity.description}
                        ${activity.attachment ? `
                            <a href="${activity.attachment}" download="${activity.fileName}" class="attachment">
                                ${activity.fileName}
                            </a>
                        ` : ''}
                        <button onclick="deleteActivity('${serviceName}', ${index})">Delete</button>
                    </li>`).join('')}
            </ul>
        `;
        servicesContainer.appendChild(card);
    }
}

// Get an empty structure for new dates
function getEmptyServices() {
    return {
        "Production": [],
        "Electricity": [],
        "Instrumentation": [],
        "Mechanics": [],
        "HVAC": []
    };
}

// Add activity form submission
activityForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const service = document.getElementById('service').value;
    const activityDescription = document.getElementById('activity').value;
    const attachmentInput = document.getElementById('attachment');
    const file = attachmentInput.files[0];

    const dailyActivities = storedData[selectedDate] || getEmptyServices();

    // Read attachment if exists
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const newActivity = {
                description: activityDescription,
                attachment: reader.result, // Base64 content
                fileName: file.name
            };
            dailyActivities[service].push(newActivity);
            storedData[selectedDate] = dailyActivities;

            saveToLocalStorage();
            renderServices();
            activityForm.reset();
        };
        reader.readAsDataURL(file);
    } else {
        const newActivity = {
            description: activityDescription,
            attachment: null,
            fileName: null
        };
        dailyActivities[service].push(newActivity);
        storedData[selectedDate] = dailyActivities;

        saveToLocalStorage();
        renderServices();
        activityForm.reset();
    }
});

// Delete an activity
function deleteActivity(serviceName, activityIndex) {
    const dailyActivities = storedData[selectedDate];
    dailyActivities[serviceName].splice(activityIndex, 1);
    saveToLocalStorage();
    renderServices();
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('dailyActivities', JSON.stringify(storedData));
}

// Initial render
renderServices();
