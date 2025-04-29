if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // 移动端不显示
} else {
    document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none"></canvas>');

    window && (() => {
        let config = {
            flakeCount: 50,    // 增加花瓣数量
            minDist: 50,      // 增加互动影响距离
            color: "255, 183, 197", // 樱花粉色
            minSize: 2,       // 最小尺寸
            maxSize: 6,       // 最大尺寸
            baseSpeed: 0.3,   // 基础下落速度
            windSpeed: 0.05,  // 风速系数
            windChangeInterval: 3000, // 风向变化间隔(ms)
            opacity: 0.8,     // 基础透明度
            rotationSpeed: 0.5 // 旋转速度
        };

        const requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60) };

        const canvas = document.getElementById("snow"),
            ctx = canvas.getContext("2d");

        let mouseX = -100,
            mouseY = -100,
            windForce = 0,
            lastWindChange = 0,
            petals = [];

        // 初始化画布大小
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 花瓣类
        class Petal {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height; // 初始随机高度
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
                this.speed = config.baseSpeed * (0.5 + Math.random() * 1.5); // 随机速度
                this.velY = this.speed;
                this.velX = windForce * this.speed * 2;
                this.opacity = config.opacity * (0.5 + Math.random() * 0.5);
                this.angle = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
                this.windResistance = 0.3 + Math.random() * 0.7; // 花瓣对风的阻力
                this.swingPhase = Math.random() * Math.PI * 2; // 摆动相位
                this.swingAmplitude = 0.5 + Math.random(); // 摆动幅度
                this.swingFrequency = 0.001 + Math.random() * 0.003; // 摆动频率
            }

            update() {
                // 更新位置
                this.velY = this.speed;
                this.velX = windForce * this.speed * 2 * this.windResistance;

                // 添加摆动效果
                this.swingPhase += this.swingFrequency;
                this.velX += Math.sin(this.swingPhase) * this.swingAmplitude;

                this.x += this.velX;
                this.y += this.velY;
                this.angle += this.rotationSpeed;

                // 检查边界
                if (this.y > canvas.height + 10) {
                    this.reset();
                }

                if (this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }

                // 鼠标互动
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.minDist) {
                    const angle = Math.atan2(dy, dx);
                    const force = (config.minDist - dist) / config.minDist;
                    this.velX -= Math.cos(angle) * force * 2;
                    this.velY -= Math.sin(angle) * force * 2;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);

                // 绘制花瓣形状（更复杂的形状）
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(
                    this.size * 0.8, this.size * -0.5,
                    this.size * 0.8, this.size * -1.5,
                    0, this.size * -1.8
                );
                ctx.bezierCurveTo(
                    this.size * -0.8, this.size * -1.5,
                    this.size * -0.8, this.size * -0.5,
                    0, 0
                );

                ctx.fillStyle = `rgba(${config.color}, ${this.opacity})`;
                ctx.fill();
                ctx.restore();
            }
        }

        // 初始化花瓣
        function initPetals() {
            for (let i = 0; i < config.flakeCount; i++) {
                petals.push(new Petal());
            }
        }

        // 更新风向
        function updateWind(timestamp) {
            if (timestamp - lastWindChange > config.windChangeInterval) {
                // 随机改变风向，但保持一定的连续性
                windForce = Math.max(-1, Math.min(1, windForce + (Math.random() - 0.5) * 0.5));
                lastWindChange = timestamp;
            }
        }

        // 动画循环
        function animate(timestamp) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            updateWind(timestamp);

            for (let petal of petals) {
                petal.update();
                petal.draw();
            }

            requestAnimFrame(animate);
        }

        // 事件监听
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // 启动动画
        initPetals();
        animate(0);
    })();
}