gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

/* ==========================================
   HERO INTRO ANIMATION
========================================== */

const introTL = gsap.timeline();

introTL
  .from(".hero-bg img", {
    opacity: 0,
    scale: 1.5,
    duration: 1.5,
    ease: "power2.out",
  })

  .from(
    ".hero-content h1",
    {
      opacity: 0,
      y: 100,
      duration: 1.8,
      ease: "power2.out",
    },
    "-=0.3",
  )

  .from(
    ".tagline .word",
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
    },
    "-=0.3",
  )

  .from(
    ".hero-btn",
    {
      opacity: 0,
      scale: 0,
      duration: 0.7,
      ease: "back.out(2)",
    },
    "-=0.2",
  )

  .from(".scroll-indicator", {
    opacity: 0,
    y: 15,
    duration: 0.5,
    ease: "power1.out",
    immediateRender: true,
  })

  .call(startAmbientAnimations);

/* ==========================================
   START AMBIENT ANIMATIONS
========================================== */

function startAmbientAnimations() {
  gsap.set([".particle", ".flower-particle", ".flower-left", ".flower-right"], {
    animationPlayState: "running",
  });

  document.querySelector(".scroll-indicator").classList.add("bounce-active");

  gsap.set(".scroll-indicator", {
    clearProps: "opacity",
  });

  gsap.set(".hero-btn", {
    clearProps: "transform,translate,rotate,scale",
  });

  document.querySelector(".hero-btn").style.transition =
    "transform .3s ease, box-shadow .3s ease, filter .3s ease";

  /* ==========================================
     BEE PATH
  ========================================== */

  gsap.to(".hero-bee", {
    duration: 12,
    ease: "power1.inOut",

    motionPath: {
      path: "#beePath",
      align: "#beePath",
      alignOrigin: [0.5, 0.5],
      autoRotate: 90,
    },

    onComplete: startCursorBee,
  });
}

/* ==========================================
   BEE CURSOR CHASE
========================================== */

function startCursorBee() {
  const isDesktop = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  if (!isDesktop) return;

  const bee = document.querySelector(".hero-bee");

  gsap.killTweensOf(bee);

  bee.classList.add("journey-mode");

  const rect = bee.getBoundingClientRect();

  let posX = rect.left;
  let posY = rect.top;

  gsap.set(bee, {
    top: posY,
    left: posX,
    bottom: "auto",
    right: "auto",
    clearProps: "transform, translate, rotate, scale",
  });

  let mouseX = -9999;
  let mouseY = -9999;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const fleeRadius = 160;

  let fleeing = false;
  let currentTween = null;

  function faceDirection(toX, toY) {
    const angle = Math.atan2(toY - posY, toX - posX) * (180 / Math.PI);

    gsap.to(bee, {
      rotation: angle + 90,
      duration: 0.35,
      ease: "power1.out",
      overwrite: "auto",
    });
  }

  function flyTo(x, y, speed, onDone) {
    const dist = Math.hypot(x - posX, y - posY);

    const duration = Math.max(0.5, dist / speed);

    faceDirection(x, y);

    if (currentTween) {
      currentTween.kill();
    }

    currentTween = gsap.to(bee, {
      left: x,
      top: y,
      duration: duration,
      ease: "sine.inOut",

      onUpdate: () => {
        posX = gsap.getProperty(bee, "left");
        posY = gsap.getProperty(bee, "top");
      },

      onComplete: onDone,
    });
  }

  function wander() {
    if (fleeing) return;

    const x = Math.random() * (window.innerWidth - 100) + 50;

    const y = Math.random() * (window.innerHeight * 0.6) + 80;

    flyTo(x, y, 80, wander);
  }

  wander();

  gsap.ticker.add(() => {
    const dx = posX - mouseX;
    const dy = posY - mouseY;

    const distance = Math.hypot(dx, dy);

    if (distance < fleeRadius && !fleeing) {
      fleeing = true;

      const angle = Math.atan2(dy, dx);

      const fx = Math.max(
        0,
        Math.min(window.innerWidth - 60, posX + Math.cos(angle) * 220),
      );

      const fy = Math.max(
        0,
        Math.min(window.innerHeight - 60, posY + Math.sin(angle) * 220),
      );

      flyTo(fx, fy, 320, () => {
        fleeing = false;

        wander();
      });
    }
  });
}

/* ==========================================
   MOBILE HAMBURGER MENU
========================================== */

const hamburger = document.querySelector(".hamburger");

const mobileNav = document.querySelector(".mobile-nav-overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");

  mobileNav.classList.toggle("active");

  if (mobileNav.classList.contains("active")) {
    document.body.style.overflow = "hidden";

    gsap.to(mobileNav, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.from(".mobile-nav-overlay li", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.1,
    });
  } else {
    document.body.style.overflow = "";

    gsap.to(mobileNav, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }
});

/* ==========================================
   WHATSAPP FLOAT
========================================== */

