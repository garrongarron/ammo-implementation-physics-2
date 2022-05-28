const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '');
//passsing directoryPath and callback function
let out = ''
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    out += 'const fileList = {\n'
    //avoiding this file
    let i = files.indexOf('ListFilesOfThisFolder.js')
    files.splice(i, 1)
    files.forEach(function (file, index) {
        // Do whatever you want to do with the file
        let tmp = `    "${index}":"${file}"`
        if (files.length - 1 != index) tmp += ","
        out += tmp + "\n"
    });
    out += '}\n'
    out += 'export default fileList'

    fs.writeFile('../FileList.js', out, () => { })
    //to delete this file
    // fs.unlink('ListFilesInFolder.js',  ()=>{})
});