gsap.registerPlugin(MotionPathPlugin);

const introTL = gsap.timeline();

introTL 
    .from(".hero-bg img",
        {
            opacity: 0,
            scale: 1.5,
            duration: 1.5,
            ease: "power2.out"
        })
    .from(".hero-content h1",
        {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: "power2.out"
        }, "-=0.3")
    .from(".tagline .word",
        {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
        },"-=0.3")
    .from(".hero-btn",
        {
            opacity: 0,
            scale: 0,
            duration: 0.7,
            ease: "back.out(2)"
        }, "-=0.2")
    .from(".scroll-indicator",
        {
            opacity: 0,
            y: 15,
            duration: 0.5,
            ease: "power1.out",
            immediateRender: true
        })
    .call(startAmbientAnimations);

    function startAmbientAnimations() {
        gsap.set([".particle", ".flower-particle", ".flower-left", ".flower-right"], {
            animationPlayState: "running"
        });
    
    document.querySelector(".scroll-indicator").classList.add("bounce-active");
    gsap.set(".scroll-indicator",{clearProps: "opacity"});
    
    gsap.set(".hero-btn", { clearProps: "transform,translate,rotate,scale" });
    document.querySelector(".hero-btn").style.transition = "transform .3s ease, box-shadow .3s ease, filter .3s ease";

/* Bee-path */

gsap.to(".hero-bee", {
    duration: 12,
    ease: "power1.inOut",
    motionPath: {
      path: "#beePath",
      align: "#beePath",
      alignOrigin: [0.5, 0.5],
      autoRotate: 90
    },
    onComplete: startCursorBee
  });
}

/* Bee Cursor Chase */

function startCursorBee() {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
    clearProps: "transform, translate, rotate, scale"
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
      overwrite: "auto"
    });
  }

  function flyTo(x, y, speed, onDone) {
    const dist = Math.hypot(x - posX, y - posY);
    const duration = Math.max(0.5, dist / speed);

    faceDirection(x, y);

    if (currentTween) currentTween.kill();

    currentTween = gsap.to(bee, {
      left: x,
      top: y,
      duration,
      ease: "sine.inOut",
      onUpdate: () => {
        posX = gsap.getProperty(bee, "left");
        posY = gsap.getProperty(bee, "top");
      },
      onComplete: onDone
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
      const fx = Math.max(0, Math.min(window.innerWidth - 60, posX + Math.cos(angle) * 220));
      const fy = Math.max(0, Math.min(window.innerHeight - 60, posY + Math.sin(angle) * 220));

      flyTo(fx, fy, 320, () => {
        fleeing = false;
        wander();
      });
    }
  });
}

/* Android Hmaburger Menu */

const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav-overlay");

hamburger.addEventListener("click", ()=> {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");

    if (mobileNav.classList.contains("active"))
    {
        document.body.style.overflow = "hidden";
        gsap.to(mobileNav, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.from(".mobile-nav-overlay li", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.1
        });
    } else {
        document.body.style.overflow = "";
        gsap.to(mobileNav,
            {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
    }
});

//* Whatsaap-Float Icon *//

const whatsappBtn = document.getElementById("whatsapp-btn");

const phoneNumber = "917439469529";
const message = "Hi! I found Tangled Treasures and wanted to know more about your crochet creations 🌸";

whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


/* Product Heading Animation */
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

gsap.from(".collection-heading h2", {
  opacity: 0,
  y: 40,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".collection-heading",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  }
});

gsap.from(".collection-heading p", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".collection-heading",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  }
}, "-=0.4");

/* Product page scroll animation */



document.querySelectorAll(".product-card").forEach(card => {
gsap.from(card, {
    opacity: 0,
    y: 50,
    ease: "power2.out",
    scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "top 50%",
        scrub: 1,
    }
});
});