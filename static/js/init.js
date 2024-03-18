
document.addEventListener('DOMContentLoaded', function(){

	"use strict";
	
	// here all ready functions
	
	ajaxCustom();  				//* Done
	lexal_tm_menu();			//* Done
	lexal_tm_about_hero();		//* Done
	lexal_tm_imgtosvg();		//* Done 
	lexal_tm_hero_overlay();	//* Done
	lexal_tm_simpleParallax();	//* Done
	lexal_tm_data_images();		//* Done
	lexal_tm_contact_form();	//! Untested
	lexal_tm_magnific_popup();	//? Not sure if possible
	lexal_tm_anchor();			//* Done
	lexal_tm_animate_text();	//? Not Possible
	lexal_tm_animate_signture(); //* Done
	lexal_tm_waypoints();		//* Done
	lexal_tm_waypoints2();		//* Done 	
	
	window.addEventListener('resize', function() {
		lexal_tm_about_hero();		//* Done
	});
	
	window.addEventListener('load', function() {
		setTimeout(function(){lexal_tm_preloader();},1000);		//* Done 
		setTimeout(function(){lexal_tm_load();},3000);			//* Done
	});

	
});

	
// -----------------------------------------------------
// --------------    AJAX CUSTOM    --------------------
// ------------    PURE VANILLA JS    ------------------
// -----------------------------------------------------

function ajaxCustom() {
	"use strict";
  
	const loadMoreButton = document.querySelector('.lexal_tm_load_more .projects_load_more a');
	
	if (loadMoreButton == null) {return;}

	loadMoreButton.addEventListener('click', function(event) {
	  event.preventDefault(); 
  
	  const element = this; 
	  const shape = document.querySelector('.lexal_tm_load_more .svg');
	  const span = element.querySelector('span');
  
	  if (!element.classList.contains('opened')) {
		element.classList.add('opened');
		shape.classList.add('animate');
		span.classList.add('change');
  
		fetch('/more')
		  .then(response => response.json())
		  .then(data => {
			setTimeout(function() {
			  const portfolioList = document.querySelector('.lexal_tm_portfolio_list');
  
			  for (let i = 0; i < data.portfolio.length; i++) { 
				var list = '<li><div class="list_inner"><div class="image_wrap"><img src="static/img/portfolio/600x600.jpg" alt="" /><div class="main_image" style="background-image: url('+data.portfolio[i].imgUrl+')"></div></div><div class="overlay"></div><div class="overlay_text"><h3>'+data.portfolio[i].title+'</h3><span>'+data.portfolio[i].subTitle+'</span></div><a class="full_link" href="'+data.portfolio[i].pageURL+'"></a></div></li>';
				portfolioList.innerHTML += list; 
			  }
  
			  shape.classList.remove('animate');
			  span.classList.remove('change');
			}, 1500);
		  })
		  .catch(error => {
			console.error('Error fetching data:', error);
		  });
	  } else {
		alert('No more images !!!');
	  }
	});
  }
  
	
// -----------------------------------------------------
// -----------------    NENU    ------------------------
// -----------------------------------------------------	
	
function lexal_tm_menu(){
	
	"use strict";
	
	var t1			= new TimelineMax({paused:true});
	
	t1.to(".lexal_tm_border.top .trigger .one", 0.5,{
		y:6,
		rotation:45,
		ease:Expo.easeinOut
	});
	t1.to(".lexal_tm_border.top .trigger .two", 0.5,{
		y:- 6,
		rotation:-45,
		ease:Expo.easeinOut,
		delay:-0.5
	});	
	t1.to(".lexal_tm_menu",0.5,{
		right:"-40px",
		ease:Expo.easeinOut,
		delay:-0.5
	});
	t1.staggerFrom(".lexal_tm_menu .nav_list ul li", 0.4, {x:25, opacity:0, ease:Expo.easeinOut},0.1);
	t1.reverse();
	

	const triggerElement = document.querySelector('.lexal_tm_border.top .trigger');
	triggerElement.addEventListener('click', function(event) {
		event.preventDefault(); 
		t1.reversed(!t1.reversed()); 
	});
	
	const menuLinks = document.querySelectorAll('.lexal_tm_menu .nav_list ul li a');
	menuLinks.forEach(link => {
	link.addEventListener('click', function(event) {
		event.preventDefault();
		t1.reversed(!t1.reversed());
	});
});

}

// -----------------------------------------------------
// -----------------    ABOUT HERO    ------------------
// -----------------    UNTESTED    ------------------
// -----------------------------------------------------

function lexal_tm_about_hero() {
	"use strict";
	document.addEventListener('DOMContentLoaded', function() {
		const boxElement = document.querySelector('.lexal_tm_samebox_wrap .leftbox');
		if (boxElement) { 
			boxElement.style.height = (windowHeight - 90) + 'px';
		}
	});
}
	
