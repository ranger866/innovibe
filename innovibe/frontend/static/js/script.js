import { doLogin, doLogout } from "./modules/auth.js";
import { getAll, getOne, create, update, remove } from "./modules/crud.js";
import { print } from "./modules/utils.js";

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
        alert(`Login berhasil sebagai ${role}`);
        window.location.href = "http://siat.local/dashboard.php";
    } else {
        alert(res.message);
    }
});

window.doLogoutHandler = async function () {
    const res = await doLogout();
    print(res);
    alert("Logout berhasil");
};