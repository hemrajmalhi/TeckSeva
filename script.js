  // Initialize AOS animation
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('hidden');
    mainNav.classList.toggle('flex');
    mainNav.classList.toggle('absolute');
    mainNav.classList.toggle('top-20');
    mainNav.classList.toggle('left-0');
    mainNav.classList.toggle('right-0');
    mainNav.classList.toggle('bg-white');
    mainNav.classList.toggle('p-8');
    mainNav.classList.toggle('shadow-lg');
    mainNav.classList.toggle('flex-col');
    mainNav.classList.toggle('space-y-6');
    mainNav.classList.toggle('space-x-0');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (!mainNav.classList.contains('hidden')) {
        mainNav.classList.add('hidden');
        mainNav.classList.remove('flex');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('shadow-lg');
      header.classList.add('py-2');
    } else {
      header.classList.remove('shadow-lg');
      header.classList.remove('py-2');
    }
  });

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('hidden');
      } else {
        slide.classList.add('hidden');
      }
    });

    testimonialDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.classList.add('bg-primary-500');
        dot.classList.remove('bg-gray-300');
      } else {
        dot.classList.remove('active');
        dot.classList.remove('bg-primary-500');
        dot.classList.add('bg-gray-300');
      }
    });

    currentSlide = index;
  }

  testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
    });
  });

  // Auto-rotate testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }, 5000);

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove('opacity-0');
      backToTopBtn.classList.remove('invisible');
    } else {
      backToTopBtn.classList.add('opacity-0');
      backToTopBtn.classList.add('invisible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Counter animation for stats
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  // Start counter animation when stats section is in view
  const statsSection = document.querySelector('.stats-bg');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(statsSection);
    }
  });

  observer.observe(statsSection);

  // Form submission
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });