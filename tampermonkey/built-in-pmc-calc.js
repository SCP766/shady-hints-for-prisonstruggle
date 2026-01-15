// ==UserScript==
// @name         Built-in PMC Calc
// @version      2026-01-11
// @author       nickka
// @match        https://prisonstruggle.com/inventory.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=prisonstruggle.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const table = document.querySelector('.pmcTable');
        if (!table) return;

        const headerRow = table.querySelector('tr');
        const sellHeader = document.createElement('th');
        sellHeader.textContent = 'Sell Qty';
        sellHeader.style.width = '10%';
        sellHeader.style.textAlign = 'center';
        headerRow.insertBefore(sellHeader, headerRow.children[4]);

        const rows = table.querySelectorAll('tr');
        let itemRows = [];

        rows.forEach((row, index) => {
            if (index === 0 || row.querySelector('td[colspan]')) return;

            const cells = row.querySelectorAll('td');
            if (cells.length === 0) return;

            const bonusCell = cells[cells.length - 4];
            const quantityCell = cells[cells.length - 3];
            const awakeMatch = bonusCell?.textContent.match(/\+(\d+)\s+Awake/);

            if (awakeMatch && quantityCell) {
                const awakeValue = parseInt(awakeMatch[1]);
                const quantity = parseInt(quantityCell.textContent.replace(/[^\d]/g, ''));

                const selectCell = document.createElement('td');
                selectCell.style.textAlign = 'center';

                if (awakeValue > 10) {
                    const select = document.createElement('select');
                    select.className = 'pmc-sell-select';
                    select.dataset.awake = awakeValue;

                    for (let i = 0; i <= quantity; i++) {
                        const option = document.createElement('option');
                        option.value = i;
                        option.textContent = i;
                        select.appendChild(option);
                    }

                    select.addEventListener('change', calculateTotal);
                    selectCell.appendChild(select);

                    itemRows.push({
                        row: row,
                        awake: awakeValue,
                        quantity: quantity,
                        select: select
                    });
                } else {
                    selectCell.textContent = '-';
                    selectCell.style.color = '#999';
                }

                row.insertBefore(selectCell, cells[cells.length - 1]);
            }
        });

        addCalculatorRows(table);
    }

    function addCalculatorRows(table) {
        const tbody = table.querySelector('tbody');

        const grandTotalRow = tbody.querySelector('tr[style*="font-weight: bold"]');

        if (grandTotalRow) {
           

            const calcRow = document.createElement('tr');
            calcRow.style.fontWeight = 'bold';
            calcRow.style.background = '#706e57';
            calcRow.innerHTML = `
                <td style="text-align: right; padding-right: 10px;">Point per Awake:</td>
                <td style="text-align: center;">
                    <input type="number"
                           id="pmc-point-per-awake"
                           value="13"
                           min="0"
                           step="1"
                           style="width: 80px; padding: 5px; text-align: center; border: 1px solid #ccc; border-radius: 3px;">
                </td>
                <td style="text-align: right; padding-right: 10px;">Total Awake To Sell:</td>
                <td id="pmc-total-awake" style="text-align: center;">0</td>
                <td style="text-align: right; padding-right: 10px;">Total Points:</td>
                <td id="pmc-total-points" style="text-align: center; font-size: 16px;">0</td>
            `;
            tbody.insertBefore(calcRow, grandTotalRow.nextSibling);

            document.getElementById('pmc-point-per-awake').addEventListener('input', calculateTotal);
        }
    }

    function calculateTotal() {
        const selects = document.querySelectorAll('.pmc-sell-select');
        const pointPerAwake = parseFloat(document.getElementById('pmc-point-per-awake').value) || 0;

        let totalAwakeSold = 0;
        let totalPoints = 0;

        selects.forEach(select => {
            const quantity = parseInt(select.value) || 0;
            const awakeValue = parseInt(select.dataset.awake) || 0;

            if (quantity > 0) {
                const effectiveAwake = Math.max(0, awakeValue - 10);
                const awakeFromThisItem = effectiveAwake * quantity;
                const pointsFromThisItem = awakeFromThisItem * pointPerAwake;

                totalAwakeSold += awakeFromThisItem;
                totalPoints += pointsFromThisItem;
            }
        });

        document.getElementById('pmc-total-awake').textContent = totalAwakeSold.toLocaleString();
        document.getElementById('pmc-total-points').textContent = totalPoints.toLocaleString(undefined);
    }
})();
