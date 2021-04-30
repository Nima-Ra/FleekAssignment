# Fleek Internet Computer Assignment

A web application that makes API calls and receives cycles as payment.

## Written Questions

### Q1: Describe what is Internet Computer and how it differs from Ethereum?
When Ethereum was introduced to the world in 2015, it was a game changer and everyone could see that immediately. The same thing is happening with Internet Computer right now, but what are the differences between IC and ETH?
One of the most important differences is the faster transaction time that IC offers. Every transaction in Internet Computer takes less than ten seconds, on the other hand every transaction in Ethereum takes about 12 minutes to complete.
IC also offers cheaper storage. One GB of storage in IC takes at most a few dollars while in ETH, the price is millions of dollars at this moment.
GAS price: In Ethereum, the caller of the contract should pay for the GAS price where as in the IC the canister should already contain cycles.
Ethereum uses Solidity while IC uses WASM. The advantage that IC has here is that you can compile almost anything to IC, the same cannot be said about Solidity.
Among the differences between IC and ETH, these four came to my mind.

### Q2: How would you improve this assignment for a production ready service?
If the server fails, the queue won't be stored and the recovery is not possible. So to avoid that scenario, the idea of using Redis comes to mind. There is also the idea of Two Phase flush which makes sure the queue is saved and the data is transferred completely.
The fee can be a variable. Right now the fee is set to be 500000000000.
If there is an invalid URL, the post request will be made. To avoid the possiblity of making a post request to an invalid address, we can check each URL and make sure it's a valid one.


If you want to start working on your project right away, you might want to try the following commands:

```bash
cd assignment/
dfx help
dfx config --help
```

Special thanks to Davidp94 whose ICQS repository helped with the part in which the application makes post requests:
https://github.com/davidp94/icqs-demo/
