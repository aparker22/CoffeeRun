var coffeeOrders = [];
var form = document.querySelector('body > section > div > div > form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    coffeeOrders.push({'Coffee': form.coffee.value, 'Email': form.emailAddress.value,
    'Size': form.size.value, 'Flavor': form.flavor.value, 'Strength': form.strength.value
    });
    form.reset();
})
