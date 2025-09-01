// ==UserScript==
// @name         Sortable Enemies + Hide Non-Attackables
// @namespace    http://tampermonkey.net/
// @version      2025-08-31
// @description  Sort Enemies and toggle hide rows with non-attackable players
// @author       SCP766
// @match        https://prisonstruggle.com/peeps.php?action=enemies
// ==/UserScript==

(function() {
    'use strict';

    function textValue(cell) {
        return cell.innerText.trim().replace(/\s+/g, " ");
    }

    function numberValue(cell) {
        return parseFloat(textValue(cell).replace(/[^0-9.\-]/g, "")) || 0;
    }

    function isNumericCell(cell) {
        return /^[\s$0-9,.\-]+$/.test(textValue(cell));
    }

    function makeSortable(table) {
        const headers = table.querySelectorAll("th");

        headers.forEach((th, colIndex) => {
            th.style.cursor = "pointer";

            th.addEventListener("click", () => {
                const rows = Array.from(table.querySelectorAll("tr:nth-child(n+2)")); // skip header
                const asc = th.dataset.sortOrder !== "asc";

                rows.sort((a, b) => {
                    const aCell = a.cells[colIndex];
                    const bCell = b.cells[colIndex];
                    if (!aCell || !bCell) return 0;

                    const aText = textValue(aCell);
                    const bText = textValue(bCell);

                    if (isNumericCell(aCell) && isNumericCell(bCell)) {
                        const aNum = numberValue(aCell);
                        const bNum = numberValue(bCell);
                        return asc ? aNum - bNum : bNum - aNum;
                    }

                    return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
                });

                rows.forEach(r => table.appendChild(r));

                // Reset arrows
                headers.forEach(h => {
                    h.removeAttribute("data-sort-order");
                    h.textContent = h.textContent.replace(/[↑↓]/g, "").trim();
                });

                // Add arrow to active header
                th.dataset.sortOrder = asc ? "asc" : "desc";
                th.textContent = th.textContent + (asc ? " ↑" : " ↓");
            });
        });
    }

    function addToggleButton(table) {
        const btn = document.createElement("button");
        btn.textContent = "Hide Non-Attackable";
        btn.style.margin = "10px 0";
        btn.style.padding = "5px 10px";
        btn.style.cursor = "pointer";

        let hidden = false;

        btn.addEventListener("click", () => {
            hidden = !hidden;
            btn.textContent = hidden ? "Show All" : "Hide Non-Attackable";

            const rows = Array.from(table.querySelectorAll("tr:nth-child(n+2)")); // skip header
            rows.forEach(row => {
                const attackLink = row.querySelector("a[href*='attack.php']");
                if (attackLink && attackLink.classList.contains("notcool")) {
                    row.style.display = hidden ? "none" : "";
                }
            });
        });

        table.parentNode.insertBefore(btn, table);
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".cleanTable").forEach(table => {
            makeSortable(table);
            addToggleButton(table);
        });
    });

    console.log("loaded");
})();
