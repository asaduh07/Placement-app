document.addEventListener('DOMContentLoaded', async function () {
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
        const response=await axios.get('https://placement-app-2ph4.onrender.com/api/user/logout');
        console.log(response.data);
        if(response.data.success){
            sessionStorage.removeItem('jwtToken');
            window.location.href='../signin/signin.html'
        }
    })
    try {
        const response = await axios.get('https://placement-app-2ph4.onrender.com/api/company/all',{headers});
        const tableBody = document.querySelector('.table tbody');
        const interviews = response.data.res;
        interviews.forEach((interview, index) => {
            const row = document.createElement('tr');

            // S.No. column
            const serialNumberCell = document.createElement('td');
            serialNumberCell.textContent = index + 1;
            row.appendChild(serialNumberCell);

            // Company column
            const companyCell = document.createElement('td');
            companyCell.textContent = interview.company;
            row.appendChild(companyCell);

            // Student column
            const studentCell = document.createElement('td');
            studentCell.textContent = interview.student.name;
            row.appendChild(studentCell);

            // Scheduled Date column
            const scheduledDateCell = document.createElement('td');
            scheduledDateCell.textContent = new Date(interview.date).toLocaleDateString();
            row.appendChild(scheduledDateCell);

            // Result column
            const resultCell = document.createElement('td');
            resultCell.classList.add('result')
            const resulttext = document.createElement('div');
            resulttext.textContent = interview.result;
            resultCell.appendChild(resulttext);

            const dropdown = document.createElement('select');
            dropdown.classList.add('form-control');
            dropdown.innerHTML = `
            <option value="">Select Options</option>
            <option value="PASS" ${interview.result === 'PASS' ? 'selected' : ''}>PASS</option>
            <option value="FAIL" ${interview.result === 'FAIL' ? 'selected' : ''}>FAIL</option>
            <option value="On Hold" ${interview.result === 'On Hold' ? 'selected' : ''}>On Hold</option>
            <option value="Didn’t Attempt" ${interview.result === 'Didn’t Attempt' ? 'selected' : ''}>Didn’t Attempt</option>
        `;
            dropdown.style.display = 'none'
            resultCell.appendChild(dropdown);

            // Create save button
            const saveButton = document.createElement('button');
            saveButton.classList.add('btn', 'btn-primary', 'btn-sm', 'ms-2');
            saveButton.textContent = 'Save';
            saveButton.style.display = 'none'
            saveButton.addEventListener('click', async (e) => {
                e.preventDefault();
                // Save functionality goes here
                // You can access the selected value from dropdown using dropdown.value
                const resultInput = dropdown.value;
                try {
                    const response = await axios.post(`https://placement-app-2ph4.onrender.com/api/company/${interview._id}`, { result: resultInput },{headers});
                    if (response.data.success) {
                        location.reload();
                    }


                } catch (err) {
                    console.log(err);
                }
                console.log('Save button clicked');
            });
            resultCell.appendChild(saveButton);
            // Create cancel button
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('btn', 'btn-light', 'btn-sm', 'ms-2');
            cancelButton.textContent = 'cancel';
            cancelButton.style.display = 'none'
            cancelButton.addEventListener('click', () => {
                // Save functionality goes here
                resulttext.style.display = 'block'
                icon.style.display = 'block'
                dropdown.style.display = 'none';
                saveButton.style.display = 'none';
                cancelButton.style.display = 'none';
            });
            resultCell.appendChild(cancelButton);



            const icon = document.createElement('i');


            icon.classList.add('fa-solid', 'fa-pen');
            resultCell.appendChild(icon);
            row.appendChild(resultCell);
            // Append the row to the table body
            tableBody.appendChild(row);
            icon.addEventListener('click', () => {
                resulttext.style.display = 'none'
                icon.style.display = 'none'
                dropdown.style.display = 'block';
                saveButton.style.display = 'block';
                cancelButton.style.display = 'block';
            })
        });


    } catch (err) {
        console.log(err);
    }
})