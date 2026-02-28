/**
 * 文豪迷犬怪奇潭 - 弹珠 RPG
 * 核心游戏逻辑
 */

// ==================== 游戏数据 ====================

// 角色数据库
const CHARACTER_DATABASE = [
    // SSR 角色
    { id: 1, name: "太宰治", rarity: "SSR", element: "暗", type: "平衡", skill: "人间失格", maxHp: 2000, maxAtk: 1500 },
    { id: 2, name: "中原中也", rarity: "SSR", element: "暗", type: "攻击", skill: "污浊了的忧伤之中", maxHp: 1800, maxAtk: 1800 },
    { id: 3, name: "芥川龙之介", rarity: "SSR", element: "暗", type: "攻击", skill: "罗生门", maxHp: 1600, maxAtk: 2000 },
    { id: 4, name: "中岛敦", rarity: "SSR", element: "光", type: "平衡", skill: "月下兽", maxHp: 1900, maxAtk: 1600 },
    { id: 5, name: "国木田独步", rarity: "SSR", element: "木", type: "技术", skill: "独步吟客", maxHp: 2200, maxAtk: 1400 },

    // SR 角色
    { id: 6, name: "泉镜花", rarity: "SR", element: "暗", type: "攻击", skill: "夜叉白雪", maxHp: 1400, maxAtk: 1200 },
    { id: 7, name: "谷崎润一郎", rarity: "SR", element: "光", type: "技术", skill: "细雪", maxHp: 1500, maxAtk: 1100 },
    { id: 8, name: "宫泽贤治", rarity: "SR", element: "木", type: "平衡", skill: "无畏风雨", maxHp: 1600, maxAtk: 1000 },
    { id: 9, name: "与谢野晶子", rarity: "SR", element: "火", type: "回复", skill: "君死给勿", maxHp: 1300, maxAtk: 900 },
    { id: 10, name: "江户川乱步", rarity: "SR", element: "光", type: "技术", skill: "超推理", maxHp: 1200, maxAtk: 1300 },

    // R 角色
    { id: 11, name: "立原道造", rarity: "R", element: "风", type: "平衡", skill: "咆哮之兽", maxHp: 1000, maxAtk: 800 },
    { id: 12, name: "梶井基次郎", rarity: "R", element: "暗", type: "攻击", skill: "柠檬", maxHp: 900, maxAtk: 900 },
    { id: 13, name: "佐佐城信子", rarity: "R", element: "光", type: "技术", skill: "心理掌握", maxHp: 1100, maxAtk: 700 },
    { id: 14, name: "梦野久作", rarity: "R", element: "暗", type: "特殊", skill: "脑髓地狱", maxHp: 1000, maxAtk: 850 },
    { id: 15, name: "广津柳浪", rarity: "R", element: "暗", type: "平衡", skill: "黑蜥蜴", maxHp: 1050, maxAtk: 800 },
];

