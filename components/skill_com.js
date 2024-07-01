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
            font-size: 14px;
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

           
            .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 60%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            width: calc(100% - 40px);
            max-width: 400px;
            text-align: right;
            font-family: Arial, sans-serif;
            font-size: 14px;
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
