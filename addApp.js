var Buffer = require('buffer').Buffer

var Tx = require('ethereumjs-tx').Transaction

const privateKey = Buffer.from('DD938C7281B16B4BACE378728C530FDB9E331EF361062515979D348FA71D8C87', 'hex')



//-------------//


jQuery(document).ready(function() {

    jQuery('#addApp').on('click', function() {
        addAppliance()
    });

});


//--//


function addAppliance() {

    let name = jQuery('#app-name').val()

    let load = Number(jQuery('#app-load').val()) * 1000


    if (name != "" && load > 0) {

        jQuery(".spinner-border").show()

        try {

            //------------//

		const data = contract.methods.addAppliance(name, load).encodeABI()

            web3.eth.getTransactionCount(address, (err, txCount) => {

                    const txObject = {
                        nonce: web3.utils.toHex(txCount),
                        gasLimit: web3.utils.toHex(800000),
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
			to: address,
                        datat: data
                    }

                    const tx = new Tx(txObject, {
                        chain: 'ropsten',
                        hardfork: 'petersburg'
                    })
                    tx.sign(privateKey)

                    const serializedTransaction = tx.serialize()
                    const row = '0x' + serializedTransaction.toString('hex')

                    web3.eth.sendSignedTransaction(row, (err, txHash) => {
			alert('Added successfully')
                    })

                })
                //------------//


        } catch (error) {
            alert('Something went wrong')
        }

    } else {
        alert("Please enter Appliance name and load > 0")
    }

}
