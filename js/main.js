function updateBasketCounter(count) {
    const counter = document.querySelector('.header__basket-counter');
    counter.textContent = count;
    
    counter.classList.add('animate');
    setTimeout(() => counter.classList.remove('animate'), 300);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const currentCount = parseInt(document.querySelector('.header__basket-counter').textContent);
        updateBasketCounter(currentCount + 1);
    });
});


