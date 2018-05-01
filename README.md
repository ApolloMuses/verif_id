# verif_id with Bluezelle Decentralized Database


This is a simple CRUD app that utilizes the Bluzelle's decentralized database. 


### Try it out
You can try it out here: 

The following tools were used:
1. [Bluezelle's js library](https://github.com/bluzelle/swarmclient-js)

Documentation: https://bluzelle.github.io/api/#create


### What it looks like

<p align="center">
	<img src="./screenshots/ss.gif" width="300" height="700"/>
</p>

[Check it out here on Expo:](https://expo.io/@kh42/verif_id)

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
