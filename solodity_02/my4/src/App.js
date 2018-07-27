import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contractAddress = "0x96374539a52410864f2b25d94f33b70448b090f3";

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)


    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.at(contractAddress).then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return;
        // return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>侯帅测试案例!</h1>
              <p>可以输入你想要修改的值 <strong></strong> </p>
              <p>目前以太坊网络上的数据为: {this.state.storageValue}</p>
            </div>
          </div>
        </main>

        <input
        ref = "blockLabel"
        style={{width:200, height: 30, boderWidth:2,marginLeft:50}}/>

        <button onClick={()=>{
          let number = Number(this.refs.blockLabel.value);
            console.log(number);

            simpleStorageInstance.set(number,{from:this.state.web3.eth.coinbase}).then((result)=>{
              console.log(result);
              simpleStorageInstance.get(this.state.web3.eth.coinbase).then((result2)=>{
                console.log(result2);
                this.setState({storageValue:result2.c[0]});
              })
            })

        }

      }>修改</button>
</div>






    );
  }
}

export default App
