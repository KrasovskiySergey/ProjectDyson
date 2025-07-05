// Открытие/закрытие dropdown
document.querySelector('.sorting-header').addEventListener('click', function () {
    this.closest('.category__sorting').classList.toggle('active');
});

// Закрытие при клике вне dropdown
document.addEventListener('click', function (e) {
    const dropdown = document.querySelector('.category__sorting');
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Обработка выбора варианта
document.querySelectorAll('.sorting-option input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            // Снимаем выделение с других чекбоксов
            document.querySelectorAll('.sorting-option input').forEach(cb => {
                if (cb !== this) cb.checked = false;
            });

            // Обновляем заголовок
            const labelText = this.nextElementSibling.textContent;
            document.querySelector('.sorting-header h3').textContent = labelText;
        }
    });
});