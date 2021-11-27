import axios from 'axios';
import Web3 from 'web3';
import { abi, gasLimit, ganacheServer, contractAddress } from "../smartContractConfig/config.js";

let web3 = new Web3(ganacheServer);
const accounts = await web3.eth.getAccounts();
let account = accounts[0];
web3.eth.defaultAccount = account;
let contract = new web3.eth.Contract(abi, contractAddress, {from: account})


async function checkIfCommitExists(repoUrl, commitId) {
    let result = repoUrl.split('/') // result = ['https', '', 'github.com', 'Immutable-Tag', 'Middleware']
    let ownerName = result[result.length - 2]
    let repoName = result[result.length - 1]

    let url = `https://api.github.com/repos/${ownerName}/${repoName}/commits/${commitId}`;
    try {
        let response = await axios.head(url, {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }});
        if (response.status == 200) {
            console.log("Found the commit in github");
            return Promise.resolve(true);
        }

        console.log("Did not find the commit in github.");
        return Promise.resolve(false);
    } catch (err) {
        console.log('Did not find the commit: ', err.message);
        return Promise.resolve(false);
    }
}


export async function createTag(req, res) {
    let request = req.body;
    let repoUrl = request["repo_url"];
    let tagId = request["tag_id"];
    let commitId = request["commit_id"];

    console.log(`Checking if tag ${tagId} exists in the blockchain already for repo ${repoUrl}`);
    contract.methods.checkTag(repoUrl, tagId)
        .call({from: account})
        .then(function (result) {
            if (result) {
                console.log(`Tag ${tagId} already exists. Cannot create the same tag.`);
                res.status(400);
                res.json({error: "Tag already exists"});
            }
            else {
                console.log(`Tag ${tagId} does not exist. Checking if commit ${commitId} exists in the github repo ${repoUrl}`);
                checkIfCommitExists(repoUrl, commitId)
                .then(function (commitExists) {
                    if (!commitExists) {
                        console.log(`Commit ${commitId} does not exist in the github repo ${repoUrl}. Returning 400 Bad Request.`)
                        res.status(400);
                        res.json({error: "Commit does not exist"});
                    }
                    else
                    {
                        console.log(`Found commit ${commitId} in the github repo ${repoUrl}. Creating tag ${tagId} in the blockchain.`);
                        contract.methods.createTag(repoUrl, tagId, commitId)
                            .send({from: account, gas: gasLimit}, function(error, transactionHash) {
                                if (error) {
                                    console.log(`Failed to create tag ${tagId}. Error: ${error}`);
                                    res.status(500);
                                    res.json({error: "Failed to create tag"});
                                }
                                else {
                                    console.log(`Successfully created tag ${tagId}. TransactionHash: ${transactionHash}`);
                                    res.status(201);
                                    res.json({message: "Successfully created tag."});
                                }
                            });
                    }
                });
        }
    })
}

export async function getTag(req, res) {
    let repoUrl = req.body["repo_url"];
    let tagId = req.params["tagId"];

    console.log(`Getting tag ${tagId} for repo ${repoUrl}`);
    contract.methods.getTag(repoUrl, tagId)
        .call({from: account})
        .then(function (result) {
            let foundRepoUrl = result.repoURL;
            let foundTagId = result.tagID;
            let foundCommitId = result.commitHash;

            if (foundCommitId.length == 0) {
                console.log(`Did not find tag ${tagId} for repo ${repoUrl}`);
                res.status(404);
                res.json({error: "Tag does not exist"});
            }
            else {
                console.log(`Got tag ${tagId} for repo ${repoUrl}`);
                res.status(200);
                res.json({
                    repo_url: foundRepoUrl,
                    tag_id: foundTagId,
                    commit_id: foundCommitId
                });
            }
        });
}
