<img src="https://camo.githubusercontent.com/d344c9e18b69f96502f3bf61b0dedc1ca9603af3/68747470733a2f2f6b727970746f6b726f6e612e73652f77702d636f6e74656e742f75706c6f6164732f323031392f30372f786b722d6c6f676f2d626c61636b2d746578742e706e67">

Block explorer for Kryptokrona, a CryptoNote based cryptocurrency.

#### Installation

1) It takes data from the daemon kryptokrona. It should be accessible from the Internet. Run kryptokrona with open port as follows:
```bash
./kryptokrona --enable-cors="*" --enable-blockexplorer --rpc-bind-ip=0.0.0.0 --rpc-bind-port=11898
```
2) Just upload to your website and change 'api' variable in config.js to point to your daemon.


### Note

Powered by Turtle Blockchain Explorer v. 1.0.0, partially based on Cryptonote-universal-pool and Karbowanec-Blockchain-Explorer.

The style was redesigned by ux33 @ kryptokrona.
