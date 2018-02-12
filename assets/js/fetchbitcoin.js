//////////////////////////////////////////////////
//
//		Парсинг цены биткоина (BTC) в долларах (USD)
//		Источник данных: https://coinmarketcap.com
//
//////////////////////////////////////////////////
//
//		Переменные:
//		price_bitcoin => хранит цену биткоина
//		push_price_bitcoin => создает объект, который хранит содержимое блока price_bitcoin
//		percent_bitcoin => хранит процент изменения цены биткоина за последний час
//		push_percent_bitcoin => создает объект, который хранит содержимое блока percent_bitcoin
//
//////////////////////////////////////////////////
fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
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
		// Парсинг цены в долларах из источника
		var price_bitcoin = Math.round(data[0].price_usd),
			push_price_bitcoin = document.getElementById('price_bitcoin'),
			// Парсинг изменения цены в процентах из источника
			percent_bitcoin = data[0].percent_change_24h,
			push_percent_bitcoin = document.getElementById('percent_bitcoin');
		// Вывод цены биткоина в div-блок
		push_price_bitcoin.textContent = '$' + price_bitcoin;
		// Вывод процента изменения цены биткоина в div-блок
		if (percent_bitcoin > 0) {
			// Если цена биткоина повысилась, то отображается зеленым цветом
			push_percent_bitcoin.innerHTML = '<span class="green">+' + percent_bitcoin + '%</span>';
		} else if (percent_bitcoin < 0) {
			// Если цена биткоина понизилась, то отображается красным цветом
			push_percent_bitcoin.innerHTML = '<span class="red">' + percent_bitcoin + '%</span>';
		} else {
			// Если цена биткоина осталась прежней, то отображается белым цветом
			push_percent_bitcoin.textContent = percent_bitcoin + '%';
		}
	})
	.catch(error => {
		// Вывод в консоль типа ошибки
		console.log('error is', error);
		// Активация оверлея с ошибкой
		document.getElementById('overlay_error').style.display = "block";
	});
