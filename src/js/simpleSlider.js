// Структура верстки должна быть такая:

{/* <div class="wrapper">
        <div class="track">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
</div> */}

// Пример вызова:

{/*import Slider from './simpleSlider';

const data = {
    wrapper: '.slider',
    prev: '.slider__prev',
    next: '.slider__next'
}

const carusel1 = new Slider(data);*/}

class Slider {
    constructor(data) {
        // Проверка обязательных параметров
        if (!data?.wrapper || !data?.prev || !data?.next) {
            console.error("Slider Error: параметры 'wrapper', 'left' и 'right' обязательны для заполнения в передаваемом объекте.");
            return;
        };
        this.slider = document.querySelector(data.wrapper);
        this.prev = document.querySelector(data.prev);
        this.next = document.querySelector(data.next);
        this.interval = data.interval || 0.5;

        this.track = this.slider.firstElementChild;
        this.setState();
        this.setControl();
        this.isAnimating = false;
    }

    state = {
        sliderWidth: 0,
        sliderStep: 0
    }

    setState() {
        this.state.sliderWidth = this.slider.offsetWidth;

        const items = this.track.children;
        const styles = getComputedStyle(this.track);
        const gap = parseFloat(styles.columnGap || styles.gap || 0);

        this.state.sliderStep = items[0].offsetWidth + gap;
    }

    moveItems(direct) {
        if (this.isAnimating) return;

        this.isAnimating = true;

        if (direct === 'prev') {
            this.track.style.transition = `transform ${this.interval}s ease`;
            this.track.style.transform = `translateX(-${this.state.sliderStep}px)`;
            setTimeout(() => {
                this.track.style.transition = 'none';
                this.track.append(this.track.firstElementChild);
                this.track.style.transform = 'translateX(0)';
                this.isAnimating = false;
            }, this.interval * 1000);
        } else {
            this.track.style.transition = 'none';
            this.track.prepend(this.track.lastElementChild);
            this.track.style.transform = `translateX(-${this.state.sliderStep}px)`;
            this.track.offsetHeight;
            this.track.style.transition = `transform ${this.interval}s ease`;
            this.track.style.transform = 'translateX(0)';
            setTimeout(() => {
                this.isAnimating = false;
            }, this.interval * 1000);
        }
    };

    setControl() {
        this.prev.addEventListener('click', () => {
            if (this.slider.offsetWidth !== this.state.sliderWidth)  this.setState();
            this.moveItems('prev');
        });
        this.next.addEventListener('click', () => {
            if (this.slider.offsetWidth !== this.state.sliderWidth)  this.setState();
            this.moveItems('next');
        });
    };

}

export default Slider;