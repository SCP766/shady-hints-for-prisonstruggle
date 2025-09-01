// ==UserScript==
// @name         Sortable Enemies + Hide Non-Attackables + Prison Column
// @namespace    http://tampermonkey.net/
// @version      2025-09-01
// @description  Sort Enemies, toggle hide rows with non-attackable players, and tag each enemy with a prison (saved to localStorage).
// @author       SCP766 (+prison column by CowKing)
// @match        https://prisonstruggle.com/peeps.php?action=enemies
// ==/UserScript==

(function () {
  'use strict';

  // --------- helpers used by sorter ----------
  function textValue(cell) {
    return cell.innerText.trim().replace(/\s+/g, ' ');
  }
  function numberValue(cell) {
    return parseFloat(textValue(cell).replace(/[^0-9.\-]/g, '')) || 0;
  }
  function isNumericCell(cell) {
    return /^[\s$0-9,.\-]+$/.test(textValue(cell));
  }

  // --------- sorting ----------
  function makeSortable(table) {
    const headers = table.querySelectorAll('th');
    headers.forEach((th, colIndex) => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const rows = Array.from(table.querySelectorAll('tr:nth-child(n+2)')); // skip header
        const asc = th.dataset.sortOrder !== 'asc';

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

        rows.forEach((r) => table.appendChild(r));

        // Reset arrows
        headers.forEach((h) => {
          h.removeAttribute('data-sort-order');
          h.textContent = h.textContent.replace(/[↑↓]/g, '').trim();
        });

        // Add arrow to active header
        th.dataset.sortOrder = asc ? 'asc' : 'desc';
        th.textContent = th.textContent + (asc ? ' ↑' : ' ↓');
      });
    });
  }

  // --------- hide non-attackables ----------
  function addToggleButton(table) {
    const btn = document.createElement('button');
    btn.textContent = 'Hide Non-Attackable';
    btn.style.margin = '10px 0';
    btn.style.padding = '5px 10px';
    btn.style.cursor = 'pointer';

    let hidden = false;

    btn.addEventListener('click', () => {
      hidden = !hidden;
      btn.textContent = hidden ? 'Show All' : 'Hide Non-Attackable';

      const rows = Array.from(table.querySelectorAll('tr:nth-child(n+2)')); // skip header
      rows.forEach((row) => {
        const attackLink = row.querySelector("a[href*='attack.php']");
        if (attackLink && attackLink.classList.contains('notcool')) {
          row.style.display = hidden ? 'none' : '';
        }
      });
    });

    table.parentNode.insertBefore(btn, table);
  }

  // --------- PRISON COLUMN ----------
  const PRISONS = [
    '', // blank option
    'Panama',
    'Alcatraz',
    'Guantanamo Bay',
    'Long Bay',
    'Utah',
    'Dorchester',
    'San Quentin',
    'Attica',
    'McNeil Island',
    'Sing Sing',
    "Riker's Island",
  ];
  const STORAGE_KEY = 'ps_enemy_prisons';

  function loadMap() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }
  function saveMap(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }

  function extractEnemyKey(row) {
    // Prefer the player id from the attack link if present
    const attackLink = row.querySelector("a[href*='attack.php']");
    if (attackLink) {
      const href = attackLink.href;
      // Try common id param patterns
      const m =
        href.match(/[?&](?:id|ID|userid|player_id)=(\d+)/) ||
        href.match(/attack\.php\/(\d+)/);
      if (m && m[1]) return 'id:' + m[1];
    }
    // Fallback to visible username text
    const userCell = row.cells[0];
    return 'name:' + (userCell ? textValue(userCell) : row.rowIndex.toString());
  }

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function addPrisonColumn(table) {
    const headerRow = table.querySelector('tr');
    if (!headerRow) return;

    // Find the "Level" header to insert after; fallback to end
    const headers = Array.from(headerRow.querySelectorAll('th'));
    let insertAfterIndex = headers.findIndex((th) =>
      /level/i.test(th.textContent)
    );
    if (insertAfterIndex === -1) insertAfterIndex = headers.length - 1;

    // Add header cell
    const prisonTh = document.createElement('th');
    prisonTh.textContent = 'Prison';
    const refHeader =
      headers[insertAfterIndex] || headers[headers.length - 1] || headerRow.lastElementChild;
    if (refHeader && refHeader.parentNode === headerRow) {
      insertAfter(prisonTh, refHeader);
    } else {
      headerRow.appendChild(prisonTh);
    }

    // Prepare data & builder
    const map = loadMap();

    function buildSelect(initial) {
      const sel = document.createElement('select');
      sel.style.minWidth = '140px';
      PRISONS.forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p || '—';
        sel.appendChild(opt);
      });
      if (PRISONS.includes(initial)) sel.value = initial;
      return sel;
    }

    // Add a cell with dropdown to each row
    const dataRows = Array.from(table.querySelectorAll('tr:nth-child(n+2)'));
    dataRows.forEach((row) => {
      const key = extractEnemyKey(row);
      const current = map[key] || '';

      const td = document.createElement('td');
      const sel = buildSelect(current);
      sel.addEventListener('change', () => {
        const val = sel.value || '';
        if (val) {
          map[key] = val;
        } else {
          delete map[key];
        }
        saveMap(map);
      });
      td.appendChild(sel);

      const refCell = row.cells[insertAfterIndex] || row.lastElementChild;
      if (refCell && refCell.parentNode === row) {
        insertAfter(td, refCell);
      } else {
        row.appendChild(td);
      }
    });
  }

  // --------- init ----------
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cleanTable').forEach((table) => {
      // Important: add our column BEFORE wiring up sorting
      addPrisonColumn(table);
      makeSortable(table);
      addToggleButton(table);
    });
  });

  console.log('PS Enemies helper loaded');
})();
