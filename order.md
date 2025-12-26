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

            <div style="text-align: right; margin-bottom: 2rem; font-size: 1.2rem;">
                <strong>Perkiraan Total: </strong>
                <span id="total-price" style="color: var(--brand-red); font-weight: bold;">Rp 0</span>
            </div>

            <h3 style="border-bottom: 2px solid var(--brand-gold); padding-bottom: 10px; margin-bottom: 1.5rem;">2. Data Pengiriman</h3>

            <div style="margin-bottom: 1rem;">
                <label for="customer-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Nama Lengkap:</label>
                <input type="text" id="customer-name" placeholder="Contoh: Budi Santoso" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 1rem;">
                <label for="customer-address" style="display: block; margin-bottom: 5px; font-weight: bold;">Alamat Lengkap (Kecamatan & Kota):</label>
                <textarea id="customer-address" rows="3" placeholder="Contoh: Jl. Mawar No. 10, Kec. Tebet, Jakarta Selatan" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-family: inherit;"></textarea>
            </div>

            <div style="margin-bottom: 2rem;">
                <label for="customer-note" style="display: block; margin-bottom: 5px; font-weight: bold;">Catatan Tambahan (Opsional):</label>
                <input type="text" id="customer-note" placeholder="Contoh: Tolong packing bubble wrap tebal" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px;">
            </div>

            <button type="button" onclick="kirimWhatsApp()" class="button btn-large" style="width: 100%; background: var(--brand-green); border: none;">
                <span style="margin-right: 8px;">📱</span> Kirim Pesanan ke WhatsApp
            </button>
            <p style="text-align: center; font-size: 0.9rem; color: #666; margin-top: 10px;">
                *Anda akan diarahkan ke aplikasi WhatsApp untuk konfirmasi ongkir.
            </p>

        </form>
    </div>

</div>

<script>
    // 1. UPDATE TOTAL HARGA OTOMATIS
    const inputs = document.querySelectorAll('.qty-input');
    const totalDisplay = document.getElementById('total-price');

    function updateTotal() {
        let total = 0;
        inputs.forEach(input => {
            const price = parseInt(input.getAttribute('data-price')) || 0;
            const qty = parseInt(input.value) || 0;
            total += price * qty;
        });
        // Format ke Rupiah
        totalDisplay.innerText = "Rp " + total.toLocaleString('id-ID');
    }

    // Pasang 'pendengar' di setiap kolom input
    inputs.forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    // 2. FUNGSI KIRIM KE WHATSAPP
    function kirimWhatsApp() {
        const nama = document.getElementById('customer-name').value;
        const alamat = document.getElementById('customer-address').value;
        const catatan = document.getElementById('customer-note').value;
        
        // Validasi Nama & Alamat
        if (nama === "" || alamat === "") {
            alert("Mohon isi Nama dan Alamat dulu ya, Kak!");
            return;
        }

        // Susun Daftar Pesanan
        let pesananList = "";
        let adaPesanan = false;

        inputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const produkName = input.getAttribute('name');
                pesananList += `- ${produkName}: ${qty} pcs\n`;
                adaPesanan = true;
            }
        });

        if (!adaPesanan) {
            alert("Pilih minimal satu produk dulu ya, Kak!");
            return;
        }

        // Susun Pesan Akhir
        let textWA = `Halo Mulya Cuisine, saya mau pesan:\n\n${pesananList}\n`;
        textWA += `--------------------------------\n`;
        textWA += `👤 Nama: ${nama}\n`;
        textWA += `📍 Alamat: ${alamat}\n`;
        if (catatan !== "") {
            textWA += `📝 Catatan: ${catatan}\n`;
        }
        textWA += `--------------------------------\n`;
        textWA += `Mohon info total harga + ongkir ya. Terima kasih!`;

        // Kirim
        const nomorWA = "{{ site.owner.whatsapp }}";
        const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(textWA)}`;
        
        window.open(url, '_blank');
    }
</script>
