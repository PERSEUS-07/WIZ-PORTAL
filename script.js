function toggle(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === "block" ? "none" : "block";
}


function show(id) {
    document.querySelectorAll('.section').forEach(s =>
        s.classList.remove('active')
    );

    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Update URL hash without reload
    history.replaceState(null, null, "#" + id);
}

// Load correct section from URL hash
window.onload = () => {
    const section = location.hash.replace("#", "") || "home";
    show(section);
};


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

slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY;
});