const whatsappBtn = document.getElementById("whatsapp-btn");

const phoneNumber = "917439469529";

const message =
  "Hi! I found Tangled Treasures and wanted to know more about your crochet creations 🌸";

whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

/* ==========================================
   PRODUCT CARD SCROLL ANIMATION
   OLD INDIVIDUAL CARD ANIMATION
========================================== */

function createProductCardAnimations() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    /*
      Initial state:
      slightly lower + invisible
    */

    gsap.set(card, {
      opacity: 0,
      y: 50,
    });

    /*
      Scroll-controlled animation
    */

    gsap.to(card, {
      opacity: 1,
      y: 0,

      ease: "power2.out",

      scrollTrigger: {
        trigger: card,

        /*
          Animation starts when
          card enters viewport
        */
        start: "top 90%",

        /*
          Animation finishes
          around the middle of viewport
        */
        end: "top 50%",

        /*
          Scroll controls animation.
          Scroll down → appear
          Scroll up → disappear
        */
        scrub: 1,

        /*
          Important for responsive layouts.
        */
        invalidateOnRefresh: true,
      },
    });
  });

  /*
    Refresh after creating
    all product triggers.
  */

  ScrollTrigger.refresh();
}

/*
  Wait until everything has loaded.

  This is especially important because
  product images affect card positions.
*/

if (document.readyState === "complete") {
  createProductCardAnimations();
} else {
  window.addEventListener("load", createProductCardAnimations, {
    once: true,
  });
}

/* ==========================================
   MOBILE / RESPONSIVE REFRESH
========================================== */

let productRefreshTimer;

window.addEventListener("resize", () => {
  clearTimeout(productRefreshTimer);

  productRefreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

/* ==========================================
   STORY SECTION
========================================== */

function wrapWords(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((word) => `<span class="hl-word">${word}</span>`).join(" ");
  });
}

wrapWords(".story-intro");
wrapWords(".story-item-para");

gsap.to(".story-intro .hl-word", {
  color: "#261f16",
  stagger: 0.08,
  scrollTrigger: {
    trigger: ".story-sticky",
    start: "top 80%",
    end: "top 20%",
    scrub: 1,
  },
});

document.querySelectorAll(".story-item").forEach((item) => {
  const image = item.querySelector(".story-item-image");
  const heading = item.querySelector(".story-item-heading");
  const words = item.querySelectorAll(".hl-word");

  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const fromSide = isMobile ? 0 : item.classList.contains("item-right") ? 80 : -80;

  gsap.set(image, { opacity: 0, x: fromSide });
  gsap.set(heading, { opacity: 0, y: 25 });
  gsap.set(words, { color: "rgba(38, 31, 22, 0.25)" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top top",
      end: () => `+=${item.offsetHeight + 300}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
  });

  tl.to(image, { opacity: 1, x: 0, duration: 1 })
    .to(heading, { opacity: 1, y: 0, duration: 0.7 })
    .to(words, { color: "#261f16", stagger: 0.05, duration: 1 });
});


/* ==========================================
   COLLECTION HEADING ANIMATION
========================================== */

gsap.set(".collection-heading h2", {
  opacity: 0,
  y: 40,
});

gsap.set(".collection-heading p", {
  opacity: 0,
  y: 25,
});

gsap.timeline({
  scrollTrigger: {
    trigger: ".collection-heading",
    start: "top 85%",
    toggleActions: "play reverse play reverse",
  },
})
  .to(".collection-heading h2", { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
  .to(".collection-heading p", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");



/* ==========================================
   REVIEW SECTION ANIMATION
========================================== */

gsap.set(".reviews-heading", { opacity: 0 });

gsap.timeline({
  scrollTrigger: {
    trigger: ".reviews",
    start: "top 90%",
    end: "top 10%",
    scrub: 1,
  },
})
  .to(".reviews-heading", { opacity: 1, duration: 1 })
  .to(".reviews-heading", { opacity: 1, duration: 1 })
  .to(".reviews-heading", { opacity: 0, y: -40, duration: 1 });

document.querySelectorAll(".review-card").forEach((card) => {
  gsap.set(card, { opacity: 0 });

  gsap.to(card, {
    opacity: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "top 45%",
      scrub: 1,
    },
  });
});

/* ==========================================
   FOOTER ANIMATION
========================================== */

gsap.set(".footer-meadow-back", { opacity: 0, scale: 1.1 });
gsap.set(".footer-meadow-front", { opacity: 0, y: 40 });
gsap.set(".footer-content > *", { opacity: 0, y: 25 });

gsap.timeline({
  scrollTrigger: {
    trigger: ".site-footer",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
})
  .to(".footer-meadow-back", { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" })
  .to(".footer-meadow-front", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "-=1")
  .to(".footer-content > *", { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }, "-=0.6");

/* ==========================================
   FINAL SCROLLTRIGGER REFRESH
========================================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
});
