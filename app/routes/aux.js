var AdmZip  = require('adm-zip')
const crypto = require('crypto')
const fs = require('fs')

async function loadZipAndProcessIt(path) {
    var zip = new AdmZip(path)

    var extractPath = __dirname + '/../uploads/'
    zip.extractAllTo(extractPath)
    var zipContents = zip.getEntries()

    var valid = true
    var files = []
    for (const entry of zipContents) {
        if(entry.name == 'manifest-md5.txt') {
            var manifestData = entry.getData().toString().split('\n')
            
            console.log(manifestData)

            for(const data of manifestData) {
                var sepData = data.split(' ')

                let filePath = extractPath + sepData[1]

                var fileHash = await getMd5Hash(filePath)
                console.log(fileHash)

                if(fileHash == sepData[0]) {
                    console.log("OMG são iguais!")
                    files.push(sepData[1])
                }
                else {
                    console.log("WTF is that")
                    valid = false
                }

            }

        }
    }

    fs.readdirSync(extractPath, (err, files) => {
        if(err) throw err
        console.log(files)
    })

    var returnFiles = []

    if(valid) {
        for(const fileName of files) {
            var d = new Date().toISOString().substring(0,10)
            var directoryPath = __dirname.replace('/routes','/public/files/' + d + '/')
            if(!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath)
            }

            var realName = fileName.split('data/')[1]
            var filePath = __dirname.replace('/routes','/uploads/' + fileName)
            var newPath = directoryPath + realName

            fs.renameSync(filePath, newPath)
            returnFiles.push(newPath)
        }
    }
    fs.readdir(extractPath, (err, files) => {
        if (err) throw err;
      
        console.log(files)
        for (const file of files) {
            if(fs.lstatSync(extractPath + file).isDirectory()) {
                fs.rmdirSync(extractPath + file)
            }
            else 
                fs.unlinkSync(extractPath + file);
        }
    });

    return returnFiles

}

async function getMd5Hash(path) {
    
    var fileContents = fs.readFileSync(path)
    hash = crypto.createHash('md5').update(String(fileContents)).digest("hex")
    return hash

}




module.exports = {
    loadZipAndProcessIt
}