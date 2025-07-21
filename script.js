// Aguarda o DOM inteiro ser carregado para executar qualquer script
document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DO MENU HAMBÚRGUER ---
  const menuHamburguer = document.getElementById("menu-hamburguer");
  const menu = document.getElementById("menu-principal");
  const menuIcon = menuHamburguer.querySelector("i");
  const menuLinks = document.querySelectorAll(".menu a");

  menuHamburguer.addEventListener("click", () => {
    menu.classList.toggle("active");
    const isExpanded = menu.classList.contains("active");
    menuHamburguer.setAttribute("aria-expanded", isExpanded);
    menuIcon.className = isExpanded ? "ri-close-line" : "ri-menu-line";
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuHamburguer.setAttribute("aria-expanded", "false");
      menuIcon.className = "ri-menu-line";
    });
  });

  // --- ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- MÁSCARA DE TELEFONE ---
  const phoneInput = document.getElementById("contact");
  if (phoneInput) {
    const phoneMaskOptions = { mask: "(00) 00000-0000" };
    IMask(phoneInput, phoneMaskOptions);
  }

  // --- CARROSSEL SWIPER ---
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // --- AUTOMAÇÃO DO FORMULÁRIO DE CONTATO (N8N) ---
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // [ESSENCIAL] Substitua pela sua URL de PRODUÇÃO do n8n!
      const webhookUrl = "http://localhost:5678/webhook/automacao-ar";

      const data = {
        nome: document.getElementById("name").value,
        telefone: document.getElementById("contact").value,
        mensagem: document.getElementById("message").value,
      };

      formStatus.innerHTML = "Enviando, por favor aguarde...";
      formStatus.style.color = "orange";

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          formStatus.innerHTML =
            "Solicitação enviada com sucesso! Entraremos em contato em breve.";
          formStatus.style.color = "green";
          contactForm.reset();
        } else {
          throw new Error("Resposta não OK do servidor.");
        }
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        formStatus.innerHTML =
          "Erro ao enviar. Por favor, tente novamente mais tarde.";
        formStatus.style.color = "red";
      }
    });
  }
});
