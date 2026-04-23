const glowItems = document.querySelectorAll(".mouse-glow");
const reveals = document.querySelectorAll(".reveal");
const timelineTree = document.getElementById("timelineTree");
const slider = document.getElementById("productsSlider");
const leftBtn = document.getElementById("scrollLeft");
const rightBtn = document.getElementById("scrollRight");

/* brilho seguindo o mouse */
glowItems.forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  });
});

/* animação de entrada */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

reveals.forEach(item => observer.observe(item));

/* timeline */
if (timelineTree) {
  const activateTimeline = () => {
    timelineTree.classList.add("active");
  };

  const deactivateTimeline = () => {
    timelineTree.classList.remove("active");
  };

  timelineTree.addEventListener("mouseenter", activateTimeline);
  timelineTree.addEventListener("mouseleave", deactivateTimeline);

  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateTimeline();
      }
    });
  }, { threshold: 0.35 });

  timelineObserver.observe(timelineTree);
}

/* slider */
if (slider && leftBtn && rightBtn) {
  const getScrollAmount = () => {
    const card = slider.querySelector(".product-card");
    return card ? card.offsetWidth + 24 : 350;
  };

  leftBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  rightBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });
}