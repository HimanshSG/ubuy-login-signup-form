// tab switching
var tabs = document.querySelectorAll('.tab');
var forms = document.querySelectorAll('.form');

tabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    tabs.forEach(function(t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');

    forms.forEach(function(f) {
      f.classList.remove('active');
    });

    var targetName = tab.getAttribute('data-tab');
    document.getElementById(targetName + '-form').classList.add('active');
  });
});

// login mode toggle
var loginModes = document.querySelectorAll('#login-form .mode');
var loginPasswordField = document.querySelector('#login-form .password-field');
var loginOtpBlock = document.querySelector('#login-form .otp-block');
var loginForgot = document.querySelector('#login-form .forgot');

loginModes.forEach(function(btn) {
  btn.addEventListener('click', function() {
    loginModes.forEach(function(m) {
      m.classList.remove('active');
    });
    btn.classList.add('active');

    var mode = btn.getAttribute('data-mode');

    if (mode === 'password') {
      loginPasswordField.classList.remove('hidden');
      loginOtpBlock.classList.add('hidden');
      loginForgot.classList.remove('hidden');
    } else {
      loginPasswordField.classList.add('hidden');
      loginOtpBlock.classList.remove('hidden');
      loginForgot.classList.add('hidden');
    }
  });
});

// signup mode toggle
var signupModes = document.querySelectorAll('#signup-form .mode');
var signupOtpBlock = document.querySelector('#signup-form .otp-block');
var signupPasswordFields = document.querySelector('#signup-form .password-fields');

signupModes.forEach(function(btn) {
  btn.addEventListener('click', function() {
    signupModes.forEach(function(m) {
      m.classList.remove('active');
    });
    btn.classList.add('active');

    var mode = btn.getAttribute('data-mode');

    if (mode === 'otp') {
      signupOtpBlock.classList.remove('hidden');
      signupPasswordFields.classList.add('hidden');
    } else {
      signupOtpBlock.classList.add('hidden');
      signupPasswordFields.classList.remove('hidden');
    }
  });
});

// password show hide
var loginEye = document.getElementById('toggle-login-pass');
var loginPass = document.getElementById('login-password');

