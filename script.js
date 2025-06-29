let nomorWhatsApp = "6283131810087";
let transaksi = [];
let produkTambahan = [];
const adminUsername = "admin";
const adminPassword = "fahdil123";

function kirimPesan(namaProduk, hargaProduk) {
  const waktu = new Date().toLocaleString('id-ID');
  const data = { produk: namaProduk, harga: hargaProduk, waktu };
  transaksi.push(data);
  localStorage.setItem('transaksiFAHDIL', JSON.stringify(transaksi));
  tampilkanTransaksi();

  const url = `https://wa.me/${nomorWhatsApp}?text=Halo, saya ingin membeli produk: ${namaProduk} seharga Rp${hargaProduk}`;
  window.open(url, '_blank');
}

function tampilkanTransaksi() {
  const list = document.getElementById('riwayat-transaksi');
  list.innerHTML = '';
  transaksi.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.waktu} - ${item.produk} (Rp${item.harga})`;
    list.appendChild(li);
  });
}

function updateNomorWA() {
  const input = document.getElementById('input-wa').value.trim();
  if (input) {
    nomorWhatsApp = input;
    document.getElementById('no-wa').textContent = `+${input}`;
    alert('Nomor WhatsApp berhasil diubah!');
  }
}

function loginOwner(e) {
  e.preventDefault();
  const user = document.getElementById('login-user').value;
  const pass = document.getElementById('login-pass').value;
  if (user === adminUsername && pass === adminPassword) {
    localStorage.setItem('isOwnerLoggedIn', 'true');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('owner-dashboard').classList.remove('hidden');
    tampilkanTransaksi();
  } else {
    alert('Username atau Password salah!');
  }
}

function logoutOwner() {
  localStorage.removeItem('isOwnerLoggedIn');
  location.reload();
}

function tambahProdukManual(e) {
  e.preventDefault();
  const nama = document.getElementById('nama-produk').value;
  const harga = document.getElementById('harga-produk').value;
  const gambar = document.getElementById('gambar-produk').value;

  const produk = { nama, harga, gambar };
  produkTambahan.push(produk);
  localStorage.setItem('produkTambahan', JSON.stringify(produkTambahan));
  renderProdukManual();
  e.target.reset();
}

function renderProdukManual() {
  const container = document.getElementById('produk-container');
  produkTambahan.forEach((item) => {
    const div = document.createElement('div');
    div.className = "bg-white shadow-xl rounded-2xl p-4 m-2 w-72";
    div.innerHTML = `
      <img src="${item.gambar}" class="rounded-xl mb-2 w-full h-40" />
      <h2 class="text-xl font-bold">${item.nama}</h2>
      <p class="text-gray-700">Harga: Rp${item.harga}</p>
      <button onclick="kirimPesan('${item.nama}', ${item.harga})" class="mt-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">Beli via WhatsApp</button>
    `;
    container.appendChild(div);
  });
}

function generateProdukDummy() {
  const container = document.getElementById('produk-container');
  for (let i = 1; i <= 100; i++) {
    const harga = Math.floor(Math.random() * 100000) + 10000;
    const div = document.createElement('div');
    div.className = "bg-white shadow-xl rounded-2xl p-4 m-2 w-72";
    div.innerHTML = `
      <img src="https://via.placeholder.com/250x150?text=Produk+${i}" class="rounded-xl mb-2 w-full h-40" />
      <h2 class="text-xl font-bold">Produk ${i}</h2>
      <p class="text-gray-700">Harga: Rp${harga}</p>
      <button onclick="kirimPesan('Produk ${i}', ${harga})" class="mt-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">Beli via WhatsApp</button>
    `;
    container.appendChild(div);
  }
}

function init() {
  generateProdukDummy();
  if (localStorage.getItem('produkTambahan')) {
    produkTambahan = JSON.parse(localStorage.getItem('produkTambahan'));
    renderProdukManual();
  }
  if (localStorage.getItem('transaksiFAHDIL')) {
    transaksi = JSON.parse(localStorage.getItem('transaksiFAHDIL'));
    tampilkanTransaksi();
  }
  if (localStorage.getItem('isOwnerLoggedIn') === 'true') {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('owner-dashboard').classList.remove('hidden');
  }
}

window.onload = init;
