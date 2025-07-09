document.addEventListener('DOMContentLoaded', function() {
    // Элементы корзины
    const basketCounter = document.querySelector('.header__basket-counter');
    
    // Корзина всегда пустая при загрузке
    let basketItems = [];
    let totalCount = 0;
    
    // Инициализация счётчика (скрываем если пусто)
    updateBasketCounter();

    // Функция обновления счётчика
    function updateBasketCounter() {
        basketCounter.textContent = totalCount;
        
        // Показываем или скрываем счётчик
        if (totalCount > 0) {
            basketCounter.style.display = 'flex'; // или 'block' в зависимости от ваших стилей
        } else {
            basketCounter.style.display = 'none';
        }
        
        // Анимация при изменении
        if (totalCount > 0) {
            basketCounter.classList.add('animate');
            setTimeout(() => basketCounter.classList.remove('animate'), 300);
        }
    }

    // Обработчики для товаров
    document.querySelectorAll('.category__product-card').forEach(card => {
        const quantityEl = card.querySelector('.category__products-quantity-value');
        const addBtn = card.querySelector('.add-to-cart');
        const decreaseBtn = card.querySelector('#decrease');
        const increaseBtn = card.querySelector('#increase');
        let quantity = 1;

        // Уменьшение количества
        decreaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (quantity > 1) {
                quantity--;
                quantityEl.textContent = quantity;
            }
        });

        // Увеличение количества
        increaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            quantity++;
            quantityEl.textContent = quantity;
        });

        // Добавление в корзину (только для текущей сессии)
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                id: card.dataset.id || Date.now(),
                name: card.querySelector('.category__product-title').textContent,
                price: parseInt(card.querySelector('.category__product-price-current').textContent.replace(/\D/g, '')),
                quantity: quantity
            };

            // Обновляем корзину (только в памяти)
            const existingItem = basketItems.find(item => item.id == product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                basketItems.push(product);
            }

            // Обновляем счётчик
            totalCount += quantity;
            updateBasketCounter();

            // Сбрасываем количество
            quantity = 1;
            quantityEl.textContent = quantity;
            
        });
    });
});