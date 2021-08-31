# rapid-structs
A tiny minimalistic express project generator that quickens the process of boilerplate generation by introducing an easy-to-use syntax!

# Example of the syntax
```
/*
 /api
    /v1[ignore:true,middleware:crap] 
      /cards[alias:playToo,middleware:card,middleware:card2]
      /fetchInfo 
      /countDown 
    /v2[ignore:true]
      /lodash[verb:post] 
      /vuejs
      /reactjs
      /play       
/login
     /playThis[alias:taylorswift,middleware:rate-limit]       
```