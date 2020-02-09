navegacaoInterna()
scrollSuave()
scrollMouse()
scrollTouch()

const sections = document.querySelectorAll('.js-menu-content section')
// -------------- Navegação interna --------------
function navegacaoInterna() {
    const menuNav = document.querySelectorAll(".js-menu li");
    const menuContent = document.querySelectorAll(".js-menu-content section");

    if (menuNav.length && menuContent.length) {
    menuNav[0].classList.add("active");

    function activeSection(index) {
        menuNav.forEach( section => {
            section.classList.remove('active')
        })
        menuNav[index].classList.add('active')
    }

    menuNav.forEach((itemMenu, index) => {
        itemMenu.addEventListener("click", () => {
        activeSection(index);
        });
    })
    }
}


// -------------- Scroll suave --------------
function scrollSuave() {
    const menuNav = document.querySelectorAll('.js-menu li a[href^="#"]');

    menuNav.forEach( link => {
        link.addEventListener("click", scrollSection)
    })

    function scrollSection(event) {
        event.preventDefault()
        const href = event.currentTarget.getAttribute("href")
        const section = document.querySelector(href)

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
}


// -------------- Scroll com o mouse --------------
function scrollMouse() {
    window.addEventListener("wheel", scrollWheel);
}

function scrollWheel(event) {
    const direction = Math.sign(event.deltaY);
    // mouse com o movimento para baixo
    if(direction == 1) {
        sections.forEach(section => {
            const topSection = section.getBoundingClientRect().top
            const nextSection = section.nextElementSibling
            currentSection(nextSection, topSection)
        })
    } else { 
    // mouse com o movimento para cima
        sections.forEach(section => {
            const topSection = section.getBoundingClientRect().top
            const previousSection = section.previousElementSibling
            currentSection(previousSection, topSection)
        })

    }
}

// Pega a página atual e scrolla para a próxima
function currentSection(section, topSection) {
    if(topSection == 0) { 
        if(section != null) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
            updateNav(section)
        }
    }
}

// Atualiza a nav
function updateNav(choiceSection) {
    const menuNav = document.querySelectorAll(".js-menu li");
    menuNav.forEach( section => {
        section.classList.remove('active')
        if(choiceSection.getAttribute('id') == section.children[0].innerHTML) {
            section.classList.add('active')
        }
    })
}



// -------------- Scroll com o touch --------------
function scrollTouch() {
    let initialTouch;
    window.addEventListener('touchstart', event => {
        initialTouch = event.touches[0].clientY;
    })

    window.addEventListener("touchend", event => {
        var finalTouch = event.changedTouches[0].clientY;
        if (initialTouch > finalTouch) {
            sections.forEach( section => {
                const topSection = section.getBoundingClientRect().top
                const nextSection = section.nextElementSibling
                currentSection(nextSection, topSection)
            })
        } else {
            sections.forEach( section => {
                const topSection = section.getBoundingClientRect().top
                const previousSection = section.previousElementSibling
                currentSection(previousSection, topSection)
            })
        }
    });
}

