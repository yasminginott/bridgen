import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzNqsSP6qQjFVpv7N_2cxIAFLUOpSs_U8",
    authDomain: "bridgen-988cb.firebaseapp.com",
    projectId: "bridgen-988cb",
    storageBucket: "bridgen-988cb.appspot.com",
    messagingSenderId: "1092821735169",
    appId: "1:1092821735169:web:5ffcb2524743959f8a2d00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class SkillButton extends HTMLElement {
constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
        .skill_button {
        align-items: center;
        appearance: none;
        background-color: #fff;
        border-radius: 100px;
        border-style: none;
        border-color: var(--secondry_dark);
        box-sizing: border-box;
        color: var(--secondry_dark);
        cursor: pointer;
        display: inline-flex;
        fill: currentcolor;
        font-family: "Google Sans",Roboto,Arial,sans-serif;
        font-size: 16px;
        font-weight: 500;
        height: 48px;
        justify-content: center;
        letter-spacing: .25px;
        line-height: normal;
        max-width: 100%;
        overflow: visible;
        padding: 2px 24px;
        position: relative;
        text-align: center;
        text-transform: none;
        transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: auto;
        will-change: transform,opacity;
        z-index: 0;
        border: 2px solid var(--secondry_dark); 
        }

        .skill_button:hover{
        background-color: var(--secondry_dark);
        color: #fff;

        }

        
        .popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        width: calc(100% - 40px);
        max-width: 400px;
        text-align: right;
        font-family: Arial, sans-serif;
        font-size: 20px;
        color: #333;
        z-index: 1000;
        direction: rtl;
        }
    `;

    const button = document.createElement('button');
    button.className = 'skill_button';
    button.textContent = this.getAttribute('data-text');

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <p>${this.getAttribute('data-popup-text') || ''}</p>
    `;

    button.addEventListener('click', () => {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });

    shadow.appendChild(style);
    shadow.appendChild(button);
    shadow.appendChild(popup);
}
}

customElements.define('skill-button', SkillButton);


// Menu Icons bar 
class IconMenuBar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        
        // Set icons based on the containerId
        if (containerId === 'MenuBarOld') {
            this.icons = [
                { name: 'profile', emptyIcon: '/public/icons/profile_icon_empty.svg', fullIcon: '/public/icons/profile_icon_full.svg', page: '/Pages/ElderProfile/ElderProfile.html' },
                { name: 'heart', emptyIcon: '/public/icons/heart_icon_empty.svg', fullIcon: '/public/icons/heart_icon_full.svg', page: '/Pages/Contacts/Contacts.html' }
            ];
        } else if (containerId === 'MenuBarYoung') {
            this.icons = [
                { name: 'profile', emptyIcon: '/public/icons/profile_icon_empty.svg', fullIcon: '/public/icons/profile_icon_full.svg', page: '/Pages/YoungProfile/YoungProfile.html' },
                { name: 'heart', emptyIcon: '/public/icons/heart_icon_empty.svg', fullIcon: '/public/icons/heart_icon_full.svg', page: '/Pages/ContactsYoung/ContactsYoung.html' },
                { name: 'marketplace', emptyIcon: '/public/icons/marketplace_icon_empty.svg', fullIcon: '/public/icons/marketplace_icon_full.svg', page: '/Pages/Marketplace/Marketplace.html' }
            ];
        }

        this.setActiveIconBasedOnCurrentPage();
        this.render();
        this.addLogoutButton();
    }

    setActiveIconBasedOnCurrentPage() {
        const currentPath = window.location.pathname;
        const activeIcon = this.icons.find(icon => currentPath.includes(icon.page));
        this.activeIcon = activeIcon ? activeIcon.name : null;
    }

    render() {
        this.container.innerHTML = ''; // Clear existing content
        this.icons.forEach(icon => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            const iconSrc = icon.name === this.activeIcon ? icon.fullIcon : icon.emptyIcon;
            menuItem.innerHTML = `<img src="${iconSrc}" alt="${icon.name}">`;
            menuItem.addEventListener('click', () => this.navigateToPage(icon.name));
            this.container.appendChild(menuItem);
        });
    }

    navigateToPage(iconName) {
        const icon = this.icons.find(icon => icon.name === iconName);
        if (icon) {
            window.location.href = icon.page;
        }
    }

    addLogoutButton() {
        const logoutButton = document.createElement('div');
        logoutButton.className = 'menu-item logout-button';
        logoutButton.textContent = 'התנתקות';
        logoutButton.id = 'logout-button';
    
        // Apply the appropriate style class based on the containerId
        if (this.container.id === 'MenuBarOld') {
            logoutButton.classList.add('logout-button-old');
        } else if (this.container.id === 'MenuBarYoung') {
            logoutButton.classList.add('logout-button-young');
        }
    
        this.container.insertBefore(logoutButton, this.container.firstChild);
    
        // Add event listener for logout
        logoutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('User signed out');
                window.location.href = '/Pages/EnteryScreen/EnteryScreen.html'; // Redirect to entry page
            }).catch((error) => {
                console.error('Error signing out:', error);
            });
        });
    }
    
}

// Initialize the menu bar
document.addEventListener('DOMContentLoaded', () => {
    const menuBars = ['MenuBarOld', 'MenuBarYoung'];
    menuBars.forEach(id => {
        if (document.getElementById(id)) {
            new IconMenuBar(id);
        }
    });
});




