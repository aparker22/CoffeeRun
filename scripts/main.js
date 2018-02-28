var coffeeOrders = [];
var form = document.querySelector('body > section > div > div > form');
var orderCount = Number(localStorage.getItem('Counter'));

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var order = {'Coffee': form.coffee.value, 'Email': form.emailAddress.value,
    'Size': form.size.value, 'Flavor': form.flavor.value, 'Strength': form.strength.value
    };
    var orderJSON = JSON.stringify(order);
    coffeeOrders.push(order);
    localStorage.setItem(`Order ${orderCount}`, orderJSON);
    localStorage.setItem('Counter', orderCount)
    var ul = document.querySelector('body > footer > ul')
    var order1 = document.createElement('li');
    order1.appendChild(document.createTextNode(orderJSON));
    ul.appendChild(order1);
    orderCount ++;
    form.reset();
})

var reset = document.querySelector('body > section > div > div > form > button:nth-child(9)');

reset.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.clear();
    var ul = document.querySelector('body > footer > ul');
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    orderCount = 1;
})

var load = document.querySelector('body > section > div > div > form > button:nth-child(10)');

load.addEventListener('click', function(event) {
    event.preventDefault();
    var ul = document.querySelector('body > footer > ul')
    var order1 = document.createElement('li');
    var text = localStorage.getItem('Order');
    order1.appendChild(document.createTextNode(text));
    ul.appendChild(order1);
})



