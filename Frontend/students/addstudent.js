document.addEventListener('DOMContentLoaded', function () {
    const alertContainer = document.getElementById('alert-container');
    const nameInput = document.getElementById('name');
    const batchInput = document.getElementById('batch');
    const collegeInput = document.getElementById('college');
    const statusInput = document.getElementById('status')
    const DSAScoreInput = document.getElementById('dsaScore');
    const webdScoreInput = document.getElementById('webdScore');
    const reactScoreInput = document.getElementById('reactScore');
    const submitButton = document.getElementById('addstudent');
    const navEl = document.getElementById('nav');
    const signupEl = document.getElementById('signuplink');
    const signinEl = document.getElementById('signinlink');
    signupEl.style.display = 'none';
    signinEl.style.display = 'none';
    const logoutEl = document.createElement('li');
    logoutEl.classList.add('nav-item');
    const logoutlink = document.createElement('a');
    logoutlink.classList.add('nav-link', 'text-white');
    logoutlink.textContent = 'Logout';
    logoutlink.href = '#';
    logoutEl.appendChild(logoutlink);
    navEl.appendChild(logoutEl);

    logoutlink.addEventListener('click',async()=>{
        const response=await axios.get('https://placement-app-2ph4.onrender.com/api/user/logout');
        console.log(response.data);
        if(response.data.success){
            sessionStorage.removeItem('jwtToken');
            window.location.href='../signin/signin.html'
        }
    })


    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const formData = {
            name: nameInput.value,
            batch: batchInput.value,
            college: collegeInput.value,
            status: statusInput.value,
            courseScores: [
                {
                    subject: 'DSA',
                    score: DSAScoreInput.value
                },
                {
                    subject: 'WebD',
                    score: webdScoreInput.value
                },
                {
                    subject: 'React',
                    score: reactScoreInput.value
                }
            ]
        };
        try {
            const token = sessionStorage.getItem('jwtToken');
            const headers = { Authorization: `Bearer ${token}` }
            const response = await axios.post('https://placement-app-2ph4.onrender.com/api/student/add', 
                formData,{headers: headers}
            );

            if (response.data.success) {
                const alertEl = document.createElement('div');
                alertEl.classList.add('alert', 'alert-success');
                alertEl.textContent = "Student added successfully";
                alertContainer.appendChild(alertEl);
                setTimeout(() => {
                    window.location.href = './students.html'
                }, 3000)

            }

        } catch (err) {
            const alertEl = document.createElement('div');
            alertEl.classList.add('alert', 'alert-danger');
            alertEl.textContent = err.response.data;
            alertContainer.appendChild(alertEl);
            setTimeout(() => {
                alertEl.remove();
            }, 5000)

        }
    })
})