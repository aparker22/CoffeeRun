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
    var button = document.createElement('button')
    button.appendChild(document.createTextNode('Completed'))
    button.setAttribute('name', 'complete');
    button.setAttribute('value', 'Completed')
    button.addEventListener('click', removeOrder);
    order1.appendChild(button);
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
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    var order1 = document.createElement('li');
    if (localStorage.length === 0) {
        order1.appendChild(document.createTextNode('No Orders to Display'));
        ul.appendChild(order1);
    } else {
        for (var i=1; i<localStorage.length; i++) {
           var text = localStorage.getItem(localStorage.key(i));
           order1.appendChild(document.createTextNode(text));
           var button = document.createElement('button')
           button.appendChild(document.createTextNode('Completed'))
           button.setAttribute('name', 'complete');
           button.setAttribute('value', 'Completed')
           button.addEventListener('click', removeOrder);
           order1.appendChild(button);
           ul.appendChild(order1);
        }
    }
})

var removeOrder = function (e) {
    target = e.target;
    target = target.parentElement;
    target.remove();
}



