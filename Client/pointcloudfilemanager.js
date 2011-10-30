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
   this.loadedfiles = []; // Array of loaededfilenames.
   this.loadedpcfile = []; //Array of pcfile objects!
   
   this.timer = -1;
   this.numloadedfiles = 0;
   
   var world = ogGetWorld(scene);          
   this.geometrylayer = ogCreateGeometryLayer(world,"rtpoints");
   
   this.tick = 3000; //folder check interval
   
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



