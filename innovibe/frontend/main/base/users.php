<section class="card" id="users" style="display:none;">
  <h2>👥 Data Users</h2>
  <button class="button-add" onclick="openAddUser()">➕ Tambah User</button>

  <div class="card">
    <table border="1" width="100%" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="usersTable">
        <!-- Data user akan dimuat lewat manage.js -->
      </tbody>
    </table>
  </div>
</section>
