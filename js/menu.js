class Menu {
    constructor(tower, player) {
        this.tower = tower;
        this.player = player;
        this.currentHp = this.tower.getCurrentHp();
        this.maxHp = this.tower.getMaxHp();
        // HTML ELEMENTS
        this.hpBar = document.querySelector('.hp-bar-green');
        this.currentHpElement = document.querySelector('.current-hp');
        this.maxHpElement = document.querySelector('.max-hp');
        this.currentHpElement.innerText = this.currentHp;
        this.maxHpElement.innerText = this.maxHp;

        // Execute on loadup
        this.updateStats();
        this.handleClickEvents();
    }

    handleClickEvents() {
        const statBoxes = document.querySelectorAll('.stat-box');
        for (let box of statBoxes) {
            box.addEventListener('click', (e) => {
                const attr = box.dataset.attribute;
                this.levelUp(attr);
            });
        }
    }

    levelUp(attr) {
        const cost = 10;
        if (!this.player.hasPlayerEnoughMoney(cost)) return;

        this.player.decreaseMoney(cost);
        this.tower.increaseAttribute(attr);
        this.updateStats();
        this.updateHpBar();
    }

    updateStats() {
        document.querySelector('.money').innerHTML = `${Math.floor(this.player.getMoney())}$`;
        const attributes = tower.getAttributeObject();

        for (let attr in attributes) {
            const element = document.createElement('div');
            element.innerHTML = `${attr}: ${attributes[attr]}`
            const button = document.querySelector(`button[data-attribute="${attr}"]`);
            button.innerHTML = '';
            button.appendChild(element);
        }
    }

    updateHpBar() {
        const currentHp = this.tower.getCurrentHp();
        if (currentHp <= -1) return;
        const maxHp = this.tower.getMaxHp();
        const width = 600 / maxHp * currentHp;
        this.hpBar.style.width = `${width}px`;
        this.currentHpElement.innerText = this.tower.getCurrentHp();
        this.maxHpElement.innerText = this.tower.getMaxHp();
    }
}