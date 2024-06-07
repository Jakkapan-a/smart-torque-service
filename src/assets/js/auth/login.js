document.addEventListener('DOMContentLoaded', function() {
    // form login
    const formLogin = document.querySelector('#form-login');
    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();
        // get data form login
        const formData = new FormData(formLogin);
        
        // fetch data login
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if(response.status === 201) {
            const result = await response.json();
            console.log(result);
            const token = result.access_token;
            localStorage.setItem('token', token);
            alert("Login successfully!");
            window.location.href = '/';
        }else{
            alert("Failed username or password is wrong!");
        }
    });
});