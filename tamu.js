// MENU TOGGLE
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('nav-active');
      const isExpanded = nav.classList.contains('nav-active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
});

// FORM TAMU
document.getElementById("guestForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();

  if (name === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }

  const listItem = document.createElement("li");
  listItem.className = "guest-item";
  listItem.innerHTML = `
    <span class="guest-name">${name}</span>
    <div class="guest-actions">
      <button class="done-btn" onclick="markDone(this)">Selesai</button>
      <button class="delete-btn" onclick="deleteEntry(this)">Hapus</button>
    </div>
  `;

  document.getElementById("guestList").appendChild(listItem);
  document.getElementById("guestForm").reset();
});

function markDone(button) {
  const item = button.closest(".guest-item").querySelector(".guest-name");
  item.style.textDecoration = "line-through";
  item.style.color = "gray";
}

function deleteEntry(button) {
  const listItem = button.closest(".guest-item");
  listItem.remove();
}

// FETCH KOMENTAR API
document.addEventListener("DOMContentLoaded", function () {
  fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil data JSON.");
      return response.json();
    })
    .then(data => {
      const list = document.getElementById("apiList");
      data.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${post.name}</strong> (${post.email}): ${post.body}`;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // Ambil kontainer media
  const mediaRow = document.getElementById('mediaRow');
  const API_KEY = '2fa141htuhUbBSWGT25SPWzVc35t5J2AyLpuH8KwCzHPpxfPkLxwivAJ';

  // Data gambar statis
  const photos = [
    {
      url: "https://images.pexels.com/photos/31887348/pexels-photo-31887348.jpeg",
      title: "Photo by zarif bir şiir"
    },
    {
      url: "https://images.pexels.com/photos/15676265/pexels-photo-15676265.jpeg",
      title: "Photo by casper somia"
    }
  ];

  // Tambahkan gambar ke mediaRow
  photos.forEach(photo => {
    const div = document.createElement("div");
    div.className = "media-item";
    div.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" />
      <p>${photo.title}</p>
    `;
    mediaRow.appendChild(div);
  });

  // Fungsi untuk menambahkan elemen video
  function addVideo(videoId, title) {
    fetch(`https://api.pexels.com/videos/videos/${videoId}`, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then(response => response.json())
      .then(data => {
        const videoFile = data.video_files.find(
          file => file.quality === 'sd' && file.file_type === 'video/mp4'
        );

        if (!videoFile) throw new Error("Video file tidak ditemukan.");

        const div = document.createElement("div");
        div.className = "media-item";
        div.innerHTML = `
          <video src="${videoFile.link}" autoplay muted loop controls></video>
          <p>${title}</p>
        `;
        mediaRow.appendChild(div);
      })
      .catch(error => {
        console.error("Gagal memuat video:", error);
      });
  }

  // Tambahkan 2 video dari Pexels
  addVideo('6550972', 'Video by Pexels');
  addVideo('4227548', 'Video by Neil Hedley');
});