// 关卡数据
const STAGE_DATA = [
    {
        chapter: 1,
        chapterName: "序章 - 武装侦探社",
        stages: [
            { id: 1, name: "相遇", difficulty: 1, stamina: 5, waves: 3, enemies: [{ name: "小喽啰", hp: 500, atk: 50, sprite: "👤" }] },
            { id: 2, name: "任务开始", difficulty: 1, stamina: 5, waves: 3, enemies: [{ name: "黑手党", hp: 600, atk: 60, sprite: "👤" }] },
            { id: 3, name: "追踪", difficulty: 2, stamina: 6, waves: 4, enemies: [{ name: "精英黑手党", hp: 800, atk: 80, sprite: "👤" }] },
            { id: 4, name: "对峙", difficulty: 2, stamina: 6, waves: 4, enemies: [{ name: "干部候补", hp: 1000, atk: 100, sprite: "👤" }] },
            { id: 5, name: "真相", difficulty: 3, stamina: 8, waves: 5, enemies: [{ name: "幕后黑手", hp: 2000, atk: 150, sprite: "👹" }] },
        ]
    },
    {
        chapter: 2,
        chapterName: "第一章 - 黑手党",
        stages: [
            { id: 6, name: "潜入", difficulty: 3, stamina: 8, waves: 5, enemies: [{ name: "守卫", hp: 1200, atk: 120, sprite: "👤" }] },
            { id: 7, name: "情报", difficulty: 3, stamina: 8, waves: 5, enemies: [{ name: "情报员", hp: 1300, atk: 130, sprite: "👤" }] },
            { id: 8, name: "突破", difficulty: 4, stamina: 10, waves: 6, enemies: [{ name: "精锐", hp: 1500, atk: 150, sprite: "👤" }] },
            { id: 9, name: "对决", difficulty: 4, stamina: 10, waves: 6, enemies: [{ name: "干部", hp: 1800, atk: 180, sprite: "👹" }] },
            { id: 10, name: "决战", difficulty: 5, stamina: 12, waves: 7, enemies: [{ name: "首领", hp: 3000, atk: 250, sprite: "👿" }] },
        ]
    },
    {
        chapter: 3,
        chapterName: "第二章 - 组合",
        stages: [
            { id: 11, name: "外来者", difficulty: 5, stamina: 12, waves: 7, enemies: [{ name: "组合成员", hp: 2000, atk: 200, sprite: "👤" }] },
            { id: 12, name: "阴谋", difficulty: 6, stamina: 14, waves: 8, enemies: [{ name: "组合干部", hp: 2500, atk: 250, sprite: "👹" }] },
            { id: 13, name: "反击", difficulty: 6, stamina: 14, waves: 8, enemies: [{ name: "组合精英", hp: 2800, atk: 280, sprite: "👹" }] },
            { id: 14, name: "总攻", difficulty: 7, stamina: 16, waves: 9, enemies: [{ name: "组合首领", hp: 3500, atk: 350, sprite: "👿" }] },
            { id: 15, name: "终结", difficulty: 8, stamina: 20, waves: 10, enemies: [{ name: "真正敌人", hp: 5000, atk: 500, sprite: "💀" }] },
        ]
    }
];

// 商店物品
const SHOP_ITEMS = [
    { id: 1, name: "体力药水", icon: "🧪", effect: "stamina", value: 50, price: 100, currency: "gold" },
    { id: 2, name: "宝石袋 (小)", icon: "💎", effect: "gem", value: 50, price: 100, currency: "gold" },
    { id: 3, name: "金币袋 (小)", icon: "🪙", effect: "gold", value: 500, price: 50, currency: "gem" },
    { id: 4, name: "召唤券", icon: "🎫", effect: "ticket", value: 1, price: 500, currency: "gold" },
];

// ==================== 游戏状态管理 ====================

class GameState {
    constructor() {
        this.load();
    }

    load() {
        const saved = localStorage.getItem('bungoSave');
        if (saved) {
            const data = JSON.parse(saved);
            this.resources = data.resources || { stamina: 100, gem: 1000, gold: 5000 };
            this.characters = data.characters || [];
            this.team = data.team || [];
            this.stages = data.stages || {};
            this.gachaHistory = data.gachaHistory || [];
        } else {
            this.resources = { stamina: 100, gem: 1000, gold: 5000 };
            this.characters = [];
            this.team = [];
            this.stages = {};
            this.gachaHistory = [];
            // 赠送初始角色
            this.addCharacter(4); // 中岛敦
            this.addCharacter(6); // 泉镜花
        }
    }

    save() {
        localStorage.setItem('bungoSave', JSON.stringify({
            resources: this.resources,
            characters: this.characters,
            team: this.team,
            stages: this.stages,
            gachaHistory: this.gachaHistory
        }));
    }

    addCharacter(characterId) {
        const baseChar = CHARACTER_DATABASE.find(c => c.id === characterId);
        const newChar = {
            uid: Date.now() + Math.random(),
            ...baseChar,
            level: 1,
            exp: 0,
            hp: baseChar.maxHp,
            atk: baseChar.maxAtk
        };
        this.characters.push(newChar);
        this.save();
        return newChar;
    }

    hasCharacter(characterId) {
        return this.characters.some(c => c.id === characterId);
    }

