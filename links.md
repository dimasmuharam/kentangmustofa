---
layout: default
title: Official Links
permalink: /links/
---

<style>
    /* Wadah Utama yang Sempit (Mobile Look) */
    .bio-container {
        max-width: 480px; /* Lebar standar HP */
        margin: 0 auto;
        padding: 4rem 1.5rem;
        text-align: center;
    }

    /* Foto Profil Bulat */
    .bio-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 4px solid var(--brand-gold);
        object-fit: contain; /* Agar logo tidak terpotong */
        background: white;
        margin-bottom: 1rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    /* Teks Header */
    .bio-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: var(--brand-red);
    }
    .bio-desc {
        color: #666;
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    /* Tombol-tombol Link */
    .bio-links {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .bio-btn {
        display: flex;
        align-items: center; /* Ikon dan Teks sejajar vertikal */
        justify-content: center; /* Teks di tengah */
        width: 100%;
        padding: 16px 20px;
        border-radius: 50px; /* Bentuk Pil */
        text-decoration: none;
        font-weight: bold;
        font-size: 1.05rem;
        transition: transform 0.2s, box-shadow 0.2s;
        border: 2px solid transparent;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        position: relative;
    }

    .bio-btn:hover {
        transform: translateY(-3px); /* Efek naik dikit pas disentuh */
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        text-decoration: none;
    }

    /* Warna-warna Tombol */
    .btn-main {
        background-color: var(--brand-red);
        color: white !important;
        border: 2px solid var(--brand-red);
    }
    
    .btn-wa {
        background-color: #25D366;
        color: white !important;
    }

    .btn-outline {
        background-color: white;
        color: var(--text-color) !important;
        border: 2px solid #ddd;
    }
    .btn-outline:hover {
        border-color: var(--brand-gold);
        color: var(--brand-red) !important;
    }

    /* Ikon Emoji di kiri tombol */
    .btn-icon {
        margin-right: 10px;
        font-size: 1.2rem;
    }

    /* Footer kecil di bawah */
    .bio-footer {
        margin-top: 3rem;
        font-size: 0.8rem;
        color: #999;
    }
</style>

<div class="bio-container">
    
    <img src="/assets/img/logo.png" alt="Logo Mulya Cuisine" class="bio-avatar">
    
    <h1 class="bio-title">Kentang Mustofa Jakarta</h1>
    <p class="bio-desc">Renyah. Gurih. Berdampak.<br>Resep Asli Ibu Mulyati.</p>

    <div class="bio-links">
        
        <a href="/pesan/" class="bio-btn btn-main">
            <span class="btn-icon">📝</span> Isi Form Pemesanan
        </a>

        <a href="https://wa.me/{{ site.owner.whatsapp }}" class="bio-btn btn-wa">
            <span class="btn-icon">💬</span> Chat WhatsApp Admin
        </a>

        <a href="/" class="bio-btn btn-outline">
            <span class="btn-icon">🌐</span> Kunjungi Website Resmi
        </a>

        <a href="{{ site.owner.maps_link }}" target="_blank" class="bio-btn btn-outline">
            <span class="btn-icon">📍</span> Lokasi Dapur Kami
        </a>

        <a href="/about/" class="bio-btn btn-outline">
            <span class="btn-icon">📖</span> Cerita Di Balik Dapur
        </a>

    </div>

    <div class="bio-footer">
        <p>&copy; 2025 Mulya Cuisine<br>Part of Dimaster Group Ecosystem</p>
    </div>

</div>  
