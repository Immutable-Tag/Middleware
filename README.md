# Middleware

## Set up the blockchain

1. Start the `ganache` application. It should be running on `http://localhost:8545`.
2. Clone the SmartContracts repo: `git clone https://github.com/Immutable-Tag/SmartContracts.git`
3. `cd SmartContracts`
4. `truffle compile`
5. `truffle migrate`. The output will contain the following lines towards the end:
```
...
2_tag_contracts.js
==================

   Replacing 'ImmutableTag'
   ------------------------
   > transaction hash:    0x0e1ef624894d2a75d2356deac0daf3a077195eff60d1e96452662ce0804c3c5e
   > Blocks: 0            Seconds: 0
   > contract address:    0x5A58B7cAf4609a1c9f7934A0bDBcbeF3B4d27bb8
   > block number:        3
   > block timestamp:     1637725439
   > account:             0x851F4BE5447fbC3e40b50A650584551434D9579F
   > balance:             9999.97973206
   > gas used:            779116 (0xbe36c)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01558232 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01558232 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01942118 ETH
```
6. Copy the value of `contract address` (for example, in this case it is `0x5A58B7cAf4609a1c9f7934A0bDBcbeF3B4d27bb8` but it will change every time you run `truffle migrate`).
7. Paste the copied value in the Middleware repo's `smartContractConfig/config.js` file on line 3.

## Run the Node.js server

```bash
npm init -y (may not need as config json files are already created)
npm install --save express
npm install --save-dev nodemon
npm install web3
node index.js or npm start (recommended)
```

## Testing APIs

### Create Tag

#### 1. Creating a tag for a non-existent GitHub commit

```bash
curl -i -X POST "http://localhost:5000/v1/tags" \
    -H 'Content-Type: application/json' \
    -d '{"repo_url": "https://github.com/Immutable-Tag/SmartContacts", "tag_id": "v1.0.0", "commit_id": "abcdef"}'
```

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-KM94dQmY+pgv0Ecd8L77N5qIs0c"
Date: Wed, 24 Nov 2021 04:58:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Commit does not exist"}
```

#### 2. Creating a new tag when GitHub commit exists

```bash
curl -i -X POST "http://localhost:5000/v1/tags" \
    -H 'Content-Type: application/json' \
    -d '{"repo_url": "https://github.com/Immutable-Tag/SmartContacts", "tag_id": "v1.0.0", "commit_id": "66190b9fc987cb12c3a302c84123122e68ef6450"}'
```

Response:

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 39
ETag: W/"27-p5b2vwAQyjd8Enu5ruBWmlgkkzw"
Date: Wed, 24 Nov 2021 04:58:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Successfully created tag."}
```

#### 3. Trying to map an existing tag to a different commit

```bash
curl -i -X POST "http://localhost:5000/v1/tags" \
    -H 'Content-Type: application/json' \
    -d '{"repo_url": "https://github.com/Immutable-Tag/SmartContacts", "tag_id": "v1.0.0", "commit_id": "af190b9fc987cb12c3a302c84123122e68ef6451"}'
```

Response:

```http
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-KM94dQmY+pgv0Ecd8L77N5qIs0c"
Date: Wed, 24 Nov 2021 04:58:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Tag already exists"}
```

### Get Tag

### 1. Get an existing tag

```bash
curl -i -X POST "http://localhost:5000/v1/tags/v1.0.0" \
    -H 'Content-Type: application/json' \
    -d '{"repo_url": "https://github.com/Immutable-Tag/SmartContacts"}'
```

Response:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 134
ETag: W/"86-aGtC1lmpzo6bWnvAnDjnyX41gHg"
Date: Wed, 24 Nov 2021 04:57:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"repo_url":"https://github.com/Immutable-Tag/SmartContacts","tag_id":"v1.0.0","commit_id":"66190b9fc987cb12c3a302c84123122e68ef6450"}
```

#### 2. Get a non-existent tag

```bash
curl -i -X POST "http://localhost:5000/v1/tags/v2.0.0" \
    -H 'Content-Type: application/json' \
    -d '{"repo_url": "https://github.com/Immutable-Tag/SmartContacts"}'
```

Response:

```http
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-Tox4M2y0N7WkRGDAFErMm9hsPbA"
Date: Wed, 24 Nov 2021 04:57:36 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Tag does not exist"}
```
