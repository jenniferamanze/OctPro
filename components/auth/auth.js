document.addEventListener('DOMContentLoaded', function () {
	var loginTab = document.getElementById('loginTab');
	var signupTab = document.getElementById('signupTab');
	var loginForm = document.getElementById('loginForm');
	var signupForm = document.getElementById('signupForm');

	function showLogin() {
		loginTab.classList.add('active');
		signupTab.classList.remove('active');
		loginForm.classList.remove('hidden');
		signupForm.classList.add('hidden');
		loginTab.setAttribute('aria-selected', 'true');
		signupTab.setAttribute('aria-selected', 'false');
	}

	function showSignup() {
		signupTab.classList.add('active');
		loginTab.classList.remove('active');
		signupForm.classList.remove('hidden');
		loginForm.classList.add('hidden');
		signupTab.setAttribute('aria-selected', 'true');
		loginTab.setAttribute('aria-selected', 'false');
	}

	if (loginTab && signupTab) {
		loginTab.addEventListener('click', showLogin);
		signupTab.addEventListener('click', showSignup);
	}

	if (loginForm) {
		loginForm.addEventListener('submit', function (e) {
			e.preventDefault();
			window.location.href = 'components/dashboard/dashboard.html';
		});
	}

	if (signupForm) {
		signupForm.addEventListener('submit', function (e) {
			e.preventDefault();
			alert('Account created! Redirecting to dashboard...');
			setTimeout(function () {
				window.location.href = 'components/dashboard/dashboard.html';
			}, 1000);
		});
	}
});