    updateResource(type, amount) {
        this.resources[type] = Math.max(0, this.resources[type] + amount);
        this.save();
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('stamina-display').textContent = `💎 体力：${this.resources.stamina}/100`;
        document.getElementById('gem-display').textContent = `💰 宝石：${this.resources.gem}`;
        document.getElementById('gold-display').textContent = `🪙 金币：${this.resources.gold}`;
    }
}

// ==================== 抽卡系统 ====================

class GachaSystem {
    constructor(game) {
        this.game = game;
        this.rates = { SSR: 0.03, SR: 0.15, R: 0.82 };
    }

    pull(times) {
        const cost = times === 1 ? 50 : 500;
        if (this.game.state.resources.gem < cost) {
            alert('宝石不足!');
            return;
        }

        this.game.state.updateResource('gem', -cost);

        const results = [];
        let hasGuaranteedSR = false;

        for (let i = 0; i < times; i++) {
            // 十连保底机制
            if (times === 10 && i === 9 && !hasGuaranteedSR) {
                const srOrSsr = Math.random() < 0.2 ? 'SSR' : 'SR';
                const pool = CHARACTER_DATABASE.filter(c => c.rarity === srOrSsr);
                const char = pool[Math.floor(Math.random() * pool.length)];
                results.push(char);
                hasGuaranteedSR = true;
            } else {
                const roll = Math.random();
                let rarity;
                if (roll < this.rates.SSR) rarity = 'SSR';
                else if (roll < this.rates.SSR + this.rates.SR) rarity = 'SR';
                else rarity = 'R';

                const pool = CHARACTER_DATABASE.filter(c => c.rarity === rarity);
                const char = pool[Math.floor(Math.random() * pool.length)];
                results.push(char);

                if (rarity === 'SR' || rarity === 'SSR') hasGuaranteedSR = true;
            }

            // 添加角色
            this.game.state.addCharacter(results[results.length - 1].id);
        }

        // 记录召唤历史
        this.game.state.gachaHistory.unshift({
            date: new Date().toLocaleString(),
            results: results.map(r => r.name)
        });

        this.showResult(results);
    }

    showResult(results) {
        const container = document.getElementById('result-characters');
        container.innerHTML = '';

        results.forEach(char => {
            const div = document.createElement('div');
            div.className = `result-character ${char.rarity}`;
            div.textContent = char.name.charAt(0);
            div.title = `${char.name} (${char.rarity})`;
            container.appendChild(div);
        });

        document.getElementById('gacha-result').classList.add('active');
    }

    closeResult() {
        document.getElementById('gacha-result').classList.remove('active');
        this.game.showScreen('main-menu');
    }
}

// ==================== 战斗系统 ====================

class BattleSystem {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById('battle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.dragCurrent = { x: 0, y: 0 };
        this.ball = null;
        this.enemies = [];
        this.currentWave = 0;
        this.teamMembers = [];
        this.isBattleRunning = false;

        this.setupControls();
    }

    setupControls() {
        this.canvas.addEventListener('mousedown', (e) => this.onDragStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.onDragMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onDragEnd(e));
        this.canvas.addEventListener('touchstart', (e) => this.onDragStart(e.touches[0]));
        this.canvas.addEventListener('touchmove', (e) => this.onDragMove(e.touches[0]));
        this.canvas.addEventListener('touchend', (e) => this.onDragEnd(e));
    }

    onDragStart(e) {
        if (!this.isBattleRunning || this.ball) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

        // 检查是否点击到队伍成员
        const teamIndex = this.teamMembers.findIndex(m =>
            Math.abs(m.x - x) < 30 && Math.abs(m.y - y) < 30
        );

        if (teamIndex >= 0) {
            this.isDragging = true;
            this.dragStart = { x, y };
            this.dragCurrent = { x, y };
            this.selectedMember = this.teamMembers[teamIndex];
        }
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const rect = this.canvas.getBoundingClientRect();
        this.dragCurrent = {
            x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
        };

        // 更新力量条
        const power = Math.min(100, Math.sqrt(
            Math.pow(this.dragStart.x - this.dragCurrent.x, 2) +
            Math.pow(this.dragStart.y - this.dragCurrent.y, 2)
        ) / 2);
        document.getElementById('power-bar').style.width = power + '%';
    }

    onDragEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        const power = Math.min(100, Math.sqrt(
            Math.pow(this.dragStart.x - this.dragCurrent.x, 2) +
            Math.pow(this.dragStart.y - this.dragCurrent.y, 2)
        ) / 2);

        if (power > 10) {
            this.launchBall(power);
        }

        document.getElementById('power-bar').style.width = '0%';
    }

    launchBall(power) {
        const dx = this.dragStart.x - this.dragCurrent.x;
        const dy = this.dragStart.y - this.dragCurrent.y;
        const angle = Math.atan2(dy, dx);
        const speed = power * 0.15;

        this.ball = {
            x: this.dragStart.x,
            y: this.dragStart.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 15,
            character: this.selectedMember,
            damage: this.selectedMember.atk * (0.5 + power / 200)
        };

        // 从队伍中暂时移除
        this.teamMembers = this.teamMembers.filter(m => m !== this.selectedMember);
    }

    startBattle(stage) {
        this.currentStage = stage;
        this.currentWave = 0;
        this.teamMembers = this.game.state.team.map(charId => {
            const char = this.game.state.characters.find(c => c.uid === charId);
            return {
                ...char,
                x: 50 + (this.game.state.team.indexOf(charId) % 4) * 90,
                y: 450,
                maxHp: char.hp
            };
        });

        this.loadWave();
        this.isBattleRunning = true;
        this.gameLoop();
    }

    loadWave() {
        const waveData = this.currentStage.enemies[this.currentWave % this.currentStage.enemies.length];
        const enemyCount = 1 + Math.floor(this.currentWave / 2);

        this.enemies = [];
        for (let i = 0; i < enemyCount; i++) {
            this.enemies.push({
                ...waveData,
                x: 100 + i * 150,
                y: 100 + (this.currentWave % 3) * 80,
                maxHp: waveData.hp,
                id: Date.now() + i
            });
        }

        document.getElementById('battle-wave').textContent = `Wave ${this.currentWave + 1}/${this.currentStage.waves}`;
    }

    gameLoop() {
        if (!this.isBattleRunning) return;

        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // 更新弹珠
        if (this.ball) {
            this.ball.x += this.ball.vx;
            this.ball.y += this.ball.vy;

            // 边界碰撞
            if (this.ball.x < this.ball.radius || this.ball.x > this.canvas.width - this.ball.radius) {
                this.ball.vx *= -0.8;
                this.ball.x = Math.max(this.ball.radius, Math.min(this.ball.x, this.canvas.width - this.ball.radius));
            }
            if (this.ball.y < this.ball.radius || this.ball.y > this.canvas.height - this.ball.radius) {
                this.ball.vy *= -0.8;
                this.ball.y = Math.max(this.ball.radius, Math.min(this.ball.y, this.canvas.height - this.ball.radius));
            }

            // 摩擦力
            this.ball.vx *= 0.99;
            this.ball.vy *= 0.99;

            // 敌人碰撞检测
            this.enemies.forEach(enemy => {
                const dx = this.ball.x - enemy.x;
                const dy = this.ball.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.ball.radius + 20) {
                    // 造成伤害
                    enemy.hp -= this.ball.damage;
                    this.showDamage(enemy.x, enemy.y, Math.floor(this.ball.damage));

                    // 弹珠反弹
                    const angle = Math.atan2(dy, dx);
                    this.ball.vx = Math.cos(angle) * Math.abs(this.ball.vx) * 0.5;
                    this.ball.vy = Math.sin(angle) * Math.abs(this.ball.vy) * 0.5;
                }
            });

            // 移除死亡敌人
            this.enemies = this.enemies.filter(e => e.hp > 0);

            // 弹珠停止
            if (Math.abs(this.ball.vx) < 0.1 && Math.abs(this.ball.vy) < 0.1) {
                this.returnBall();
            }
        }

        // 检查波次完成
        if (this.enemies.length === 0) {
            this.currentWave++;
            if (this.currentWave >= this.currentStage.waves) {
                this.winBattle();
            } else {
                this.loadWave();
            }
        }

        // 检查失败
        if (this.teamMembers.length === 0 && !this.ball) {
            this.loseBattle();
        }
    }

    returnBall() {
        if (this.ball) {
            this.teamMembers.push(this.ball.character);
            this.ball = null;
        }
    }

    showDamage(x, y, amount) {
        const damageEl = document.createElement('div');
        damageEl.className = 'damage-number';
        damageEl.textContent = amount;
        damageEl.style.left = x + 'px';
        damageEl.style.top = y + 'px';
        damageEl.style.color = '#ff6b6b';
        this.canvas.parentElement.appendChild(damageEl);
        setTimeout(() => damageEl.remove(), 1000);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制敌人
        this.enemies.forEach(enemy => {
            this.ctx.font = '40px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(enemy.sprite, enemy.x, enemy.y);

            // HP 条
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(enemy.x - 30, enemy.y + 20, 60, 6);
            this.ctx.fillStyle = '#e74c3c';
            this.ctx.fillRect(enemy.x - 30, enemy.y + 20, 60 * (enemy.hp / enemy.maxHp), 6);
        });

        // 绘制队伍成员
        this.teamMembers.forEach(member => {
            this.ctx.beginPath();
            this.ctx.arc(member.x, member.y, 20, 0, Math.PI * 2);
            this.ctx.fillStyle = '#667eea';
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#fff';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(member.name.charAt(0), member.x, member.y + 5);
        });

        // 绘制拖拽线
        if (this.isDragging) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.dragStart.x, this.dragStart.y);
            this.ctx.lineTo(this.dragCurrent.x, this.dragCurrent.y);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([5, 5]);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }

        // 绘制弹珠
        if (this.ball) {
            this.ctx.beginPath();
            this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffd700';
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    winBattle() {
        this.isBattleRunning = false;
        const rewards = {
            gold: 100 * this.currentStage.difficulty,
            gem: Math.floor(10 * this.currentStage.difficulty),
            exp: 50 * this.currentStage.difficulty
        };

        this.game.state.updateResource('gold', rewards.gold);
        this.game.state.updateResource('gem', rewards.gem);

        // 标记关卡完成
        this.game.state.stages[this.currentStage.id] = {
            completed: true,
            stars: 3
        };
        this.game.state.save();

        // 显示结果
        document.getElementById('battle-result-title').textContent = '战斗胜利!';
        document.getElementById('battle-rewards').innerHTML = `
            <div class="reward-item">
                <span class="reward-icon">🪙</span>
                <span class="reward-amount">+${rewards.gold}</span>
            </div>
            <div class="reward-item">
                <span class="reward-icon">💰</span>
                <span class="reward-amount">+${rewards.gem}</span>
            </div>
        `;
        document.getElementById('battle-result').classList.add('active');
    }

    loseBattle() {
        this.isBattleRunning = false;
        document.getElementById('battle-result-title').textContent = '战斗失败...';
        document.getElementById('battle-rewards').innerHTML = '';
        document.getElementById('battle-result').classList.add('active');
    }
}

// ==================== 主游戏类 ====================

class Game {
    constructor() {
        this.state = new GameState();
        this.gacha = new GachaSystem(this);
        this.battle = new BattleSystem(this);

        this.state.updateDisplay();
        this.setupFilters();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');

        if (screenId === 'story-map') this.renderChapterList();
        if (screenId === 'character-list') this.renderCharacterList();
        if (screenId === 'shop') this.renderShop();
    }

    renderChapterList() {
        const container = document.getElementById('chapter-list');
        container.innerHTML = '';

        STAGE_DATA.forEach(chapter => {
            const div = document.createElement('div');
            div.className = 'chapter-item';
            div.innerHTML = `
                <h3>${chapter.chapterName}</h3>
                <p>${chapter.stages.length} 个关卡</p>
            `;
            div.onclick = () => this.showStageSelect(chapter);
            container.appendChild(div);
        });
    }

    showStageSelect(chapter) {
        document.getElementById('chapter-title').textContent = chapter.chapterName;
        const container = document.getElementById('stage-grid');
        container.innerHTML = '';

        chapter.stages.forEach(stage => {
            const div = document.createElement('div');
            const saved = this.state.stages[stage.id];
            div.className = `stage-item ${saved ? 'completed' : ''}`;
            div.innerHTML = `
                <span class="stage-number">${stage.id}</span>
                <div class="stage-stars">${saved ? '⭐⭐⭐' : ''}</div>
            `;
            div.onclick = () => this.startStage(stage);
            container.appendChild(div);
        });

        this.showScreen('stage-select');
    }

