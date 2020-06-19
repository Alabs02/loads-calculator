const web3 = new Web3('https://ropsten.infura.io/v3/b29b5f4010124a1394724966bdb93f18')

const abi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "inputs": [{
        "internalType": "string",
        "name": "_name",
        "type": "string"
    }, {
        "internalType": "uint256",
        "name": "_load",
        "type": "uint256"
    }],
    "name": "addAppliance",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "components": [{
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {
            "internalType": "uint256",
            "name": "qty",
            "type": "uint256"
        }],
        "internalType": "struct LoadsCalc.AppQty[]",
        "name": "_appliances",
        "type": "tuple[]"
    }],
    "name": "calcAppLoads",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getAppNames",
    "outputs": [{
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
    }],
    "stateMutability": "view",
    "type": "function"
}]

const address = '0x4871082e1a2d081dce7c4c5f4093aa30db21b182'

const contract = new web3.eth.Contract(abi, address)
