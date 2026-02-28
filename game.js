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

// 活动关卡数据
const EVENT_STAGE_DATA = [
    {
        id: 'exp',
        name: '经验特训',
        icon: '📚',
        color: '#3498db',
        description: '获得大量角色经验书',
        stages: [
            { id: 101, name: '初级特训', difficulty: 1, stamina: 10, waves: 3, rewardType: 'exp', rewardValue: 500, enemies: [
                { name: "训练人偶", hp: 800, atk: 30, sprite: "🤖" }
            ]},
            { id: 102, name: '中级特训', difficulty: 3, stamina: 15, waves: 5, rewardType: 'exp', rewardValue: 1500, enemies: [
                { name: "训练人偶·改", hp: 2000, atk: 80, sprite: "🤖" }
            ]},
            { id: 103, name: '上级特训', difficulty: 5, stamina: 20, waves: 7, rewardType: 'exp', rewardValue: 3000, enemies: [
                { name: "训练人偶·极", hp: 4000, atk: 150, sprite: "🤖" }
            ]},
            { id: 104, name: '特级特训', difficulty: 8, stamina: 30, waves: 10, rewardType: 'exp', rewardValue: 8000, enemies: [
                { name: "训练人偶·神", hp: 8000, atk: 300, sprite: "🤖" }
            ]},
        ]
    },
    {
        id: 'gold',
        name: '金币副本',
        icon: '💰',
        color: '#f39c12',
        description: '获得大量金币',
        stages: [
            { id: 201, name: '初级财宝', difficulty: 1, stamina: 10, waves: 3, rewardType: 'gold', rewardValue: 1000, enemies: [
                { name: "金币史莱姆", hp: 600, atk: 50, sprite: "💛" }
            ]},
            { id: 202, name: '中级财宝', difficulty: 3, stamina: 15, waves: 5, rewardType: 'gold', rewardValue: 3000, enemies: [
                { name: "黄金史莱姆", hp: 1500, atk: 100, sprite: "💛" }
            ]},
            { id: 203, name: '上级财宝', difficulty: 5, stamina: 20, waves: 7, rewardType: 'gold', rewardValue: 8000, enemies: [
                { name: "钻石史莱姆", hp: 3000, atk: 200, sprite: "💎" }
            ]},
            { id: 204, name: '传说财宝', difficulty: 8, stamina: 30, waves: 10, rewardType: 'gold', rewardValue: 20000, enemies: [
                { name: "宝藏巨龙", hp: 10000, atk: 400, sprite: "🐉" }
            ]},
        ]
    },
    {
        id: 'limit',
        name: '界限突破',
        icon: '⭐',
        color: '#e74c3c',
        description: '获得角色突破材料',
        stages: [
            { id: 301, name: '暗之试炼', difficulty: 3, stamina: 15, waves: 5, rewardType: 'material', rewardValue: 'dark', enemies: [
                { name: "暗影守护者", hp: 2500, atk: 120, sprite: "🌑" }
            ]},
            { id: 302, name: '光之试炼', difficulty: 3, stamina: 15, waves: 5, rewardType: 'material', rewardValue: 'light', enemies: [
                { name: "光辉守护者", hp: 2500, atk: 120, sprite: "☀️" }
            ]},
            { id: 303, name: '木之试炼', difficulty: 3, stamina: 15, waves: 5, rewardType: 'material', rewardValue: 'wood', enemies: [
                { name: "自然守护者", hp: 2500, atk: 120, sprite: "🌳" }
            ]},
            { id: 304, name: '火之试炼', difficulty: 3, stamina: 15, waves: 5, rewardType: 'material', rewardValue: 'fire', enemies: [
                { name: "烈焰守护者", hp: 2500, atk: 120, sprite: "🔥" }
            ]},
            { id: 305, name: '风之试炼', difficulty: 3, stamina: 15, waves: 5, rewardType: 'material', rewardValue: 'wind', enemies: [
                { name: "狂风守护者", hp: 2500, atk: 120, sprite: "💨" }
            ]},
        ]
    },
    {
        id: 'boss',
        name: '世界 BOSS',
        icon: '👹',
        color: '#9b59b6',
        description: '挑战强大 BOSS 获得稀有奖励',
        stages: [
            { id: 401, name: '祸斗', difficulty: 6, stamina: 20, waves: 1, rewardType: 'special', rewardValue: 500, enemies: [
                { name: "祸斗", hp: 15000, atk: 200, sprite: "🐕" }
            ]},
            { id: 402, name: "百足", difficulty: 7, stamina: 25, waves: 1, rewardType: 'special', rewardValue: 800, enemies: [
                { name: "百足", hp: 25000, atk: 300, sprite: "🐛" }
            ]},
            { id: 403, name: "牙龙", difficulty: 9, stamina: 35, waves: 1, rewardType: 'special', rewardValue: 1500, enemies: [
                { name: "牙龙", hp: 50000, atk: 500, sprite: "🐲" }
            ]},
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
            this.resources = data.resources || { stamina: 100, gem: 10000, gold: 50000 };
            this.characters = data.characters || [];
            this.team = data.team || [];
            this.stages = data.stages || {};
            this.gachaHistory = data.gachaHistory || [];
            // 老玩家补偿：如果钻石少于 10000，补足到 10000
            if (this.resources.gem < 10000) {
                this.resources.gem = 10000;
            }
            if (this.resources.gold < 50000) {
                this.resources.gold = 50000;
            }
        } else {
            this.resources = { stamina: 100, gem: 10000, gold: 50000 };
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
        const staminaEl = document.getElementById('stamina-display');
        const gemEl = document.getElementById('gem-display');
        const goldEl = document.getElementById('gold-display');
        if (staminaEl) staminaEl.textContent = `💎 体力：${this.resources.stamina}/100`;
        if (gemEl) gemEl.textContent = `💰 宝石：${this.resources.gem}`;
        if (goldEl) goldEl.textContent = `🪙 金币：${this.resources.gold}`;
    }
}

// ==================== 抽卡系统 ====================

class GachaSystem {
    constructor(game) {
        this.game = game;
        this.currentPool = 'standard';
        this.pools = {
            standard: {
                name: '常驻卡池',
                rates: { SSR: 0.03, SR: 0.15, R: 0.82 },
                upCharacters: []
            },
            dazai: {
                name: '太宰治限时 UP 卡池',
                rates: { SSR: 0.06, SR: 0.20, R: 0.74 },
                upCharacters: [1], // 太宰治 ID
                upRate: 0.50 // UP 角色占 SSR 的 50%
            }
        };
    }

    switchPool(poolName) {
        this.currentPool = poolName;
        document.querySelectorAll('.pool-tab').forEach(tab => tab.classList.remove('active'));
        event.target.closest('.pool-tab').classList.add('active');

        document.getElementById('gacha-standard').style.display = poolName === 'standard' ? 'block' : 'none';
        document.getElementById('gacha-dazai').style.display = poolName === 'dazai' ? 'block' : 'none';
    }

    pull(times, poolType = null) {
        const pool = poolType ? this.pools[poolType] : this.pools[this.currentPool];
        const cost = times === 1 ? 50 : 500;

        if (this.game.state.resources.gem < cost) {
            alert('宝石不足!');
            return;
        }

        this.game.state.updateResource('gem', -cost);

        const results = [];
        let hasGuaranteedSSR = false;
        let hasGuaranteedSR = false;

        for (let i = 0; i < times; i++) {
            // 十连保底机制 - 太宰治卡池保底 SSR 太宰治
            if (times === 10 && i === 9 && poolType === 'dazai' && !hasGuaranteedSSR) {
                // 保底获得太宰治
                results.push(CHARACTER_DATABASE.find(c => c.id === 1));
                this.game.state.addCharacter(1);
                hasGuaranteedSSR = true;
                continue;
            }

            // 十连保底机制 - 常驻卡池保底 SR+
            if (times === 10 && i === 9 && !hasGuaranteedSR && poolType !== 'dazai') {
                const srOrSsr = Math.random() < 0.2 ? 'SSR' : 'SR';
                const pool_chars = CHARACTER_DATABASE.filter(c => c.rarity === srOrSsr);
                const char = pool_chars[Math.floor(Math.random() * pool_chars.length)];
                results.push(char);
                this.game.state.addCharacter(char.id);
                hasGuaranteedSR = true;
                continue;
            }

            const roll = Math.random();
            let rarity;
            if (roll < pool.rates.SSR) rarity = 'SSR';
            else if (roll < pool.rates.SSR + pool.rates.SR) rarity = 'SR';
            else rarity = 'R';

            let char;

            // 如果是 SSR 且在太宰治卡池
            if (rarity === 'SSR' && poolType === 'dazai') {
                const upRoll = Math.random();
                if (upRoll < pool.upRate) {
                    // 获得 UP 角色 - 太宰治
                    char = CHARACTER_DATABASE.find(c => c.id === 1);
                } else {
                    // 获得其他 SSR
                    const otherSSR = CHARACTER_DATABASE.filter(c => c.rarity === 'SSR' && c.id !== 1);
                    char = otherSSR[Math.floor(Math.random() * otherSSR.length)];
                }
            } else {
                const pool_chars = CHARACTER_DATABASE.filter(c => c.rarity === rarity);
                char = pool_chars[Math.floor(Math.random() * pool_chars.length)];
            }

            results.push(char);
            this.game.state.addCharacter(char.id);

            if (rarity === 'SR' || rarity === 'SSR') hasGuaranteedSR = true;
            if (rarity === 'SSR') hasGuaranteedSSR = true;
        }

        // 记录召唤历史
        this.game.state.gachaHistory.unshift({
            date: new Date().toLocaleString(),
            pool: pool.name,
            results: results.map(r => r.name)
        });

        this.showResult(results, poolType);
    }

    showResult(results, poolType = null) {
        const container = document.getElementById('result-characters');
        if (!container) return;
        container.innerHTML = '';

        results.forEach((char, index) => {
            const div = document.createElement('div');
            div.className = `result-character ${char.rarity}`;
            if (poolType === 'dazai' && char.id === 1) {
                div.classList.add('up-character');
            }
            div.textContent = char.name.charAt(0);
            div.title = `${char.name} (${char.rarity})`;
            div.style.animationDelay = (index * 0.1) + 's';
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
        this.canvas = null;
        this.ctx = null;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.dragCurrent = { x: 0, y: 0 };
        this.ball = null;
        this.enemies = [];
        this.currentWave = 0;
        this.teamMembers = [];
        this.isBattleRunning = false;
        this.selectedMember = null;
    }

    initCanvas() {
        this.canvas = document.getElementById('battle-canvas');
        if (!this.canvas) return false;
        this.ctx = this.canvas.getContext('2d');
        this.setupControls();
        return true;
    }

    setupControls() {
        const self = this;

        // 鼠标事件
        this.canvas.addEventListener('mousedown', function(e) { self.onDragStart(e); });
        this.canvas.addEventListener('mousemove', function(e) { self.onDragMove(e); });
        this.canvas.addEventListener('mouseup', function(e) { self.onDragEnd(e); });

        // 触摸事件
        this.canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            self.onDragStart(e.touches[0]);
        }, { passive: false });
        this.canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            self.onDragMove(e.touches[0]);
        }, { passive: false });
        this.canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            self.onDragEnd(e);
        }, { passive: false });
    }

    getCanvasCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    onDragStart(e) {
        console.log('Drag start', this.isBattleRunning, this.ball);
        if (!this.isBattleRunning || this.ball) {
            console.log('Cannot drag: battle=', this.isBattleRunning, 'ball=', this.ball);
            return;
        }

        const coords = this.getCanvasCoords(e);
        const x = coords.x;
        const y = coords.y;
        console.log('Click at:', x, y);

        // 检查是否点击到队伍成员
        for (let i = 0; i < this.teamMembers.length; i++) {
            const member = this.teamMembers[i];
            const dx = member.x - x;
            const dy = member.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            console.log('Member', i, 'at', member.x, member.y, 'dist:', dist);

            if (dist < 40) {  // 增大点击范围
                this.isDragging = true;
                this.dragStart = { x: member.x, y: member.y };
                this.dragCurrent = { x, y };
                this.selectedMember = member;
                console.log('Selected member:', member.name);
                return;
            }
        }
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const coords = this.getCanvasCoords(e);
        this.dragCurrent = coords;

        // 更新力量条
        const dx = this.dragStart.x - this.dragCurrent.x;
        const dy = this.dragStart.y - this.dragCurrent.y;
        const power = Math.min(100, Math.sqrt(dx * dx + dy * dy) / 3);

        const powerBar = document.getElementById('power-bar');
        if (powerBar) {
            powerBar.style.width = power + '%';
            // 根据力量改变颜色
            if (power < 30) {
                powerBar.style.background = '#27ae60';
            } else if (power < 70) {
                powerBar.style.background = '#f39c12';
            } else {
                powerBar.style.background = '#e74c3c';
            }
        }
    }

    onDragEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        const dx = this.dragStart.x - this.dragCurrent.x;
        const dy = this.dragStart.y - this.dragCurrent.y;
        const power = Math.min(100, Math.sqrt(dx * dx + dy * dy) / 3);

        console.log('Drag end, power:', power);

        if (power > 15) {
            this.launchBall(dx, dy, power);
        }

        const powerBar = document.getElementById('power-bar');
        if (powerBar) {
            powerBar.style.width = '0%';
            powerBar.style.background = 'linear-gradient(90deg, #27ae60, #f39c12, #e74c3c)';
        }
    }

    launchBall(dx, dy, power) {
        const angle = Math.atan2(dy, dx);
        const speed = power * 0.25;  // 增加速度

        this.ball = {
            x: this.dragStart.x,
            y: this.dragStart.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 20,
            character: this.selectedMember,
            damage: this.selectedMember.atk * (0.8 + power / 150)
        };

        console.log('Launch! angle:', angle, 'speed:', speed, 'damage:', this.ball.damage);

        // 从队伍中暂时移除
        this.teamMembers = this.teamMembers.filter(m => m !== this.selectedMember);
    }

    startBattle(stage) {
        console.log('Starting battle:', stage.name);
        this.currentStage = stage;
        this.currentWave = 0;

        // 初始化 Canvas
        if (!this.initCanvas()) {
            console.error('Failed to init canvas');
            return;
        }

        // 设置队伍成员位置
        this.teamMembers = this.game.state.team.map((charId, index) => {
            const char = this.game.state.characters.find(c => c.uid === charId);
            return {
                ...char,
                x: 60 + index * 95,
                y: 430,
                maxHp: char.hp,
                currentHp: char.hp
            };
        });

        console.log('Team members:', this.teamMembers.length);

        this.loadWave();
        this.isBattleRunning = true;
        this.gameLoop();
    }

    loadWave() {
        const waveData = this.currentStage.enemies[this.currentWave % this.currentStage.enemies.length];
        const enemyCount = Math.min(3, 1 + Math.floor(this.currentWave / 2));

        this.enemies = [];
        for (let i = 0; i < enemyCount; i++) {
            this.enemies.push({
                ...waveData,
                x: 80 + i * 140,
                y: 80 + (this.currentWave % 2) * 60,
                maxHp: waveData.hp * (1 + this.currentWave * 0.1),
                currentHp: waveData.hp * (1 + this.currentWave * 0.1),
                id: Date.now() + i
            });
        }

        const waveEl = document.getElementById('battle-wave');
        if (waveEl) {
            waveEl.textContent = `Wave ${this.currentWave + 1}/${this.currentStage.waves}`;
        }
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
                this.ball.vx *= -0.7;
                this.ball.x = Math.max(this.ball.radius, Math.min(this.ball.x, this.canvas.width - this.ball.radius));
            }
            if (this.ball.y < this.ball.radius || this.ball.y > this.canvas.height - this.ball.radius) {
                this.ball.vy *= -0.7;
                this.ball.y = Math.max(this.ball.radius, Math.min(this.ball.y, this.canvas.height - this.ball.radius));
            }

            // 摩擦力
            this.ball.vx *= 0.985;
            this.ball.vy *= 0.985;

            // 敌人碰撞检测
            for (let i = 0; i < this.enemies.length; i++) {
                const enemy = this.enemies[i];
                const dx = this.ball.x - enemy.x;
                const dy = this.ball.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.ball.radius + 25) {
                    // 造成伤害
                    enemy.currentHp -= this.ball.damage;
                    this.showDamage(enemy.x, enemy.y, Math.floor(this.ball.damage));
                    console.log('Hit enemy! HP:', enemy.currentHp);

                    // 弹珠反弹
                    const angle = Math.atan2(dy, dx);
                    this.ball.vx = Math.cos(angle) * Math.abs(this.ball.vx) * 0.6;
                    this.ball.vy = Math.sin(angle) * Math.abs(this.ball.vy) * 0.6;

                    // 如果敌人死亡
                    if (enemy.currentHp <= 0) {
                        this.enemies.splice(i, 1);
                        i--;
                    }
                }
            }

            // 弹珠停止
            if (Math.abs(this.ball.vx) < 0.2 && Math.abs(this.ball.vy) < 0.2) {
                this.returnBall();
            }
        }

        // 检查波次完成
        if (this.enemies.length === 0) {
            this.currentWave++;
            if (this.currentWave >= this.currentStage.waves) {
                this.winBattle();
            } else {
                setTimeout(() => this.loadWave(), 500);
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
            console.log('Ball returned, team size:', this.teamMembers.length);
        }
    }

    showDamage(x, y, amount) {
        const canvas = document.getElementById('battle-canvas');
        if (!canvas) return;

        const damageEl = document.createElement('div');
        damageEl.className = 'damage-number';
        damageEl.textContent = amount;
        damageEl.style.left = (canvas.offsetLeft + x) + 'px';
        damageEl.style.top = (canvas.offsetTop + y) + 'px';
        damageEl.style.color = '#ff6b6b';
        damageEl.style.position = 'absolute';
        damageEl.style.pointerEvents = 'none';
        document.body.appendChild(damageEl);
        setTimeout(() => damageEl.remove(), 800);
    }

    render() {
        // 清空画布
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格背景
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // 绘制敌人
        this.enemies.forEach(enemy => {
            // 敌人 sprite
            this.ctx.font = '40px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(enemy.sprite, enemy.x, enemy.y);

            // HP 条背景
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(enemy.x - 30, enemy.y - 35, 60, 8);

            // HP 条前景
            const hpPercent = enemy.currentHp / enemy.maxHp;
            this.ctx.fillStyle = hpPercent > 0.5 ? '#27ae60' : hpPercent > 0.25 ? '#f39c12' : '#e74c3c';
            this.ctx.fillRect(enemy.x - 30, enemy.y - 35, 60 * hpPercent, 8);

            // HP 文字
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(Math.floor(enemy.currentHp) + '/' + Math.floor(enemy.maxHp), enemy.x, enemy.y - 45);
        });

        // 绘制队伍成员
        this.teamMembers.forEach(member => {
            // 角色圆圈
            this.ctx.beginPath();
            this.ctx.arc(member.x, member.y, 25, 0, Math.PI * 2);

            // 根据稀有度设置颜色
            if (member.rarity === 'SSR') {
                this.ctx.fillStyle = '#ffd700';
            } else if (member.rarity === 'SR') {
                this.ctx.fillStyle = '#ba55d3';
            } else {
                this.ctx.fillStyle = '#3498db';
            }
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // 角色名字首字
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillStyle = '#333';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(member.name.charAt(0), member.x, member.y);

            // HP 条
            const hpPercent = member.currentHp / member.maxHp;
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(member.x - 20, member.y + 30, 40, 5);
            this.ctx.fillStyle = '#27ae60';
            this.ctx.fillRect(member.x - 20, member.y + 30, 40 * hpPercent, 5);
        });

        // 绘制拖拽线
        if (this.isDragging && this.selectedMember) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.dragStart.x, this.dragStart.y);
            this.ctx.lineTo(this.dragCurrent.x, this.dragCurrent.y);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.lineWidth = 4;
            this.ctx.setLineDash([10, 5]);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // 绘制瞄准方向指示器（相反方向）
            const aimX = this.dragStart.x * 2 - this.dragCurrent.x;
            const aimY = this.dragStart.y * 2 - this.dragCurrent.y;
            this.ctx.beginPath();
            this.ctx.moveTo(this.dragStart.x, this.dragStart.y);
            this.ctx.lineTo(aimX, aimY);
            this.ctx.strokeStyle = 'rgba(255, 100, 100, 0.5)';
            this.ctx.lineWidth = 2;
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
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // 弹珠上的角色首字
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillStyle = '#333';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.ball.character.name.charAt(0), this.ball.x, this.ball.y);
        }
    }

    winBattle() {
        this.isBattleRunning = false;

        // 基础奖励
        let rewards = {
            gold: 100 * this.currentStage.difficulty,
            gem: Math.floor(10 * this.currentStage.difficulty),
            exp: 50 * this.currentStage.difficulty
        };

        // 活动关卡奖励
        let eventReward = null;
        if (this.currentEvent) {
            const stage = this.currentEvent.stages.find(s => s.id === this.currentStage.id);
            if (stage) {
                if (stage.rewardType === 'gold') {
                    eventReward = { type: 'gold', value: stage.rewardValue, icon: '🪙' };
                    rewards.gold += stage.rewardValue;
                } else if (stage.rewardType === 'exp') {
                    eventReward = { type: 'exp', value: stage.rewardValue, icon: '📚' };
                    // exp 暂时用 gold 存储
                    rewards.gold += stage.rewardValue;
                } else if (stage.rewardType === 'special') {
                    eventReward = { type: 'gem', value: stage.rewardValue, icon: '💎' };
                    rewards.gem += stage.rewardValue;
                } else if (stage.rewardType === 'material') {
                    eventReward = { type: 'material', value: stage.rewardValue, icon: '⭐' };
                    rewards.gem += stage.rewardValue * 2; // 突破材料用宝石代替
                }
            }
        }

        this.game.state.updateResource('gold', rewards.gold);
        this.game.state.updateResource('gem', rewards.gem);

        // 标记关卡完成
        this.game.state.stages[this.currentStage.id] = {
            completed: true,
            stars: 3
        };
        this.game.state.save();

        // 显示结果
        const titleEl = document.getElementById('battle-result-title');
        const rewardsEl = document.getElementById('battle-rewards');
        if (titleEl) titleEl.textContent = '战斗胜利!';
        if (rewardsEl) {
            let html = `
                <div class="reward-item">
                    <span class="reward-icon">🪙</span>
                    <span class="reward-amount">+${rewards.gold}</span>
                </div>
                <div class="reward-item">
                    <span class="reward-icon">💰</span>
                    <span class="reward-amount">+${rewards.gem}</span>
                </div>
            `;
            if (eventReward) {
                html += `
                    <div class="reward-item" style="border: 2px solid ${this.currentEvent.color}; border-radius: 10px; padding: 10px;">
                        <span class="reward-icon">${eventReward.icon}</span>
                        <span class="reward-amount" style="color: ${this.currentEvent.color}">+${eventReward.value}</span>
                        <div style="font-size: 0.8em; color: #888;">活动奖励</div>
                    </div>
                `;
            }
            rewardsEl.innerHTML = html;
        }
        document.getElementById('battle-result').classList.add('active');
        this.currentEvent = null;
    }

    loseBattle() {
        this.isBattleRunning = false;
        const titleEl = document.getElementById('battle-result-title');
        const rewardsEl = document.getElementById('battle-rewards');
        if (titleEl) titleEl.textContent = '战斗失败...';
        if (rewardsEl) rewardsEl.innerHTML = '';
        document.getElementById('battle-result').classList.add('active');
    }
}

