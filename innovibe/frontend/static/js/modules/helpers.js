export function requireLogin() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
      window.location.href = "index.php";
  }
  return user;
}

// simpan user ke sessionStorage
export function saveUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

// hapus user dari sessionStorage
export function clearUser() {
  sessionStorage.removeItem("user");
}
