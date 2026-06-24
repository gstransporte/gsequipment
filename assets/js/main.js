document.addEventListener("DOMContentLoaded", () => {
  // 1. ANIMACIÓN REVEAL
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // 2. MENÚ MÓVIL (Toggle de la hamburguesa vectorial)
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Cerrar menú al tocar un enlace
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // 3. FORMULARIO DUAL
  const btnWhatsApp = document.getElementById("btn-wa");
  const btnEmail = document.getElementById("btn-email");

  function obtenerDatosForm() {
    const nombre = document.getElementById("eq_nombre").value.trim();
    const empresa =
      document.getElementById("eq_empresa").value.trim() || "Particular";
    const telefono = document.getElementById("eq_telefono").value.trim();
    const pais = document.getElementById("eq_pais").value.trim();
    const tipo = document.getElementById("eq_tipo").value;
    const cantidad = document.getElementById("eq_cantidad").value.trim();

    if (!nombre || !telefono || !pais || !cantidad) {
      alert(
        "Por favor complete los campos obligatorios: Nombre, Teléfono, País y Cantidad.",
      );
      return null;
    }

    return { nombre, empresa, telefono, pais, tipo, cantidad };
  }

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener("click", () => {
      const datos = obtenerDatosForm();
      if (!datos) return;

      const msg = `*Solicitud de Cotización — GS Equipment*\n\n👤 *Nombre:* ${datos.nombre}\n🏢 *Empresa:* ${datos.empresa}\n📞 *Teléfono:* ${datos.telefono}\n🌎 *País:* ${datos.pais}\n📦 *Equipo:* ${datos.tipo}\n🔢 *Cantidad:* ${datos.cantidad}`;
      const numeroVentas = "50763794292";
      window.open(
        `https://wa.me/${numeroVentas}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    });
  }

  if (btnEmail) {
    btnEmail.addEventListener("click", () => {
      const datos = obtenerDatosForm();
      if (!datos) return;

      const asunto = `Cotización GS Equipment — ${
        datos.empresa || datos.nombre
      }`;
      const cuerpo = `Solicitud de Cotización — GS Equipment\n--------------------------------------------\nNombre: ${datos.nombre}\nEmpresa: ${datos.empresa}\nTeléfono: ${datos.telefono}\nPaís: ${datos.pais}\nEquipo: ${datos.tipo}\nCantidad: ${datos.cantidad}`;
      window.location.href = `mailto:ventas@transportegs.com?subject=${encodeURIComponent(
        asunto,
      )}&body=${encodeURIComponent(cuerpo)}`;
    });
  }

  // =========================================
  // 4. LÓGICA DEL NUEVO CARRUSEL DE IMÁGENES
  // =========================================
  const catalogCarousel = document.getElementById("catalog-carousel");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (catalogCarousel && leftBtn && rightBtn) {
    // Al dar clic a la flecha izquierda
    leftBtn.addEventListener("click", () => {
      const scrollAmount =
        catalogCarousel.querySelector(".carousel-slide").clientWidth;
      catalogCarousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Al dar clic a la flecha derecha
    rightBtn.addEventListener("click", () => {
      const scrollAmount =
        catalogCarousel.querySelector(".carousel-slide").clientWidth;
      catalogCarousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Auto-reproducción cada 3.5 segundos
    setInterval(() => {
      const scrollAmount =
        catalogCarousel.querySelector(".carousel-slide").clientWidth;
      // Si ya llegó al final de la barra de desplazamiento, volver al inicio
      if (
        catalogCarousel.scrollLeft + catalogCarousel.clientWidth >=
        catalogCarousel.scrollWidth - 10
      ) {
        catalogCarousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        catalogCarousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3500);
  }

  // =========================================
  // 5. LIGHTBOX DE IMÁGENES (EXPANDIR, SWIPE Y TECLADO)
  // =========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".modal-close");
  const modalPrevBtn = document.getElementById("modal-prev-btn");
  const modalNextBtn = document.getElementById("modal-next-btn");

  const carouselImages = document.querySelectorAll(".catalog-carousel img");
  let currentImageIndex = 0;

  if (modal && modalImg) {
    // --- Funciones de navegación ---
    function showModalImage(index) {
      currentImageIndex = index;
      const img = carouselImages[currentImageIndex];
      modalImg.src = img.src;
      modal.classList.remove("modal-hidden");
    }

    function showNextImage() {
      let newIndex = (currentImageIndex + 1) % carouselImages.length;
      showModalImage(newIndex);
    }

    function showPrevImage() {
      let newIndex =
        (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
      showModalImage(newIndex);
    }

    // Abrir al dar clic en la miniatura
    carouselImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        showModalImage(index);
      });
    });

    // --- Controles de Cierre ---
    closeBtn.addEventListener("click", () => {
      modal.classList.add("modal-hidden");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("modal-hidden");
      }
    });

    // --- Controles de Botones ---
    modalPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevImage();
    });

    modalNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextImage();
    });

    // --- Controles de Teclado (PC) ---
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("modal-hidden")) {
        if (e.key === "Escape") modal.classList.add("modal-hidden");
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
      }
    });

    // --- CONTROLES TÁCTILES (SWIPE PARA MÓVIL) ---
    let touchstartX = 0;
    let touchendX = 0;

    modal.addEventListener(
      "touchstart",
      (e) => {
        touchstartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    modal.addEventListener(
      "touchend",
      (e) => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      },
      { passive: true },
    );

    function handleSwipeGesture() {
      const swipeThreshold = 50; // Distancia mínima para que sea considerado un deslizamiento

      if (touchendX < touchstartX - swipeThreshold) {
        // Deslizó hacia la izquierda
        showNextImage();
      }
      if (touchendX > touchstartX + swipeThreshold) {
        // Deslizó hacia la derecha
        showPrevImage();
      }
    }
  }
});
