const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const username = 'appUser2'; // Change if needed

        const ccpPath = path.resolve(__dirname, 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const userExists = await wallet.get(username);
        if (userExists) {
            console.log(`An identity for the user "${username}" already exists in the wallet`);
            return;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('Admin identity not found in wallet. Run enrollAdmin.js first.');
            return;
        }

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: username,
            role: 'client'
        }, adminUser);

        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });

        const userIdentity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        await wallet.put(username, userIdentity);
        console.log(`Successfully registered and enrolled ${username} and imported to wallet`);
    } catch (error) {
        console.error(`Failed to register user: ${error}`);
        process.exit(1);
    }
}

main(); // <---- This is what executes the function
