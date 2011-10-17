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

// todo: error check: wenn irgendwo eine falsche message reinkommt ignorieren.
// todo: follow mode- on/off camera verfolgt die aktuelle pos und orientierung
// todo: 



/**
 * @description This class handles the realtime position update.
 * @param {number} scene the owgscene
 * @param {string} wsaddress the websocket address
 * @param {boolean=} poimode true = pois are displayed; false=viewfrustums are displayed
 */
function RtPosModule(scene,wsaddress,poimode)
{
   this.scene = scene;
	this.world = ogGetWorld(scene);
   
   this.wsaddress = wsaddress;
   this.poilayer = ogCreatePOILayer(ogGetWorld(this.scene),"rtlayer");
   this.ids = [];
	
	this.geolayer = null;
	this.geolayer = ogCreateGeometryLayer(this.world,"rtgeolayer");
	
	if(poimode === undefined)
	{
		this.poimode = false;
	}
	else
	{
		this.poimode = true;
	}
	
}

//------------------------------------------------------------------------------

/**
 * @description Initializes the websocket communication
 * 
 *
 */
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


//------------------------------------------------------------------------------
RtPosModule.prototype.Start = function()
{
   //ToDo
   
}


//------------------------------------------------------------------------------
RtPosModule.prototype.Stop = function()
{
   
   //ToDo
}

//------------------------------------------------------------------------------
/*
 * @description handles the incoming message.
 * @param {string} message the message according to this format:
 * 
 * 
 */
RtPosModule.prototype.OnNewPosition = function(message)
{
   // retrieve the scene attached to context:
   var posjson = eval("("+message.data+")");
   var lat=CHtoWGSlat(posjson.Y,posjson.X);
   var lng=CHtoWGSlng(posjson.Y,posjson.X);
   var elv=posjson.Elv;
   var id=posjson.Id;
	var qx = posjson.Qx;
	var qy = posjson.Qy;
	var qz = posjson.Qz;
	var qw = posjson.Qw;
	var msg = posjson.Message;
	var msgcount = posjson.MsgCount;
	var quality = posjson.Quality;
	
	
   

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
		if(this.poimode)
		{
			//id is already known, so just change position
			ogChangePOIPositionWGS84(ogid,lng,lat,elv);
		}
		else
		{
			var quaternion =[qx,qy,qz,qw];
			ogSetGeometryPositionWGS84Quat(ogid,lng,lat,elv,quaternion);
		}

   }
   else
   {
		if(this.poimode)
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
		else
		{
			var frustum = this.CreateFrustum();
			
			var frustumid = ogCreateGeometry(this.geolayer,frustum);
			var idinfo = {
				"ogid" : frustumid,
				"id" : id
			}
			
			//add it to the ids array
			this.ids.push(idinfo);
			
		}

   }
	
	
	
	
	
}

//------------------------------------------------------------------------------
/*
* @description creates a frustum geometry 
* @param {number} left
* @param {number} right
* @param {number} bottom
* @param {number} top
* @param {number} near
* @param {number} far
*/

RtPosModule.prototype.CreateFrustum = function(left,right,bottom,top,near,far)
{

	//ToDo: Replace this...
	left = -100;
	right = 100;
	bottom = -100;
	top = 100;
	znear = -200;
	zfar = -1000;
	
	//create 8 points for a cube
	var p1 = new vec3(-1,-1,-1);
	var p2 = new vec3(1,-1,-1);
	var p3 = new vec3(1,1,-1);
	var p4 = new vec3(-1,1,-1);
	var p5 = new vec3(-1,-1,1);
	var p6 = new vec3(1,-1,1);
	var p7 = new vec3(1,1,1);
	var p8 = new vec3(-1,1,1);
	
	var fmat = new mat4();
	//fmat.Perspective(100,1,10,110);
	fmat.Frustum(left,right,bottom,top,znear,zfar);
	
	
	var fmatinv = new mat4();
	fmatinv.Inverse(fmat);
	
	var mtrans = new mat4();
	mtrans.Translation(0,0,zfar-znear);
	
	
	//calculate the new frustum points
	pf1 = fmatinv.MultiplyVec3(p1);
	pf2 = fmatinv.MultiplyVec3(p2);
	pf3 = fmatinv.MultiplyVec3(p3);
	pf4 = fmatinv.MultiplyVec3(p4);
	pf5 = fmatinv.MultiplyVec3(p5);
	pf6 = fmatinv.MultiplyVec3(p6);
	pf7 = fmatinv.MultiplyVec3(p7);
	pf8 = fmatinv.MultiplyVec3(p8);
	
	/*
	console.log("Frustum created..."+pf1.ToString());
	console.log("Frustum created..."+pf2.ToString());
	console.log("Frustum created..."+pf3.ToString());
	console.log("Frustum created..."+pf4.ToString());
	console.log("Frustum created..."+pf5.ToString());
	console.log("Frustum created..."+pf6.ToString());
	console.log("Frustum created..."+pf7.ToString());
	console.log("Frustum created..."+pf8.ToString());
	*/

	var color = [0,0,0,0.5];
	var linecolor = [1,1,0,1];
	var p=[pf1.Get(),pf2.Get(),pf3.Get(),pf4.Get(),pf5.Get(),pf6.Get(),pf7.Get(),pf8.Get()];
	p.push(pf1.Get(),pf2.Get(),pf3.Get(),pf4.Get(),pf5.Get(),pf6.Get(),pf7.Get(),pf8.Get());
	p.push(pf1.Get(),pf2.Get(),pf3.Get(),pf4.Get(),pf5.Get(),pf6.Get(),pf7.Get(),pf8.Get());

	var vertices = [];
	var linevertices = [];
	
	for(var i=0;i<16;i++)
	{
		vertices.push(p[i][0]);
		vertices.push(p[i][1]);
		vertices.push(p[i][2]);
		vertices.push(color[0]);
		vertices.push(color[1]);
		vertices.push(color[2]);
		vertices.push(color[3]);
		
		linevertices.push(p[i][0]);
		linevertices.push(p[i][1]);
		linevertices.push(p[i][2]);
		linevertices.push(linecolor[0]);
		linevertices.push(linecolor[1]);
		linevertices.push(linecolor[2]);
		linevertices.push(linecolor[3]);
	}
	
	
	var indices = [6,7,4,
						6,4,5,
						1,6,5,
						1,2,6,
						2,7,3,
						2,6,7,
						0,4,3,
						3,4,7,
						0,1,3,
						1,2,3,
						1,0,5,
						0,4,5							
						];
	
	var lineindices = [0,1,
							 1,2,
							 2,3,
							 3,0,
							 1,5,
							 2,6,
							 3,7,
							 0,4,
							 6,5,
							 5,4,
							 4,7,
							 7,6];
				
	var frustumgeometry = [[{
			"id"  :  "1",
         "Center"  :  [7.600771, 46.760578, 7000],
         "VertexSemantic"  :  "pc",
         "Vertices"  :  linevertices,
         "IndexSemantic"  :  "LINES",
         "Indices"  :  lineindices
	},{
			"id"  :  "1",
         "Center"  :  [7.600771, 46.760578, 7000],
         "VertexSemantic"  :  "pc",
         "Vertices"  :  vertices,
         "IndexSemantic"  :  "TRIANGLES",
         "Indices"  :  indices
	}]];
	
	
	
	return frustumgeometry;
}


