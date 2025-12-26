---
layout: default
title: Form Pemesanan
permalink: /pesan/
---

<div class="container" style="padding: 4rem 1rem; max-width: 800px; margin: auto;">

    <h1 style="text-align: center; margin-bottom: 2rem;">Formulir Pemesanan</h1>
    
    <div style="background: var(--card-bg); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow);">
        
        <form id="orderForm">
            
            <h3 style="border-bottom: 2px solid var(--brand-gold); padding-bottom: 10px; margin-bottom: 1.5rem;">1. Pilih Produk</h3>
            
            {% for product in site.data.products %}
            <div class="product-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
                <div style="flex-grow: 1;">
                    <label for="product-{{ forloop.index }}" style="font-weight: bold; font-size: 1.1rem; display: block;">{{ product.name }}</label>
                    <span style="color: var(--brand-red); font-weight: bold;">Rp {{ product.price }}</span>
                    <span style="color: #666; font-size: 0.9rem;"> / {{ product.weight }}</span>
                </div>
                <div style="width: 100px;">
                    <input type="number" 
                           id="product-{{ forloop.index }}" 
                           name="{{ product.name }}" 
                           data-price="{{ product.price | replace: '.', '' }}" 
                           class="qty-input" 
                           min="0" 
                           value="0" 
                           aria-label="Jumlah {{ product.name }}"
                           style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; text-align: center; font-size: 1.1rem;">
                </div>
            </div>
            {% endfor %}

            <h3 style="border-bottom: 2px solid var(--brand-gold); padding-bottom: 10px; margin-bottom: 1.5rem;">2. Data Pengiriman</h3>

            <div style="margin-bottom: 1rem;">
                <label for="customer-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Nama Lengkap:</label>
                <input type="text" id="customer-name" placeholder="Contoh: Budi Santoso" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 1rem;">
                <label for="customer-address" style="display: block; margin-bottom: 5px; font-weight: bold;">Alamat Lengkap (Kecamatan & Kota):</label>
                <textarea id="customer-address" rows="3" placeholder="Contoh: Jl. H. Nawi, Larangan, Tangerang" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-family: inherit;"></textarea>
                <p style="font-size: 0.85rem; color: #666; margin-top: 5px;">*Ketik "Jakarta", "Tangerang", atau kota lain untuk estimasi ongkir otomatis.</p>
            </div>

            <div style="margin-bottom: 2rem;">
                <label for="customer-note" style="display: block; margin-bottom: 5px; font-weight: bold;">Catatan Tambahan (Opsional):</label>
                <input type="text" id="customer-note" placeholder="Contoh: Tolong packing bubble wrap tebal" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px;">
            </div>

            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px dashed #ccc;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Subtotal Produk:</span>
                    <span id="display-subtotal" style="font-weight: bold;">Rp 0</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: var(--brand-red);">
                    <span>Ongkir (Estimasi):</span>
                    <span id="display-ongkir" style="font-weight: bold;">Rp 0</span>
                </div>
                <hr style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: bold;">
                    <span>Total Bayar:</span>
                    <span id="display-total">Rp 0</span>
                </div>
                <p id="ongkir-note" style="font-size: 0.85rem; color: #888; text-align: right; font-style: italic; margin-top: 5px;"></p>
            </div>

            <button type="button" onclick="kirimWhatsApp()" class="button btn-large" style="width: 100%; background: var(--brand-green); border: none;">
                <span style="margin-right: 8px;">📱</span> Pesan via WhatsApp
            </button>

        </form>
    </div>

</div>

