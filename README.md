# CryptoLoteria

#### Deploy project on localhost

```bash
git clone https://github.com/manguilar22/loteria
cd loteria/
npm install 
npm start
```

#### Build docker image.

```bash 
docker build -t react:loteria -f Dockerfile .
```

#### Run docker image on localhost

```bash
docker run --name loteria-web3 REACT_APP_BOARD_CID=QmYLksYBwPxMgtTkKY1dbpFzu93X2wTwnTq3SMmwakFkPH -e REACT_APP_BEAN_TOKEN=0xE0521D0466571Daf954B19f70383259a859521D1 -e REACT_APP_GAME_MASTER=0xF6dD32F88eF71e695EcA3F9d8E37F65A7FBb89a6 -e REACT_APP_LOTERIA_TOKEN=0xAa13C3D8615c6476f03cF3f38E1e42A3A1EBDb3A -p 3000:3000 -d react:loteria
```


### High-Fidelity Prototype Demo

https://ec2-54-90-243-99.compute-1.amazonaws.com


### Polygon TestNet Deployment 

#### Loteria Board (ERC721)
http://mumbai.polygonscan.com/address/0xAa13C3D8615c6476f03cF3f38E1e42A3A1EBDb3A

#### Bean Token (ERC20)
http://mumbai.polygonscan.com/address/0xE0521D0466571Daf954B19f70383259a859521D1

#### Game Master
http://mumbai.polygonscan.com/address/0xF6dD32F88eF71e695EcA3F9d8E37F65A7FBb89a6
