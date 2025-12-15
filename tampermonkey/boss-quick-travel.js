// ==UserScript==
// @name         PrisonStruggle - Quick Boss Travel
// @namespace    http://tampermonkey.net/
// @version      2025-12-15
// @description  Make boss fight travel instant - click to travel directly
// @match        https://prisonstruggle.com/boss.php*
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

    const travelMessages = document.querySelectorAll('td');

    travelMessages.forEach(cell => {
        const text = cell.innerHTML;

        if (text.includes('You are not currently in this city') && text.includes('Police Bus')) {
            const row = cell.closest('tr');
            const bossCellText = row.querySelector('.bossCellText');

            if (bossCellText) {
                const match = bossCellText.textContent.match(/in\s+(.+)/);

                if (match) {
                    const prisonName = match[1].trim();
                    const goValue = PRISON_MAP[prisonName];

                    if (goValue) {
                        const busLink = cell.querySelector('a[href="bus.php"]');

                        if (busLink) {
                            busLink.href = 'javascript:void(0);';
                            busLink.title = `Click to instantly travel to ${prisonName}`;
                            busLink.style.fontWeight = 'bold';
                            busLink.style.color = '#4CAF50';

                            busLink.addEventListener('click', (e) => {
                                e.preventDefault();

                                const meta = document.querySelector('meta[name="csrf-token"]');
                                const csrfToken = meta ? meta.getAttribute('content') : '';

                                busLink.textContent = 'Traveling...';
                                busLink.style.color = '#FF9800';

                                GM_xmlhttpRequest({
                                    method: "POST",
                                    url: "https://prisonstruggle.com/bus.php",
                                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                    data: `go=${goValue}&csrf_token=${encodeURIComponent(csrfToken)}`,
                                    onload: () => location.reload(),
                                    onerror: () => {
                                        console.error("Error while travelling.");
                                        busLink.textContent = 'Police Bus';
                                        busLink.style.color = '';
                                        alert('Travel failed. Please try again.');
                                    }
                                });
                            });
                        }
                    }
                }
            }
        }
    });
})();
