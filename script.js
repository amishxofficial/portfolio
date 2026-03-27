  /* =========================================
   1. Modal Management (Skills & Projects)
========================================= */
// Modal elements ko select kar rahe hain
const modal = document.getElementById("skillModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

// Skills modal kholne ke liye
function openSkill(name, message) {
    if(modalTitle && modalDesc && modal) {
        modalTitle.innerText = name;
        modalDesc.innerHTML = `<p style="color: #94a3b8; line-height: 1.6;">${message}</p>`;
        modal.style.display = "block";
    }
}

// Project details modal kholne ke liye
function openProjectDetails(title, desc, link) {
    if(modalTitle && modalDesc && modal) {
        modalTitle.innerText = title;
        modalDesc.innerHTML = `
            <p style="margin-bottom: 25px; color: #94a3b8; line-height: 1.6;">${desc}</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="${link}" target="_blank" onclick="closeModal()" class="btn primary" style="padding: 10px 20px; font-size: 0.9rem; text-decoration: none; color: black; border-radius: 5px; font-weight: bold;">Launch Project</a>
                
                <button onclick="closeModal()" class="btn secondary" style="padding: 10px 20px; font-size: 0.9rem; background:transparent; cursor:pointer; border: 1px solid #00d2ff; color: #00d2ff; border-radius: 5px; font-weight: bold;">Back</button>
            </div>
        `;
        modal.style.display = "block";
    }
}

// Modal band karne ke liye
function closeModal() {
    if(modal) modal.style.display = "none";
}

// Modal ke bahar click karne par band ho jaye
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Coming Soon alert
function showComingSoon() {
    alert("This project is currently under development and will be available soon. Stay tuned!");
}

/* =========================================
   2. Mobile Menu Logic (Conflict-Free)
========================================= */
const hamburger = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    // Menu icon par click karne par Toggle (Open/Close)
    hamburger.onclick = function() {
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    };

    // Kisi bhi link (Home, About etc.) par click karte hi menu hide ho jaye
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.onclick = () => {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('active');
        };
    });
}