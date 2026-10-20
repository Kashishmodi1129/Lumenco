// ============ NAVIGATION FUNCTIONS ============
function navigateTo(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

// ============ TAB MANAGEMENT ============
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Activate selected tab button
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Load content for the tab
    loadTabContent(tabName);
}

// ============ CLASS SELECTION ============
function selectClass(className) {
    sessionStorage.setItem('selectedClass', className);
    navigateTo('subject-select.html');
}

// ============ SUBJECT SELECTION ============
function selectSubject(subjectName) {
    sessionStorage.setItem('selectedSubject', subjectName);
    navigateTo('subject-resource.html');
}

// ============ LOAD TAB CONTENT ============
function loadTabContent(tabName) {
    const chapters = [
        { number: 1, title: 'Introduction', description: 'Basic concepts and overview', pages: '12 pages', size: '1.2 MB' },
        { number: 2, title: 'Basic Concepts', description: 'Fundamental principles and theories', pages: '18 pages', size: '2.1 MB' },
        { number: 3, title: 'Advanced Topics', description: 'Detailed study and applications', pages: '24 pages', size: '3.5 MB' },
        { number: 4, title: 'Practical Applications', description: 'Real-world examples and exercises', pages: '15 pages', size: '1.8 MB' },
        { number: 5, title: 'Review & Summary', description: 'Key points and revision materials', pages: '10 pages', size: '1.0 MB' }
    ];

    const tabIcons = {
        'notes': '📝',
        'homework': '📋',
        'books': '📚',
        'quizzes': '✏️'
    };

    const tabTitles = {
        'notes': 'Study Notes',
        'homework': 'Homework Assignment',
        'books': 'Textbook Chapter',
        'quizzes': 'Practice Quiz'
    };

    const gridId = tabName + 'Grid';
    const gridElement = document.getElementById(gridId);
    
    if (!gridElement) return;

    gridElement.innerHTML = '';

    chapters.forEach(chapter => {
        const card = document.createElement('div');
        card.className = 'chapter-card';
        card.innerHTML = `
            <div class="chapter-header">
                <div class="chapter-icon">${tabIcons[tabName]}</div>
                <div>
                    <h3>Chapter ${chapter.number}: ${chapter.title}</h3>
                    <p>${chapter.description}</p>
                </div>
            </div>
            <div class="chapter-meta">
                <span>${chapter.pages}</span>
                <span>${chapter.size}</span>
            </div>
            <button class="download-btn" onclick="downloadResource('${tabName}', ${chapter.number})">
                <span>⬇️</span> Download ${tabTitles[tabName]}
            </button>
        `;
        gridElement.appendChild(card);
    });
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'info') {
    const colors = {
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FF9800',
        error: '#F44336'
    };
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: ${colors[type] || colors.info}; 
                    color: white; padding: 1rem 1.5rem; border-radius: 8px; 
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); z-index: 10000; 
                    min-width: 300px; display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 1.5rem;">${icons[type] || 'ℹ️'}</span>
            <div>
                <strong>${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Info'}</strong>
                <p style="margin: 0; font-size: 0.9rem;">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ DOWNLOAD/UPLOAD FUNCTIONS ============
function downloadResource(type, chapter) {
    const tabTitles = {
        'notes': 'Study Notes',
        'homework': 'Homework Assignment',
        'books': 'Textbook Chapter',
        'quizzes': 'Practice Quiz'
    };
    
    showNotification(`${tabTitles[type]} - Chapter ${chapter} is downloading...`, 'info');
    
    setTimeout(() => {
        showNotification(`${tabTitles[type]} - Chapter ${chapter} downloaded successfully!`, 'success');
    }, 2000);
}

function showUploadForm(contentType) {
    const uploadSection = document.getElementById('uploadSection');
    if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
        const contentTypeSelect = document.getElementById('contentType');
        if (contentTypeSelect) {
            contentTypeSelect.value = contentType;
        }
    }
}

function uploadContent() {
    const title = document.getElementById('contentTitle').value;
    const chapter = document.getElementById('contentChapter').value;
    
    if (!title || !chapter) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    showNotification(`"${title}" is uploading...`, 'info');
    
    setTimeout(() => {
        showNotification(`"${title}" has been uploaded successfully!`, 'success');
        document.getElementById('contentTitle').value = '';
        document.getElementById('contentChapter').value = '';
        document.getElementById('contentFile').value = '';
    }, 2000);
}

// ============ USER MANAGEMENT ============
let currentUser = null;

function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    if (menu) {
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    }
}

function goToProfile() {
    showNotification("Profile page coming soon!", "info");
}

function goToSettings() {
    showNotification("Settings page coming soon!", "info");
}

