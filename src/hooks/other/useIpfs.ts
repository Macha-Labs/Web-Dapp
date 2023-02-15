import { NFTStorage } from 'nft.storage'
import { config } from '../../config'

const useIpfs = () => {
    const storeImage = async(image, name, description) => {
        // const image = await getExampleImage(imageUrl);
        const nft = {
            image,
            'name': name,
            'description': description
        }
    
        const client = new NFTStorage({token: config.IPFS_API_KEY});
        return client.store(nft);
    }

    
    const storeOnIpfs = async(ipfsFile, ipfsName) => {
        let promise = new Promise(async function(resolve, reject) {
            try {
                const metadata = await storeImage(ipfsFile, ipfsName, "");
                resolve(metadata);
            } catch (error) {
                reject(error)
            }
        })
        return promise;
    }

    return {
        store: storeOnIpfs
    }
}

export default useIpfs;