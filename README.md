# verif_id with Bluezelle Decentralized Database


This is a simple CRUD app that utilizes the Bluzelle's decentralized database. 

You can try it out here:

The following tools were used:
1. [Bluezelle's js library](https://github.com/bluzelle/swarmclient-js)



### What it looks like

<p align="center">
	<img src="./screenshots/ss.mov"/>
</p>

[Check it out here in production.](https://translink-79b18.firebaseapp.com/)

### Try it out

Clone or download the repository and run:
```ruby
npm install
```


### Caveats

You may have to go into the node_modules and find the bluezelle/communications.js and comment out this line:

```ruby
//const assert = require('assert');
```



### TODO

- You can encrypt and decrypt the data written to the db using the forge library that comes preinstalled already. 

### License
MIT
