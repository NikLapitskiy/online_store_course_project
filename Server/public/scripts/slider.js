/* Устанавливаем стартовый индекс слайда по умолчанию: */
let slideIndex = 1;
/* Функция устанавливает первый слайд на все карточки: */
setFirstSlide();

/* Увеличиваем индекс на 1 — показываем следующий слайд: */
function nextSlide() {
    showSlides(slideIndex += 1);
}
/* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
function previousSlide() {
    showSlides(slideIndex -= 1);
}
/* Устанавливаем текущий слайд: */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
/* Функция перелистывания: */
function showSlides(n) {
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам для выбранной карточки: */
    let parent = document.querySelector('.product-slider:hover, .targetProduct-slider:hover, .basket-product-slider:hover');
    let slides = parent.querySelectorAll(".product-slider-item, .targetProduct-slider-item, .basket-product-slider-item");

    /* Проверяем количество слайдов: */
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    /* Проходим по каждому слайду в цикле for: */
    for (let slide of slides) {
        slide.style.display = "none";
    }
    /* Делаем элемент блочным: */
    slides[slideIndex - 1].style.display = "block";
    
}
function setFirstSlide() {
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
    let parent = document.querySelectorAll('.product-slider, .targetProduct-slider, .basket-product-slider');
    let slides = []
    for(let i = 0; i < parent.length; i++){
        slides = parent[i].querySelectorAll(".product-slider-item, .targetProduct-slider-item, .basket-product-slider-item");
        /* Проходим по каждому слайду в цикле for: */
        for (let slide of slides) {
            slide.style.display = "none";
        }
        // /* Делаем элемент блочным: */
        slides[slideIndex - 1].style.display = "block";
    }
}