// ==================== 主游戏类 ====================

class Game {
    constructor() {
        this.state = new GameState();
        this.gacha = new GachaSystem(this);
        this.battle = new BattleSystem(this);
        this.currentEvent = null;

        this.state.updateDisplay();
        this.setupFilters();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(screenId);
        if (target) {
            target.classList.add('active');
        }

        if (screenId === 'story-map') this.renderChapterList();
        if (screenId === 'character-list') this.renderCharacterList();
        if (screenId === 'shop') this.renderShop();
    }

    renderChapterList() {
        const container = document.getElementById('chapter-list');
        if (!container) return;
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

        // 渲染活动列表
        this.renderEventList();
    }

    renderEventList() {
        const container = document.getElementById('event-list');
        if (!container) return;
        container.innerHTML = '';

        EVENT_STAGE_DATA.forEach(event => {
            const div = document.createElement('div');
            div.className = 'event-item';
            div.style.borderColor = event.color;
            div.innerHTML = `
                <div class="event-item-icon">${event.icon}</div>
                <div class="event-item-name">${event.name}</div>
                <div class="event-item-desc">${event.description}</div>
                <div class="event-item-reward">关卡数：${event.stages.length}</div>
            `;
            div.onclick = () => this.showEventStageSelect(event);
            container.appendChild(div);
        });
    }

