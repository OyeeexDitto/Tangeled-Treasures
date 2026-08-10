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


/* Collection Page Scrolling */

// gsap.registerPlugin(ScrollTrigger);

// gsap.to(".hero-bg img", 
//     {
//         opacity: 0,
//         scale: 1.15,
//         scrollTrigger: {
//             trigger: ".collection",
//             start: "top 90%",
//             end: "top 40%",
//             scrub: true,
//             markers: true 
//         }
//     });

// gsap.from(".collection-clouds",
//     {
//         opacity: 0,
//         scale: 1.1,
//         scrollTrigger: {
//             trigger: ".collection",
//             start: "top bottom",
//             end: "top center",
//             scrub: true
//         }
//     });

// gsap.from(".meadow-back, .meadow-front", {
//   opacity: 0,
//   y: 40,
//   scrollTrigger: {
//     trigger: ".collection",
//     start: "top 70%",
//     end: "top 20%",
//     scrub: true
//   }
// });