function logout() {
    showNotification('Logging out...', 'info');
    
    setTimeout(() => {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        
        if (window.location.pathname.includes('teacher')) {
            navigateTo('teacher-login.html');
        } else {
            navigateTo('student-auth.html');
        }
    }, 1000);
}

// ============ PAGE INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    // FIX BACK BUTTONS - WORKING ON FIRST CLICK
    document.querySelectorAll('.back-btn').forEach(button => {
        // Remove any onclick attribute first
        button.removeAttribute('onclick');
        
        // Add fresh click event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goBack();
        });
    });

    // Add has-back-btn class to headers with back buttons
    document.querySelectorAll('.header').forEach(header => {
        if (header.querySelector('.back-btn')) {
            header.classList.add('has-back-btn');
        }
    });

    // Set class info on subject select page
    const classInfoElement = document.getElementById('classInfo');
    if (classInfoElement) {
        const storedClass = sessionStorage.getItem('selectedClass') || 6;
        classInfoElement.textContent = `Class ${storedClass}`;
    }

    // Set subject title on resource page
    const subjectTitleElement = document.getElementById('subjectTitle');
    if (subjectTitleElement) {
        const storedSubject = sessionStorage.getItem('selectedSubject') || 'science';
        const subjectNames = {
            'science': 'Science',
            'mathematics': 'Mathematics',
            'english': 'English',
            'social': 'Social Studies',
            'computer': 'Computer'
        };
        subjectTitleElement.textContent = subjectNames[storedSubject] || 'Science';
        
        // Load initial tab content
        loadTabContent('notes');
    }

    // Handle student login form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('studentPassword').value;
            
            if (studentId && password) {
                currentUser = {
                    type: 'student',
                    id: studentId,
                    name: studentId, // Use actual ID as name
                    class: sessionStorage.getItem('selectedClass') || 6
                };
                
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                showNotification(`Welcome ${studentId}!`, 'success');
                
                setTimeout(() => {
                    navigateTo('class-select.html');
                }, 1000);
            } else {
                showNotification('Please enter student ID and password', 'error');
            }
        });
    }
    
    // Handle teacher login form
    const teacherLoginForm = document.getElementById('loginForm');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                currentUser = {
                    type: 'teacher',
                    username: username,
                    name: username, // Use actual username as name
                    email: username + '@lumenco.edu'
                };
                
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                showNotification(`Welcome ${username}!`, 'success');
                
                setTimeout(() => {
                    navigateTo('teacher-dashboard.html');
                }, 1000);
            }
        });
    }
    
    // Load user info if logged in
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUserUI();
            updateWelcomeMessage();
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-info')) {
            const menus = document.querySelectorAll('.user-menu');
            menus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
    
    // Initialize any existing user menu buttons
    initializeUserMenuButtons();
});

// Initialize user menu button handlers
function initializeUserMenuButtons() {
    document.querySelectorAll('.user-menu .profile-btn, .user-menu .settings-btn, .user-menu .logout-btn').forEach(button => {
        if (button.classList.contains('profile-btn')) {
            button.onclick = goToProfile;
        } else if (button.classList.contains('settings-btn')) {
            button.onclick = goToSettings;
        } else if (button.classList.contains('logout-btn')) {
            button.onclick = logout;
        }
    });
}

// Update user interface with actual username
function updateUserUI() {
    document.querySelectorAll('.user-info').forEach(element => {
        if (currentUser) {
            element.innerHTML = `
                <span class="user-icon">${currentUser.type === 'teacher' ? '👩‍🏫' : '👨‍🎓'}</span>
                <span>${currentUser.name} ▾</span>
                <div class="user-menu" id="userMenu">
                    <button class="profile-btn">👤 Profile</button>
                    <button class="settings-btn">⚙️ Settings</button>
                    <hr>
                    <button class="logout-btn">🔐 Logout</button>
                </div>
            `;
            
            // Re-attach event listeners
            element.onclick = toggleUserMenu;
            
            // Attach click handlers to menu buttons
            const menu = element.querySelector('.user-menu');
            if (menu) {
                menu.querySelector('.profile-btn').onclick = goToProfile;
                menu.querySelector('.settings-btn').onclick = goToSettings;
                menu.querySelector('.logout-btn').onclick = logout;
            }
        }
    });
}

// Update welcome message with actual username
function updateWelcomeMessage() {
    if (currentUser) {
        // Update dashboard welcome message
        const dashboardWelcome = document.querySelector('.dashboard-welcome h2');
        if (dashboardWelcome) {
            dashboardWelcome.textContent = `Welcome, ${currentUser.name}!`;
        }
        
        // Update login welcome messages
        const welcomeMessages = document.querySelectorAll('.login-header h2');
        welcomeMessages.forEach(element => {
            if (element.textContent.includes('Welcome') || element.textContent.includes('Educator')) {
                element.textContent = `Welcome, ${currentUser.name}!`;
            }
        });
    }
}