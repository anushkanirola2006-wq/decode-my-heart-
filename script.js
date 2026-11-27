const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
let codeRain = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    createHeart();
    createRain();
}

window.addEventListener("resize", resizeCanvas);

function heartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    return {
        x: width / 2 + x * Math.min(width, height) / 42,
        y: height / 2 + y * Math.min(width, height) / 42
    };
}

function createHeart() {
    particles = [];

    for (let i = 0; i < 1100; i++) {
        const t = Math.random() * Math.PI * 2;
        const point = heartPoint(t);

        particles.push({
            x: point.x,
            y: point.y,
            symbol: ["0", "1", "<", ">", "/", "{", "}", "*"][Math.floor(Math.random() * 8)],
            size: Math.random() * 4 + 7,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.04 + 0.01
        });
    }
}

function createRain() {
    codeRain = [];

    for (let i = 0; i < 70; i++) {
        codeRain.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: Math.random() * 2 + 1,
            symbol: Math.random() > 0.5 ? "1" : "0"
        });
    }
}

let pulse = 0;

function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.font = "12px monospace";
    ctx.fillStyle = "rgba(0, 220, 255, 0.35)";

    codeRain.forEach(item => {
        ctx.fillText(item.symbol, item.x, item.y);
        item.y += item.speed;

        if (item.y > height) {
            item.y = 0;
            item.x = Math.random() * width;
        }
    });

    pulse += 0.04;
    const glow = 1 + Math.sin(pulse) * 0.04;

    particles.forEach(p => {
        const x = width / 2 + (p.x - width / 2) * glow;
        const y = height / 2 + (p.y - height / 2) * glow;

        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = Math.random() > 0.5 ? "#00eaff" : "#b58cff";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00eaff";
        ctx.fillText(p.symbol, x, y);

        p.phase += p.speed;
    });

    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
}

function searchName() {
    const name = document.getElementById("nameInput").value.trim();

    if (name.toLowerCase() === "ankit") {
        document.getElementById("searchBox").style.display = "none";
        document.getElementById("loveMessage").style.display = "block";
    } else if (name === "") {
        document.getElementById("result").innerText =
            "Please enter your name first! 💙";
    } else {
        document.getElementById("result").innerText =
            "Oops! This secret isn't for you. Try again! 😉";
    }
}

document.getElementById("nameInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchName();
    }
});

resizeCanvas();
animate();