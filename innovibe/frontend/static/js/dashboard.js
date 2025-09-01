import { requireLogin } from "./modules/helpers.js";
import { getAll } from "./modules/crud.js";

document.addEventListener("DOMContentLoaded", async () => {
    const user = requireLogin();

    // tampilkan username di header
    const usernameDisplay = document.getElementById("usernameDisplay");
    if (user && usernameDisplay) {
        usernameDisplay.textContent = user.username;
    }

    // render sidebar sesuai role
    renderSidebar(user.role);

    // aktifkan highlight menu
    highlightActiveLink();

    // tampilkan data jumlah di beranda
    await loadDashboardMetrics();

    // toggle sidebar untuk mobile
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("show");
            overlay.classList.add("show");
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        });
    }
});

/* ===== RENDER SIDEBAR SESUAI ROLE ===== */
function renderSidebar(role) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    let menu = `
        <a href="#beranda" class="active">🏠 Beranda</a>
    `;

    const roleMenus = {
        admin: [
            { href: "#users", label: "👥 Data Users" },
            { href: "#matkul", label: "📘 Mata Kuliah" },
            { href: "#mahasiswa", label: "📋 Mahasiswa"},
            { href: "#prodi", label: "🏫 Data Prodi"}
        ],
        dosen: [
            { href: "#inputNilai", label: "✏️ Input Nilai" }
        ],
        kajur: [
            { href: "#rekapNilai", label: "📊 Rekap Nilai" }
        ]
    };

    if (roleMenus[role]) {
        roleMenus[role].forEach(item => {
            menu += `<a href="${item.href}">${item.label}</a>`;
        });
    }

    sidebar.innerHTML = `
        <h2>Menu</h2>
        ${menu}
    `;
}

/* ===== HIGHLIGHT & NAVIGASI MENU ===== */
function highlightActiveLink() {
    const links = document.querySelectorAll("#sidebar a");
    const sections = document.querySelectorAll("main section");

    function showSection(id) {
        sections.forEach(sec => {
            sec.style.display = sec.id === id ? "block" : "none";
        });
        // Simpan section aktif di hash URL
        if (id !== "beranda") {
            window.location.hash = id;
        } else {
            history.replaceState(null, null, " "); // hilangkan hash jika beranda
        }
    }

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // hapus active di semua
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // ambil target id dari href (#beranda, #users, dll)
            const targetId = link.getAttribute("href").replace("#", "");
            showSection(targetId);
        });
    });

    // Tampilkan default sesuai hash URL
    const hash = window.location.hash.replace("#", "");
    const defaultSection = hash || "beranda";

    // Aktifkan link sidebar sesuai hash
    links.forEach(l => l.classList.remove("active"));
    const activeLink = Array.from(links).find(l => l.getAttribute("href") === `#${defaultSection}`);
    if (activeLink) activeLink.classList.add("active");

    showSection(defaultSection);
}


/* ===== LOAD DASHBOARD DATA ===== */
async function loadDashboardMetrics() {
    try {
        const users = await getAll("users");
        const mahasiswa = await getAll("mahasiswa");
        const matkul = await getAll("mata_kuliah");

        document.getElementById("countUsers").textContent = users?.data?.length ?? 0;
        document.getElementById("countMahasiswa").textContent = mahasiswa?.data?.length ?? 0;
        document.getElementById("countMatkul").textContent = matkul?.data?.length ?? 0;
    } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
    }
}
