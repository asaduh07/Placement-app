document.addEventListener('DOMContentLoaded', async function () {
    const companyInput = document.getElementById('cname');
    const addInterviewButton = document.getElementById('addinterview');
    const studentInput = document.getElementById('student');
    const dateInput = document.getElementById('date');
    const token = sessionStorage.getItem('jwtToken');
    const headers = { Authorization: `Bearer ${token}` }
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
        const response=await axios.get('https://placement-app-7bd1.onrender.com/api/user/logout');
        console.log(response.data);
        if(response.data.success){
            sessionStorage.removeItem('jwtToken');
            window.location.href='../signin/signin.html'
        }
    })


    try {
        const response = await axios.get('https://placement-app-7bd1.onrender.com/api/student/all',{headers});
        const students = response.data.res;
        students.forEach(student => {
            const optionElement = document.createElement('option');
            optionElement.value = student._id;
            optionElement.textContent = student.name;
            studentInput.appendChild(optionElement);
        });
    } catch (err) {
        console.log(err)
    }

    addInterviewButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const formData = {
            studentId: studentInput.value,
            company: companyInput.value,
            date: dateInput.value,
        }
        try {
            const response = await axios.post('https://placement-app-7bd1.onrender.com/api/company/add', formData,{headers});
            if (response.data.success) {
                window.location.href = './interview.html'
            }
        } catch (err) {
            console.log(err);
        }
    })

})