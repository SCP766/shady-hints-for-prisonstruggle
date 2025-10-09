// ==UserScript==
// @name         PrisonStruggle - Quick Travel
// @namespace    http://tampermonkey.net/
// @version      2025-10-09
// @description  Make the prison name in profiles clickable for instant travel\
// @match        https://prisonstruggle.com/profiles.php?id=*
// @grant        GM_xmlhttpRequest
// @connect      prisonstruggle.com
// ==/UserScript==

(function() {
    'use strict';

    // Prison -> go value map
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
        "Devils Island": 11
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
        if (!confirm(`Travel to ${prisonName}?`)) return;

        const goValue = PRISON_MAP[prisonName];
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://prisonstruggle.com/bus.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: `go=${goValue}`,
            onload: () => {
                alert(`Travelled to ${prisonName}!`);
                location.reload();
            },
            onerror: () => alert("Error while travelling.")
        });
    });
})();