// -----------------------------------------------------
// ---------------    HERO OVERLAY    ------------------
// -------------    PURE VANILLA JS     ----------------
// -----------------------------------------------------

function lexal_tm_hero_overlay() {
	"use strict";
  
	window.addEventListener('scroll', function() {
	  var currentScroll = window.pageYOffset;
	  var scrollOpacity = 1 - (currentScroll / 550);
  
	  var heroElement = document.querySelector(".lexal_tm_home_hero");
	  heroElement.style.opacity = scrollOpacity;
	});
  }
  

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function lexal_tm_imgtosvg() {
	"use strict";
  
	const svgImages = document.querySelectorAll('img.svg');
  
	svgImages.forEach(img => {
	  const imgClass = img.getAttribute('class');
	  const imgURL = img.getAttribute('src');
  
	  fetch(imgURL)
		.then(response => {
			if (response.headers.get('Content-Type') !== 'image/svg+xml') {
				console.error('Error: Not an SVG image:', imgURL);
				return; 
			  }
			return response.text(); 
		}) 
		.then(data => {
		  const svgElement = new DOMParser().parseFromString(data, 'text/xml').querySelector('svg');
  
		  if (imgClass) {
			svgElement.setAttribute('class', `${imgClass} replaced-svg`);
		  }
		  svgElement.removeAttribute('xmlns:a'); 
  
		  img.parentNode.replaceChild(svgElement, img);
		})
		.catch(error => console.error('Error fetching SVG:', error));
	});
  }
  
// -----------------------------------------------------
// --------------------    JARALLAX    -----------------
// -----------------------------------------------------

function lexal_tm_simpleParallax() {
	"use strict";
  
	const parallaxElements = document.querySelectorAll('.jarallax'); 
  
	const parallaxInstances = []; 
  
	parallaxElements.forEach(element => {
	  const customSpeed = element.dataset.speed; 
	  const speed = customSpeed ? parseFloat(customSpeed) : 0.5; 
  
	  const instance = new simpleParallax(element, {
		scale: speed, 
		overflow: true, 
		delay: 0.6,     
		orientation: 'down' 
		});
	  parallaxInstances.push(instance);
	});
  }
// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function lexal_tm_data_images() {
	"use strict";
  
	const elements = document.querySelectorAll('*[data-img-url]');
  
	elements.forEach(element => {
	  const url = element.dataset.imgUrl; // Access using dataset
	  element.style.backgroundImage = `url(${url})`;
	});
  }
  
// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function lexal_tm_contact_form() {
	"use strict";
  
	const contactForm = document.querySelector(".contact_form");
	const sendMessageButton = document.querySelector(".contact_form #send_message");
	const returnMessage = document.querySelector(".contact_form .returnmessage");
	
	if (contactForm == null || sendMessageButton == null || returnMessage == null){return;}
	
	const successMessage = returnMessage.dataset.success;
	

	sendMessageButton.addEventListener('click', (event) => {
	  event.preventDefault();
  
	  const name = document.querySelector(".contact_form #name").value;
	  const email = document.querySelector(".contact_form #email").value;
	  const message = document.querySelector(".contact_form #message").value;
	  const subject = document.querySelector(".contact_form #subject").value; 
  
	  returnMessage.textContent = ""; 
  
	  if (name === '' || email === '' || message === '') {
		jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
	  } else {
		const formData = new FormData();
		formData.append('ajax_name', name);
		formData.append('ajax_email', email);
		formData.append('ajax_message', message);
		formData.append('ajax_subject', subject);
  
		fetch('modal/contact.php', {
		  method: 'POST',
		  body: formData
		})
		.then(response => response.text()) 
		.then(data => {
		  returnMessage.textContent = data;
  
		  if (returnMessage.querySelector('span.contact_error')) { 
			// ... (Handle error display)
			jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
		  } else {
			returnMessage.innerHTML += `<span class='contact_success'>${successMessage}</span>`;
			// ... (Handle success display)
			jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
		  }
  
		  if (data === "") {
			contactForm.reset();
		  }
		})
		.catch(error => {
		  // Handle AJAX errors
		  console.error("Error submitting form:", error);
		});
	  }
	}); 
  }
  
	
// -----------------------------------------------------
// ------------    ANCHOR NAVIGATION    ----------------
// -----------------------------------------------------