    startStage(stage) {
        if (this.state.resources.stamina < stage.stamina) {
            alert('体力不足!');
            return;
        }

        if (this.state.team.length === 0) {
            alert('请先组建队伍!');
            this.showScreen('character-list');
            return;
        }

        this.state.updateResource('stamina', -stage.stamina);
        document.getElementById('stage-name').textContent = stage.name;
        this.showScreen('battle');
        this.battle.startBattle(stage);
    }

    retreat() {
        this.battle.isBattleRunning = false;
        this.showScreen('main-menu');
    }

    closeBattleResult() {
        document.getElementById('battle-result').classList.remove('active');
        this.showScreen('main-menu');
    }

    renderCharacterList(filter = 'all') {
        const container = document.getElementById('character-grid');
        container.innerHTML = '';

        const filtered = filter === 'all'
            ? this.state.characters
            : this.state.characters.filter(c => c.rarity === filter);

        filtered.forEach(char => {
            const div = document.createElement('div');
            div.className = `character-card ${char.rarity}`;
            div.innerHTML = `
                <span class="character-rarity">${char.rarity}</span>
                <span class="character-level">Lv.${char.level}</span>
                <span class="character-name">${char.name}</span>
            `;
            div.onclick = () => this.toggleTeamMember(char);
            container.appendChild(div);
        });
    }

    setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderCharacterList(btn.dataset.rarity);
            };
        });
    }

    toggleTeamMember(char) {
        const index = this.state.team.indexOf(char.uid);
        if (index >= 0) {
            this.state.team.splice(index, 1);
        } else if (this.state.team.length < 4) {
            this.state.team.push(char.uid);
        } else {
            alert('队伍已满 (最多 4 人)');
        }
        this.state.save();
        this.renderCharacterList();
        this.renderTeam();
    }

    renderTeam() {
        for (let i = 0; i < 4; i++) {
            const slot = document.getElementById(`team-${i}`);
            const charId = this.state.team[i];
            if (charId) {
                const char = this.state.characters.find(c => c.uid === charId);
                slot.className = 'team-member has-character';
                slot.textContent = char.name.charAt(0);
            } else {
                slot.className = 'team-member';
                slot.textContent = '+';
            }
        }
    }

    renderShop() {
        const container = document.getElementById('shop-items');
        container.innerHTML = '';

        SHOP_ITEMS.forEach(item => {
            const div = document.createElement('div');
            div.className = 'shop-item';
            div.innerHTML = `
                <div class="shop-item-info">
                    <span class="shop-item-icon">${item.icon}</span>
                    <div>
                        <div>${item.name}</div>
                        <div style="color: #888; font-size: 0.9em;">${item.effect === 'stamina' ? '恢复 50 体力' : `+${item.value} ${item.effect}`}</div>
                    </div>
                </div>
                <button class="shop-item-buy" onclick="game.buyItem(${item.id})">
                    ${item.currency === 'gold' ? '🪙' : '💰'} ${item.price}
                </button>
            `;
            container.appendChild(div);
        });
    }

    buyItem(itemId) {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (this.state.resources[item.currency] >= item.price) {
            this.state.updateResource(item.currency, -item.price);
            this.state.updateResource(item.effect, item.value);
            alert(`购买了 ${item.name}!`);
        } else {
            alert(`${item.currency === 'gold' ? '金币' : '宝石'}不足!`);
        }
    }
}

// ==================== 初始化游戏 ====================

const game = new Game();
