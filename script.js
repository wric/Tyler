const BASE_URL = "https://www.toptal.com/designers/subtlepatterns";

function togglePreview(previewButton) {
  const previewPattern = previewButton.parentElement.parentElement;
  const app = document.querySelector("#app");
  const patterns = document.querySelectorAll("section");

  if (app.style.backgroundImage === "") {
    app.style.backgroundImage = previewPattern.style.backgroundImage;
    previewPattern.style.backgroundImage = "";
    patterns.forEach((pattern) => {
      if (pattern.id !== previewPattern.id) {
        pattern.style.visibility = "hidden";
      }
    });
  } else {
    previewPattern.style.backgroundImage = app.style.backgroundImage;
    patterns.forEach((pattern) => {
      pattern.style.visibility = "visible";
    });
    app.style.backgroundImage = "";
  }

  [...previewPattern.querySelector("#icons").children].forEach((icon) => {
    icon.classList.toggle("dn");
  });
}

async function downloadBackground(button) {
  const img = new Image();
  img.onload = () => {
    const wallpaper = createCanvas(img);
    const fileName = createFilename(url, wallpaper);
    download(fileName, wallpaper.toDataURL());
  };

  const url = patternUrlFromButton(button);
  const res = await fetch(url);
  const data = await res.blob();
  const patternUrl = window.URL.createObjectURL(data);
  img.src = patternUrl;
  window.URL.revokeObjectURL(patternUrl);
}

function patternUrlFromButton(button) {
  const patternElement = button.parentElement.parentElement;
  const cssBackground = patternElement.style["background-image"];
  const patternUrl = cssBackground.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
  return patternUrl;
}

function download(fileName, dataUrl) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = dataUrl;
  a.download = fileName;
  a.click();
}

function createCanvas(img) {
  const { width, height } = window.screen;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const pat = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pat;
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

function createFilename(url, wallpaper) {
  const dimensions = `${wallpaper.width}x${wallpaper.height}`;
  const accreditation = "toptal-subtle-patterns";
  const fileExtension = url.split(".").slice(-1)[0];
  const patternName = url
    .split("/")
    .slice(-1)[0]
    .replace(`.${fileExtension}`, "");

  const fileName = `${accreditation}_${patternName}_${dimensions}.${fileExtension}`;
  return fileName;
}

async function getFeedPatterns() {
  const res = await fetch(BASE_URL + "/?feed=json");
  const data = await res.json();
  const patterns = data.map((pattern) => {
    const { title, permalink } = pattern;
    const name = permalink.replace("-pattern/", "").split("/").pop();
    const url = `${BASE_URL}/patterns/${name}.png`;
    return { title, permalink, name, url };
  });
  return patterns;
}

async function init() {
  if ("content" in document.createElement("template")) {
    const patterns = await getFeedPatterns();
    const app = document.querySelector("#app");
    const template = document.querySelector("#pattern");

    patterns.forEach((pattern) => {
      const clone = template.content.cloneNode(true);
      const section = clone.querySelectorAll("section")[0];
      const link = clone.querySelector("a");
      const title = link.querySelector("span");
      section.style.backgroundImage = `url(${pattern.url})`;
      section.id = pattern.name;
      link.href = pattern.permalink;
      title.textContent = pattern.title;
      app.appendChild(clone);
    });

    template.style.display = "none";
  }

  feather.replace();
}

init();
