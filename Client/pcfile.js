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
 * @description Class representating a pointcloudfile downloads it and displays it on
 * the globe.
 * @param {String} url
 * @param {number} scene
 * @param {number} geometrylayer
 */
function PcFile(url,scene,geometrylayer)
{
   this.scene = scene;
   this.url = url;
   this.geometrylayer = geometrylayer;
   
   // init set-up json callback
   this.xmlHttpReq = new XMLHttpRequest();

   this.xmlHttpReq.open('POST', url, true);
   var me = this;
   this.xmlHttpReq.onreadystatechange = function() {
        if (me.xmlHttpReq.readyState == 4)
        {
            me._parseFile(me.xmlHttpReq.responseText);
        }
    }
   this.xmlHttpReq.send(null); 
}


//------------------------------------------------------------------------------
/**
*  @description parses the httprequest answer and creat a valid json file.
*
*/
PcFile.prototype._parseFile = function(filecontent)
{
   //create a json object
   var pointspritejson = {};
   pointspritejson["id"] = Math.round(Math.random()*100);
   pointspritejson["Type"] = "pointcloud"; 
   pointspritejson["VertexSemantic"] = "pc";
   
   //take the first line as center
   var lines = filecontent.split("\n");
   var centerlv03 = lines[0].split(" ");
   var x = parseFloat(centerlv03[0]);
   var y = parseFloat(centerlv03[1]);
   var h = parseFloat(centerlv03[2]);
   var x = 600000;
   var y = 200000;
   var h = 550;
   
   pointspritejson["Center"] = [CHtoWGSlng(x,y),CHtoWGSlat(x,y),h];
   
   var vertices = [];
   
   for(var i=0;i<lines.length;i++)
   {
      var data = lines[i].split(" ");
      
      vertices.push(parseFloat(data[1])-y); //subtract the center....
      vertices.push(parseFloat(data[2])-h);
      vertices.push(parseFloat(data[0])-x);
      vertices.push(parseFloat(data[3])/255);
      vertices.push(parseFloat(data[4])/255);
      vertices.push(parseFloat(data[5])/255);
      vertices.push(1.0); //alpha value
   }
   pointspritejson["Vertices"] = vertices;
   
   
   //implement this....
   ogCreateGeometry(this.geometrylayer,pointspritejson);
   var a=0;
   var pos =  pointspritejson["Center"];
   ogFlyToLookAtPosition(this.scene, pos[0], pos[1], pos[2],100);
}
