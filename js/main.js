document.addEventListener('DOMContentLoaded', function() {
    // Элементы корзины
    const basketCounter = document.querySelector('.header__basket-counter');
    
    // Корзина всегда пустая при загрузке
    let basketItems = [];
    let totalCount = 0;
    basketCounter.textContent = totalCount;

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
            basketCounter.textContent = totalCount;
            basketCounter.classList.add('animate');
            setTimeout(() => basketCounter.classList.remove('animate'), 300);

            // Сбрасываем количество
            quantity = 1;
            quantityEl.textContent = quantity;
            
            alert(`Добавлено ${product.quantity} ${product.name} в корзину`);
        });
    });

    // Показ корзины (только текущей сессии)
    document.querySelector('.header__basket').addEventListener('click', function(e) {
        e.preventDefault();
        
        if (basketItems.length === 0) {
            alert('Корзина пуста');
            return;
        }
        
        let message = 'Ваша корзина (будет очищена при обновлении):\n';
        let total = 0;
        
        basketItems.forEach(item => {
            message += `- ${item.name}: ${item.quantity} × ${item.price.toLocaleString()} ₽\n`;
            total += item.price * item.quantity;
        });
        
        message += `\nИтого: ${total.toLocaleString()} ₽`;
        alert(message);
    });
});
