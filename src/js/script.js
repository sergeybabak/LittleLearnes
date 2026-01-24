import '../sass/style.scss';
import Carousel from "./carousel.js";
import Slider from "./simpleSlider";

document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;  // текущая страница

    //// СКРИПТЫ ДЛЯ ВСЕХ СТРАНИЦ

    //// включаем возможность transition
    window.addEventListener('load', () => {
        if (document.body.classList.contains('preload')) document.body.classList.remove('preload');
    });

    // стрелочка для прокрутки экрана в начало
    const scrollToTopBtn = document.querySelector('.to-top');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const screenHeight = window.innerHeight;

        if (scrollPosition > screenHeight * 1.5) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });

    // меню
    const navbar = document.querySelector('.navbar__wrapper'),
        hamburger = document.querySelector('.hamburger'),
        overlay = document.querySelector('.olerlay'),
        navbarList = navbar.querySelector('ul'),
        navbarListItems = navbarList.querySelectorAll('li');

    let menuItem = 0;
    // переходим на нужный пункт меню в зависимости от страницы
    switch (page) {
        case 'main': menuItem = 0;
            break;
        case 'about': menuItem = 1;
            break;
        case 'academics': menuItem = 2;
            break;
        case 'admission': menuItem = 3;
            break;
        case 'students': menuItem = 4;
            break;
        case 'contact': menuItem = 5;
            break;
    }
    navbarListItems[menuItem].classList.add('navbar__menu-active');


    document.querySelector('.hamburger').addEventListener('click', () => {
        navbar.classList.toggle('navbar__wrapper-active');
        overlay.classList.toggle('overlay-active');

        if (!hamburger.classList.contains('hamburger-active')) {
            hamburger.classList.add('hamburger-active');
        }
        else {
            hamburger.classList.remove('hamburger-active');
            hamburger.classList.add('hamburger-close');
            setTimeout(() => {
                hamburger.classList.remove('hamburger-close');
            }, 2000);
        }

    });

    const link = sessionStorage.getItem('id');  // id секции, на которую будем перемещаться

    if (link) {
        document.querySelector(`#${link}`).scrollIntoView({ behavior: 'smooth' });
        sessionStorage.removeItem('id');
    }

    const links = document.querySelectorAll('a');  // считываем все ссылки на странице

    links.forEach(item => {
        let link = item.getAttribute('href');

        item.addEventListener('click', (e) => {
            if (link.includes('#')) {
                e.preventDefault();
                window.location.href = link.split('#')[0];   // переходим по чистому пути, без id
                sessionStorage.setItem('id', link.split('#')[1]);  // id сохраняем для дальнейшего перехода
            }
        });
    });

    //// ТОЛЬКО ДЛЯ СТРАНИЦЫ main

    if (page == 'main') {

        // карусель
        const carousel = {
            wrapper: '.slider__wrapper',
            left: '.arrow_left',
            right: '.arrow_right',
            central: true
        };
        const exampleCarousel = new Carousel(carousel);

        // отзывы
        const mainquestionsWrapper = document.querySelector('.mainquestions__wrapper'),
            mainquestionsItems = document.querySelectorAll('.mainquestions__item');


        function delClassInCollection(collection, className) { // удаляет класс className во всей коллекции collection
            collection.forEach(element => {
                element.classList.remove(className);
            });
        }

        // delClassInCollection(mainquestionsItems, 'mainquestions__item-active');

        mainquestionsWrapper.addEventListener('click', item => {
            const closest = item.target.closest('.mainquestions__item');

            if (closest) {
                if (closest.classList.contains('mainquestions__item-active')) {
                    delClassInCollection(mainquestionsItems, 'mainquestions__item-active');
                } else {
                    delClassInCollection(mainquestionsItems, 'mainquestions__item-active');
                    closest.classList.add('mainquestions__item-active');
                }
            } else {
                delClassInCollection(mainquestionsItems, 'mainquestions__item-active');
            }
        });
    };

    //// ТОЛЬКО ДЛЯ СТРАНИЦЫ ABOUT

    if (page == 'about') {
        // карусель
        const carousel = {
            wrapper: '.aboutawards__slider',
            left: '.aboutawards__arrows-left',
            right: '.aboutawards__arrows-right',
            central: true
        };
        new Carousel(carousel);
    }

    //// ТОЛЬКО ДЛЯ СТРАНИЦЫ ACADEMICS

    if (page == 'academics') {
        // карусель 1
        const dataClassrooms = {
            wrapper: '.academicsgallery__classrooms-slider',
            prev: '.academicsgallery__classrooms-left',
            next: '.academicsgallery__classrooms-right'
        };

        // карусель 2
        const dataLibrary = {
            wrapper: '.academicsgallery__library-slider',
            prev: '.academicsgallery__library-left',
            next: '.academicsgallery__library-right'
        }

        // карусель 3
        const dataScience = {
            wrapper: '.academicsgallery__science-slider',
            prev: '.academicsgallery__science-left',
            next: '.academicsgallery__science-right'
        }

        // карусель 4
        const dataComputer = {
            wrapper: '.academicsgallery__computer-slider',
            prev: '.academicsgallery__computer-left',
            next: '.academicsgallery__computer-right'
        }

        // карусель 5
        const dataNature = {
            wrapper: '.academicsgallery__nature-slider',
            prev: '.academicsgallery__nature-left',
            next: '.academicsgallery__nature-right'
        }

        new Slider(dataClassrooms);
        new Slider(dataLibrary);
        new Slider(dataScience);
        new Slider(dataComputer);
        new Slider(dataNature);

        // tabs
        const tabs = document.querySelectorAll('.academicsgallery__tab'),
            items = document.querySelectorAll('[data-item]');

        function setTabItem(i) {
            items.forEach((it, j) => {
                (i - 1 !== j && i) ? it.style.display = 'none' : it.style.removeProperty('display');

            });
            tabs.forEach((tab, j) => {
                i !== j ? tab.classList.remove('academicsgallery__tab-active') : tab.classList.add('academicsgallery__tab-active');
            });
        };

        tabs.forEach((el, i) => {
            el.addEventListener('click', (e) => {
                setTabItem(i);
            })
        })
    }

    //// ТОЛЬКО ДЛЯ СТРАНИЦЫ contact

    if (page == 'contact') {
        const form = document.querySelector('.contactform__form'),
            inputs = form.querySelectorAll('.contactform__form-required');

        // выбор программы из списка
        const comboBox = form.querySelector('#interest'),
            comboList = form.querySelector('ul');
        comboBox.addEventListener('click', () => {
            comboList.style.display === 'block' ? comboList.style.removeProperty('display') : comboList.style.display = 'block';
        });

        comboList.querySelectorAll('li').forEach((item) => {
            item.addEventListener('click', (e) => {
                comboBox.value = e.target.innerText;
                comboList.style.removeProperty('display')
            });
        });

        // отправка формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValidForm = true;

            inputs.forEach((item) => {
                const itemInput = item.querySelector('input');
                // убираем ошибку при клике на input
                itemInput.addEventListener('click', () => {
                    item.classList.remove('contactform__form-error');
                });

                if (!itemInput.validity.valid) {
                    item.classList.add('contactform__form-error');
                    isValidForm = false;
                }
            });

            if (!isValidForm) return;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log(data);
            alert('Data sent:\n' + JSON.stringify(data, null, 2));
        })
    }
});


