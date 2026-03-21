(() => {
  function initHeroSlider() {
    const handle = document.getElementById("sliderHandle");
    const slider = document.getElementById("menuSlider");

    if (!handle || !slider) {
      return;
    }

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const onDrag = (event) => {
      if (!isDragging) return;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      let delta = clientX - startX;
      const max = slider.offsetWidth - handle.offsetWidth - 8;

      if (delta < 0) delta = 0;
      if (delta > max) delta = max;

      currentX = delta;
      handle.style.transform = `translateX(${delta}px)`;
    };

    const endDrag = () => {
      const max = slider.offsetWidth - handle.offsetWidth - 8;

      if (currentX > max * 0.6) {
        window.location.href = "menu.html";
      } else {
        handle.style.transition = "transform 0.3s ease";
        handle.style.transform = "translateX(0px)";
        window.setTimeout(() => {
          handle.style.transition = "";
        }, 300);
      }

      isDragging = false;
      currentX = 0;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchend", endDrag);
    };

    const startDrag = (event) => {
      isDragging = true;
      startX = event.touches ? event.touches[0].clientX : event.clientX;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("touchmove", onDrag, { passive: true });
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchend", endDrag);
    };

    handle.addEventListener("mousedown", startDrag);
    handle.addEventListener("touchstart", startDrag, { passive: true });
  }

  function initMenuPage() {
    const navButtons = Array.from(
      document.querySelectorAll(".menu-nav__item[data-category]"),
    );
    const menuItemsContainer = document.getElementById("menuItems");
    const menuCategoryTitle = document.getElementById("menuCategoryTitle");

    if (!navButtons.length || !menuItemsContainer) {
      return;
    }

    const menuData = {
      kafe: {
        title: "KAFE",
        items: [
          { name: "Espresso", price: "1,40€" },
          { name: "Dupli Espresso", price: "2,50€" },
          { name: "Dojč", price: "1,80€" },
          { name: "Cappuccino", price: "1,80€" },
          { name: "Macchiato", price: "1,60€" },
          { name: "Americano", price: "1,80€" },
          { name: "Latte Macchiato", price: "2,30€" },
          { name: "Nes Kafa", price: "2,30€" },
        ],
      },
      pica: {
        title: "PIĆA",
        items: [
          { name: "Coca Cola", meta: "0,33", price: "2,30€" },
          { name: "Coca Cola Zero", meta: "0,33", price: "2,30€" },
          { name: "Fanta", meta: "0,33", price: "2,30€" },
          { name: "Negazirana voda", meta: "0,5", price: "1,40€" },
          { name: "Gazirana voda", meta: "0,5", price: "1,40€" },
          {
            name: "Cijeđeni sok",
            meta: "0,3",
            price: "2,80€",
            desc: "Pomorandža, limunada",
          },
          { name: "Domaći ledeni čaj", meta: "0,3", price: "2,90€" },
        ],
      },
      paste: {
        title: "PASTE",
        items: [
          {
            name: "All’Ortolana",
            meta: "400g",
            price: "5,80€",
            desc: "Svježa pasta, pomodoro sos, mix povrća, parmezan",
          },
          {
            name: "Ragu Bolognese",
            meta: "400g",
            price: "6,50€",
            desc: "Svježa pasta, bolognese ragu, parmezan",
          },
          {
            name: "Pomodoro",
            meta: "400g",
            price: "5,50€",
            desc: "Svježa pasta, pomodoro sos, parmezan",
          },
          {
            name: "Amatriciana",
            meta: "400g",
            price: "6,80€",
            desc: "Svježa pasta, guanciale, pomodoro sos, parmezan",
          },
          {
            name: "Carbonara",
            meta: "400g",
            price: "6,80€",
            desc: "Svježa pasta, guanciale, grana padano, jaje",
          },
        ],
      },
      sendvici: {
        title: "SENDVIČI",
        items: [
          {
            name: "Bolonjski biser",
            meta: "400g",
            price: "4,80€",
            desc: "Svježa fokača, mortadela, pistaći, rukola, med, stracatela sir",
          },
          {
            name: "L’Antico",
            meta: "400g",
            price: "4,80€",
            desc: "Svježa fokača, pršut, pesto, stracatela sir, rukola",
          },
          {
            name: "Hrskava Toskana",
            meta: "400g",
            price: "5,70€",
            desc: "Svježa fokača, hrskava piletina, paradajz sos, mocarela",
          },
          {
            name: "Svježa Italija",
            meta: "400g",
            price: "4,50€",
            desc: "Svježa fokača, mocarela, paradajz, pesto",
          },
          {
            name: "Don Vito",
            meta: "400g",
            price: "5,00€",
            desc: "Svježa fokača, mocarela, paradajz sos, hrskavi patlidžan, rukola",
          },
        ],
      },
      specijaliteti: {
        title: "SPECIJALITETI",
        items: [
          {
            name: "Lazanja",
            meta: "350g",
            price: "5,50€",
            desc: "Svježa pasta, bolognese ragu, bešamel sos, parmezan",
          },
          {
            name: "Zlatni Alfredo",
            meta: "450g",
            price: "6,50€",
            desc: "Svježa pasta, puter, parmezan, piletina",
          },
        ],
      },
    };

    const createCurve = (className) => {
      const curve = document.createElement("span");
      curve.className = className;
      curve.setAttribute("aria-hidden", "true");
      return curve;
    };

    const ensureCurves = (button) => {
      if (!button.querySelector(".menu-nav__curve-top")) {
        button.prepend(createCurve("menu-nav__curve-top"));
      }
      if (!button.querySelector(".menu-nav__curve-bottom")) {
        button.prepend(createCurve("menu-nav__curve-bottom"));
      }
    };

    const escapeHtml = (value) =>
      String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const createMenuItem = (item) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.innerHTML = `
          <div class="menu-item__top">
              <div class="menu-item__name-wrap">
                  <h3 class="menu-item__name">${escapeHtml(item.name)}</h3>
                  ${item.meta ? `<p class="menu-item__meta">${escapeHtml(item.meta)}</p>` : ""}
                  <p class="menu-item__price">${escapeHtml(item.price)}</p>
              </div>
          </div>
          ${item.desc ? `<p class="menu-item__desc">${escapeHtml(item.desc)}</p>` : ""}
      `;
      return article;
    };

    const renderCategory = (categoryKey) => {
      const category = menuData[categoryKey];
      if (!category) return;

      if (menuCategoryTitle) {
        menuCategoryTitle.textContent = category.title;
      }

      menuItemsContainer.innerHTML = "";
      category.items.forEach((item) =>
        menuItemsContainer.appendChild(createMenuItem(item)),
      );
    };

    const setActiveCategory = (categoryKey) => {
      navButtons.forEach((button) => {
        const isActive = button.dataset.category === categoryKey;
        button.classList.toggle("menu-nav__item--active", isActive);

        if (isActive) {
          button.setAttribute("aria-current", "page");
          ensureCurves(button);
        } else {
          button.removeAttribute("aria-current");
        }
      });

      renderCategory(categoryKey);
    };

    navButtons.forEach((button) => {
      ensureCurves(button);
      button.addEventListener("click", () =>
        setActiveCategory(button.dataset.category),
      );
      button.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveCategory(button.dataset.category);
        }
      });
    });

    const initialActiveButton =
      navButtons.find((button) =>
        button.classList.contains("menu-nav__item--active"),
      ) || navButtons[0];

    if (initialActiveButton) {
      setActiveCategory(initialActiveButton.dataset.category);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initMenuPage();
  });
})();
