# Supplychain-Node

SupplyChain Example is a version of the Hyperledger Fabric sample created by Devprovider.

This repository can be only used after you deployed and ran the supplychain chaincode on hyperledger fabric v1.3 from https://github.com/DevProvider/Supplychain

Once you have your fabric and chaincode ready by following the above Repository. You can start below.
## Manual Build and Run
```
git clone the repository and copy all of its files into the Supplychain folder in the fabric-samples folder from the Supplychain repo you downloaded earlier.
```
Once the files are in the right directory perform the steps below..

```
$ npm install
```
after a successfull npm install run

```
$node enrollAdmin.js
```

then run 
```
$ node registerUser.js
```

In the end run the APIs by 
```
$ node app.js
```

Now that your node file is running. Use the given postman file in the repository to use the APIs.
