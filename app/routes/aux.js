var AdmZip  = require('adm-zip')
const crypto = require('crypto')

function loadZipAndProcessIt(path) {
    var zip = new AdmZip(path)

    extractPath = __dirname + '/../uploads/'
    zip.extractAllTo(extractPath)
    var zipContents = zip.getEntries()
    zipContents.forEach(function (entry) {
        if(entry.name == 'manifest-md5.txt') {
            var manifestData = entry.getData().toString().split('\n')

            console.log(manifestData)
            
            var fileHash = getMd5Hash(filePath)
        }
    })
}

async function getMd5Hash(path) {
    var fr = new FileReader()
    
    fr.readAsText(path)

    fr.onload( () => {
        // TODO
    })

    let hash = crypto.createHash('md5').update('some_string').digest("hex")
}




module.exports = {
    loadZipAndProcessIt
}