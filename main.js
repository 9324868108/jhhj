// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link, .mobile-contact-btn');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxDescription = document.getElementById('lightbox-description');
const closeLightbox = document.getElementById('close-lightbox');
const prevImage = document.getElementById('prev-image');
const nextImage = document.getElementById('next-image');
const quotes = document.querySelectorAll('.quote');
const prevTestimonial = document.getElementById('prev-testimonial');
const nextTestimonial = document.getElementById('next-testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');

// Global Variables
let currentImageIndex = 0;
let currentQuoteIndex = 0;
let currentTestimonialIndex = 0;
let quoteInterval;
let isScrolling = false;
let revealItems;

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Initialize the page
function init() {
    setupNavbar();
    setupMobileMenu();
    setupGallery();
    setupQuotes();
    setupTestimonials();
    setupContactForm();
    setupScrollReveal();
    setupHero3D();
}

// Navbar functionality
function setupNavbar() {
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            window.requestAnimationFrame(() => {
                if (window.scrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isScrolling = false;
            });
        }
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

// Gallery and lightbox functionality
function setupGallery() {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    prevImage.addEventListener('click', () => {
        navigateImage(-1);
    });

    nextImage.addEventListener('click', () => {
        navigateImage(1);
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const item = galleryItems[index];
    const imgSrc = item.querySelector('img').src;
    const category = item.dataset.category;
    const description = item.dataset.description;

    lightboxImage.src = imgSrc;
    lightboxCategory.textContent = category;
    lightboxDescription.textContent = description;
    
    updateLightboxNavigation();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function navigateImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = 0;
    } else if (currentImageIndex >= galleryItems.length) {
        currentImageIndex = galleryItems.length - 1;
    }
    
    const item = galleryItems[currentImageIndex];
    const imgSrc = item.querySelector('img').src;
    const category = item.dataset.category;
    const description = item.dataset.description;
    
    lightboxImage.src = imgSrc;
    lightboxCategory.textContent = category;
    lightboxDescription.textContent = description;
    
    updateLightboxNavigation();
}

function updateLightboxNavigation() {
    prevImage.disabled = currentImageIndex === 0;
    nextImage.disabled = currentImageIndex === galleryItems.length - 1;
    
    prevImage.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
    nextImage.style.opacity = currentImageIndex === galleryItems.length - 1 ? '0.5' : '1';
}

// Health quotes functionality
function setupQuotes() {
    showQuote(currentQuoteIndex);
    
    quoteInterval = setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        showQuote(currentQuoteIndex);
    }, 5000);
}

function showQuote(index) {
    quotes.forEach((quote, i) => {
        if (i === index) {
            quote.classList.add('active');
        } else {
            quote.classList.remove('active');
        }
    });
}

// Testimonials functionality
function setupTestimonials() {
    // Sample testimonials data
    const testimonials = [
        {
            name: "Rajesh Sharma",
            role: "Patient's Son",
            image: "assets/images/testimonial-1.jpg",
            quote: "The care provided by DIVYODAY NURSING BEURO for my elderly father was exceptional. The nurses were not only professional but also compassionate and attentive to his needs. Their regular monitoring and prompt response to emergencies gave our family peace of mind.",
            rating: 5
        },
        {
            name: "Priya Patel",
            role: "Patient",
            image: "assets/images/testimonial-2.jpg",
            quote: "After my surgery, I was worried about the recovery process at home. The nursing team from DIVYODAY made the journey smooth and comfortable. Their expertise in post-surgical care and their encouraging attitude helped me recover faster than expected.",
            rating: 5
        },
        {
            name: "Amit Verma",
            role: "Patient's Grandson",
            image: "assets/images/testimonial-3.jpg",
            quote: "My grandmother needed specialized care for her chronic condition. The nurses from DIVYODAY were thorough in understanding her medical history and created a personalized care plan. Their consistent follow-ups and detailed reports kept us informed about her progress.",
            rating: 4
        }
    ];

    nextTestimonial.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial();
    });

    prevTestimonial.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonialIndex = index;
            updateTestimonial();
        });
    });

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonialIndex];
        const testimonialCard = document.querySelector('.testimonial-card');
        
        // Update content
        testimonialCard.querySelector('.testimonial-image img').src = testimonial.image;
        testimonialCard.querySelector('.testimonial-quote').textContent = `"${testimonial.quote}"`;
        testimonialCard.querySelector('.author-name').textContent = testimonial.name;
        testimonialCard.querySelector('.author-role').textContent = testimonial.role;
        
        // Update rating stars
        const stars = testimonialCard.querySelectorAll('.testimonial-rating svg');
        stars.forEach((star, i) => {
            if (i < testimonial.rating) {
                star.classList.add('star-filled');
            } else {
                star.classList.remove('star-filled');
            }
        });
        
        // Update dots
        testimonialDots.forEach((dot, i) => {
            if (i === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Contact form functionality
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Scroll reveal animation
function setupScrollReveal() {
    revealItems = document.querySelectorAll('.reveal-item');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight - revealPoint) {
                item.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
}

// 3D Hero Animation with Three.js
function setupHero3D() {
    const container = document.getElementById('hero-canvas-container');
    
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create a simple medical kit model (fallback if GLTF loader fails)
    const createFallbackModel = () => {
        const group = new THREE.Group();
        
        // Create a box for the medical kit
        const boxGeometry = new THREE.BoxGeometry(2, 1.2, 0.8);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0e7490 });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        group.add(box);
        
        // Create a cross symbol on top
        const crossGeometry1 = new THREE.BoxGeometry(0.6, 0.2, 0.1);
        const crossGeometry2 = new THREE.BoxGeometry(0.2, 0.6, 0.1);
        const crossMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        
        const crossHorizontal = new THREE.Mesh(crossGeometry1, crossMaterial);
        crossHorizontal.position.set(0, 0, 0.45);
        
        const crossVertical = new THREE.Mesh(crossGeometry2, crossMaterial);
        crossVertical.position.set(0, 0, 0.45);
        
        group.add(crossHorizontal);
        group.add(crossVertical);
        
        return group;
    };
    
    // Try to load the 3D model
    let model;
    
    try {
        const loader = new THREE.GLTFLoader();
        loader.load(
            'assets/models/medical_kit.glb',
            (gltf) => {
                model = gltf.scene;
                model.scale.set(2, 2, 2);
                model.position.set(0, -1, 0);
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('An error occurred loading the 3D model:', error);
                model = createFallbackModel();
                scene.add(model);
            }
        );
    } catch (error) {
        console.error('Failed to load 3D model:', error);
        model = createFallbackModel();
        scene.add(model);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (model) {
            model.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
