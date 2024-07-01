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
