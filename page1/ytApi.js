// // begins
// const apiKey = `AIzaSyAj3bzne-ifciVXHeSz_zFxwT4vkA9gLm4`;
// let ytId = `UCQ6dxVa7oONQdb2LtWjYQNg`;  // Hardcoded channel ID
// let ytSubs;  // Will store the live subscriber count

// // Function to return live subs count
// async function liveSubCount() {
//     try {
//         if (!ytId) {
//             throw new Error('Channel ID is not available');
//         }

//         const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ytId}&key=${apiKey}`);
        
//         if (!res.ok) {
//             throw new Error('Error fetching subscriber count');
//         }

//         const data = await res.json();
//         ytSubs = data.items[0].statistics.subscriberCount;
//         console.log("Live subscriber count:", ytSubs);

//         // Update the DOM with the subscriber count
//         document.querySelector(".ytSubs").textContent = `${ytSubs}`;
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Main function to fetch subscriber count
// async function main() {
//     await liveSubCount();  // Fetch and display subscriber count
// }

// main();  // Run the main function
// // Function to fetch latest videos
// async function fetchLatestVideos() {
//     try {
//         const res = await fetch(
//             `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${ytId}&part=snippet,id&order=date&maxResults=6`
//         );

//         if (!res.ok) {
//             throw new Error('Error fetching latest videos');
//         }

//         const data = await res.json();
//         displayVideos(data.items);  // Call to display the videos in the swiper
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Function to dynamically display videos in Swiper
// function displayVideos(videos) {
//     const swiperWrapper = document.querySelector('.swiper-wrapper');
    
//     // Clear existing slides if any
//     swiperWrapper.innerHTML = '';

//     // Loop through videos and create Swiper slides
//     videos.forEach(video => {
//         const videoId = video.id.videoId;
//         const videoTitle = video.snippet.title;

//         const slide = `
//             <div class="swiper-slide">
//                 <h3>${videoTitle}</h3>
//                 <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" 
//                 title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; 
//                 clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//             </div>
//         `;

//         swiperWrapper.innerHTML += slide;
//     });

//     // Re-initialize Swiper to reflect the new slides and make it responsive
//     const swiper = new Swiper('.swiper-container', {
//         direction: 'horizontal',
//         loop: true,
//         autoplay: {
//             delay: 3000,
//             reverseDirection: true,
//         },
//         navigation: {
//             prevEl: '.swiper-button-prev',
//             nextEl: '.swiper-button-next',  // Optional: If you have a next button
//         },
//         slidesPerView: 3,  // Default to 3 slides per view
//         spaceBetween: 30,  // Default space between slides
//         breakpoints: {
//             320: {
//                 slidesPerView: 1,  // Show 1 slide on small mobile screens
//                 spaceBetween: 10,  // Small space between slides
//             },
//             480: {
//                 slidesPerView: 1,  // Show 1 slide on larger mobile screens
//                 spaceBetween: 20,  // Moderate space
//             },
//             768: {
//                 slidesPerView: 2,  // Show 2 slides on tablets
//                 spaceBetween: 25,  // Increase space for larger screens
//             },
//             1024: {
//                 slidesPerView: 3,  // Show 3 slides on desktop
//                 spaceBetween: 30,  // Default space between slides
//             },
//             1440: {
//                 slidesPerView: 4,  // Show 4 slides on larger desktop
//                 spaceBetween: 40,  // Increase space for larger screens
//             },
//             1920: {
//                 slidesPerView: 5,  // Show 5 slides on ultra-wide screens
//                 spaceBetween: 50,  // Even more space for extra-large screens
//             }
//         }
//     });
// }

// // Fetch and display videos on page load
// fetchLatestVideos();
