var userName = "John Doe"; // Example user name
const token = window.localStorage.getItem("token");

async function getUser() {
    try {
        const response = await fetch(`${baseUrl}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('User:', data);
        return data;
    } catch (error) {
        console.error('Error fetching user', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    var userInfo = document.getElementById('userInfo');
    var card = document.getElementById('floatingCard');
    var authLinks = document.getElementById('authLinks');
    const userdata = await getUser();
    console.log(userdata)
    if (token) {
        userInfo.innerHTML = `<div><p class="text-black nav-text">Welcome ${userdata.name} <a href="/frontend/" class="settings-icon"> <i class="fas fa-cog"></i></a></p> <button id="logoutBtn" class="logout-btn">Logout</button></div>`;
        card.innerHTML = `
            <h2 class="register-heading text-black">Review</h2>
            <div class="input-container">
                <input type="text" class="input-field bg-black text-white" placeholder="Name">
            </div>
            <div class="input-container">
                <input type="text" class="input-field bg-black text-white" placeholder="Location">
            </div>
            <div class="input-container">
                <input type="text" class="input-field bg-black text-white" placeholder="Cut">
            </div>
            <div class="input-container">
                <textarea type="text" class="input-field bg-black text-white" placeholder="Experience" rows="5"></textarea>
            </div>
            <div class="input-container">
                <input type="text" class="input-field bg-black text-white" placeholder="Rating">
                <button class="paper-plane-btn"><i class="fa fa-paper-plane"></i></button>
            </div>
            
        `;

        document.getElementById('logoutBtn').addEventListener('click', function () {
            window.localStorage.removeItem('token');
            window.location.href = "sign-in.html";
        });
    } else {
        authLinks.innerHTML = `
            <a class="nav-link me-3 mt-2" href="sign-in.html">Sign In</a>
            <a class="btn btn-dark register-btn text-caps" href="register.html">Register</a>
        `;
        card.innerHTML = '<a href="register.html">Sign In or Register to write a review</a>';
    }
});

document.getElementById('floatingBtn').addEventListener('click', function () {
    var card = document.getElementById('floatingCard');
    if (card.style.display === 'none' || card.style.display === '') {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
    }
});

document.addEventListener('click', function (event) {
    var card = document.getElementById('floatingCard');
    var floatingBtn = document.getElementById('floatingBtn');
    if (!card.contains(event.target) && !floatingBtn.contains(event.target)) {
        card.style.display = 'none';
    }
});