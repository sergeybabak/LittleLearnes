import '../sass/style.scss';
import Carousel from "./carousel.js";

document.addEventListener("DOMContentLoaded", () => {
    //// включаем возможность transition
    window.addEventListener('load', () => {
        if (document.body.classList.contains('preload')) document.body.classList.remove('preload');
    });

    // меню
    const navbar = document.querySelector('.navbar__wrapper'),
        hamburger = document.querySelector('.hamburger'),
        overlay = document.querySelector('.olerlay');

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

        if(closest) {
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

});
