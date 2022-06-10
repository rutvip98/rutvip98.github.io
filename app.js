const convert = document.getElementById("convert");

convert.addEventListener('click', convertFile);
var tempFileName = "";

function convertFile() {
    
    let url = document.getElementById('url').value;
    let fetchURL = "https://cts.ofoct.com/upload_from_url.php?input_format=WAV,20MP3,20OGG,AAC,WMA&url="+url;
    fetch(fetchURL, {
        method: 'GET'
    }).then(response => {
        return response.text();
    }).then(data => {
        tempFileName = data.split("|")[2];
        convertUtil(tempFileName);
    })
}

function convertUtil(tempFileName){
    let convertURL = "https://cts.ofoct.com/convert-file_v2.php?cid=audio2midi&output=MID&row=file1&sourcename=furelisemp3&&rowid=file1&tmpfpath="+tempFileName;
    fetch(convertURL, {method: 'GET'})
    .then(response => {
        return response.text();
    }).then(data => {
        let path = data.split("|")[2];
        let downloadURL = "https://cts.ofoct.com/get-file.php?type=get&downloadsavename=test.mid&genfpath="+path;
        downloadFile(downloadURL,tempFileName)
    })
}


function downloadFile(downloadURL,tempFileName) {
    fetch(downloadURL, {method: 'GET'})
        .then(response => {
            return response.blob();
        }).then(convertedFile => {
            saveAs(convertedFile,tempFileName+".mid");
        })
}