// ===== MAIN SCRIPT =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Portfolio loading...');
  
  // ===== LOADING SCREEN =====
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Hide loading screen after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      console.log('✅ Portfolio loaded successfully!');
    }, 1000);
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add confetti effect on theme change
      createConfetti();
    });
    
    function updateThemeIcon(theme) {
      themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  // ===== CUSTOM CURSOR =====
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  // Only enable custom cursor on desktop
  if (window.matchMedia('(min-width: 768px)').matches && cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      cursorOutline.style.left = `${e.clientX}px`;
      cursorOutline.style.top = `${e.clientY}px`;
    });
    
    // Hover effects
    const interactiveElements = document.querySelectorAll(
      'a, button, .nav-link, .social-icon, .project-card, .skill-item, .stat-card, .tab-btn, .btn'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '0px';
        cursorDot.style.height = '0px';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--accent-color)';
        cursorOutline.style.opacity = '0.8';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--primary-color)';
        cursorOutline.style.opacity = '1';
      });
    });
  } else if (cursorDot && cursorOutline) {
    // Hide custom cursor on mobile
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'blur(0px)';
        navbar.style.boxShadow = 'none';
      }
    }
    
    // Active nav link based on scroll position
    const scrollPos = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle body scroll
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== SKILLS ANIMATION =====
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  
  if (skillProgressBars.length > 0) {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute('data-width') || '0';
          
          setTimeout(() => {
            progressBar.style.width = `${width}%`;
          }, 300);
          
          observer.unobserve(progressBar);
        }
      });
    }, observerOptions);
    
    skillProgressBars.forEach(bar => observer.observe(bar));
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length > 0) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count') || 0;
      const increment = target / 50; // Lebih cepat
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 30);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start counter when in view
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      counterObserver.observe(counter);
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <h4>Pesan Terkirim!</h4>
          <p>Terima kasih telah menghubungi. Saya akan membalas secepatnya.</p>
        `;
        successMessage.style.cssText = `
          background: linear-gradient(135deg, #27ca3f, #1ea62e);
          color: white;
          padding: 25px;
          border-radius: 15px;
          text-align: center;
          margin-top: 20px;
          animation: fadeIn 0.5s ease;
          box-shadow: 0 10px 30px rgba(39, 202, 63, 0.3);
        `;
        
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Reset form
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            successMessage.remove();
          }, 300);
        }, 5000);
        
        // Create confetti
        createConfetti();
      }, 2000);
    });
  }

  // ===== TABS FUNCTIONALITY =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show active tab pane
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === tabId) {
            pane.classList.add('active');
          }
        });
      });
    });
  }

  // ===== PROJECT CARD ANIMATION =====
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===== FLOATING ELEMENTS ANIMATION =====
  const floatElements = document.querySelectorAll('.float-element');
  
  floatElements.forEach(el => {
    // Randomize animation delay
    const randomDelay = Math.random() * 2;
    el.style.animationDelay = `${randomDelay}s`;
    
    // Add interactive hover effect only on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2) rotate(15deg)';
        el.style.zIndex = '10';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.zIndex = '';
      });
    }
  });

  // ===== CONFETTI EFFECT =====
  function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#4361ee', '#3a0ca3', '#4cc9f0', '#f72585', '#7209b7', '#560bad'];
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) { // Kurangi jumlah untuk performa
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 3, // Ukuran lebih kecil
        d: Math.random() * 3 + 1, // Kecepatan lebih lambat
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncrement: Math.random() * 0.05 + 0.03,
        tiltAngle: 0
      });
    }
    
    let animationId;
    let animationStartTime = Date.now();
    
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confettiPieces.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
        
        // Update position
        p.y += p.d;
        p.tiltAngle += p.tiltAngleIncrement;
        p.tilt = Math.sin(p.tiltAngle) * 12;
        
        // Reset confetti piece if it falls off screen
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      
      // Stop animation after 2.5 seconds
      if (Date.now() - animationStartTime < 2500) {
        animationId = requestAnimationFrame(drawConfetti);
      } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    drawConfetti();
  }

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll(
    '.about-grid, .skills-tabs, .projects-grid, .contact-grid, .stat-card, .skill-item, .project-card, .about-quote, .contact-method'
  );
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(el);
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const input = this.querySelector('input');
      const button = this.querySelector('button');
      const originalHtml = button.innerHTML;
      
      // Show loading
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      button.disabled = true;
      
      // Simulate subscription
      setTimeout(() => {
        input.value = '';
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#27ca3f';
        
        // Show notification
        const notification = document.createElement('div');
        notification.textContent = 'Terima kasih telah berlangganan!';
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #27ca3f;
          color: white;
          padding: 15px 25px;
          border-radius: 10px;
          z-index: 10000;
          animation: slideIn 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          max-width: calc(100% - 40px);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
            notification.remove();
            button.innerHTML = originalHtml;
            button.style.background = '';
            button.disabled = false;
          }, 300);
        }, 3000);
      }, 1500);
    });
  }

  // ===== ADD CSS ANIMATIONS =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes fadeIn {
      from { 
        opacity: 0;
        transform: translateY(-10px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .form-success i {
      font-size: 40px;
      margin-bottom: 15px;
    }
    
    .form-success h4 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .form-success p {
      font-size: 14px;
      opacity: 0.9;
    }
    
    /* Smooth transitions */
    .section,
    .container,
    .hero-container {
      transition: padding 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // ===== WINDOW RESIZE HANDLER =====
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Update canvas size for confetti
      const canvas = document.getElementById('confettiCanvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      // Close mobile menu if window is resized to desktop
      if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Adjust padding on resize
      const containers = document.querySelectorAll('.container, .nav-container, .hero-container');
      containers.forEach(container => {
        if (window.innerWidth < 480) {
          container.style.padding = '0 20px';
        } else if (window.innerWidth < 768) {
          container.style.padding = '0 25px';
        } else {
          container.style.padding = '0 40px';
        }
      });
    }, 250); // Debounce resize events
  });

  // ===== INITIALIZE ON LOAD =====
  setTimeout(() => {
    // Initialize counters if they exist
    if (counters.length > 0) {
      counters.forEach(counter => {
        if (!counter.hasAttribute('data-initialized')) {
          counter.setAttribute('data-initialized', 'true');
        }
      });
    }
    
    // Check if any elements are near edges and adjust
    checkElementsNearEdges();
  }, 1000);
  
  function checkElementsNearEdges() {
    const edgeElements = document.querySelectorAll('.code-window, .skills-tabs, .project-card, .contact-form');
    
    edgeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // If element is too close to edge, add margin
      if (rect.left < 20 || rect.right > viewportWidth - 20) {
        el.style.marginLeft = 'auto';
        el.style.marginRight = 'auto';
        el.style.maxWidth = 'calc(100% - 40px)';
      }
    });
  }
});