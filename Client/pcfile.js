function PcFile(url,scene,geometrylayer)
{
   this.scene = scene;
   this.url = url;

   
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
   
   pointspritejson["Center"] = [CHtoWGSlat(y,x),CHtoWGSlng(y,x),h];
   
   vertices = [];
   
   for(var i=0;i<lines.length;i++)
   {
      var data = lines[i].split(" ");
      
      vertices.push(data[0]-x); //subtract the center....
      vertices.push(data[1]-y);
      vertices.push(parseFloat(data[2]));
      vertices.push(parseFloat(data[3]));
      vertices.push(parseFloat(data[4]));
      vertices.push(parseFloat(data[5]));
   }
   pointspritejson["Vertices"] = vertices;
   
   
   //implement this....
   ogCreatePointSpriteFromJson(geometrylayer,json);
   var a=0;
}

/*{"id"  :  "1",
"Center"  :  [7.600430,46.762335,573.846993],
"Type"	: "pointcloud",
"VertexSemantic"  :  "pc",
"Vertices"  : [-9.057455,0.622725,-4.089594,0.003922,0.003922,0.003922,1.0,

...*/