const handle = document.getElementById("sliderHandle");
const slider = document.getElementById("menuSlider");

let isDragging = false;
let startX = 0;
let currentX = 0;

handle.addEventListener("mousedown", startDrag);
handle.addEventListener("touchstart", startDrag);

function startDrag(e) {
  console.log("Pocelo");
  isDragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function onDrag(e) {
  if (!isDragging) return;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let delta = clientX - startX;

  const max = slider.offsetWidth - handle.offsetWidth - 8;

  if (delta < 0) delta = 0;
  if (delta > max) delta = max;

  currentX = delta;
  handle.style.transform = `translateX(${delta}px)`;
}

function endDrag() {
  const max = slider.offsetWidth - handle.offsetWidth - 8;

  if (currentX > max * 0.6) {
    window.location.href = "menu.html"; // ili otvori panel JS-om
  } else {
    // vrati nazad
    handle.style.transition = "transform 0.3s ease";
    handle.style.transform = "translateX(0px)";
    setTimeout(() => {
      handle.style.transition = "";
    }, 300);
  }

  isDragging = false;
  currentX = 0;

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("touchmove", onDrag);
}
