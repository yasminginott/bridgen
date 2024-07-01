// components/skill_com.js

class SkillButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const button = document.createElement('button');
        button.className = 'skill_button';
        button.textContent = 'שפה - ספרדית';
        shadow.appendChild(button);
    }
}

customElements.define('skill-button', SkillButton);


// checking 
class IconMenuBar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.icons = [
            { name: 'heart', emptyIcon: '/public/icons/heart_icon_empty.svg', fullIcon: '/public/icons/heart_icon_full.svg' },
            { name: 'marketplace', emptyIcon: '/public/icons/marketplace_icon_empty.svg', fullIcon: '/public/icons/marketplace_icon_full.svg' },
            { name: 'profile', emptyIcon: '/public/icons/profile_icon_empty.svg', fullIcon: '/public/icons/profile_icon_full.svg' }
        ];
        this.activeIcon = 'profile';
        this.render();
    }

    render() {
        this.icons.forEach(icon => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            const iconSrc = icon.name === this.activeIcon ? icon.fullIcon : icon.emptyIcon;
            menuItem.innerHTML = `<img src="${iconSrc}" alt="${icon.name}">`;
            menuItem.addEventListener('click', () => this.setActiveIcon(icon.name));
            this.container.appendChild(menuItem);
        });
    }

    setActiveIcon(iconName) {
        if (this.activeIcon) {
            const oldActiveItem = this.container.querySelector(`[alt="${this.activeIcon}"]`);
            const oldActiveIcon = this.icons.find(icon => icon.name === this.activeIcon);
            oldActiveItem.src = oldActiveIcon.emptyIcon;
        }

        const newActiveItem = this.container.querySelector(`[alt="${iconName}"]`);
        const newActiveIcon = this.icons.find(icon => icon.name === iconName);
        newActiveItem.src = newActiveIcon.fullIcon;
        this.activeIcon = iconName;

        console.log(`Active icon changed to: ${iconName}`);
    }
}

// Initialize the menu bar
document.addEventListener('DOMContentLoaded', () => {
    const menuBar = new IconMenuBar('menuBar');
});