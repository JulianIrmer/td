class Ui {
    constructor(tower, player) {
        this.Calc = new Calculations();
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
        this.updateMoney();
    }

    handleClickEvents() {
        const statBoxes = document.querySelectorAll('.stat-box');
        for (let box of statBoxes) {
            box.addEventListener('click', (e) => {
                const {attribute, cost} = box.dataset;
                this.levelUp(attribute, cost);
            });
        }
    }

    levelUp(attr, cost) {
        if (!this.player.hasPlayerEnoughMoney(cost)) return;

        this.player.decreaseMoney(cost);
        this.updateMoney();
        this.tower.increaseAttribute(attr);
        this.updateCostAndLevel(attr);
        this.updateStats(attr);
        this.updateHpBar();
    }

    updateStats(attribute) {
        const attributes = tower.getAttributeObject();

        for (let attr in attributes) {
            if (attr === attribute || !attribute) {
                const element = document.createElement('div');
                const button = document.querySelector(`button[data-attribute="${attr}"]`);
                element.innerHTML = `   <div class="w-100 white-text bg-color-black">${attr.toUpperCase()}</div>
                                        <div class="w-100 stat-value">${attr === "ls" ? attributes[attr] * 100 + '%' : attributes[attr]}</div>
                                        <div class="w-100">cost: ${button.dataset.cost}$</div>
                                    `
                button.innerHTML = '';
                button.appendChild(element);
            }
        }
    }

    updateCostAndLevel(attr) {
        const button = document.querySelector(`button[data-attribute="${attr}"]`);
        let {level, cost} = button.dataset;
        const newCost = this.Calc.calcUpgradeCostPerLevel(+level, cost, attr);
        button.dataset.cost = newCost;
        const newLevel = +level + 1;
        button.dataset.level = newLevel;
    }

    updateMoney() {
        document.querySelector('.money').innerHTML = `${Math.floor(this.player.getMoney())}$`;
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

    updateEnemy(attributes) {
        for (let attribute in attributes) {
            const element = document.querySelector(`.enemy-stat[data-attribute="${attribute}"]`);
            element.innerText = `${attribute}: ${attributes[attribute]}`
        }
    }

    updateWaveCounter(iteration) {
        const element = document.querySelector('.wave > h4');
        element.innerText = `Wave ${iteration}`;
    }

    updateEnemyCounter(counter) {
        const level = getLevelInstance();
        const element = document.querySelector('.remaining-enemies');
        const maxEnemies = level.getEnemyAmount();
        const currentEnemies = maxEnemies - counter;
        element.innerText = `${currentEnemies} / ${maxEnemies}`;
    }
}