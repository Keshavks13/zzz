// Disable markers globally
ScrollTrigger.defaults({
  markers: false,
});

gsap.from("ul,h3",{
    y:-100,
    duration:1,
})
gsap.from(".animate1H2",{
    x:-100,
    duration:1,
    rotation: 15,
})
gsap.from(".animate2H2",{
    x:100,
    duration:1,
    rotation: -15,
})
const t1= gsap.timeline();

t1.to(".img1",{
    x:"20%",
    y:"-15%",
    opacity:1
})
t1.to(".img1",{
    x:"20%",
    rotation:15,
    y:"-50%",
})

let t2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page2", // The second page
        start: "10% 100%", // When 10% of the second page enters the viewport
        end: "50% 100%",  // When 50% of the second page is in the viewport
        markers: false,    // To visualize start and end points
        scrub: 1,         // Smooth scrolling animation
    },
});
t2.to(".animate1H2",{
    x:-100,
    rotation:15,
    opacity:0,
},0)
t2.to(".animate2H2",{
    x:100,
    rotation:-15,
    opacity:0,
},0)
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Function to split text into spans dynamically
function splitTextToSpans(element) {
  const text = element.textContent; // Get the text content
  element.textContent = ""; // Clear the original text
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char; // Handle spaces
    element.appendChild(span); // Add span to the element
  });
}

// Select the foreground text and split it into spans
const foregroundText = document.querySelector(".foreground-text");
splitTextToSpans(foregroundText);


// Animate each letter on scroll
gsap.registerPlugin(ScrollTrigger);

// Create a timeline with ScrollTrigger
// const timeline = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".scroll-container", // Trigger animation on the scroll container
//     start: "top center",          // Start when the container hits the center of the viewport
//     end: "center top",         // End when the container leaves the viewport
//     scrub: true,                  // Smooth scroll animation
//   }
// });

// // Add the animation to the timeline
// timeline.to(".foreground-text span", {
//   opacity: 1,     // Fade in the letters
//   stagger: 0.05,  // Delay between each letter
//   duration: 1 ,
//   scrub:true,
// });
// GSAP Animation Timeline
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container", // Ensure the correct container is targeted
    start: "top 80%",            // Trigger when 80% of the viewport is visible
    end: "top 30%",              // End when the container leaves 30% of the viewport
    scrub: true,                 // Smooth scroll animation
    markers: false,               // Enable markers for debugging (remove in production)
  },
});

// Add animation to the timeline
timeline.to(".foreground-text span", {
  opacity: 1,     // Fade in letters
  stagger: 0.05,  // Delay between each letter
  duration: 1,
});

// Match Media for Mobile Adjustments
gsap.matchMedia().add("(max-width: 768px)", () => {
  ScrollTrigger.create({
    trigger: ".scroll-container",
    start: "top 90%",          // Trigger earlier for smaller viewports
    end: "top 40%",            // End earlier for smoother transitions
    scrub: true,
    markers: false,             // Debugging for small screens
  });
});

gsap.registerPlugin(ScrollTrigger);

// Create a repeating timeline

gsap.from(".top .two",{
    y:100,
    repeat:-1,
    repeatDelay:5
})
gsap.from(".top .three",{
    x:100,
    repeat:-1,
    repeatDelay:5,
})
gsap.from(".top .one",{
    x:-100,
    repeat:-1,
    repeatDelay:5
})


//page 5 animation

// //second page animation

const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page5", 
      start: "25% center", 
      end: "bottom top",   
      toggleActions: "restart none none none", 
      markers:false,
    }
  });
  
  tl2.from(".page5 .leftImg", {
    x: -1000, 
    duration: 0.3,
    ease: "power1.out" 
  });
  
  tl2.from(".page5 .right", {
    x: 1000,
    duration: 0.3,
    ease: "power1.out"
  });
  
  
//   tl2.from(".page5 .liveSubs .ytSubs", {
//     y: -1000, 
//     duration: 0.5,
//     ease: "power1.out"
//   });
  