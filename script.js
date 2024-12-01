document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");
  const attendanceSection = document.getElementById("attendance-section");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const attendanceForm = document.getElementById("attendance-form");

  const userInfo = document.getElementById("user-info");
  const userRole = document.getElementById("user-role");
  const classSelect = document.getElementById("class-select");
  const attendanceList = document.getElementById("attendance-list");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

  function showLogin() {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    attendanceSection.style.display = "none";
  }

  function showRegister() {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    attendanceSection.style.display = "none";
  }

  function showAttendance(username, role) {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    attendanceSection.style.display = "block";

    userInfo.textContent = `Username: ${username}`;
    userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);

    // Load attendance list
    attendanceList.innerHTML = attendance
      .filter(a => a.username === username)
      .map(a => `<li>${a.date} - ${a.class}</li>`)
      .join("");
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const user = users.find(u => u.username === username && u.password === password && u.role === role);
    if (user) {
      showAttendance(username, user.role);
    } else {
      alert("Invalid username or password");
    }
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    if (users.some(u => u.username === username)) {
      alert("Username already exists");
    } else {
      users.push({ username, password, role });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully");
      showLogin();
    }
  });

  attendanceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = userInfo.textContent.split(": ")[1];
    const selectedClass = classSelect.value;
    const today = new Date().toLocaleDateString();

    attendance.push({ username, class: selectedClass, date: today });
    localStorage.setItem("attendance", JSON.stringify(attendance));
    alert("Attendance marked!");
    showAttendance(username, userRole.textContent.toLowerCase());
  });

  function logout() {
    showLogin();
  }

  // Initialize
  showLogin();
});
