// 🔒 Giriş kontrolü
if (localStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'admin-login.html';
}

// 🚪 Çıkış işlemi
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('isAdmin');
    window.location.href = 'admin-login.html';
});

// 🧭 Menü kontrolü
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// 🔄 Sayfa geçişleri
const navItems = document.querySelectorAll('.sidebar nav ul li[data-section]');
const panels = document.querySelectorAll('.panel');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const target = item.getAttribute('data-section');
        panels.forEach(p => p.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// ================================
// 📅 Rezervasyon Yönetimi
// ================================
let reservations = JSON.parse(localStorage.getItem('reservations')) || [
    {name: "Elif Yılmaz", date: "22/10/2025", people: 150, status: "Onaylandı"},
    {name: "Burak Kaya", date: "12/11/2025", people: 200, status: "Bekliyor"},
    {name: "Ayşe Demir", date: "30/12/2025", people: 180, status: "İptal"}
];

function renderReservations() {
    const table = document.getElementById('reservationTable');
    table.innerHTML = '';
    reservations.forEach((r, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.name}</td>
            <td>${r.date}</td>
            <td>${r.people}</td>
            <td><span class="status ${r.status.toLowerCase()}">${r.status}</span></td>
            <td>
                <button class="btn-success" onclick="updateStatus(${index}, 'Onaylandı')">✅</button>
                <button class="btn-cancel" onclick="updateStatus(${index}, 'İptal')">❌</button>
                <button class="btn-delete" onclick="deleteReservation(${index})">🗑️</button>
            </td>
        `;
        table.appendChild(tr);
    });
    document.getElementById('totalReservations').innerText = reservations.length;
}

function updateStatus(index, status) {
    reservations[index].status = status;
    saveReservations();
    renderReservations();
}

function deleteReservation(index) {
    if(confirm("Bu rezervasyonu silmek istediğine emin misin?")){
        reservations.splice(index, 1);
        saveReservations();
        renderReservations();
    }
}

function saveReservations() {
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

renderReservations();

// ================================
// ✍️ Yazı Ekleme
// ================================
let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach((p, i) => {
        const li = document.createElement('li');
        li.classList.add('post-item');
        li.innerHTML = `
            <h4>${p.title}</h4>
            <p>${p.content}</p>
            <button class="btn-delete" onclick="deletePost(${i})">Sil</button>
        `;
        postList.appendChild(li);
    });
    document.getElementById('totalPosts').innerText = posts.length;
}

document.getElementById('addPostBtn').addEventListener('click', () => {
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    if(title && content){
        posts.push({title, content});
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
    } else {
        alert("Başlık ve içerik boş olamaz!");
    }
});

function deletePost(index){
    if(confirm("Bu yazıyı silmek istediğine emin misin?")){
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }
}

renderPosts();

// ================================
// 🖼️ Galeri Yönetimi
// ================================
let images = JSON.parse(localStorage.getItem('images')) || [];
const galleryPreview = document.getElementById('galleryPreview');

function renderGallery() {
    galleryPreview.innerHTML = '';
    images.forEach((src, i) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `<img src="${src}" alt="Image ${i+1}"><button class="btn-delete" onclick="deleteImage(${i})">🗑️</button>`;
        galleryPreview.appendChild(div);
    });
    document.getElementById('totalImages').innerText = images.length;
}

document.getElementById('uploadImage').addEventListener('change', function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            images.push(e.target.result);
            localStorage.setItem('images', JSON.stringify(images));
            renderGallery();
        }
        reader.readAsDataURL(file);
    }
});

function deleteImage(index){
    if(confirm("Bu görseli silmek istediğine emin misin?")){
        images.splice(index,1);
        localStorage.setItem('images', JSON.stringify(images));
        renderGallery();
    }
}

// Örnek blog ekleme fonksiyonu
function addBlogPost(title, content) {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const date = new Date().toLocaleDateString('tr-TR');

    blogPosts.push({title, content, date});
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    alert("Blog yazısı kaydedildi!");
}

document.getElementById('blogForm').addEventListener('submit', function(e){
    e.preventDefault();

    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();
    if(!title || !content){
        alert("Lütfen başlık ve içerik girin!");
        return;
    }

    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const date = new Date().toLocaleDateString('tr-TR');

    blogPosts.push({title, content, date});
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    alert("Blog yazısı kaydedildi!");
    this.reset();
});

document.getElementById('blogForm').addEventListener('submit', function(e){
    e.preventDefault();

    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();
    if(!title || !content){
        alert("Lütfen başlık ve içerik girin!");
        return;
    }

    // Mevcut blog yazılarını çek
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const date = new Date().toLocaleDateString('tr-TR');

    // Yeni yazıyı ekle
    blogPosts.push({title, content, date});

    // LocalStorage'a kaydet
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    alert("Blog yazısı kaydedildi!");
    this.reset();
});

document.getElementById('blogForm').addEventListener('submit', function(e){
    e.preventDefault();

    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();

    if(!title || !content){
        alert("Lütfen başlık ve içerik girin!");
        return;
    }

    // LocalStorage’dan mevcut yazıları çek
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    const date = new Date().toLocaleDateString('tr-TR');

    // Yeni yazıyı ekle
    blogPosts.push({ title, content, date });

    // LocalStorage’a kaydet
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    alert("Blog yazısı kaydedildi!");
    this.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  const reservationTable = document.getElementById('reservationTable');
  const totalReservations = document.getElementById('totalReservations');

  function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservationTable.innerHTML = '';

    reservations.forEach(res => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${res.name}</td>
        <td>${res.date}</td>
        <td>${res.people}</td>
        <td>${res.status}</td>
        <td>
          <button class="approve-btn" data-id="${res.id}">Onayla</button>
          <button class="reject-btn" data-id="${res.id}">Reddet</button>
          <button class="delete-btn" data-id="${res.id}">Sil</button>
        </td>
      `;
      reservationTable.appendChild(row);
    });

    totalReservations.textContent = reservations.length;
  }

  reservationTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = Number(e.target.getAttribute('data-id'));
      let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
      const index = reservations.findIndex(r => r.id === id);
      if (index !== -1) {
        if (e.target.classList.contains('approve-btn')) {
          reservations[index].status = 'Onaylandı';
        } else if (e.target.classList.contains('reject-btn')) {
          reservations[index].status = 'Reddedildi';
        } else if (e.target.classList.contains('delete-btn')) {
          reservations.splice(index, 1);
        }
        localStorage.setItem('reservations', JSON.stringify(reservations));
        loadReservations();
      }
    }
  });

  loadReservations();
});


renderGallery();
