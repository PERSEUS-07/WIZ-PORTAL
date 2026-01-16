function toggle(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === "block" ? "none" : "block";
}


function show(id) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s =>
        s.classList.remove('active')
    );

    // Show target section
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // 🔥 Active sidebar highlight
    document.querySelectorAll(".sidebar a").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(`.sidebar a[onclick="show('${id}')"]`);
    if (activeBtn) activeBtn.classList.add("active");

    // Update URL hash
    history.replaceState(null, null, "#" + id);
}



document.addEventListener("click", function(e) {
    const target = e.target.closest("a, .folder, .file");

    if (!target) return;

    target.classList.add("click-animate");

    setTimeout(() => {
        target.classList.remove("click-animate");
    }, 120);
});

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const date = now.toDateString();

    document.getElementById("clock").innerHTML =
        `${hours}:${minutes}:${seconds} ${ampm} | ${date}`;
}

setInterval(updateClock, 1000);
updateClock();

document.addEventListener("click", function(e) {
    const target = e.target.closest(".folder, .file, .subject, .sidebar a, button, a");
    if (!target) return;

    target.classList.add("ripple");

    const circle = document.createElement("span");
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    circle.style.width = circle.style.height = size + "px";
    circle.style.left = (e.clientX - rect.left - size / 2) + "px";
    circle.style.top = (e.clientY - rect.top - size / 2) + "px";

    target.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
});


const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

btn.onclick = () => {
    if (music.paused) {
        music.play();
        btn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        btn.innerText = "▶ Play Music";
    }
};


const slider = document.querySelector('.top-scroll');

if (slider) {
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
    });
}


// 🥚 Easter Egg: Click logo 15 times (Flying Toast)
let logoClicks = 0;
const logo = document.querySelector(".header-logo");
const toast = document.getElementById("easterToast");

if (logo && toast) {
    logo.addEventListener("click", () => {
        logoClicks++;

        if (logoClicks === 5) {

            // Show toast
            toast.textContent = "🔴 RED MODE ACTIVATED";
            toast.classList.remove("show");
            void toast.offsetWidth;
            toast.classList.add("show");

// Toggle red mode properly
document.body.classList.toggle("red-mode");

if (document.body.classList.contains("red-mode")) {
    localStorage.setItem("redMode", "on");
} else {
    localStorage.removeItem("redMode");
}

            logoClicks = 0;
        }
    });
}


// ⚡ Quad Click Header → Glitch Mode
let glitchClicks = 0;
let glitchTimer;

if (logo) {
    logo.addEventListener("click", () => {
        glitchClicks++;

        clearTimeout(glitchTimer);

        glitchTimer = setTimeout(() => {
            glitchClicks = 0;
        }, 700); // reset if user pauses too long

        if (glitchClicks === 4) {
            logo.classList.add("glitch");

            setTimeout(() => {
                logo.classList.remove("glitch");
            }, 1200);

            glitchClicks = 0;
        }
    });
}



// 🌞 Time Based Greeting
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById("greeting");

    if (!greetingEl) return;

    let message = "";

    if (hour >= 5 && hour < 12) {
        message = "🌅 Good Morning, Wiz Explorer";
    } 
    else if (hour >= 12 && hour < 18) {
        message = "🌇 Study Mode Activated (EVEN IN MIDDAY???)";
    } 
    else {
        message = "🌙 Late Night Grind Mode";
    }

    greetingEl.textContent = message;
}

updateGreeting();

if (localStorage.getItem("redMode") === "on") {
    document.body.classList.add("red-mode");
}

function setActiveSidebar() {
    const hash = window.location.hash.replace("#","") || "home"; // fallback to home
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {
        link.classList.remove("active");

        // check both href and onclick targets
        const hrefHash = (link.getAttribute("href") || "").replace("../index.html#","").replace("#","");
        const onclickTarget = link.getAttribute("onclick")?.match(/show\('(\w+)'\)/)?.[1];

        if (hrefHash === hash || onclickTarget === hash) {
            link.classList.add("active");
        }
    });

    // Show the correct section too
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const targetSection = document.getElementById(hash);
    if (targetSection) targetSection.classList.add("active");
}

// call on page load
setActiveSidebar();
window.addEventListener("hashchange", setActiveSidebar);