function lexal_tm_anchor() {
	"use strict";
  
	const scrollOffset = 0; // Assuming this is initialized elsewhere if needed 
	const navigation = document.querySelector('.anchor_nav'); 
	const anchorLinks = navigation.querySelectorAll('a');
	
	if (anchorLinks == null) {return;}
  
	anchorLinks.forEach(link => {
	  link.addEventListener('click', function(event) {
		event.preventDefault();
  
		const currentActive = navigation.querySelector('.current');
		if (currentActive) {
		  currentActive.classList.remove('current');
		}
		link.classList.add('current'); 
  
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
  
		if (targetElement) {
		  anime({
			targets: ['html', 'body'],
			scrollTop: targetElement.offsetTop - scrollOffset - 85,
			duration: 1500,
			easing: 'easeInOutExpo' 
		  });
		}
	  });
	});
}

// -----------------------------------------------------
// --------------    MAGNIFIC POPUP    -----------------
// -----------------------------------------------------

function lexal_tm_magnific_popup(){
	
	"use strict";
	
	jQuery('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});
	
	jQuery('.gallery').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled:true
			}
		});
	});
	jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
	});
	jQuery('.popup-youtube').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			//type: 'iframe',
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});
}

// --------------------------------------------------
// --------------    PRELOADER      -----------------
// --------------     PURE VANILLA    ---------------
// --------------------------------------------------

function lexal_tm_preloader() {
	const mainPreloader = document.querySelector('.lexal_tm_loader-wrapper .loader'); 
	const winWidth = window.innerWidth;
	const winHeight = window.innerHeight;
  
	// Styling with vanilla JS:
	mainPreloader.style.top = `${winHeight / 2 - 2.5}px`;
	mainPreloader.style.left = `${winWidth / 2 - 200}px`;
  
	// Using a variable for animation clarity:
	let currentWidth = 0; 
  
	const animationInterval = setInterval(() => {
	  mainPreloader.style.width = `${currentWidth}px`;
	  currentWidth += 3;
  
	  if (currentWidth >= 400) {
		clearInterval(animationInterval);
		
		anime({
			targets: mainPreloader,
			left:'0',
			width:'100%',
			easing: 'linear',
			duration: 375
		});
		anime({
			targets: mainPreloader,
			top:'0',
			height:'100vh',
			easing: 'linear',
			duration: 375,
			delay: 375
		});
	}
}, 2);

// Using vanilla JS for fading out:
const loaderWrapper = document.querySelector('.lexal_tm_loader-wrapper');
	anime({
		targets: [mainPreloader, loaderWrapper],
		opacity:'0',
		delay:1800
	});

setTimeout(function() {
	loaderWrapper.style.display = 'none';
}, 3000);
}

// -----------------------------------------------------
// ---------------   WAYPOINTS    ----------------------
// -----------------------------------------------------

function lexal_tm_waypoints() {
	"use strict";
	
	const waypointElements = document.querySelectorAll('.lexal_tm_waypoint_effect');
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('load');
				observer.unobserve(entry.target); 
			}
		});
	}, {
		threshold: window.matchMedia("(max-width: 767px)").matches ? 0.07 : 0.2 
	});
	
	waypointElements.forEach(element => {
		observer.observe(element);
	});
}


function lexal_tm_waypoints2() {
	"use strict";
	
	const waypointElements = document.querySelectorAll('.lexal_tm_waypoint_effect2');
	
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
			console.log("LOADED");
		  entry.target.classList.add('load');
		  observer.unobserve(entry.target); 
		}
	  });
	}, {
	  threshold: 0.5  // 50% offset
	});
  
	waypointElements.forEach(element => {
	  observer.observe(element);
	});
  }
  

  function lexal_tm_load() {
	"use strict";
  
	const homeHero = document.querySelector('.lexal_tm_home_hero');
	if (!homeHero) return; 
  
	const imageElement = homeHero.querySelector('.image');
	if (imageElement) imageElement.classList.add('animate');

	const nameElement = homeHero.querySelector('.overlay_texts .name');
	if (nameElement) nameElement.classList.add('animate');
	
	const subtitleElement = homeHero.querySelector('.overlay_texts .subtitle');
	if (subtitleElement) subtitleElement.classList.add('animate');
	
	const downElement = homeHero.querySelector('.lexal_tm_down');
	if (downElement) downElement.classList.add('animate');
  }

// -------------------------------------------------
// -------------   ANIMATE TEXT  -------------------
// -------------------------------------------------

function lexal_tm_animate_text(){
	
	"use strict";
	
	var animateSpan			= jQuery('.lexal_tm_animation_text_word');
	
		animateSpan.typed({
			strings: ["Freelancer", "UI/UX Designer", "Web Developer"],
			loop: true,
			startDelay: 1000,
			backDelay: 2e3
		});
}

function lexal_tm_animate_signture(){
	"use strict";

	var signture = document.querySelector('.sign img'); 

	anime({
		targets: signture,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function(el, i) { return i * 250 },
		direction: 'alternate',
		loop: true
	  });
}