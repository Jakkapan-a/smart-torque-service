/* <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div class="container">
              <a class="navbar-brand" href="#!">
                  <img src="/images/logo.png" alt="BootstrapBrain Logo" width="30">
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav ms-auto">
                      <li class="nav-item">
                          <a class="nav-link" href="/">Setting</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/service">Services</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link active" href="/auth/login">Login</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#" id="logout">Logout</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
       */
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