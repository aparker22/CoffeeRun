///defining global variables

var form = document.querySelector('body > section > div > div > form');
var serverURL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/';


 //this makes it prettier for display purposes
 var makeItPretty = function(text) {
    var textJSON = JSON.stringify(text)
    textJSON = textJSON.replace(/"/g, '');
    textJSON = textJSON.replace(/,/g, ',  ');
    textJSON = textJSON.replace(/:/g, ':  ');
    textJSON = textJSON.replace(/}/g, '');
    textJSON = textJSON.replace(/{/g, '');
    return textJSON;
};

//function for creating the li that will be appended to the DOM
var createLiElement = function (order) {
    var orderLI = document.createElement('li');
    orderLI.textContent = order;
    var button = document.createElement('button')
    button.textContent = 'Completed';
    button.setAttribute('name', 'complete');
    button.addEventListener('click', removeOrder);
    orderLI.appendChild(button);
    return orderLI;
};

// function to create order values in readable format
var createOrderValues = function (form) {
    var order = {'Email': form.emailAddress.value, 'Coffee': form.coffee.value,
    'Size': form.size.value, 'Flavor': form.flavor.value, 'Strength': form.strength.value
    }; 
    return order;
};

var createServerOrder = function (form) {
    var serverOrder = {'coffee': form.coffee.value, 'emailAddress': form.emailAddress.value,
    'size': form.size.value, 'flavor': form.flavor.value, 'strength': form.strength.value
    };
    serverOrder = JSON.stringify(serverOrder);
    return serverOrder;
};

var createLoadOrder = function (text) {
    var order = {'Email': text.emailAddress, 'Coffee': text.coffee, 
    'Size': text.size, 'Flavor': text.flavor, 'Strength': text.strength
    };
    return order;
};


//function for sending orders to the server 

var submitOrderToServer = function(serverURL, serverOrder) {
    fetch(serverURL, {
    method: 'POST',
    body: serverOrder,
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});
};


//(ajax method, no longer needed)
// var submitOrderToServer = function (serverURL, serverOrder){
//     $.post(serverURL, serverOrder, function(data){  
//     });
// };


//defining function for initially submitting orders
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var order = createOrderValues(form);  
    var serverOrder = createServerOrder(form); ///format the order to be sent to the server
    var prettyOrder = makeItPretty(order); //format the order to be rendered on the screen
    submitOrderToServer(serverURL, serverOrder);

    //appends new orders to the page with a 'completed button'
    var ul = document.querySelector('body > footer > ul')
    var finalOrder = createLiElement(prettyOrder);
    ul.appendChild(finalOrder);
    form.reset();
});


//variable for the reset button
var reset = document.querySelector('body > section > div > div > form > button:nth-child(9)');

//function for 'resetting' or clearing the page - does not remove items from the server
reset.addEventListener('click', function(event) {
    clearingThePage(event);
});


//variable for the load button
var load = document.querySelector('body > section > div > div > form > button:nth-child(10)');



//function for loading items from the server
load.addEventListener('click', function(event) {
    clearingThePage(event);
    fetch(serverURL)
        .then(function (response) {
            return response.json();
            })
        .then(function(data) {
            return (Object.values(data))
        })
        .then(function(data) {
            for (var i=1; i<data.length; i++) {
            var text = data[i];
            text = JSON.stringify(text);
            text=JSON.parse(text);
            var order = createLoadOrder(text);
            var prettyOrder = makeItPretty(order);
            var finalOrder = createLiElement(prettyOrder);
            var ul = document.querySelector('body > footer > ul');
            ul.appendChild(finalOrder);
            }
        })

});


//function for marking orders as complete and removing them from the server completely
var removeOrder = function (e) {
    var target = (e.target).parentElement;
    console.log(target);
    target.classList.add('blue')
    setTimeout(function () {
        removeFromPage(e);
    }, 2000);
    var email = completedOrderEmail(target);
    var deleteURL = serverURL + email;
    $.ajax({
        url: deleteURL,
        method: 'DELETE',
      })
};


//function to remove the completed order from the page
var removeFromPage = function (e) {
    var target = (e.target).parentElement;
    target.remove();
    return target;
};

//function to identify the email address of the completed order
var completedOrderEmail = function (target) {
    var text = (target.firstChild).textContent;
    text = JSON.stringify(text);
    text = text.replace(/,/g, '');
    text = text.split(" ");
    email = text[2];
    return email;
};


//clears the page does not remove items from server
var clearingThePage = function (event) {
    event.preventDefault();
    var ul = document.querySelector('body > footer > ul');
    while (ul.firstChild) ul.removeChild(ul.firstChild);
};




