/*******************************************************************************
#      ____               __          __  _      _____ _       _               #
#     / __ \              \ \        / / | |    / ____| |     | |              #
#    | |  | |_ __   ___ _ __ \  /\  / /__| |__ | |  __| | ___ | |__   ___      #
#    | |  | | '_ \ / _ \ '_ \ \/  \/ / _ \ '_ \| | |_ | |/ _ \| '_ \ / _ \     #
#    | |__| | |_) |  __/ | | \  /\  /  __/ |_) | |__| | | (_) | |_) |  __/     #
#     \____/| .__/ \___|_| |_|\/  \/ \___|_.__/ \_____|_|\___/|_.__/ \___|     #
#           | |                                                                #
#           |_|                 _____ _____  _  __                             #
#                              / ____|  __ \| |/ /                             #
#                             | (___ | |  | | ' /                              #
#                              \___ \| |  | |  <                               #
#                              ____) | |__| | . \                              #
#                             |_____/|_____/|_|\_\                             #
#                                                                              #
#                              (c) 2010-2011 by                                #
#           University of Applied Sciences Northwestern Switzerland            #
#                     Institute of Geomatics Engineering                       #
#                           martin.christen@fhnw.ch                            #
********************************************************************************
*     Licensed under MIT License. Read the file LICENSE for more information   *
*******************************************************************************/

/**
 * @description Class for Pointcloudfile managing -> Continously reload new files in a folder
 * to the scene.
 * @param {String} folder
 * @param {number} scene
 *
 */
function PointCloudFileManager(folder,scene)
{
   
   this.scene = scene;
   this.loadedpcfile = []; //Array of pcfile objects!
   
   this.timer = -1;
   this.numloadedfiles = 0;
   
   var world = ogGetWorld(scene);          
   this.geometrylayer = ogCreateGeometryLayer(world,"rtpoints");
   
   this.tick = 3000; //folder check interval
   
   this.folder = "./"+folder;
   this.maxfiles = 30;
   
}



PointCloudFileManager.prototype.OnError = function()
{
     
}


//------------------------------------------------------------------------------

/**
 * @description this function is called every xx milisecond to check via php skript
 * if there is a new file in the folder.
 *
 */
PointCloudFileManager.prototype.CheckFolder = function()
{
   this.xmlHttpReq = new XMLHttpRequest();

   var url = "readfolder.php?maxfiles="+this.maxfiles+"&folder="+this.folder;
   this.xmlHttpReq.open('GET', url, true);
   var me = this;
   this.xmlHttpReq.onreadystatechange = function() {
        if (me.xmlHttpReq.readyState == 4)
        {
            me._parseFilenames(me.xmlHttpReq.responseText);
        }
    }
   this.xmlHttpReq.send(null);
}

//------------------------------------------------------------------------------
/**
 * @description Start cyclic check for new files in folder.
 * @param tick the re-check interval
 *
 */
PointCloudFileManager.prototype.Start = function(tick)
{
   if(tick!=null)
   {
      this.tick = tick;
   }
   var me = this;
   this.timer = setInterval(function(){me.CheckFolder()},this.tick);
   
}


//------------------------------------------------------------------------------
/**
 * @description Stop updating the scene the folder.
 *
 */
PointCloudFileManager.prototype.Stop = function()
{
   if(this.timer>0)
   {
      clearInterval(this.timer);
   } 
}


//------------------------------------------------------------------------------
/**
 * @description parses the received answer from php call.
 *
 */
/*
PointCloudFileManager.prototype._parseFilenames = function(filenamestring)
{
   var filesinfolder = filenamestring.split(",");
   filesinfolder.splice(filesinfolder.length-1,1);//remove last ','
 
   
   
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
         this.loadedfiles[j].isInFolder = true;
      }
    }
    if(!isAlreadyLoaded)
    {
      //new file received -> load file
      this.loadedfiles.push(file);
      this.loadedpcfile.push(new PcFile("pcdata/"+file,this.scene,this.geometrylayer));
      this.loadedfiles[this.loadedfiles.length-1].isInFolder = true;
      return;
    }
     
   }

}
*/

PointCloudFileManager.prototype._parseFilenames = function(filenamestring)
{
   var filesinfolder = filenamestring.split(",");
   filesinfolder.splice(filesinfolder.length-1,1);//remove last ','
   
   //set all isinfolder flags to false...
   for(var i=0;i<this.loadedpcfile.length;i++)
   {
      this.loadedpcfile[i].isinfolder = false;
   }
   
   //go trough all loaded files and check if it is already loaded
   for(var i=0; i<this.loadedpcfile.length;i++)
   {
      for(var j=0; j<filesinfolder.length;j++)
      {
         if(this.folder+"/"+filesinfolder[j]==this.loadedpcfile[i].url)
         {
            //file already loaded remove it from  the filesinfolder array
            filesinfolder.splice(j,1);
            this.loadedpcfile[i].isinfolder = true;
            
         }
      }
   }
   

   //if there is a file left in filesinfolder load it.
   for(var i=0; i<filesinfolder.length;i++)
   {
      var f = new PcFile(this.folder+"/"+filesinfolder[i],this.scene,this.geometrylayer);
      f.isinfolder = true;
      this.loadedpcfile.push(f);
   }
   
   
   //remove all files wich aren't in the folder right now.
   for(var i=0;i<this.loadedpcfile.length;i++)
   {
     if(!this.loadedpcfile[i].isinfolder)
     {
         this.loadedpcfile[i].Destroy();
         this.loadedpcfile.splice(i,1);
     }
   }
   
}
