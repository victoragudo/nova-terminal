const THEME_KEY = "nova-theme";
const LATEST_RELEASE_API = "https://api.github.com/repos/victoragudo/nova-terminal/releases/latest";
const DMG_PATTERN = /\.dmg$/i;
const MOBILE_MENU_QUERY = "(max-width: 760px)";

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

function currentTheme() {
  const explicit = document.documentElement.dataset.theme;
  if (explicit) return explicit;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function syncToggleLabel(button) {
  const next = currentTheme() === "dark" ? "light" : "dark";
  button.setAttribute("aria-label", `Switch to ${next} theme`);
}

function setupThemeToggle() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;
  syncToggleLabel(button);
  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storeTheme(next);
    syncToggleLabel(button);
  });
}

async function showLatestRelease() {
  try {
    const response = await fetch(LATEST_RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) return;
    const release = await response.json();
    const dmg = (release.assets || []).find((asset) => DMG_PATTERN.test(asset.name));
    if (dmg) {
      document.querySelectorAll("[data-download]").forEach((link) => {
        link.href = dmg.browser_download_url;
      });
    }
    const version = document.querySelector("[data-version]");
    if (version && release.tag_name) {
      version.textContent = `Latest: ${release.tag_name}`;
      version.closest("a").href = release.html_url;
    }
  } catch {}
}

function setupMenu() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!nav || !toggle) return;

  const setOpen = (open) => {
    nav.toggleAttribute("data-open", open);
    document.documentElement.toggleAttribute("data-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!nav.hasAttribute("data-open")));
  nav.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.hasAttribute("data-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (nav.hasAttribute("data-open") && !nav.contains(event.target)) setOpen(false);
  });
  window.matchMedia(MOBILE_MENU_QUERY).addEventListener("change", (event) => {
    if (!event.matches) setOpen(false);
  });
}

setupThemeToggle();
setupMenu();
showLatestRelease();
