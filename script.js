AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
});


window.addEventListener("load", () => {
  const loader = document.getElementById("intro-loader");
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 1500);
});


const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: "smooth",
    });
  });
});


window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const scrollY = window.scrollY;
  hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
});


const cards = document.querySelectorAll(".collection .card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.querySelector("img").style.transform = "scale(1.1)";
    card.querySelector(".overlay").style.opacity = 1;
  });
  card.addEventListener("mouseleave", () => {
    card.querySelector("img").style.transform = "scale(1)";
    card.querySelector(".overlay").style.opacity = 0;
  });
});

const lookImages = document.querySelectorAll(".lookbook img");
lookImages.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = "scale(1.15)";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

const aboutText = document.querySelector(".about .text");
window.addEventListener("scroll", () => {
  const sectionTop = aboutText.getBoundingClientRect().top;
  const trigger = window.innerHeight / 1.3;
  if (sectionTop < trigger) {
    aboutText.classList.add("glow");
  }
});


const contactForm = document.querySelector(".contact");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector("button");
  btn.textContent = "Sending...";
  btn.disabled = true;

  setTimeout(() => {
    alert("Message sent successfully! Thank you for reaching out to VYBE by Favour.");
    btn.textContent = "SEND MESSAGE";
    btn.disabled = false;
    contactForm.reset();
  }, 1500);
});

const scrollTopBtn = document.createElement("button");
scrollTopBtn.classList.add("scroll-top");
scrollTopBtn.innerHTML = "↑";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  scrollTopBtn.style.opacity = window.scrollY > 400 ? "1" : "0";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const footerCanvas = document.createElement("canvas");
footerCanvas.id = "footerCanvas";
document.querySelector("footer").appendChild(footerCanvas);

const ctx = footerCanvas.getContext("2d");
let particlesArray = [];
const colors = ["#b892ff", "#ffccff", "#fff"];

function resizeCanvas() {
  footerCanvas.width = window.innerWidth;
  footerCanvas.height = document.querySelector("footer").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.alpha = Math.random() * 0.6 + 0.3;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y -= this.speed;
    if (this.y < -10) this.y = footerCanvas.height + 10;
    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * footerCanvas.width;
    const y = Math.random() * footerCanvas.height;
    const radius = Math.random() * 3 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const speed = Math.random() * 0.7 + 0.2;
    particlesArray.push(new Particle(x, y, radius, color, speed));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
  particlesArray.forEach((p) => p.update());
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();