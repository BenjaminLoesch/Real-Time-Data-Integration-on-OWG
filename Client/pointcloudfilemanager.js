

function PointCloudFileManager(folder,scene)
{

   this.scene = scene;
   this.loadedfiles = []; // Array of loaededfilenames.
   this.loadedpcfile = []; //Array of pcfile objects!
   
   this.timer = -1;
   this.numloadedfiles = 0;
   this.pcfileHttpRequests = [];
   
   var world = ogGetWorld(scene);          
   this.geometrylayer = ogCreateGeometryLayer(world,"ps");
   
}

PointCloudFileManager.prototype.OnError = function()
{
     
}

PointCloudFileManager.prototype.CheckFolder = function()
{
   this.xmlHttpReq = new XMLHttpRequest();

   this.xmlHttpReq.open('POST', "readfolder.php", true);
   var me = this;
   this.xmlHttpReq.onreadystatechange = function() {
        if (me.xmlHttpReq.readyState == 4)
        {
            me._parseFilenames(me.xmlHttpReq.responseText);
        }
    }
   this.xmlHttpReq.send(null);
   
}

/**
 * @description Start cyclic check for new files in folder.
 * 
 *
 */
PointCloudFileManager.prototype.Start = function()
{
   var me = this;
   this.timer = setInterval(function(){me.CheckFolder()},3000);
   
}

PointCloudFileManager.prototype.Stop = function()
{
   if(this.timer>0)
   {
      clearInterval(this.timer);
   } 
}


PointCloudFileManager.prototype._parseFilenames = function(filenamestring)
{
   var filesinfolder = filenamestring.split(",");
   filesinfolder.splice(filesinfolder.length-1,1);
 

   //check if there is a new file available
   
   for(var i in filesinfolder)
   {
    var file = filesinfolder[i];
    var isAlreadyLoaded = false;
    for(var j in this.loadedfiles)
    {
      var loadedfile = this.loadedfiles[j];
      if(file == loadedfile)
      {
         isAlreadyLoaded  = true;
      }
    }
    if(!isAlreadyLoaded)
    {
      //new file received -> load file
      this.loadedfiles.push(file);
      this.loadedpcfile.push(new PcFile("pcdata/"+file,this.scene,this.geometrylayer));
    }

   }

}



PointCloudFileManager.prototype._loadPCFile = function(filecontent)
{
   //load the xyz file and create a valid json file to load as pointcloud     
   console.log("jiipie file loaded: "+filecontent);
}

