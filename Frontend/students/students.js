document.addEventListener('DOMContentLoaded', async function () {
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
    const token = sessionStorage.getItem('jwtToken');
    const headers = { Authorization: `Bearer ${token}` }
    try {
        const response = await axios.get('https://placement-app-7bd1.onrender.com/api/student/all', { headers });
        const students = response.data.res;
        const tableBody = document.querySelector('tbody');
        students.forEach((student, index) => {
            const rowEl = document.createElement('tr');

            // Create and append S.No. column
            const serialNumberCell = document.createElement('th');
            serialNumberCell.textContent = index + 1;
            rowEl.appendChild(serialNumberCell);

            // Create and append Name column
            const nameCell = document.createElement('td');
            nameCell.textContent = student.name;
            rowEl.appendChild(nameCell);

            // Create and append Batch column
            const batchCell = document.createElement('td');
            batchCell.textContent = student.batch;
            rowEl.appendChild(batchCell);

            // Create and append College column
            const collegeCell = document.createElement('td');
            collegeCell.textContent = student.college;
            rowEl.appendChild(collegeCell);

            // Create and append Scores column
            const scoresCell = document.createElement('td');
            scoresCell.textContent = student.courseScores.map(score => `${score.subject}: ${score.score}`).join(', ');
            rowEl.appendChild(scoresCell);

            // Create and append Status column
            const statusCell = document.createElement('td');
            statusCell.textContent = student.status;
            rowEl.appendChild(statusCell);

            tableBody.appendChild(rowEl); // Append the row to the table body
        });

        logoutlink.addEventListener('click',async()=>{
            const response=await axios.get('https://placement-app-7bd1.onrender.com/api/user/logout');
            console.log(response.data);
            if(response.data.success){
                sessionStorage.removeItem('jwtToken');
                window.location.href='../signin/signin.html'
            }
        })

        const downloadEl = document.getElementById('download-csv');
        downloadEl.addEventListener('click', async () => {
            const response = await axios.get('https://placement-app-7bd1.onrender.com/api/user/download-csv', {
                responseType: 'blob',
                headers: headers
            })

            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');

            // Simulate a click on the link to trigger the download
            link.click();

            // Clean up by revoking the object URL
            window.URL.revokeObjectURL(url);
        })

    } catch (err) {
        console.log(err);
    }
})