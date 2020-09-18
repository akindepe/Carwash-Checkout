const path = require("path");

exports.directoryName = path.dirname(require.main.filename);//check
exports.joinPathsATogether = (theRootFolder, theFile)=>{
   return  path.join(theRootFolder, theFile);
}