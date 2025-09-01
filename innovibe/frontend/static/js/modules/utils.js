export const API_URL = "http://50.50.50.150/api/api.php";

export function openModal(title, formHtml, onSubmit) {
  const modal = document.getElementById("globalModal");
  const modalTitle = document.getElementById("globalModalTitle");
  const modalForm = document.getElementById("globalModalForm");

  // Set judul modal
  modalTitle.textContent = title;

  // Sisipkan form dan tombol aksi
  modalForm.innerHTML = `
    ${formHtml}
    <div class="modal-actions">
      <button type="submit" class="save">💾 Simpan</button>
      <button type="button" class="cancel" id="closeModalBtn">❌ Batal</button>
    </div>
  `;

  // Tampilkan modal
  modal.classList.add("show");

  // Handler submit
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    const payload = {};
    formData.forEach((v, k) => (payload[k] = v));

    // Jalankan callback submit
    await onSubmit(payload);

    // Tutup modal
    closeModal();
  };

  modalForm.addEventListener("submit", submitHandler, { once: true });

  // Handler tombol close
  const closeBtn = modal.querySelector("#closeModalBtn");
  if (closeBtn) {
    closeBtn.onclick = () => closeModal();
  }

  // Tutup modal jika klik di luar form (overlay)
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

export function closeModal() {
  const modal = document.getElementById("globalModal");
  modal.classList.remove("show");

  // Bersihkan form agar tidak ada event atau data lama
  const modalForm = document.getElementById("globalModalForm");
  modalForm.innerHTML = "";
}
