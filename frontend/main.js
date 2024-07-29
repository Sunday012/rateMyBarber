const baseUrl = 'https://rate-my-barber.vercel.app'; // Replace with actual server URL when deployed

// Register User
async function registerUser(userData) {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
        console.log('User registered:', data);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// Login User
async function loginUser(loginData) {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        const data = await response.json();
        console.log('Login:', data);
        return data.jwtToken; 
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

// Add Barber Profile
async function addBarberProfile(barberData, token) {
    try {
        const response = await fetch(`${baseUrl}/barbers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(barberData)
        });
        const data = await response.json();
        console.log('Barber profile added:', data);
    } catch (error) {
        console.error('Error adding barber profile:', error);
    }
}

// Add Review
async function addReview(reviewData, token) {
    try {
        const response = await fetch(`${baseUrl}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reviewData)
        });
        const data = await response.json();
        console.log('Review added:', data);
    } catch (error) {
        console.error('Error adding review:', error);
    }
}

// Get Barber Reviews
async function getBarberReviews(barberId) {
    try {
        const response = await fetch(`${baseUrl}/barbers/${barberId}/reviews`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Barber reviews:', data);
        return data;
    } catch (error) {
        console.error('Error fetching barber reviews:', error);
    }
}

// Search Barbers or Reviews
async function search(query) {
    try {
        const response = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Search results:', data);
        return data;
    } catch (error) {
        console.error('Error searching:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const barberrole = document.getElementById('barber');
    const customerrole = document.getElementById('customer');
    let role = "";

    if (barberrole) {
        barberrole.onclick = function(e) {
            e.preventDefault();
            role = "barber";
            window.location.href = "register-barber.html";
        };
    }

    if (customerrole) {
        customerrole.onclick = function(e) {
            e.preventDefault();
            role = "customer";
            window.location.href = "register-customer.html";
        };
    }

    const barberRegisterForm = document.getElementById('barber_register_form');
    if (barberRegisterForm) {
        barberRegisterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const b_name = document.getElementById('barber_name').value.trim();
            const b_email = document.getElementById('barber_email').value.trim();
            const b_password = document.getElementById('barber_password').value.trim();
            const b_account_name = document.getElementById('barber_account_name').value.trim();

            const userData = { name: b_name, email: b_email, password: b_password, role: 'barber', account_name: b_account_name };
            console.log(userData);
            try {
                const user = await registerUser(userData);
                console.log(user)
                if (user && user.message === "user created successfully") {
                    setTimeout(() => {
                        window.location.href = "/frontend/sign-in.html";
                    }, 200);
                } else {
                    console.error('Registration failed:', user?.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    const customerRegisterForm = document.getElementById('customer_register_form');
    if (customerRegisterForm) {
        customerRegisterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const c_name = document.getElementById('customer_name').value.trim();
            const c_email = document.getElementById('customer_email').value.trim();
            const c_password = document.getElementById('customer_password').value.trim();
            const c_account_name = document.getElementById('customer_account_name').value.trim();

            const userData = { name: c_name, email: c_email, password: c_password, role: 'customer', account_name: c_account_name };
            console.log(userData);
            try {
                const user = await registerUser(userData);
                console.log(user)
                if (user && user.message === "user created successfully") {
                    setTimeout(() => {
                        window.location.href = "/frontend/sign-in.html";
                    }, 200);
                } else {
                    console.error('Registration failed:', user?.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('user_email').value.trim();
            const password = document.getElementById('user_password').value.trim();

            const loginData = { email, password };
            const token = await loginUser(loginData);
            window.localStorage.setItem('token', token);
            console.log(token);
            if (token) {
                window.location.href = "/frontend/"
            }

            // Use the token for authenticated requests
            // if (token) {
            //     // Example: Add a barber profile
            //     // const barberData = {
            //     //     name: 'Barber Name',
            //     //     location: 'Location',
            //     //     barber_shop_name: 'Shop Name',
            //     //     expertise: 'Expertise',
            //     //     phone_number: 'Phone Number',
            //     //     account_name: 'Account Name'
            //     // };
            //     // await addBarberProfile(barberData, token);
            // }
        });
    }
});
