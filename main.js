// =========menu icon navbar========
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
        navLinks.forEach(links => {
          links.classList.remove('active');
          document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        });
    };
  });



  /* ========== sticky navbar ========== */
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);



    /* ========== remove menu icon navbar when click navbar link (scroll) ========== */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  };

// dashboard table responsiveness
document.addEventListener('DOMContentLoaded', () => {
    const donorTable = document.getElementById('donorTable');
    const donors = [
        { name: 'Donor 1', pledge: '$1000', date: '2024-07-01', achieved: '$1000' },
        { name: 'Donor 2', pledge: '$2000', date: '2024-07-02', achieved: '$2000' },
        // Add more donor data as needed
    ];

    donors.forEach(donor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donor.name}</td>
            <td>${donor.pledge}</td>
            <td>${donor.date}</td>
            <td>${donor.achieved}</td>
        `;
        donorTable.appendChild(row);
    });

    // Generate the invite link based on the user's unique ID or username
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const inviteLink = `${window.location.origin}/invite.html?user=${loggedInUser.username}`;
        document.getElementById('inviteLink').value = inviteLink;
    }
});

function copyInviteLink() {
    const inviteLinkInput = document.getElementById('inviteLink');
    inviteLinkInput.select();
    inviteLinkInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Invite link copied to clipboard!');
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    document.querySelector('.dashboard h3').textContent = `Welcome, ${username}`;
});
