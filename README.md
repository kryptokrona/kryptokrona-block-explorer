# TurtleCoin-Blockchain-Explorer
Block explorer for TurtleCoin CryptoNote based cryptocurrency.

#### Installation

1) It takes data from daemon karbowanecd. It should be accessible from the Internet. Run karbowanecd with open port as follows:
```bash
./turtlecoind --restricted-rpc --enable-cors=* --enable-block_explorer --rpc-bind-ip=0.0.0.0 --rpc-bind-port=32348
```
2) Just upload to your website and change 'api' variable in config.js to point to your daemon.


### Created/Mod with HEART by devopsralf
### Donate: [TRTL] TRTLv2RCPuD7AaaVpQkRPF59MMLx5WW3qFxwJz4Doy7dHhNA6UuQjEpLL3rpUQS4RXdQn8fb4P1XC3K62GeJjGgG8DP9LNaTrNL