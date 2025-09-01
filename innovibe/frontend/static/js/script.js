import { doLogin, doLogout } from "./modules/auth.js";
import { saveUser, clearUser } from "./modules/helpers.js";

document.getElementById("form")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await doLogin(username, password);
    if (res.success) {
        const { id_user, username, role } = res.data ?? res;
        saveUser({ id_user, username, role });
        alert(`Login berhasil sebagai ${role}`);
        window.location.href = "dashboard.php";
    } else {
        alert(res.message);
    }
});

window.doLogoutHandler = async function () {
    await doLogout();
    clearUser();
    alert("Logout berhasil");
    window.location.href = "index.php";
};