loginEye.addEventListener('click', function() {
  var icon = loginEye.querySelector('i');
  if (loginPass.type === 'password') {
    loginPass.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    loginPass.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
});

var signupEye = document.getElementById('toggle-signup-pass');
var signupPass = document.getElementById('signup-password');

signupEye.addEventListener('click', function() {
  var icon = signupEye.querySelector('i');
  if (signupPass.type === 'password') {
    signupPass.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    signupPass.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
});

var signupConfirmEye = document.getElementById('toggle-signup-confirm');
var signupConfirm = document.getElementById('signup-confirm');

signupConfirmEye.addEventListener('click', function() {
  var icon = signupConfirmEye.querySelector('i');
  if (signupConfirm.type === 'password') {
    signupConfirm.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    signupConfirm.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
});

// get otp button
var getOtpBtn = document.getElementById('get-otp-btn');
var getOtpLogin = document.getElementById('get-otp-login');
var signupEmail = document.getElementById('signup-email');
var loginEmail = document.getElementById('login-email');

if (getOtpBtn) {
  getOtpBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var email = signupEmail.value;
    var err = document.getElementById('signup-email-error');
    if (email === '') {
      err.textContent = 'Please enter your email first';
      err.classList.add('show');
    } else {
      err.classList.remove('show');
    }
  });
}

if (getOtpLogin) {
  getOtpLogin.addEventListener('click', function(e) {
    e.preventDefault();
    var email = loginEmail.value;
    var err = document.getElementById('login-email-error');
    if (email === '') {
      err.textContent = 'Please enter your email first';
      err.classList.add('show');
    } else {
      err.classList.remove('show');
    }
  });
}

// welcome screen
var welcomeScreen = document.getElementById('welcome-screen');
var tabBar = document.getElementById('tab-bar');
var logoutBtn = document.getElementById('logout-btn');

function showWelcome() {
  loginForm.classList.remove('active');
  signupForm.classList.remove('active');
  tabBar.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
}

function showForms() {
  welcomeScreen.classList.add('hidden');
  tabBar.classList.remove('hidden');
  loginForm.classList.add('active');

  tabBar.querySelectorAll('.tab').forEach(function(t) {
    t.classList.remove('active');
  });
  tabBar.querySelector('[data-tab="login"]').classList.add('active');

  loginEmail.value = '';
  loginPass.value = '';
  document.getElementById('login-otp').value = '';
  document.getElementById('login-captcha').checked = false;

  signupEmail.value = '';
  signupPass.value = '';
  signupConfirm.value = '';
  document.getElementById('signup-otp').value = '';
  document.getElementById('signup-captcha').checked = false;

  document.querySelectorAll('.error').forEach(function(e) {
    e.classList.remove('show');
  });

  document.querySelectorAll('#login-form .mode').forEach(function(m) {
    m.classList.remove('active');
  });
  document.querySelector('#login-form .mode[data-mode="password"]').classList.add('active');
  loginPasswordField.classList.remove('hidden');
  loginOtpBlock.classList.add('hidden');
  loginForgot.classList.remove('hidden');

  document.querySelectorAll('#signup-form .mode').forEach(function(m) {
    m.classList.remove('active');
  });
  document.querySelector('#signup-form .mode[data-mode="otp"]').classList.add('active');
  signupOtpBlock.classList.remove('hidden');
  signupPasswordFields.classList.add('hidden');
}

logoutBtn.addEventListener('click', showForms);

// login validation
var loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var email = loginEmail.value;
  var emailErr = document.getElementById('login-email-error');
  var passErr = document.getElementById('login-pass-error');
  var captchaErr = document.getElementById('login-captcha-error');
  var captcha = document.getElementById('login-captcha');

  emailErr.classList.remove('show');
  passErr.classList.remove('show');
  captchaErr.classList.remove('show');

  if (email === '') {
    emailErr.textContent = 'Please enter your email address';
    emailErr.classList.add('show');
    return;
  }

  if (email.includes('@') === false || email.includes('.') === false) {
    emailErr.textContent = 'Please enter a valid email address';
    emailErr.classList.add('show');
    return;
  }

  var activeMode = document.querySelector('#login-form .mode.active').getAttribute('data-mode');

  if (activeMode === 'password') {
    if (loginPass.value === '') {
      passErr.textContent = 'Please enter your password';
      passErr.classList.add('show');
      return;
    }
    if (loginPass.value.length < 6) {
      passErr.textContent = 'Password must be at least 6 characters';
      passErr.classList.add('show');
      return;
    }
  } else {
    var otp = document.getElementById('login-otp').value;
    if (otp === '') {
      passErr.textContent = 'Please enter OTP';
      passErr.classList.add('show');
      return;
    }
    if (otp.length < 4) {
      passErr.textContent = 'Please enter a valid OTP';
      passErr.classList.add('show');
      return;
    }
  }

  if (captcha.checked === false) {
    captchaErr.textContent = 'Please verify you are not a robot';
    captchaErr.classList.add('show');
    return;
  }

  showWelcome();
});

// signup validation
var signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var email = signupEmail.value;
  var emailErr = document.getElementById('signup-email-error');
  var passErr = document.getElementById('signup-pass-error');
  var captchaErr = document.getElementById('signup-captcha-error');
  var captcha = document.getElementById('signup-captcha');

  emailErr.classList.remove('show');
  passErr.classList.remove('show');
  captchaErr.classList.remove('show');

  if (email === '') {
    emailErr.textContent = 'Please enter your email address';
    emailErr.classList.add('show');
    return;
  }

  if (email.includes('@') === false || email.includes('.') === false) {
    emailErr.textContent = 'Please enter a valid email address';
    emailErr.classList.add('show');
    return;
  }

  var activeMode = document.querySelector('#signup-form .mode.active').getAttribute('data-mode');

  if (activeMode === 'otp') {
    var otp = document.getElementById('signup-otp').value;
    if (otp === '') {
      passErr.textContent = 'Please enter OTP';
      passErr.classList.add('show');
      return;
    }
    if (otp.length < 4) {
      passErr.textContent = 'Please enter a valid OTP';
      passErr.classList.add('show');
      return;
    }
  } else {
    if (signupPass.value === '') {
      passErr.textContent = 'Please enter password';
      passErr.classList.add('show');
      return;
    }
    if (signupPass.value.length < 6) {
      passErr.textContent = 'Password must be at least 6 characters';
      passErr.classList.add('show');
      return;
    }
    if (signupConfirm.value === '') {
      passErr.textContent = 'Please confirm your password';
      passErr.classList.add('show');
      return;
    }
    if (signupPass.value !== signupConfirm.value) {
      passErr.textContent = 'Passwords do not match';
      passErr.classList.add('show');
      return;
    }
  }

  if (captcha.checked === false) {
    captchaErr.textContent = 'Please verify you are not a robot';
    captchaErr.classList.add('show');
    return;
  }

  showWelcome();
});