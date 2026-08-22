@extends('layouts.app')

@section('title', 'Pilih Pertunjukan | Saung Angklung Udjo')

@push('styles')
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { font-family: 'Plus Jakarta Sans', sans-serif; background: #F5F4F0; color: #1a1a2e; }

/* ── HERO ── */
.pe-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #2d2561 60%, #3d1a5e 100%);
    padding: 60px clamp(1.5rem, 6vw, 5rem) 50px;
    position: relative;
    overflow: hidden;
}
.pe-hero::after {
    content: '';
    position: absolute;
    right: -80px; top: -80px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: rgba(255,255,255,.03);
    pointer-events: none;
}
.pe-hero-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .5em;
    text-transform: uppercase;
    color: #c4a47c;
    margin-bottom: 14px;
}
.pe-hero h1 {
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 10px;
}
.pe-hero h1 span { color: #c4a47c; font-style: italic; font-weight: 700; }
.pe-hero p { font-size: 14px; color: rgba(255,255,255,.5); font-weight: 400; }

/* ── MAIN ── */
.pe-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 40px clamp(1.5rem, 5vw, 3rem) 80px;
}

/* Search bar */
.pe-search {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    border: 1.5px solid #e5e3db;
    border-radius: 12px;
    padding: 12px 18px;
    margin-bottom: 32px;
    transition: border-color .2s, box-shadow .2s;
}
.pe-search:focus-within {
    border-color: #c4a47c;
    box-shadow: 0 0 0 4px rgba(196,164,124,.1);
}
.pe-search svg { flex-shrink: 0; color: #c4a47c; }
.pe-search input {
    border: none; outline: none; background: transparent;
    font-family: inherit; font-size: 14px; color: #1a1a2e; width: 100%;
}
.pe-search input::placeholder { color: #aaa; }

/* Section heading */
.pe-section {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}
.pe-section-tag {
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .35em;
    text-transform: uppercase;
    background: #f0e8d8;
    color: #8b6a3e;
    padding: 5px 12px;
    border-radius: 999px;
    white-space: nowrap;
}
.pe-section hr { flex: 1; border: none; border-top: 1px solid #e5e3db; }
.pe-section-count { font-size: 11px; color: #aaa; font-weight: 600; white-space: nowrap; }

/* Event cards */
.pe-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 48px; }

.pe-card {
    display: flex;
    background: #fff;
    border-radius: 16px;
    border: 1.5px solid #ede9e0;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: border-color .22s, box-shadow .22s, transform .22s;
    cursor: pointer;
    position: relative;
}
.pe-card:hover {
    border-color: #c4a47c;
    box-shadow: 0 8px 32px rgba(26,26,46,.08);
    transform: translateY(-2px);
}

/* Poster */
.pe-img {
    width: 140px;
    flex-shrink: 0;
    overflow: hidden;
    background: #1a1a2e;
    position: relative;
}
.pe-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .4s ease;
}
.pe-card:hover .pe-img img { transform: scale(1.05); }
.pe-img-placeholder {
    width: 100%; height: 100%; min-height: 160px;
    background: linear-gradient(160deg,#1a1a2e,#2d2561);
    display: flex; align-items: center; justify-content: center;
}
.pe-img-placeholder svg { opacity: .15; color: #fff; }

/* Body */
.pe-body {
    flex: 1;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
}

.pe-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .3em;
    text-transform: uppercase;
    color: #2563eb;
    align-self: flex-start;
}
.pe-badge .dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #2563eb;
    animation: blink 1.8s infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

.pe-badge.urgent { color: #dc2626; }
.pe-badge.urgent .dot { background: #dc2626; }

.pe-title {
    font-size: 17px;
    font-weight: 700;
    line-height: 1.3;
    color: #1a1a2e;
}

.pe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
}
.pe-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #888;
    font-weight: 500;
}
.pe-meta-item svg { width: 12px; height: 12px; color: #c4a47c; }

/* Right: price + CTA */
.pe-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 20px 22px;
    gap: 10px;
    border-left: 1px dashed #ede9e0;
    min-width: 160px;
    flex-shrink: 0;
}
.pe-price-from { font-size: 9px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: #aaa; }
.pe-price { font-size: 18px; font-weight: 800; color: #1a1a2e; line-height: 1; }
.pe-price span { font-size: 11px; font-weight: 500; color: #aaa; }

.pe-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #1a1a2e;
    color: #fff;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .05em;
    text-transform: uppercase;
    padding: 9px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background .2s, transform .15s;
    text-decoration: none;
    white-space: nowrap;
}
.pe-btn:hover { background: #c4a47c; color: #1a1a2e; transform: translateY(-1px); }
.pe-btn svg { width: 12px; height: 12px; }

/* Availability pill */
.pe-avail {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
}
.pe-avail-dot { width: 6px; height: 6px; border-radius: 50%; }
.avail-high   { color: #16a34a; } .avail-high .pe-avail-dot   { background: #16a34a; }
.avail-medium { color: #d97706; } .avail-medium .pe-avail-dot { background: #d97706; }
.avail-low    { color: #ea580c; } .avail-low .pe-avail-dot    { background: #ea580c; }
.avail-sold   { color: #dc2626; } .avail-sold .pe-avail-dot   { background: #dc2626; }

/* Empty */
.pe-empty {
    text-align: center;
    padding: 48px 24px;
    background: #fff;
    border-radius: 16px;
    border: 1.5px dashed #ede9e0;
    color: #aaa;
    font-size: 13px;
}
.pe-empty svg { margin: 0 auto 12px; display: block; opacity: .25; }

/* No-results */
.pe-no-results {
    text-align: center;
    padding: 48px 24px;
    color: #aaa;
    font-size: 13px;
    display: none;
}

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
    .pe-card { flex-direction: column; }
    .pe-img { width: 100%; height: 180px; }
    .pe-right {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-left: none;
        border-top: 1px dashed #ede9e0;
        min-width: unset;
        padding: 14px 18px;
    }
}
</style>
@endpush

@section('content')

{{-- HERO --}}
<div class="pe-hero">
    <div class="pe-hero-label">Saung Angklung Udjo</div>
    <h1>Pilih <span>Pertunjukan</span></h1>
    <p>Temukan pengalaman budaya terbaik dan pesan tiketmu sekarang</p>
</div>

@php
    $today    = \Carbon\Carbon::today();
    $upcoming = collect($events ?? [])->filter(fn($e) => \Carbon\Carbon::parse($e->event_date_start)->gte($today))->values();
@endphp

<div class="pe-wrap">

    {{-- Search --}}
    <div class="pe-search">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" id="peSearch" placeholder="Cari pertunjukan…" autocomplete="off">
    </div>

    {{-- Section heading --}}
    <div class="pe-section">
        <span class="pe-section-tag">Jadwal Pertunjukan</span>
        <hr>
        <span class="pe-section-count" id="peCount">{{ $upcoming->count() }} pertunjukan</span>
    </div>

    {{-- Event list --}}
    <div class="pe-list" id="peList">

        @forelse($upcoming as $event)
            @php
                $types = collect($event->ticketTypes ?? []);

                $minPrice = optional(
                    $types->where('is_active', true)
                          ->reject(function ($t) { return strtolower(trim($t->name)) === 'reguler'; })
                          ->sortBy('price')
                          ->first()
                )->price;

                $activeTypes   = $types->where('is_active', true);
                $totalCapacity = max(1, (int) $activeTypes->sum('quota'));
                $totalSold     = (int) $activeTypes->sum('sold_count');
                $availPct      = max(0, min(100, (int) round((1 - $totalSold / $totalCapacity) * 100)));
                $availClass    = $availPct > 60 ? 'avail-high' : ($availPct > 30 ? 'avail-medium' : ($availPct > 0 ? 'avail-low' : 'avail-sold'));
                $availText     = $availPct > 60 ? 'Tersedia' : ($availPct > 30 ? 'Hampir Penuh' : ($availPct > 0 ? 'Terbatas' : 'Habis'));

                $dateStr  = !empty($event->event_date_start)
                    ? \Carbon\Carbon::parse($event->event_date_start)->translatedFormat('d M Y')
                    : 'TBA';
                $dateEnd  = (!empty($event->event_date_end) && $event->event_date_start != $event->event_date_end)
                    ? ' – ' . \Carbon\Carbon::parse($event->event_date_end)->translatedFormat('d M Y')
                    : '';
                $daysLeft = (int) $today->diffInDays(\Carbon\Carbon::parse($event->event_date_start), false);
            @endphp

            <a class="pe-card"
               href="{{ route('tickets.buy', ['event' => $event->slug]) }}"
               data-name="{{ strtolower($event->name) }}">

                {{-- Poster --}}
                <div class="pe-img">
                    @if(!empty($event->banner_image))
                        <img src="{{ asset('storage/'.$event->banner_image) }}" alt="{{ $event->name }}" loading="lazy">
                    @else
                        <div class="pe-img-placeholder">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-1 14H6v-1l3-4.5 2.5 3.01L14 11l4 6z"/>
                            </svg>
                        </div>
                    @endif
                </div>

                {{-- Info --}}
                <div class="pe-body">
                    <div class="pe-badge {{ $daysLeft <= 7 ? 'urgent' : '' }}">
                        <span class="dot"></span>
                        @if($daysLeft <= 7) {{ $daysLeft }} Hari Lagi @else Coming Soon @endif
                    </div>

                    <div class="pe-title">{{ $event->name }}</div>

                    <div class="pe-meta">
                        <span class="pe-meta-item">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <path d="M16 2v4M8 2v4M3 10h18"/>
                            </svg>
                            {{ $dateStr }}{{ $dateEnd }}
                        </span>
                        @if(!empty($event->location))
                        <span class="pe-meta-item">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {{ $event->location }}
                        </span>
                        @endif
                    </div>

                    <div class="pe-avail {{ $availClass }}">
                        <span class="pe-avail-dot"></span>
                        {{ $availText }}
                    </div>
                </div>

                {{-- Price + CTA --}}
                <div class="pe-right">
                    <div>
                        <div class="pe-price-from">Mulai dari</div>
                        <div class="pe-price">
                            @if($minPrice)
                                Rp {{ number_format($minPrice, 0, ',', '.') }}
                            @else
                                <span>—</span>
                            @endif
                        </div>
                    </div>
                    <span class="pe-btn">
                        Lihat Detail
                        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>

            </a>

        @empty
            <div class="pe-empty">
                <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3h10.5A2.25 2.25 0 0119.5 5.25v13.5A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75V5.25A2.25 2.25 0 016.75 3zM9 7h6M9 11h6M9 15h4"/>
                </svg>
                Belum ada jadwal pertunjukan mendatang.
            </div>
        @endforelse

    </div>

    <div class="pe-no-results" id="peNoResults">
        Tidak ada pertunjukan yang cocok dengan pencarianmu.
    </div>

</div>

@endsection

@push('scripts')
<script>
(function () {
    const input   = document.getElementById('peSearch');
    const count   = document.getElementById('peCount');
    const cards   = document.querySelectorAll('.pe-card');
    const noRes   = document.getElementById('peNoResults');

    if (!input) return;

    input.addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        let visible = 0;

        cards.forEach(card => {
            const match = !q || card.dataset.name.includes(q);
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        if (count) count.textContent = visible + ' pertunjukan';
        if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
    });
})();
</script>
@endpush