    showStageSelect(chapter) {
        const titleEl = document.getElementById('chapter-title');
        if (titleEl) titleEl.textContent = chapter.chapterName;

        const container = document.getElementById('stage-grid');
        if (!container) return;
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

    showEventStageSelect(event) {
        const titleEl = document.getElementById('event-title');
        const infoEl = document.getElementById('event-info');
        if (titleEl) titleEl.textContent = event.name;
        if (infoEl) {
            infoEl.innerHTML = `
                <div style="font-size: 3em; margin-bottom: 10px;">${event.icon}</div>
                <div>${event.description}</div>
                <div class="event-reward-type">奖励：${this.getRewardTypeName(event.stages[0].rewardType)}</div>
            `;
        }

        const container = document.getElementById('event-stage-grid');
        if (!container) return;
        container.innerHTML = '';

        event.stages.forEach(stage => {
            const div = document.createElement('div');
            const saved = this.state.stages[stage.id];
            div.className = `stage-item ${saved ? 'completed' : ''}`;
            div.style.borderColor = event.color;
            const rewardText = this.getRewardText(stage.rewardType, stage.rewardValue);
            div.innerHTML = `
                <span class="stage-number">${stage.id}</span>
                <div class="stage-stars">${saved ? '⭐⭐⭐' : ''}</div>
                <div style="font-size: 0.7em; margin-top: 5px; color: #ffd700;">${rewardText}</div>
            `;
            div.onclick = () => this.startStage(stage, event);
            container.appendChild(div);
        });

        this.showScreen('event-stage-select');
    }

    getRewardTypeName(type) {
        const names = {
            'exp': '📚 经验书',
            'gold': '🪙 金币',
            'material': '⭐ 突破材料',
            'special': '🎁 稀有奖励'
        };
        return names[type] || type;
    }

    getRewardText(type, value) {
        if (type === 'exp') return `EXP +${value}`;
        if (type === 'gold') return `🪙 +${value}`;
        if (type === 'material') return `材料 ${value}`;
        if (type === 'special') return `🎁 ${value}`;
        return '';
    }

    startStage(stage, event = null) {
        if (this.state.resources.stamina < stage.stamina) {
            alert('体力不足!');
            return;
        }

        if (this.state.team.length === 0) {
            alert('请先组建队伍!');
            this.showScreen('character-list');
            return;
        }

        this.currentEvent = event;
        this.state.updateResource('stamina', -stage.stamina);
        const stageNameEl = document.getElementById('stage-name');
        if (stageNameEl) stageNameEl.textContent = stage.name;
        this.showScreen('battle');

        // 延迟启动战斗，确保 Canvas 已显示
        setTimeout(() => {
            this.battle.startBattle(stage);
        }, 100);
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
        if (!container) return;
        container.innerHTML = '';

        const filtered = filter === 'all'
            ? this.state.characters
            : this.state.characters.filter(c => c.rarity === filter);

        filtered.forEach(char => {
            const div = document.createElement('div');
            div.className = `character-card ${char.rarity}`;
            const isInTeam = this.state.team.includes(char.uid);
            div.innerHTML = `
                <span class="character-rarity">${char.rarity}</span>
                <span class="character-level">Lv.${char.level}</span>
                <span class="character-name">${char.name}</span>
                ${isInTeam ? '<span style="position:absolute;top:5px;left:5px;background:#27ae60;padding:2px 6px;border-radius:3px;font-size:10px;">队伍中</span>' : ''}
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
            if (!slot) continue;
            const charId = this.state.team[i];
            if (charId) {
                const char = this.state.characters.find(c => c.uid === charId);
                slot.className = 'team-member has-character';
                slot.textContent = char.name.charAt(0);
                slot.style.background = char.rarity === 'SSR' ? 'linear-gradient(45deg, #ffd700, #ffed4e)' :
                                        char.rarity === 'SR' ? 'linear-gradient(45deg, #ba55d3, #dda0dd)' :
                                        'linear-gradient(45deg, #3498db, #5dade2)';
            } else {
                slot.className = 'team-member';
                slot.textContent = '+';
                slot.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        }
    }

    renderShop() {
        const container = document.getElementById('shop-items');
        if (!container) return;
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

let game;
window.addEventListener('load', () => {
    game = new Game();
    console.log('Game initialized!');

    // 调试命令：加钻石
    window.addGems = function(amount) {
        if (game && game.state) {
            const amt = amount || 10000;
            game.state.updateResource('gem', amt);
            console.log(`已添加 ${amt} 钻石，当前钻石：${game.state.resources.gem}`);
        }
    };
    console.log('调试命令：addGems(数量) - 例如 addGems(10000) 添加 10000 钻石');
});
