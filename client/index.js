const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

// This goes on the API Server
const merkleTree = new MerkleTree(niceList);

// paste the hex string in here, without the 0x prefix
// This goues in the contract, only storing 32 bytes

async function main() {
    // Test with a name that is available
    let name = "Norman Block";

    // Build the proof
    let index = niceList.findIndex((n) => n === name);
    let proof = merkleTree.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name,
        proof,
    });

    console.log(name, { gift });

    // Test with a name that is not available
    name = "Hello world";

    // Build the proof
    index = niceList.findIndex((n) => n === name);
    proof = merkleTree.getProof(index);

    const { data: gift2 } = await axios.post(`${serverUrl}/gift`, {
        name,
        proof,
    });

    console.log(name, { gift2 });
}

main();
