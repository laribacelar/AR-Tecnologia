const menuHamburguer = document.getElementById("menu-hamburguer");
const menu = document.querySelector(".menu");
const menuIcon = menuHamburguer.querySelector("i");

menuHamburguer.addEventListener("click", () => {
  menu.classList.toggle("active");

  const isExpanded = menu.classList.contains("active");
  menuHamburguer.setAttribute("aria-expanded", isExpanded);

  if (isExpanded) {
    menuIcon.classList.remove("ri-menu-line");
    menuIcon.classList.add("ri-close-line");
  } else {
    menuIcon.classList.remove("ri-close-line");
    menuIcon.classList.add("ri-menu-line");
  }
});

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");

    menuHamburguer.setAttribute("aria-expanded", "false");

    menuIcon.classList.remove("ri-close-line");
    menuIcon.classList.add("ri-menu-line");
  });
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const seuNumero = "5542999802609";

  const nome = document.getElementById("name").value;
  const contato = document.getElementById("contact").value;
  const mensagem = document.getElementById("message").value;

  const textoMensagem = `Olá! Gostaria de um orçamento:\n\n*Nome:* ${nome}\n*E-mail:* ${contato}\n*Serviço de interesse:* ${mensagem}`;

  const mensagemCodificada = encodeURIComponent(textoMensagem);

  const whatsappURL = `https://wa.me/${seuNumero}?text=${mensagemCodificada}`;

  window.open(whatsappURL, "_blank");
});
