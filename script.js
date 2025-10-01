// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const notificationsBtn = document.getElementById('notificationsBtn');
const closeNotifications = document.getElementById('closeNotifications');
const notificationsDrawer = document.getElementById('notificationsDrawer');
const voiceCommandBtn = document.getElementById('voiceCommandBtn');
const calendarEl = document.getElementById('calendar');
const currentYearEl = document.getElementById('currentYear');
const globeContainer = document.getElementById('globeContainer');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Theme Toggle
function initTheme() {
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.toggle('light-mode', false);
        document.querySelector('#themeToggle i').className = 'fas fa-moon text-cyan-400';
    } else {
        document.body.classList.toggle('light-mode', true);
        document.querySelector('#themeToggle i').className = 'fas fa-sun text-amber-400';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Update icon and save preference
    if (document.body.classList.contains('light-mode')) {
        document.querySelector('#themeToggle i').className = 'fas fa-sun text-amber-400';
        localStorage.setItem('theme', 'light');
    } else {
        document.querySelector('#themeToggle i').className = 'fas fa-moon text-cyan-400';
        localStorage.setItem('theme', 'dark');
    }
});

// Profile Dropdown
profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hidden');
    }
});

// Add keyboard navigation support for profile dropdown
profileBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        profileDropdown.classList.toggle('hidden');
    }
});

// Handle dropdown item navigation
const dropdownItems = profileDropdown.querySelectorAll('a');
dropdownItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            profileDropdown.classList.add('hidden');
            profileBtn.focus();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % dropdownItems.length;
            dropdownItems[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + dropdownItems.length) % dropdownItems.length;
            dropdownItems[prevIndex].focus();
        }
    });
});

// Notifications Drawer
notificationsBtn.addEventListener('click', () => {
    notificationsDrawer.classList.remove('translate-x-full');
    // Focus on close button for accessibility
    closeNotifications.focus();
});

closeNotifications.addEventListener('click', () => {
    notificationsDrawer.classList.add('translate-x-full');
    // Return focus to notification button
    notificationsBtn.focus();
});

// Close notifications when clicking outside
document.addEventListener('click', (e) => {
    if (!notificationsBtn.contains(e.target) && 
        !notificationsDrawer.contains(e.target) && 
        !notificationsDrawer.classList.contains('translate-x-full')) {
        notificationsDrawer.classList.add('translate-x-full');
        notificationsBtn.focus();
    }
});

// Voice Command (Simulated)
voiceCommandBtn.addEventListener('click', () => {
    voiceCommandBtn.classList.add('voice-active');
    
    // Simulate voice command processing
    setTimeout(() => {
        voiceCommandBtn.classList.remove('voice-active');
        processVoiceCommand("demo command");
    }, 2000);
});

// Process voice commands
function processVoiceCommand(command) {
    // This is a simplified demo - in reality, you would use Web Speech API
    const commandLower = command.toLowerCase();
    
    if (commandLower.includes('add') && commandLower.includes('task')) {
        alert('Voice Command: Adding new task');
        // Logic to open task creation modal
    } else if (commandLower.includes('show') && commandLower.includes('tomorrow')) {
        alert('Voice Command: Showing tasks due tomorrow');
        // Logic to filter tasks
    } else if (commandLower.includes('light mode')) {
        // Toggle light mode
        document.body.classList.toggle('light-mode');
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = document.body.classList.contains('light-mode') ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-cyan-400';
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    } else if (commandLower.includes('dark mode')) {
        // Toggle dark mode
        document.body.classList.toggle('light-mode');
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = document.body.classList.contains('light-mode') ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-cyan-400';
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    } else {
        alert('Voice Command: "' + command + '" - Command recognized but not implemented in demo');
    }
}

// Calendar Generation
function generateCalendar() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    // Days in month
    const daysInMonth = lastDay.getDate();
    // Starting day of week (0 = Sunday, 1 = Monday, etc)
    const startDay = firstDay.getDay();
    
    // Clear calendar
    calendarEl.innerHTML = '';
    
    // Add empty cells for days before the first day
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        calendarEl.appendChild(emptyCell);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        dayCell.setAttribute('tabindex', '0'); // Make focusable
        
        // Add today class if applicable
        if (day === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
            dayCell.classList.add('today');
        }
        
        // Add tasks indicator for some days (simulated)
        if (day === 5 || day === 12 || day === 19 || day === 26) {
            dayCell.classList.add('has-tasks');
        }
        
        // Add click event
        dayCell.addEventListener('click', () => {
            // Highlight the selected day
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            dayCell.classList.add('selected');
            
            // In a real app, this would filter the Kanban board
            alert(`Selected date: ${month+1}/${day}/${year}`);
        });
        
        // Add keyboard support
        dayCell.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dayCell.click();
            }
        });
        
        calendarEl.appendChild(dayCell);
    }
}

