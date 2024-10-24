console.log("Script loaded!");

// Select all navigation items (which contain both the icons and the links)
const navItems = document.querySelectorAll('.nav-item');

// Add a click event listener to each nav-item
navItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Remove the 'active' class from all navigation items
        navItems.forEach(nav => nav.classList.remove('active'));

        // Add the 'active' class to the clicked nav-item (affecting both the icon and link)
        this.classList.add('active');
    });
});

// Chart.js Initialization (Blood Pressure Chart)
const ctx = document.getElementById('bloodPressureChart').getContext('2d');
const data = {
    labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
    datasets: [
        {
            label: 'Systolic',
            data: [120, 130, 110, 140, 135, 160],
            borderColor: '#E66FD2',
            fill: false,
            tension: 0.4,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#E66FD2',
            pointRadius: 5
        },
        {
            label: 'Diastolic',
            data: [80, 85, 75, 90, 88, 78],
            borderColor: '#8660E6',
            fill: false,
            tension: 0.4,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#8660E6',
            pointRadius: 5
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: false, // Ensure responsiveness is disabled
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: 60,
                max: 180,
                ticks: {
                    stepSize: 20
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

const bloodPressureChart = new Chart(ctx, config);

// Function to load patients from the JSON file
async function loadPatients() {
    try {
        // Fetch the JSON file with patient data
        const response = await fetch('list.json');
        const patients = await response.json(); // Parse the JSON data
        console.log(patients); // Log the data

        const patientsList = document.getElementById('patientsList'); // Get the patients list element

        // Clear any existing content in the patients list
        patientsList.innerHTML = '';

        // Loop through the patient data and create HTML for each patient
        patients.forEach(patient => {
            const patientItem = document.createElement('li');
            patientItem.classList.add('patient-item');

            // Create the patient item structure dynamically
            patientItem.innerHTML = `
                <div class="patient-info">
                    <img src="${patient.profile_picture}" alt="${patient.name}" class="patient-img">
                    <div class="patient-text">
                        <span class="patient-name">${patient.name}</span>
                        <span class="patient-details">${patient.gender}, ${patient.age}</span>
                    </div>
                    <img src="assets/images/moreHoriz.png" alt="More Options" class="more-options">
                </div>
            `;

            // Append the patient item to the list
            patientsList.appendChild(patientItem);
        });

    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// Call the function to load patients on page load
window.onload = loadPatients;

