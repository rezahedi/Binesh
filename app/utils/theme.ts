export function handleThemeSwitch() {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    document.cookie = `theme=light; path=/; max-age=31536000`;
  } else {
    body.classList.add("dark");
    document.cookie = `theme=dark; path=/; max-age=31536000`;
  }
}
