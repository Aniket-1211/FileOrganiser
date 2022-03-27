let fs=require('fs');
let path=require('path');

// taking path of unorgainsed folder
let folderPath=process.argv[2];
let folderExists=fs.existsSync(folderPath);

//  All extensions of file
let extensions={
    Audio:['.mp3'],
    Video:['.mp4','.mkv'],
    Documnet:['.pdf','.xlsx','.doc','.txt'],
    Image:['.jpg','.png','.jpeg','.gif'],
    Software:['.exe']
}

if(folderExists)
{
    let files=fs.readdirSync(folderPath);
    for(let i=0;i<files.length;i+=1)
    {
        let ext=path.extname(files[i]);
        let reqFolder=GiveFolderName(ext);
        let reqFolderPath=path.join(folderPath,reqFolder);
        let exist=fs.existsSync(reqFolderPath)
        if(exist){
            moveFilesync(folderPath,reqFolderPath,files[i])
        }
        else{
            fs.mkdirSync(reqFolderPath);
            moveFilesync(folderPath,reqFolderPath,files[i])
        }
    }
}
else{
    console.log("Given address not exist");
}

// returns required folder name
function GiveFolderName(ext)
{
    for(let key in extensions)
    {
        let extArr=extensions[key];
        for(let i=0;i<extArr.length;i+=1)
        {
            if(extArr[i]==ext)
            return key;
        }
    }
    return 'Others';
}

// copy file from Unorganised folder to required foler and then delete from original file from Unorganised folder
function moveFilesync(folderPath,reqFolderPath,fileName){
     let sourcePath=path.join(folderPath,fileName);
     let destinationPath=path.join(reqFolderPath,fileName);
     fs.copyFileSync(sourcePath,destinationPath);
     fs.unlinkSync(sourcePath);
}