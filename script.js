document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // PAGE DETECTION
  // ===============================
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  const isIndexPage =
    path.endsWith("index.html") ||
    path === "/" ||
    path === "";

  const isClassPage = path.includes("/pdf/class");
  const isComingSoon = path.includes("comingsoon");

  // ===============================
  // FOLDER TOGGLE (CLASS PAGES)
  // ===============================
  window.toggle = function (id) {
    const target = document.getElementById(id);
    if (target) target.classList.toggle("open");
  };

  // ===============================
  // SECTION NAVIGATION (INDEX ONLY)
  // ===============================
  window.show = function (id) {
    if (!isIndexPage) return;

    document.querySelectorAll(".section")
      .forEach(s => s.classList.remove("active"));

    const target = document.getElementById(id);
    if (target) target.classList.add("active");

    document.querySelectorAll(".sidebar a")
      .forEach(a => a.classList.remove("active"));

    const btn = document.querySelector(
      `.sidebar a[onclick="show('${id}')"]`
    );
    if (btn) btn.classList.add("active");

    history.replaceState(null, null, "#" + id);
  };

  function loadFromHash() {
    if (!isIndexPage) return;
    const section = window.location.hash.replace("#", "") || "home";
    show(section);
  }

  if (isIndexPage) {
    loadFromHash();
    window.addEventListener("hashchange", loadFromHash);
  }

  // ===============================
  // SIDEBAR HIGHLIGHT LOGIC
  // ===============================
  document.querySelectorAll(".sidebar a")
    .forEach(a => a.classList.remove("active"));

  if (isIndexPage) {
    const section = hash.replace("#", "") || "home";
    document
      .querySelector(`.sidebar a[onclick="show('${section}')"]`)
      ?.classList.add("active");
  }

  if (isClassPage) {
    document
      .querySelector("#nav-ncert a")
      ?.classList.add("active");
  }

  // ===============================
  // CLOCK + GREETING
  // ===============================
  function updateClock() {
    const clock = document.getElementById("clock");
    const greeting = document.getElementById("greeting");
    if (!clock || !greeting) return;

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const s = now.getSeconds().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    clock.textContent =
      `${displayHour}:${m}:${s} ${ampm}  |  ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    if (h < 12) greeting.textContent = "🌅 Good Morning, Wiz Explorer";
    else if (h < 18) greeting.textContent = "🌤️ Study Mode Activated";
    else greeting.textContent = "🌙 Late Night Grind Mode";
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ===============================
  // SETTINGS PANEL
  // ===============================
  const settingsBtn = document.getElementById("settingsBtn");
  const themePanel = document.getElementById("themePanel");
  const settingsMenu = document.getElementById("settingsMenu");
  const themePicker = document.getElementById("themePicker");
  const colorPicker = document.getElementById("colorPicker");
  const musicSection = document.getElementById("musicSection");

  function closeAllPanels() {
    if (aiPanel) aiPanel.classList.add("hidden");
    if (themePanel) themePanel.style.display = "none";
  }

  if (settingsBtn && themePanel) {
    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = themePanel.style.display === "block";
      closeAllPanels();
      if (!isOpen) themePanel.style.display = "block";
    });
  }

  window.openThemePicker = () => {
    if (!settingsMenu || !themePicker) return;
    settingsMenu.classList.add("hidden");
    themePicker.classList.remove("hidden");
  };

  window.openMusic = () => {
    if (!settingsMenu || !musicSection) return;
    settingsMenu.classList.add("hidden");
    musicSection.classList.remove("hidden");
  };

  window.backToMenu = () => {
    themePicker?.classList.add("hidden");
    musicSection?.classList.add("hidden");
    settingsMenu?.classList.remove("hidden");
  };

  // ===============================
  // THEME ENGINE
  // ===============================
  function setTheme(color) {
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem("themeColor", color);
  }

  if (colorPicker) {
    const savedColor = localStorage.getItem("themeColor") || "#34FFD7";
    setTheme(savedColor);
    colorPicker.value = savedColor;

    colorPicker.addEventListener("input", e => {
      setTheme(e.target.value);
    });
  }

  // ===============================
  // MUSIC CONTROLS
  // ===============================
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const volumeSlider = document.getElementById("volumeSlider");

  if (music && musicToggle && volumeSlider) {
    music.volume = localStorage.getItem("musicVolume") || 0.5;
    volumeSlider.value = music.volume;

    musicToggle.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        musicToggle.innerText = "⏸ Pause";
      } else {
        music.pause();
        musicToggle.innerText = "▶ Play Music";
      }
    });

    volumeSlider.addEventListener("input", e => {
      music.volume = e.target.value;
      localStorage.setItem("musicVolume", e.target.value);
    });
  }

  // ===============================
  // LOGO EASTER EGG
  // ===============================
  const logo = document.querySelector(".header-logo");
  let clicks = 0;
  let timer;

  if (logo) {
    logo.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => clicks = 0, 700);

      if (clicks === 4) {
        logo.classList.add("glitch");
        setTimeout(() => logo.classList.remove("glitch"), 1200);
        clicks = 0;
      }
    });
  }

  // ==============================
  // AI HUB
  // ==============================
  const aiBtn = document.getElementById("aiBtn");
  const aiPanel = document.getElementById("aiPanel");

  if (aiBtn && aiPanel) {
    aiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !aiPanel.classList.contains("hidden");
      closeAllPanels();
      if (!isOpen) aiPanel.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".ai-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const link = btn.getAttribute("data-link");
      window.open(link, "_blank");
      aiPanel?.classList.add("hidden");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      (!aiPanel || !aiPanel.contains(e.target)) &&
      (!themePanel || !themePanel.contains(e.target)) &&
      e.target !== aiBtn &&
      e.target !== settingsBtn
    ) {
      closeAllPanels();
    }
  });

});
