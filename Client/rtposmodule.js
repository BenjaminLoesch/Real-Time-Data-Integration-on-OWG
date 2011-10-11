


function RtPosModule(scene,wsaddress)
{
   this.scene = scene;
   this.wsaddress = wsaddress;
   this.poilayer = ogCreatePOILayer(ogGetWorld(this.scene),"rtlayer");
   this.ids = [];
}


RtPosModule.prototype.Init = function()
{
   //try to connect server
   var ws = new WebSocket(this.wsaddress);
   
   // when data is comming from the server, this metod is called
   var rtmod = this;
   ws.onmessage = function (evt) {
       rtmod.OnNewPosition(evt);
   };

   // when the connection is established, this method is called
   ws.onopen = function () {
       
   };

   // when the connection is closed, this method is called
   ws.onclose = function () {
      
   }
    
}

RtPosModule.prototype.Start = function()
{
   
   
}

RtPosModule.prototype.Stop = function()
{
   
   
}

RtPosModule.prototype.OnNewPosition = function(message)
{
   // retrieve the scene attached to context:
   var posjson = eval("("+message.data+")");
   var lat=posjson.Lat;
   var lng=posjson.Lng;
   var elv=posjson.Elv;
   var id=posjson.id;
   

   var ogid = -1;
   for(var i=0;i<this.ids.length;i++)
   {
      if(this.ids[i].id == id)
      {
         ogid = this.ids[i].ogid;
         
      }
   }
   
   
   if(ogid>0)
   {
      //id is already known, so just change position
      ogChangePOIPositionWGS84(ogid,lng,lat,elv);
   }
   else
   {
      //a new id appeared!
      //create a poi
      var options = {
         icon     : "number_1.png",
         text 		: 	id,
         position :  [lng, lat, elv],
         size 		: 10,
         flagpole : true
      };
      
      var ogid = ogCreatePOI(this.poilayer,options);
      var idinfo = {
         "ogid" : ogid,
         "id" : id
      }
      
      //add it to the ids array
      this.ids.push(idinfo);
   }
      
   
   
   
   
}

/*
// New WebSocket Position
function OnNewPosition(positionstring)
{
   
      
      
      //cam = ogGetActiveCamera();
      //ogSetPosition(cam,lng,lat,elv);
      //ogSetOrientation(cam,0,-90,0);
      // place a new poi:
	  if(trackingpoi<0)
	  {
		 var NewPoiDefinition = 
		{
         icon     : "number_1.png",
         //text 		: 	"Position: (" + result[1].toFixed(3) + ", " + result[2].toFixed(3) + ", " + result[3].toFixed(0) + ")",
         position :  [lng, lat, elv],
         size 		: 0.1,
         flagpole : true
		};
      
		trackingpoi = ogCreatePOI(bycicleLayer,NewPoiDefinition);
	  }
	  
	 
     
	  a=1;
      
}
*/
