document.querySelector('.sorting-header').addEventListener('click', function () {
    this.closest('.category__sorting').classList.toggle('active');
});

// Закрытие при клике вне dropdown
document.addEventListener('click', function (e) {
    if (!e.target.closest('.category__sorting')) {
        document.querySelector('.category__sorting').classList.remove('active');
    }
});

// Обработка выбора варианта
document.querySelectorAll('.sorting-option input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        // Снимаем выделение с других чекбоксов
        if (this.checked) {
            document.querySelectorAll('.sorting-option input').forEach(cb => {
                if (cb !== this) cb.checked = false;
            });

            // Обновляем заголовок
            const labelText = this.nextElementSibling.nextElementSibling.textContent;
            document.querySelector('.sorting-header h3').textContent = labelText;
        }
    });
});