// Drag and Drop Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Set current year
    currentYearEl.textContent = new Date().getFullYear();
    
    // Generate calendar
    generateCalendar();
    
    // Setup drag and drop
    const draggables = document.querySelectorAll('[draggable="true"]');
    const columns = document.querySelectorAll('[id$="-column"]');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
        
        // Add keyboard support for drag and drop
        draggable.setAttribute('tabindex', '0');
        draggable.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // In a real implementation, this would trigger the drag operation
                draggable.classList.add('dragging');
                setTimeout(() => draggable.classList.remove('dragging'), 100);
            }
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            column.classList.add('drag-over');
        });
        
        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });
        
        column.addEventListener('drop', e => {
            e.preventDefault();
            column.classList.remove('drag-over');
            
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                column.appendChild(draggable);
            }
        });
    });
    
    // Initialize charts
    initCharts();
    
    // Initialize 3D globe
    initGlobe();

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll and active-link highlighting
    const allNavLinks = document.querySelectorAll('nav a.nav-link, #mobileMenu a.nav-link');
    const sectionIds = ['dashboard', 'projects', 'reports', 'teams', 'calendar-section', 'settings'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function setActiveLink(id) {
        allNavLinks.forEach(a => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#') && href.slice(1) === id) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }

    // Click behavior: smooth scroll + close mobile menu
    allNavLinks.forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveLink(href.slice(1));
                }
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Observe sections to update active link on scroll
    if (sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0.1 });

        sections.forEach(sec => observer.observe(sec));
    }
});

// Chart.js Implementation
function initCharts() {
    // Line Chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Tasks Completed',
                data: [5, 8, 12, 9, 15, 7, 10],
                borderColor: '#06b6d4',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#8b5cf6',
                pointRadius: 5,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
    
    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['High Priority', 'Medium Priority', 'Low Priority'],
            datasets: [{
                data: [12, 18, 8],
                backgroundColor: [
                    'rgba(248, 113, 113, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(74, 222, 128, 0.8)'
                ],
                borderColor: [
                    'rgba(248, 113, 113, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(74, 222, 128, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// Confetti Animation for Gamification
function triggerConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.opacity = Math.random();
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Simulate unlocking a badge
setTimeout(() => {
    triggerConfetti();
}, 10000);

// 3D Globe Visualization (Three.js)
function initGlobe() {
    // Create a simple animated globe visualization
    // In a real implementation, this would use Three.js for a true 3D globe
    
    globeContainer.innerHTML = '';
    
    // Create globe container
    const globe = document.createElement('div');
    globe.className = 'relative w-full h-full rounded-full';
    globe.style.background = 'radial-gradient(circle at 30% 30%, #8b5cf6, #06b6d4)';
    globe.style.boxShadow = 'inset 0 0 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(139, 92, 246, 0.5)';
    
    // Add grid lines
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'absolute top-0 left-1/2 w-1 h-full bg-white bg-opacity-20';
        line.style.transform = `translateX(-50%) rotate(${i * 45}deg)`;
        globe.appendChild(line);
    }
    
    // Add continents (simplified)
    const continents = [
        { top: '20%', left: '30%', width: '15%', height: '25%', name: 'North America' },
        { top: '50%', left: '50%', width: '20%', height: '30%', name: 'Africa' },
        { top: '30%', left: '65%', width: '20%', height: '20%', name: 'Asia' },
        { top: '60%', left: '20%', width: '12%', height: '20%', name: 'South America' },
        { top: '25%', left: '50%', width: '15%', height: '15%', name: 'Europe' },
        { top: '70%', left: '75%', width: '10%', height: '15%', name: 'Australia' }
    ];
    
    continents.forEach(continent => {
        const cont = document.createElement('div');
        cont.className = 'absolute rounded-lg bg-green-500 bg-opacity-30 border border-green-400 cursor-pointer transition-all duration-300 hover:bg-opacity-50';
        cont.style.top = continent.top;
        cont.style.left = continent.left;
        cont.style.width = continent.width;
        cont.style.height = continent.height;
        
        // Add tooltip
        cont.title = continent.name;
        
        globe.appendChild(cont);
    });
    
    // Add pulsing dots for team locations
    const locations = [
        { top: '30%', left: '20%', color: '#06b6d4', name: 'New York' },
        { top: '30%', left: '50%', color: '#8b5cf6', name: 'London' },
        { top: '40%', left: '70%', color: '#f59e0b', name: 'Tokyo' },
        { top: '70%', left: '80%', color: '#10b981', name: 'Sydney' }
    ];
    
    locations.forEach(location => {
        const dot = document.createElement('div');
        dot.className = 'absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2';
        dot.style.top = location.top;
        dot.style.left = location.left;
        dot.style.backgroundColor = location.color;
        dot.style.boxShadow = `0 0 10px ${location.color}, 0 0 20px ${location.color}`;
        dot.style.animation = 'pulse 2s infinite';
        
        // Add tooltip
        dot.title = location.name;
        
        // Add click event
        dot.addEventListener('click', () => {
            alert(`Team location: ${location.name}`);
        });
        
        // Add keyboard support
        dot.setAttribute('tabindex', '0');
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dot.click();
            }
        });
        
        globe.appendChild(dot);
    });
    
    globeContainer.appendChild(globe);
}

// Initialize when page loads
window.addEventListener('load', () => {
    // All initialization is handled in DOMContentLoaded
    // Dashboard initialization complete
});