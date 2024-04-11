document.addEventListener('DOMContentLoaded', function () {
    const alertContainer = document.getElementById('alert-container');
    const NameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const setPasswordInput = document.getElementById('password');
    const signUpButton = document.getElementById('signup');
    const studentEl=document.getElementById('studentlink');
    const interviewEl=document.getElementById('interviewlink');
    studentEl.style.display="none";
    interviewEl.style.display="none"

    function toggleSignUpButton() {
        signUpButton.disabled = !(NameInput.value.trim() &&
            emailInput.value.trim() &&
            setPasswordInput.value.trim());
    }

    NameInput.addEventListener('input', toggleSignUpButton);
    emailInput.addEventListener('input', function () {
        toggleSignUpButton();

    });

    setPasswordInput.addEventListener('input', toggleSignUpButton);

    signUpButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const setPasswordValue = setPasswordInput.value.trim();

        try {
            const formData = {
                name: NameInput.value,
                email: emailInput.value,
                password: setPasswordInput.value,
            }
            const data = await axios.post('http://localhost:3100/api/user/signup', formData);
            if (data.data.success) {
                const alertEl = document.createElement('div');
                alertEl.classList.add('alert', 'alert-success');
                alertEl.textContent = "Signup successful";
                alertContainer.appendChild(alertEl);
                setTimeout(() => {
                    window.location.href = '../signin/signin.html'
                }, 3000)


            }

        } catch (err) {
            const alertEl = document.createElement('div');
            alertEl.classList.add('alert', 'alert-danger');
            alertEl.textContent = err.response.data.res;;
            alertContainer.appendChild(alertEl);
            setTimeout(() => {
                alertEl.remove();
            }, 5000)
        }


    });
    toggleSignUpButton();

    const eyeIcons = document.querySelectorAll('.fa-eye');
    eyeIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            const passwordField = this.parentElement.querySelector('input');

            // Toggle the type attribute of the input field
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }


        });
    });
});

