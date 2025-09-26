// ==UserScript==
// @name         Boss Invite Saver
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Save & re-invite users on bossfight with correct username formatting (normal, gradient, image, etc.)
// @match        https://prisonstruggle.com/boss.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const savedUsers = JSON.parse(localStorage.getItem("savedUsers") || "[]");
    const inputField = document.getElementById("theirid");
    const inviteBtn = document.getElementById("invitebutton");
    const inviteForm = inviteBtn ? inviteBtn.closest("form") : null;
    const inviteParagraph = inviteForm.querySelector("p");

    function renderSavedUsers() {
        let container = document.getElementById("savedUsersContainer");

        if (!container) {
            container = document.createElement("div");
            container.id = "savedUsersContainer";
            container.innerHTML = `
                <h3>Saved Users</h3>
                <table width="100%" style="border-collapse: collapse; margin-bottom:10px;">
                    <thead>
                        <tr>
                           <th style="text-align:left; border-bottom:1.111111px solid black;">Username</th>
                            <th style="text-align:left; border-bottom:1.111111px solid black;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="savedUsersBody"></tbody>
                </table>
            `;
            inviteParagraph.insertAdjacentElement("afterend", container);
        }

        const tbody = document.getElementById("savedUsersBody");
        tbody.innerHTML = "";

        if (savedUsers.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 2;
            cell.align = "center";
            cell.textContent = "No saved users yet.";
            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }

        savedUsers.forEach((user, index) => {
            const row = document.createElement("tr");
            row.style.borderBottom = "1px dotted #000";
            row.innerHTML = `
                <td align="left">${user.html}</td>
                <td align="left"">
                    <a href="#" data-invite="${user.id}" style="margin-right: 8px">Invite</a> |
                    <a href="#" data-remove="${index}" style="margin-left: 8px"><i class="fa-solid fa-trash" aria-hidden="true"></i></a>
                </td>
            `;
            tbody.appendChild(row);
        });

        tbody.querySelectorAll("[data-invite]").forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                inviteUser(e.target.dataset.invite);
            });
        });

        tbody.querySelectorAll("[data-remove]").forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                removeUser(parseInt(e.target.dataset.remove, 10));
            });
        });
    }

    function saveUser(userId) {
        const usernameEl = document.querySelector(`#usernameContainer .username`);
        if (!usernameEl) return;

        const html = usernameEl.outerHTML;

        if (!savedUsers.some(u => u.id === userId)) {
            savedUsers.push({ id: userId, html });
            localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
            renderSavedUsers();
        }
    }

    function inviteUser(userId) {
        inputField.value = userId;

        // trigger the ajaxCheckUser validation
        inputField.dispatchEvent(new Event('blur', { bubbles: true }));

        // wait until invite button is enabled, then click
        const interval = setInterval(() => {
            if (!inviteBtn.disabled) {
                inviteBtn.click();
                clearInterval(interval);
            }
        }, 150);
    }

    function removeUser(index) {
        savedUsers.splice(index, 1);
        localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
        renderSavedUsers();
    }

    function addSaveAndInviteBtn() {
        if (!inviteBtn) return;

        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.textContent = "Save & Invite";
        saveBtn.style.marginLeft = "10px";

        saveBtn.addEventListener("click", () => {
            const userId = inputField.value.trim();
            if (!userId) return;
            saveUser(userId);
            inviteForm.submit();
        });

        inviteBtn.insertAdjacentElement("afterend", saveBtn);
    }

    addSaveAndInviteBtn();
    renderSavedUsers();

})();
