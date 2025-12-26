---
layout: default
title: Home
---

<section class="hero-section">
    <div class="container hero-content">
        <h1>Renyah. Gurih. <span class="text-highlight">Berdampak.</span></h1>
        <p class="hero-sub">Kentang Mustofa Jakarta resep asli Ibu Mulyati. Dibuat 100% dari Kentang Dieng tanpa pengawet.</p>
        <div class="hero-badges">
            <span class="badge">🛡️ Halal Certified</span>
            <span class="badge">🏠 Homemade</span>
        </div>
        <a href="#katalog" class="button btn-primary btn-large">Pesan Sekarang</a>
    </div>
</section>

<section class="impact-banner">
    <div class="container">
        <p>🎓 <strong>Beli 1, Bantu Pendidikan:</strong> Sebagian keuntungan penjualan didedikasikan untuk operasional pendidikan inklusif di <em>Dimaster Education</em>.</p>
    </div>
</section>

<section id="katalog" class="container product-section">
    <h2 class="section-title">Pilih Varian Favorit Keluarga</h2>
    <div class="product-grid">
        {% for product in site.data.products %}
        <article class="product-card">
            <div class="product-img-wrapper">
                <img src="{{ product.image | relative_url }}" alt="Kemasan {{ product.name }} isi {{ product.weight }}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="product-weight">{{ product.weight }}</p>
                <p class="product-desc">{{ product.desc }}</p>
                <div class="product-price">Rp {{ product.price }}</div>
                <a href="https://wa.me/{{ site.owner.whatsapp }}?text={{ product.wa_text | uri_escape }}" class="button btn-wa-product">
                    Pesan via WhatsApp
                </a>
            </div>
        </article>
        {% endfor %}
    </div>
</section>

<section class="proof-section container" style="margin-bottom: 4rem;">
    <h2 class="section-title">Kata Mereka</h2>
    
    <div id="testi-container" class="testi-grid" style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <p style="text-align:center; width:100%; color:#888;">Sedang memuat testimoni...</p>
    </div>

    <div style="text-align: center; margin-top: 2rem;">
        <button onclick="window.location.reload();" class="button" style="background: transparent; color: var(--brand-red) !important; border: 1px solid var(--brand-red);">
            ↻ Lihat Cerita Lainnya
        </button>
    </div>
</section>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Ambil data dari _data/testimoni.yml
        const allTestis = [
            {% for item in site.data.testimoni %}
            {
                name: {{ item.name | jsonify }},
                role: {{ item.role | jsonify }},
                image: {{ item.image | jsonify }},
                text: {{ item.text | jsonify }}
            },
            {% endfor %}
        ];

        // Jika data kosong, tampilkan pesan
        if (allTestis.length === 0) {
            document.getElementById('testi-container').innerHTML = "<p style='text-align:center;'>Belum ada testimoni.</p>";
            return;
        }

        // Fungsi Acak (Shuffle)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Jalankan pengacakan & ambil 6 data saja (limit)
        shuffleArray(allTestis);
        const selectedTestis = allTestis.slice(0, 6);

        // Render ke HTML
        const container = document.getElementById('testi-container');
        let htmlContent = "";

        selectedTestis.forEach(item => {
            htmlContent += `
            <figure class="testi-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; height: 100%; display: flex; flex-direction: column; text-align: left;">
                
                <div style="margin-bottom: 1rem; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;">
                    <img src="${item.image}" alt="" aria-hidden="true" style="width: 100%; height: auto; display: block;">
                </div>

                <figcaption style="flex-grow: 1; display: flex; flex-direction: column;">
                    <div class="rating-box" style="margin-bottom: 10px;" aria-label="Rating 5 Bintang">
                        <span class="stars" style="color: var(--brand-gold);">★★★★★</span>
                    </div>
                    
                    <blockquote style="font-style: italic; color: var(--text-color); margin: 0 0 1rem 0; font-size: 1rem; line-height: 1.6; flex-grow: 1;">
                        "${item.text}"
                    </blockquote>
                    
                    <div class="testi-author" style="margin-top: auto;">
                        <strong>— ${item.name}</strong>
                        <span style="font-size: 0.85rem; color: var(--text-muted); display: block;">${item.role}</span>
                    </div>
                </figcaption>
            </figure>
            `;
        });

        container.innerHTML = htmlContent;
    });
</script>
