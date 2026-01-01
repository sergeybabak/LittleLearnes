import '../sass/style.scss';
import Carousel from "./carousel.js";

document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;  // текущая страница

    //// СКРИПТЫ ДЛЯ ВСЕХ СТРАНИЦ

    //// включаем возможность transition
    window.addEventListener('load', () => {
        if (document.body.classList.contains('preload')) document.body.classList.remove('preload');
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

});
