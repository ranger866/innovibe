import { requireLogin } from "./modules/helpers.js";
import { getAll, create, update, remove} from "./modules/crud.js";

document.addEventListener("DOMContentLoaded", () => {
    const user = requireLogin();

    // tampilkan username
    const usernameDisplay = document.getElementById("usernameDisplay");
    if (user && usernameDisplay) {
        usernameDisplay.textContent = user.username;
    }

    // render sidebar sesuai role
    renderSidebar(user.role);

    highlightActiveLink();

    // toggle sidebar di mobile
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const overlay = document.getElementById("overlay");

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("show");
            overlay.classList.add("show");
        });
    }

    if (closeSidebar && sidebar && overlay) {
        closeSidebar.addEventListener("click", () => {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        });
    }
});

// ========== Sidebar Renderer ==========
function renderSidebar(role) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    let menu = `
        <a href="#beranda" class="active">🏠 Beranda</a>
    `;

    // mapping role → menu tambahan
    const roleMenus = {
        admin: [
            { href: "#artikel", label: "📰 Artikel" },
            { href: "#users", label: "👥 Data Users" },
            { href: "#matkul", label: "📘 Mata Kuliah" }
        ],
        dosen: [
            { href: "#artikel", label: "📰 Artikel" },
            { href: "#input-nilai", label: "✏️ Input Nilai" }
        ],
        kajur: [
            { href: "#artikel", label: "📰 Artikel" },
            { href: "#rekap-nilai", label: "📊 Lihat Rekap Nilai" }
        ]
    };

    // jika role ada di config, tambah menunya
    if (roleMenus[role]) {
        roleMenus[role].forEach(item => {
            menu += `<a href="${item.href}">${item.label}</a>`;
        });
    }

    // sisipkan tombol close di atas menu
    sidebar.innerHTML = `
    <span>
        <h2>Menu</h2>
    </span>
    ${menu}
    `;
}

function highlightActiveLink() {
    const links = document.querySelectorAll("#sidebar a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            // hapus aktif dari semua link
            links.forEach(l => l.classList.remove("active"));
            // beri aktif ke link yang diklik
            link.classList.add("active");
        });
    });
}

function getAllData(table) {
    getAll(table);
    
}