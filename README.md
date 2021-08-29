# rapid-structs
A tiny minimalistic express project generator which quickens the process of boiler plate generation by introducing an easy to use syntax!

# Example of the syntax
```
/*
 /api
    /v1[ignore:true] 
      /cards[alias:playToo,middleware:card,middleware:card2]
      /fetchInfo 
      /countDown 
    /v2[ignore:true]
      /lodash 
      /vuejs
      /reactjs
      /play       
```