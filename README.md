# kryptokrona block explorer
Block explorer for kryptokrona, a CryptoNote based cryptocurrency.

#### Installation

1) It takes data from the daemon kryptokrona. It should be accessible from the Internet. Run kryptokrona with open port as follows:
```bash
./kryptokrona --enable-cors="*" --enable-blockexplorer --rpc-bind-ip=0.0.0.0 --rpc-bind-port=11898
```
2) Just upload to your website and change 'api' variable in config.js to point to your daemon.


### Note

A lot of this code is from the great Karbovanets/Karbowanec-Blockchain-Explorer
