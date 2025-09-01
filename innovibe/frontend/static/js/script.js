import { doLogin, doLogout } from "./modules/auth.js";
import { saveUser, clearUser} from "./modules/helpers.js";

document.getElementById("form")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const role = document.querySelector("input[name='role']:checked")?.value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!role) {
        alert("Silakan pilih role terlebih dahulu");
        return;
    }

    const res = await doLogin(username, password);
    if (res.success) {
        const {user_id, username, role} = res;
        alert(`Login berhasil sebagai ${role}`);
        saveUser({user_id, username, role})
        window.location.href = "http://50.50.50.150/dashboard.php";
    } else {
        alert(res.message);
    }
});

window.doLogoutHandler = async function () {
    await doLogout();
    clearUser();
    alert("Logout berhasil");
    window.location.href = "http://50.50.50.150";
};