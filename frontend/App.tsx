import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { ethers } from "ethers";
import {HDNode} from 'ethers/lib/utils';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';

import Hello from '../artifacts/contracts/Hello.sol/Hello.json';
import GAMBA_ABI from '../assets/abi/gamba.json';



const HOST = 'https://speedy-nodes-nyc.moralis.io/5c87aa4e0e12469796f57092/bsc/testnet';

export const web3 = new Web3(new Web3.providers.HttpProvider(HOST));
const walletAddress = '0x2980719dD01FE37082cD914F91B4974A4D9E5cc5'

const GAMBA = '0x3ef58c8D113ce9dab882755263C26854B87C954f'


const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
});



const shouldDeployContract = async (web3, abi, data, from: string) => {
  // const deployment = new web3.eth.Contract(abi).deploy({ data });
  // const gas = await deployment.estimateGas();
  // const {
  //   options: { address: contractAddress },
  // } = await deployment.send({ from, gas });
  // return new web3.eth.Contract(abi, contractAddress);
};

export default function App(): JSX.Element {
  const connector = useWalletConnect();
  const [message, setMessage] = React.useState<string>('Loading...');
  // const web3 = React.useMemo(
  //   () => new Web3(new Web3.providers.HttpProvider(`http://${localhost}:${HARDHAT_PORT}`)),
  //   [HARDHAT_PORT]
  // );


  

  // const [privateKey, setPrivateKey] = useState('');

  const importMnemonicPhase = () => {
    const walletPath = {
      standard: "m/44'/60'/0'/0/0",
    };
    try {
      // let mnemonic =
      // 'confirm amused joy spoil shaft excess ice pact quarter post clap blind';
      const hdnode = HDNode.fromMnemonic('author film life lawsuit rhythm medal sketch yellow mystery obey abuse reduce');
      const node = hdnode.derivePath(walletPath.standard);

      const wallet = new ethers.Wallet(node.privateKey);

      const walletData = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
      };

      console.log(walletData)
  
      // dispatch(updateWalletAddressAction(wallet.address));
      // dispatch(updateWalletPrivateKeyAction(wallet.privateKey));
    } catch (error) {
      console.log(error);
    }
  };


  const send = useCallback(() => {
    const weiValue = web3.utils.toWei('100', 'ether');

    const transfer = new web3.eth.Contract(GAMBA_ABI, GAMBA).methods.transfer('0xfcE9fF1598473988Fc4C917A6214613599d6f216', weiValue);
    const encodedABI = transfer.encodeABI();

    const tx = {
      from: walletAddress,
      to: GAMBA,
      gas: 2000000,
      data: encodedABI,
    };

    web3.eth.accounts.signTransaction(tx, 'a78af4a076e5c4f4266c1fab69f1b9d772c17eec72ff4eb78d79c93f2d6aa361').then(signed => {
      const tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

      // tran.on('confirmation', (confirmationNumber, receipt) => {
      //   console.log('confirmation: ' + confirmationNumber);
      // });

      tran.on('transactionHash', hash => {
        console.log({hash});
        
      });

      tran.on('receipt', receipt => {
        console.log(JSON.stringify(receipt.logs));
        getBalance();
    
      });

      tran.on('error', () => {
        // console.error;
        getBalance();
      
      });
    });
  }, [walletAddress]);



  const getBalance = useCallback(async () => {
    const walletAddress = '0x2980719dD01FE37082cD914F91B4974A4D9E5cc5'


    const balance = await web3.eth.getBalance(walletAddress);
    console.log(balance);

    new web3.eth.Contract(GAMBA_ABI, GAMBA).methods.balanceOf(walletAddress).call(function (err, res) {
      if (err) {
        console.log('An error occured', err);
        return;
      }
      console.log(res);
    });
  }, []);


  const importPrivateKey = () => {
    try {
      // const wallet = ethers.Wallet.createRandom({locale: ethers.wordlists.en});
      // const wallet = new Wallet(
      //   'f6fd04438681441e9137e8ff6780bf3d7bf8e9b5c1dabfb33f985045ee757232',
      // );
      const wallet = new ethers.Wallet('f6fd04438681441e9137e8ff6780bf3d7bf8e9b5c1dabfb33f985045ee757232');
      const walletData = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
      };
      console.log(walletData)
    } catch (error) {
      console.log(error)
    }
  };



  React.useEffect(() => {
    void (async () => {
      // const { address } = await web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY);
      // const contract = await shouldDeployContract(
      //   web3,
      //   Hello.abi,
      //   Hello.bytecode,
      //   address
      // );
      // setMessage(await contract.methods.sayHello('React Native').call());
      // const wallet = ethers.Wallet.createRandom();
      // const data = {
      //   privateKey: wallet.privateKey,
      //   publicKey: wallet.publicKey,
      //   mnemonic: wallet.mnemonic.phrase,
      //   address: wallet.address
      // }
      // console.log(data);




    })();
  }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);


  const signTransaction = React.useCallback(async () => {
    try {
       await connector.signTransaction({
        data: '0x',
        from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        gas: '0x9c40',
        gasPrice: '0x02540be400',
        nonce: '0x0114',
        to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
        value: '0x00',
      });
    } catch (e) {
      console.error(e);
    }
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);


  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      <Text testID="tid-message">{message}</Text>
      {!connector.connected && (
        <TouchableOpacity onPress={send}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <TouchableOpacity onPress={signTransaction}>
            <Text>Sign a Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession}>
            <Text>Kill Session</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}