<script>
    const inputs = document.querySelectorAll('.qty-input');
    const addressInput = document.getElementById('customer-address');
    
    // Element Display
    const dispSub = document.getElementById('display-subtotal');
    const dispOngkir = document.getElementById('display-ongkir');
    const dispTotal = document.getElementById('display-total');
    const noteOngkir = document.getElementById('ongkir-note');

    let subtotal = 0;
    let ongkir = 0;
    let total = 0;

    // --- 1. HITUNG SUBTOTAL PRODUK ---
    function calculateSubtotal() {
        subtotal = 0;
        inputs.forEach(input => {
            const price = parseInt(input.getAttribute('data-price')) || 0;
            const qty = parseInt(input.value) || 0;
            subtotal += price * qty;
        });
        calculateFinal();
    }

    // --- 2. HITUNG ONGKIR OTOMATIS (LOGIKA PINTAR) ---
    function checkOngkir() {
        const addr = addressInput.value.toLowerCase();
        
        // Aturan Ongkir (Bisa disesuaikan harganya)
        // Zona 1: Dekat (Larangan, Ciledug, Bintaro, Jaksel, Tangerang Kota)
        if (addr.includes('larangan') || addr.includes('ciledug') || addr.includes('bintaro') || 
            addr.includes('jakarta') || addr.includes('tangerang')) {
            ongkir = 10000; // Flat Rate Dekat
            noteOngkir.innerText = "Estimasi: Jabodetabek Area (Reguler/Sameday)";
            noteOngkir.style.color = "green";
        
        // Zona 2: Agak Jauh (Depok, Bekasi, Bogor)
        } else if (addr.includes('depok') || addr.includes('bekasi') || addr.includes('bogor') || addr.includes('tangsel')) {
            ongkir = 20000; 
            noteOngkir.innerText = "Estimasi: Bodetabek Area";
            noteOngkir.style.color = "orange";
        
        // Zona 3: Luar Kota / Belum diketik
        } else if (addr.length > 5) {
            ongkir = 0; 
            noteOngkir.innerText = "Luar jangkauan deteksi otomatis. Ongkir dicek Admin nanti.";
            noteOngkir.style.color = "red";
        } else {
            ongkir = 0;
            noteOngkir.innerText = "";
        }

        calculateFinal();
    }

    // --- 3. HITUNG TOTAL AKHIR ---
    function calculateFinal() {
        // Jika alamat luar kota (ongkir 0), total hanya subtotal
        total = subtotal + ongkir;

        // Render ke HTML
        dispSub.innerText = "Rp " + subtotal.toLocaleString('id-ID');
        
        if (ongkir > 0) {
            dispOngkir.innerText = "Rp " + ongkir.toLocaleString('id-ID');
        } else if (addressInput.value.length > 5) {
            dispOngkir.innerText = "Cek Admin";
        } else {
            dispOngkir.innerText = "Rp 0";
        }

        dispTotal.innerText = "Rp " + total.toLocaleString('id-ID');
    }

    // Event Listeners (Agar real-time)
    inputs.forEach(input => { input.addEventListener('input', calculateSubtotal); });
    addressInput.addEventListener('input', checkOngkir); // Cek ongkir saat ngetik alamat

    // --- 4. KIRIM WHATSAPP ---
    function kirimWhatsApp() {
        const nama = document.getElementById('customer-name').value;
        const alamat = document.getElementById('customer-address').value;
        const catatan = document.getElementById('customer-note').value;
        
        if (nama === "" || alamat === "") { alert("Mohon isi Nama dan Alamat dulu ya!"); return; }
        if (subtotal === 0) { alert("Pilih minimal satu produk dulu!"); return; }

        let pesananList = "";
        inputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                pesananList += `- ${input.name}: ${qty} pcs\n`;
            }
        });

        let textWA = `Halo Mulya Cuisine, saya mau pesan:\n\n${pesananList}\n`;
        textWA += `Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n`;
        
        if (ongkir > 0) {
            textWA += `Estimasi Ongkir: Rp ${ongkir.toLocaleString('id-ID')}\n`;
            textWA += `*Total Transfer: Rp ${total.toLocaleString('id-ID')}*\n`;
        } else {
            textWA += `Ongkir: Mohon dicek manual\n`;
        }

        textWA += `--------------------------------\n`;
        textWA += `👤 Nama: ${nama}\n`;
        textWA += `📍 Alamat: ${alamat}\n`;
        if (catatan) textWA += `📝 Catatan: ${catatan}\n`;
        
        const nomorWA = "{{ site.owner.whatsapp }}";
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(textWA)}`, '_blank');
    }
</script>
