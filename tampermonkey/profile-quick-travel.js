// ==UserScript==
// @name         PrisonStruggle - Quick Travel
// @namespace    http://tampermonkey.net/
// @version      2025-12-03
// @description  Make the prison name in profiles clickable for instant travel\
// @match        https://prisonstruggle.com/profiles.php?id=*
// @grant        GM_xmlhttpRequest
// @connect      prisonstruggle.com
// ==/UserScript==

(function() {
    'use strict';

    const PRISON_MAP = {
        "Panama": 1,
        "Alcatraz": 2,
        "Guantanamo Bay": 3,
        "Long Bay": 4,
        "Utah": 5,
        "Dorchester": 6,
        "San Quentin": 7,
        "Attica": 8,
        "McNeil Island": 9,
        "Sing Sing": 10,
        "Devil's Island": 11,
        "Riker's Island": 12
    };

    const prisonLabel = [...document.querySelectorAll('td')]
        .find(td => td.textContent.trim() === 'Prison:');
    if (!prisonLabel) return;

    const prisonCell = prisonLabel.nextElementSibling;
    const prisonName = prisonCell.textContent.trim();

    if (!PRISON_MAP[prisonName]) return;

    const link = document.createElement('a');
    link.textContent = prisonName;
    link.href = 'javascript:void(0);';
    link.title = `Click to travel to ${prisonName}`;

    prisonCell.textContent = '';
    prisonCell.appendChild(link);

    link.addEventListener('click', () => {
        const goValue = PRISON_MAP[prisonName];
        const meta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = meta ? meta.getAttribute('content') : '';

        GM_xmlhttpRequest({
            method: "POST",
            url: "https://prisonstruggle.com/bus.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: `go=${goValue}&csrf_token=${encodeURIComponent(csrfToken)}`,
            onload: () => location.reload(),
            onerror: () => console.error("Error while travelling.")
        });
    });
})();
