//////////////////////////////////////////////////
//
//		Парсинг цены доллара (USD) в рублях (RUB)
//		Источник данных: https://www.cbr-xml-daily.ru
//
//////////////////////////////////////////////////
//
//		Переменные:
//		price_rub => хранит цену доллара
//		push_price_rub => создает объект, который хранит содержимое блока price_rub
//		parse_percent_rub => хранит процент изменения цены доллара за последние сутки
//		percent_rub => высчитывает процент изменения цены доллара
//		push_percent_rub => создает объект, который хранит содержимое блока percent_rub
//
//////////////////////////////////////////////////
fetch('https://www.cbr-xml-daily.ru/daily_json.js')
	.then(response => {
		if (response.ok) {
			// Если парсинг прошел успешно, то возвращает JSON-содержимое
			return response.json()
		} else {
			// Если парсинг прошел неуспешно, то возвращает обещание
			return Promise.reject('something went wrong!')
		}
	})
	.then(data => {
		var price_rub = data.Valute.USD.Value.toFixed(2),
			parse_percent_rub = data.Valute.USD.Previous,
			percent_rub = (parse_percent_rub - price_rub) / parse_percent_rub * 100,
			push_price_rub = document.getElementById('price_rub'),
			push_percent_rub = document.getElementById('percent_rub');
		if (percent_rub.toFixed(2) > 0) {
			// Если цена доллара повысилась, то отображается зеленым цветом
			push_percent_rub.innerHTML = '<span class="green">+' + percent_rub.toFixed(2) + '%</span>';
		} else if (percent_rub.toFixed(2) < 0) {
			// Если цена доллара понизилась, то отображается красным цветом
			push_percent_rub.innerHTML = '<span class="red">' + percent_rub.toFixed(2) + '%</span>';
		} else {
			// Если цена доллара осталась прежней, то отображается белым цветом
			push_percent_rub.textContent = percent_rub.toFixed(2) + '%';
		}
		push_price_rub.textContent = '₽' + price_rub;
	})
	.catch(error => {
		// Вывод в консоль типа ошибки
		console.log('error is', error);
		// Активация оверлея с ошибкой
		document.getElementById('overlay_error').style.display = "block";
	});
