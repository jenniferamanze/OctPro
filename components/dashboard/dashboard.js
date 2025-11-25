document.addEventListener('DOMContentLoaded', function () {
    var logoutBtn = document.getElementById('logoutBtn');
    var actionItems = document.querySelectorAll('.action-item');

    // Update greeting based on time of day
    function updateGreeting() {
        var hour = new Date().getHours();
        var greeting = document.getElementById('greeting');
        var timeGreeting = '';

        if (hour < 12) {
            timeGreeting = 'Good morning';
        } else if (hour < 18) {
            timeGreeting = 'Good afternoon';
        } else {
            timeGreeting = 'Good evening';
        }

        greeting.textContent = timeGreeting + ', Jennifer!';
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../../index.html';
            }
        });
    }

    // Quick action handlers
    actionItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var actionTitle = item.querySelector('h4').textContent;
            handleQuickAction(actionTitle);
        });
    });

    function handleQuickAction(action) {
        if (action === 'Create New Task') {
            alert('Create New Task - Feature coming soon!');
        } else if (action === 'Track Expense') {
            alert('Track Expense - Feature coming soon!');
        } else if (action === 'Write Note') {
            alert('Write Note - Feature coming soon!');
        }
    }

    updateGreeting();
});
