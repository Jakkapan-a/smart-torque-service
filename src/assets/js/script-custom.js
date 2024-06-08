function setActiveMenuItem() {
    var path = window.location.pathname;
    var menuItem = document.querySelectorAll('.nav-link');
    menuItem.forEach(function(item) {
        if (item.getAttribute('href') === path) {
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
}

const authCheck = async (redirect_path) => {
    const token = localStorage.getItem('token');
    const current_path = window.location.pathname;
    redirect_path = redirect_path || '/auth/login';

    // fetch data login
   const auth_check = await fetch('/auth/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if(auth_check.status === 201 || auth_check.status === 200) {
        // const result = await auth_check.json();
        // console.log(result);
        // window.location.href = "/";
    }
    else if(current_path !== redirect_path)
    {
        window.location.href = redirect_path;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveMenuItem();
    // Logout
    const logoutBtn = document.querySelector('#logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }

    authCheck('/auth/login');
    // Hide menu login when user has logged in
    const token = localStorage.getItem('token');
    const menuLogin = document.querySelector('.menu-login');
    const menuLogout = document.querySelector('.menu-logout');
    if (token) {
        menuLogin.style.display = 'none';
        menuLogout.style.display = 'block';
    }else{
        menuLogin.style.display = 'block';
        menuLogout.style.display = 'none';
    }
});