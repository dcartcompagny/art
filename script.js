console.log("Le fichier JavaScript est bien chargé");

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const megaMenus = document.querySelectorAll('.mega-menu');

function isMobile() {
  return window.innerWidth <= 1024;
}

// === AFFICHAGE DU MENU MOBILE ===
mobileMenu.addEventListener('click', (e) => {
  e.stopPropagation(); // Empêche la fermeture immédiate
  navLinks.classList.toggle('show');
});

// === FERMER LE MENU MOBILE SI ON CLIQUE AILLEURS ===
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('show') &&
    !navLinks.contains(e.target) &&
    e.target !== mobileMenu
  ) {
    navLinks.classList.remove('show');
    megaMenus.forEach(menu => menu.style.display = 'none');
  }
});

// === FERMER LE MENU MOBILE SI UN LIEN EST CLIQUÉ ===
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (isMobile()) {
      navLinks.classList.remove('show');
    }
  });
});

// === EMPECHER LE HOVER DU MEGA-MENU SUR MOBILE ===
document.querySelectorAll('#nav-links > li').forEach(item => {
  const megaMenu = item.querySelector('.mega-menu');
  const link = item.querySelector('a');

  if (megaMenu && link) {
    link.addEventListener('click', (e) => {
      if (isMobile()) {
        e.preventDefault();
        // Fermer les autres mega menus
        megaMenus.forEach(menu => {
          if (menu !== megaMenu) menu.style.display = 'none';
        });
        // Toggle affichage
        megaMenu.style.display = (megaMenu.style.display === 'flex') ? 'none' : 'flex';
      }
    });
  }
});
