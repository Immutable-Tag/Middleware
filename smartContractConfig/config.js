export const gasLimit = 6721975;
export const ganacheServer = 'http://localhost:8545';
export const contractAddress = "0x8dD5e16B93bAb8e498D6d9116Bc91a5EEE5BCee0";
export const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_repoURL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tagID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_commitHash",
        "type": "string"
      }
    ],
    "name": "createTag",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_repoURL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tagID",
        "type": "string"
      }
    ],
    "name": "getTag",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "repoURL",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tagID",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "commitHash",
            "type": "string"
          }
        ],
        "internalType": "struct ImmutableTag.Tag",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_repoURL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tagID",
        "type": "string"
      }
    ],
    "name": "checkTag",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]