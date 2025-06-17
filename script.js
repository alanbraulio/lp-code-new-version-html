
  document.addEventListener("DOMContentLoaded", () => {
    const trailSteps = document.querySelectorAll(".trail-step");
    const connectingLine = document.getElementById("connecting-line");

    const updateCurrentPhase = () => {
      let currentPhase = 1;

      trailSteps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
          currentPhase = index + 1;
        }

        // Remove active de todos os steps
        step.classList.remove("active");
      });

      // Adiciona a classe active no step atual
      if (trailSteps[currentPhase - 1]) {
        trailSteps[currentPhase - 1].classList.add("active");
      }

      // Atualiza a altura da linha
      const totalSteps = trailSteps.length;
      const heightPerStep = 100 / totalSteps;
      const lineHeight = heightPerStep * (currentPhase - 1);
      if (connectingLine) {
        connectingLine.style.height = `${lineHeight}%`;
      }
    };

    // Executa ao carregar
    updateCurrentPhase();

    // Escuta o scroll
    window.addEventListener("scroll", updateCurrentPhase);
  });

   document.addEventListener("DOMContentLoaded", () => {
    let activeIndex = 0;
    const cards = document.querySelectorAll("#project-cards > div");
    const images = document.querySelectorAll("#project-images > img");

    const updateActiveProject = (index) => {
      cards.forEach((card, i) => {
        card.className = i === index ? "card-project-active" : "card-project";
      });

      images.forEach((img, i) => {
        img.className = i === index ? "project-img-active" : "project-img";
      });

      activeIndex = index;
    };

    // Clique manual
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = parseInt(card.getAttribute("data-index"));
        updateActiveProject(index);
      });
    });

    // Troca automática
    setInterval(() => {
      const nextIndex = activeIndex === cards.length - 1 ? 0 : activeIndex + 1;
      updateActiveProject(nextIndex);
    }, 2000);
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Lazy load do iframe
    const thumbnail = document.getElementById("video-thumbnail");
    const container = document.getElementById("video-container");

    thumbnail.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.width = window.innerWidth < 768 ? "300" : "560";
      iframe.height = "315";
      iframe.src = "https://www.youtube.com/embed/6rORoSMq17I?autoplay=1";
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      container.innerHTML = "";
      container.appendChild(iframe);
    });

    // Contador com IntersectionObserver
    const counters = document.querySelectorAll(".counter-card-count");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const endValue = parseInt(counter.getAttribute("data-end"));
            const plus = counter.textContent.includes("+");
            let current = 0;
            const interval = setInterval(() => {
              if (current < endValue) {
                current++;
                counter.textContent = (plus ? "+" : "") + current;
              } else {
                clearInterval(interval);
              }
            }, 10);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    // Slider
    const initialImages = [
      "./imgs/1.webp", "./imgs/69.webp", "./imgs/70.webp", "./imgs/71.webp",
      "./imgs/95.webp", "./imgs/28.webp", "./imgs/88.webp", "./imgs/90.webp",
      "./imgs/89.webp", "./imgs/95.webp", "./imgs/96.webp", "./imgs/97.webp",
      "./imgs/98.webp", "./imgs/102.webp", "./imgs/103.webp"
    ];

    const images = [...initialImages, ...initialImages];
    const slideContainer = document.getElementById("slides");
    images.forEach((src, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Slide ${index}`;
      slide.appendChild(img);
      slideContainer.appendChild(slide);
    });

    let currentIndex = 0;
    setInterval(() => {
      const totalWidth = slideContainer.scrollWidth - slideContainer.clientWidth;
      currentIndex += 1;
      if (currentIndex >= totalWidth) currentIndex = 0;
      slideContainer.style.transform = `translateX(-${currentIndex}px)`;
    }, 20);
  });

  
  
function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const img = element.querySelector("img");
  const isVisible = answer.style.display === "block";
  answer.style.display = isVisible ? "none" : "block";
  img.src = isVisible ? "./imgs/arrow-down.svg" : "./imgs/arrow-up.svg";
}

function openWhatsapp() {
  const defaultMessage = encodeURIComponent(
    "Olá, gostaria de saber mais sobre o Treinamento da Code Start!!!"
  );
  window.open(
    `https://api.whatsapp.com/send?phone=+5531997506754&text=${defaultMessage}`,
    "_blank"
  );
}