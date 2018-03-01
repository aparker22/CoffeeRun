var coffeeOrders = [];
var form = document.querySelector('body > section > div > div > form');
var orderCount = Number(localStorage.getItem('Counter'));
var serverURL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders';

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var order = {'Coffee': form.coffee.value, 'Email': form.emailAddress.value,
    'Size': form.size.value, 'Flavor': form.flavor.value, 'Strength': form.strength.value
    };
    var orderJSON = JSON.stringify(order);
    orderJSON = orderJSON.replace(/"/g, '');
    orderJSON = orderJSON.replace(/,/g, ',  ');
    orderJSON = orderJSON.replace(/:/g, ':  ');
    orderJSON = orderJSON.replace(/}/g, '');
    orderJSON = orderJSON.replace(/{/g, '');
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
    var orders = [];
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    $.get(serverURL, function(data) {
        for (key in data) {
            orders.push(data[key]);
        }
        for (var i=1; i<orders.length; i++) {
            var text = orders[i];
            text = JSON.stringify(text);
            text=JSON.parse(text);
            var order = {'Email': text.emailAddress, 'Coffee': text.coffee, 
            'Size': text.size, 'Flavor': text.flavor, 'Strength': text.strength
            };
            var orderJSON = JSON.stringify(order);
            orderJSON = orderJSON.replace(/"/g, '');
            orderJSON = orderJSON.replace(/,/g, ',  ');
            orderJSON = orderJSON.replace(/:/g, ':  ');
            orderJSON = orderJSON.replace(/}/g, '');
            orderJSON = orderJSON.replace(/{/g, '');
            var order1 = document.createElement('li');
            order1.appendChild(document.createTextNode(orderJSON));
            var button = document.createElement('button')
            button.appendChild(document.createTextNode('Completed'))
            button.setAttribute('name', 'complete');
            button.setAttribute('value', 'Completed')
            button.addEventListener('click', removeOrder);
            order1.appendChild(button);
            ul.appendChild(order1);
        }
    });
});



    // //This is my code for loading local storage
    // if (localStorage.length === 0) {
    //     var order1 = document.createElement('li');
    //     order1.appendChild(document.createTextNode('No Orders to Display'));
    //     ul.appendChild(order1);
    // } else {
    //     for (var i=1; i<localStorage.length; i++) {
    //        var text = localStorage.getItem(localStorage.key(i));
    //        var order1 = document.createElement('li');
    //        order1.appendChild(document.createTextNode(text));
    //        var button = document.createElement('button')
    //        button.appendChild(document.createTextNode('Completed'))
    //        button.setAttribute('name', 'complete');
    //        button.setAttribute('value', 'Completed')
    //        button.addEventListener('click', removeOrder);
    //        order1.appendChild(button);
    //        ul.appendChild(order1);
    //     }
    // }

// })

var removeOrder = function (e) {
    target = e.target;
    target = target.parentElement;
    target.remove();
    orderCount --;
};





