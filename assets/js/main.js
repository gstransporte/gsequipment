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

      const asunto = `Cotización GS Equipment — ${datos.empresa || datos.nombre}`;
      const cuerpo = `Solicitud de Cotización — GS Equipment\n--------------------------------------------\nNombre: ${datos.nombre}\nEmpresa: ${datos.empresa}\nTeléfono: ${datos.telefono}\nPaís: ${datos.pais}\nEquipo: ${datos.tipo}\nCantidad: ${datos.cantidad}`;
      window.location.href = `mailto:ventas@transportegs.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    });
  }

  // =========================================
  // 4. LIGHTBOX DE IMÁGENES (EXPANDIR AL CLIC)
  // =========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".modal-close");
  // Selecciona todas las imágenes dentro de las tarjetas de chasis
  const expandableImages = document.querySelectorAll(".product-img img");

  if (modal && modalImg) {
    // Al dar clic a una foto, quitar la clase oculta y poner la fuente de la imagen
    expandableImages.forEach((img) => {
      img.addEventListener("click", () => {
        modal.classList.remove("modal-hidden");
        modalImg.src = img.src;
      });
    });

    // Cerrar al hacer clic en la "X"
    closeBtn.addEventListener("click", () => {
      modal.classList.add("modal-hidden");
    });

    // Cerrar al hacer clic en lo oscuro (fuera de la imagen)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("modal-hidden");
      }
    });

    // Cerrar al presionar la tecla "Escape" en la computadora
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("modal-hidden")) {
        modal.classList.add("modal-hidden");
      }
    });
  }
});
