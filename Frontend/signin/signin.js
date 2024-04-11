
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signinButton = document.getElementById('signin');
    const alertContainer = document.getElementById('alert-container');
    const studentEl=document.getElementById('studentlink');
    const interviewEl=document.getElementById('interviewlink');
    studentEl.style.display="none";
    interviewEl.style.display="none"

    function toggleSigninButton() {
        signinButton.disabled = !(emailInput.value.trim() && passwordInput.value.trim());
    }

    emailInput.addEventListener('input', toggleSigninButton);
    passwordInput.addEventListener('input', toggleSigninButton);

    signinButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        try {
            const response = await axios.post('http://localhost:3100/api/user/signin', formData);
            const data = response.data;
            if (data.success) {
                // Store the token in session storage
                sessionStorage.setItem('jwtToken', data.token);
                const alertEl = document.createElement('div');
                alertEl.classList.add('alert', 'alert-success');
                alertEl.textContent = data.msg;
                alertContainer.appendChild(alertEl);
                setTimeout(() => {
                    window.location.href = '../students/students.html';
                }, 2000);
            }
        } catch (err) {
            const alertEl = document.createElement('div');
            alertEl.classList.add('alert', 'alert-danger');
            alertEl.textContent = err.response.data.res;
            alertContainer.appendChild(alertEl);
            setTimeout(() => {
                alertEl.remove();
            }, 5000);
        }
    });

    toggleSigninButton();
});
