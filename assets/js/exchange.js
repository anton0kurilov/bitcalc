// ПЕРЕВОД РУБЛЕЙ В БИТКОИНЫ
function to_bitcoin() {
	// Получение данных, введенных в инпут
	var get_input_bitcoin = document.getElementById('input_rub').value,
		// Получение цены биткоина
		get_price_bitcoin = document.getElementById('price_bitcoin').textContent,
		// Получение цены доллара
		get_price_rub = document.getElementById('price_rub').textContent,
		result_bitcoin,
		// Маска для игнорирования replace
		irub = '₽',
		push_result_bitcoin = document.getElementById('input_to_bitcoin');
	// Формула расчета конвертации
	result_bitcoin = (get_input_bitcoin / parseInt(get_price_rub.replace(irub, ''))) / parseInt(get_price_bitcoin.replace(/\D+/g, ''));
	// Вывод результата в инпут
	push_result_bitcoin.value = result_bitcoin.toFixed(15);
}
// ПЕРЕВОД БИТКОИНОВ В РУБЛИ
function to_rub() {
	// Получение данных, введенных в инпут
	var get_input_rub = document.getElementById('input_bitcoin').value,
		push_result_rub = document.getElementById('input_to_rub'),
		// Получение цены биткоина
		get_price_bitcoin = document.getElementById('price_bitcoin').textContent,
		// Получение цены рубля
		get_price_rub = document.getElementById('price_rub').textContent,
		// Маска для игнорирования replace
		irub = '₽',
		result_rub;
	// Формула расчета конвертации
	result_rub = get_input_rub * parseInt(get_price_bitcoin.replace(/\D+/g, '')) * parseFloat(get_price_rub.replace(irub, ''));
	// Вывод результата в инпут
	push_result_rub.value = result_rub.toFixed(15);
}
