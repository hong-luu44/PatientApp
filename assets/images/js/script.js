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

const username = 'coalition';
const password = 'skills-test';
const credentials = btoa(`${username}:${password}`);

fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Display Jessica Taylor's information
    const jessicaData = data.find(patient => patient.name === "Jessica Taylor");
    console.log(jessicaData);
    // Here, manipulate and display the data as needed
})
.catch(error => console.error('Error fetching data:', error));

