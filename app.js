'use strict';

//get libraries
const express = require('express');
var queue = require('express-queue');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

//create express web-app
const app = express();
const invoke = require('./invokeNetwork');
const query = require('./queryNetwork');
var _time = "T00:00:00Z";

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

app.use(bodyParser.json());

//Using queue middleware
app.use(queue({ activeLimit: 30, queuedLimit: -1 }));

//run app on port
app.listen(port, function () {
  console.log('app running on port: %d', port);
});

//-------------------------------------------------------------
//----------------------  POST API'S    -----------------------
//-------------------------------------------------------------

app.post('/api/addcustomer', async function (req, res) {

  var request = {
    chaincodeId: 'supplychain',
    fcn: 'addCustomer',
    args: [
      req.body.customerID,
      req.body.name,
      req.body.address,
      req.body.location,
      req.body.city,
      req.body.zip,
      req.body.businessPhone
    ]
  };

  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The Customer with ID: "+req.body.customerID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});

app.post('/api/addproducts', async function (req, res) {

  var request = {
    chaincodeId: 'supplychain',
    fcn: 'addProduct',
    args: [
      req.body.productID,
      req.body.name,
      req.body.productType,
      req.body.size,
      req.body.price,
      req.body.quantity,
      req.body.company
    ]
  };

  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The Product with ID: "+req.body.productID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});
app.post('/api/addorders', async function (req, res) {

  var request = {
    chaincodeId: 'supplychain',
    fcn: 'addOrder',
    args: [
      req.body.orderID,
      req.body.fk_productID,
      req.body.fk_customerID,
      req.body.shippingAddress,
      req.body.quantity,
      req.body.totalPrice,
      req.body.dateOfOrder + _time,
      req.body.dateofReceiving + _time
    ]
  };

  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The Order with ID: "+req.body.orderID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});
app.post('/api/addshippingstatus', async function (req, res) {

  var request = {
    chaincodeId: 'supplychain',
    fcn: 'addShippingStatus',
    args: [
      req.body.shippingID,
      req.body.fk_orderID,
      req.body.currentLocation,
      req.body.time_stamp + _time
    ]
  };

  let response = await invoke.invokeCreate(request);
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: "The Customer with ID: "+req.body.shippingID+ " is stored in the blockchain with " +response.message  });
    else
    res.status(response.status).send({ message: response.message});
  }
});

app.get('/api/querycustomer', async function (req, res) {

  const request = {
    chaincodeId: 'supplychain',
    fcn: 'queryCustomer',
    args: [req.query.customerID]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: JSON.parse(response.message) });
    else
    res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/queryproduct', async function (req, res) {

  const request = {
    chaincodeId: 'supplychain',
    fcn: 'queryProduct',
    args: [req.query.productID]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: JSON.parse(response.message) });
    else
    res.status(response.status).send({ message: response.message });
  }
});

app.get('/api/queryorder', async function (req, res) {

  const request = {
    chaincodeId: 'supplychain',
    fcn: 'queryOrder',
    args: [req.query.orderID]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: JSON.parse(response.message) });
    else
    res.status(response.status).send({ message: response.message });
  }
});


app.get('/api/queryshippingstatus', async function (req, res) {

  const request = {
    chaincodeId: 'supplychain',
    fcn: 'queryShippingStatus',
    args: [req.query.shippingID]
  };
  let response = await query.invokeQuery(request)
  if (response) {
    if(response.status == 200)
    res.status(response.status).send({ message: JSON.parse(response.message) });
    else
    res.status(response.status).send({ message: response.message });
  }
});