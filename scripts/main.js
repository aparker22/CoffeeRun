///defining global variables

var form = document.querySelector('body > section > div > div > form');
var serverURL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/';


 //this makes it prettier for display purposes
var orderDisplay = function(orderList) {
    addOrderListToTable(orderList);
};

var addOrderListToTable = function(orderList) {
    var searchDiv = document.querySelector('.load-results')
    var table = document.createElement('table');
    var headerRow = table.insertRow(-1);
    var headerNameCell = document.createElement('TH');
    headerNameCell.textContent = 'Email Address';
    headerRow.appendChild(headerNameCell);


    var headerAddressCell = document.createElement('TH');
    headerAddressCell.textContent = 'Coffee';
    headerRow.appendChild(headerAddressCell);

    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'Size';
    headerRow.appendChild(headerRatingCell);
    searchDiv.appendChild(table);

    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'Flavor';
    headerRow.appendChild(headerRatingCell);
    searchDiv.appendChild(table);

    var headerRatingCell = document.createElement('TH');
    headerRatingCell.textContent = 'Strength';
    headerRow.appendChild(headerRatingCell);
    searchDiv.appendChild(table);
    
    orderList.forEach(function(order) {
        var row = table.insertRow();
        var emailCell = row.insertCell(0);
        emailCell.textContent = order.Email;
        var coffeeCell = row.insertCell(1);
        coffeeCell.textContent = order.Coffee;
        var sizeCell = row.insertCell(2);
        sizeCell.textContent = order.Size;
        var flavorCell = row.insertCell(3);
        flavorCell.textContent = order.Flavor;
        var strengthCell = row.insertCell(4);
        strengthCell.textContent = order.Strength;
        var buttonCell = row.insertCell(5);
        var button = createButtonElement();
        buttonCell.appendChild(button);

    });
    searchDiv.appendChild(table);
}

//function for creating the li that will be appended to the DOM
var createButtonElement = function () {
    var button = document.createElement('button')
    button.textContent = 'Completed';
    button.setAttribute('name', 'complete');
    button.addEventListener('click', removeOrder);
    return button;
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

//defining function for initially submitting orders
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var order = createOrderValues(form);  
    var orderList = [];
    var serverOrder = createServerOrder(form); ///format the order to be sent to the server
    submitOrderToServer(serverURL, serverOrder);
    orderList.push(order);
    orderDisplay(orderList);
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
    fetchOrders();
})
    
var fetchOrders = function() {
    fetch(serverURL)
        .then(function (response) {
            return response.json();
            })
        .then(function(data) {
            return (Object.values(data))
        })
        .then(function(data) {
            var orderList = data.map(function(obj) {
                var orderInformation = createLoadOrder(obj);
                return orderInformation;
            })
            return orderList;
            })
        .then(function(data) {
            orderDisplay(data)
        })
    }




//function for marking orders as complete and removing them from the server completely
var removeOrder = function (e) {
    var target = (e.target).parentElement.parentElement;
    console.log(target)
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
    var target = (e.target).parentElement.parentElement;
    target.remove();
    return target;
};

//function to identify the email address of the completed order
var completedOrderEmail = function (target) {
    var text = (target.firstChild).textContent;
    return text;
};


//clears the page does not remove items from server
var clearingThePage = function (event) {
    event.preventDefault();
    var searchDiv = document.querySelector('.load-results');
    while (searchDiv.firstChild) searchDiv.removeChild(searchDiv.firstChild);
};




