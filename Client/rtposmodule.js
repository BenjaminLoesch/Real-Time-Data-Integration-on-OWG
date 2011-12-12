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
   this.soldiers = [];
	
	this.geolayer = null;
	this.geolayer = ogCreateGeometryLayer(this.world,"rtgeolayer");
	
	if(poimode === undefined || poimode===false) //clean up this...
	{
		this.poimode = false;
	}
	else
	{
		this.poimode = true;
	}
	
	this.timer = 0;
	this.ws = null;
	
	this.isConnected = false;
	
	this.followMode = false;
	this.cam = -1;
	
	this.thirdMan = false;
	this.activeId = ""; //the id of wich the follow mode or third man view is active
	
	this.oninitcallback = null;
	this.onclosecallback = null;
	
	this.updateThridManView = 9;
		
}

//------------------------------------------------------------------------------

/**
 * @description Initializes the websocket communication
 * 
 *
 */
RtPosModule.prototype.Init = function(oninitcallback,onclosecallback)
{
	if(oninitcallback != null && onclosecallback != null)
	{
		this.oninitcallback = oninitcallback;
		this.onclosecallback = onclosecallback;
	}

	
	//test if browser supports websockets...
	if (!("WebSocket" in window) && !("MozWebSocket" in window))
	{
		alert("WebSockets not supported by this browser....");
		return;
	}
	
	
   //try to connect server
	try{
      var ws;
		if("WebSocket" in window)
      {
        ws = new WebSocket(this.wsaddress);
      }
		else if("MozWebSocket" in window)
      {
        ws = new MozWebSocket(this.wsaddress);
      }
		
		// when data is comming from the server, this metod is called
		var rtmod = this;
		ws.onmessage = function (evt) {
			rtmod.OnNewPosition(evt);
		};
	
		// when the connection is established, this method is called
		ws.onopen = function() {
			rtmod.isConnected = true;
			clearTimeout(rtmod.timer);
			rtmod.oninitcallback();
		};
	
		// when the connection is closed, this method is called
		ws.onclose = function ()
		{
			rtmod.isConnected = false;
			clearTimeout(rtmod.timer);
			//try to reconnect in 10 seconds
			this.timer = setTimeout(function(){rtmod.Init()},const_wsreconnectinterval);
			rtmod.onclosecallback();
		};
		
		ws.onerror = function(err)
		{
			console.log("WebSocketServer not found: "+err.toString());
			
		};
   }
	catch(error)
	{
		alert("an error occured rtposmodule line: 138");
	}	
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
  
	
   var actualsoldier = null;
	

	//check if message is complete
	if((posjson.X == -1) || (posjson.Y == -1) || (posjson.Elv == -1) || posjson.Id=="")
	{
		//message not complete,
		return;
	}
	
   var ogid = -1;
	var messagefromid = '';
   for(var i=0;i<this.soldiers.length;i++)
   {
      if(this.soldiers[i].id == posjson.Id)
      {
		actualsoldier = this.soldiers[i];
		actualsoldier.SetData(posjson);
      }
   }
   
   if(actualsoldier)
   {
		/*
		if(this.poimode)
		{
			//id is already known, so just change position
			ogChangePOIPositionWGS84(ogid,lng,lat,elv);
			if(this.followMode)
			{
				ogSetFlightDuration(this.scene,10);
				ogFlyToLookAtPosition(this.scene,lng,lat,elv,100);
				ogSetFlightDuration(this.scene,3000);
			}
		}
		else
		{
			var quaternion =[actualsoldier.qx,actualsoldier.qy,actualsoldier.qz,actualsoldier.qw];
			//ogSetGeometryPositionWGS84Quat(actualsoldier.ogid,actualsoldier.filteredlng,actualsoldier.filteredlat,actualsoldier.filteredelv,quaternion);
			if(this.followMode)
			{
					
					this._setcamera(actualsoldier.lng,actualsoldier.lat,actualsoldier.elv,quaternion);	
			}
			else if(this.thirdMan)
			{
			   this.updateThridManView++;
			   if(this.updateThridManView==10){ 
				 ogSetFlightDuration(this.scene,1000);
				   ogFlyToLookAtPosition(this.scene,actualsoldier.filteredlng,actualsoldier.filteredlat,actualsoldier.filteredelv,50,0,-45,0);
				   this.updateThridManView=1;
				}
			}
		}
		*/
		//update quality indicator and message
		if(actualsoldier.quality>0)
		{
			updateQualityIndicator(actualsoldier.id,actualsoldier.quality); //updates the quality indicator on homepage
		}
	
		if(actualsoldier.msg != '')
		{
			updateMessageNode(actualsoldier.id,actualsoldier.msg); //updates the message div on homepage.
		}
   }
   else
   {
		/*
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
			var soldier = new Soldier(ogid,id);
			
			//add it to the ids array
			this.soldiers.push(soldier);
		}
		else
		{
		*/
			if(posjson.Id=='icare1')
			{
				var frustum = this.CreateCube(const_icare1size,const_icare1color);
			}
			else if(posjson.Id == 'icare2')
			{
				var frustum = this.CreateCube(const_icare2size,const_icare2color);
			}
			else if(posjson.Id == 'eth1')
			{
				var frustum = this.CreateFrustum(const_frustumleft,const_frustumright,const_frustumbottom,const_frustumtop,const_frustumznear,const_frustumzfar);
			}
			else
			{
				return
			}

			var frustumid = ogCreateGeometry(this.geolayer,frustum);
			var soldier = new Soldier(frustumid,posjson.Id);
				
			
			//add it to the ids array
			this.soldiers.push(soldier);	
		//}
   }
	
	
}

RtPosModule.prototype.Show = function(id)
{
	for(var i=0;i<this.soldiers.length;i++)
   {
      if(this.soldiers[i].id == id)
      {
		this.soldiers[i].Show();
      }
   }
}

RtPosModule.prototype.Hide = function(id)
{
	for(var i=0;i<this.soldiers.length;i++)
   {
      if(this.soldiers[i].id == id)
      {
		this.soldiers[i].Hide();
      }
   }
}


RtPosModule.prototype._setcamera = function(lng,lat,elv,quats)
{
		ogSetPosition(this.cam,lng,lat,elv);
		ogSetOrientationFromQuaternion(this.cam, quats[0],quats[1],quats[2],quats[3]);	
}

//------------------------------------------------------------------------------
/*
 * @description sets the camera at the currently received location
 * 
 * 
 */
RtPosModule.prototype.FollowModeOn = function(soldierid)
{
	for(var i=0;i<this.soldiers.length;i++)
   {
      if(this.soldiers[i].id == soldierid)
      {

			this.soldiers[i].Hide();
			this.soldiers[i].followmode = true;
			/*if(this.thirdMan)
			{
				this.thirdManViewOff(soldierid);
			}
			this.cam = ogGetActiveCamera(this.scene);
			this.followMode = true;
			this.activeId = soldierid;
			
			this.Hide(soldierid);
			//hide frustum somwhere here
			console.log("follow mode for soldier: "+soldierid+" active");*/
      }
	  else
	  {
		this.soldiers[i].followmode = false;
	  }
   }
}


RtPosModule.prototype.FollowModeOff = function(soldierid)
{
	for(var i=0;i<this.soldiers.length;i++)
	{
		this.soldiers[i].Show();
		this.soldiers[i].followmode = false;
	}
	/*this.Show(soldierid);
	this.followMode = false;
	console.log("Third man view for soldier: "+soldierid+" disabled");
	this.activeId = "";
	//ogSetOrientation(scene,0,0,0);*/
}


//------------------------------------------------------------------------------
RtPosModule.prototype.thirdManViewOn = function(soldierid)
{
	for(var i=0;i<this.soldiers.length;i++)
	{
      if(this.soldiers[i].id == soldierid)
      {
			this.soldiers[i].thirdmanview = true;
	  /*
			if(this.followMode)
			{
				this.FollowModeOff(soldierid);
			}
			this.cam = ogGetActiveCamera(this.scene);
			this.thirdMan = true;
			this.activeId = soldierid;
			console.log("Third man view for soldier: "+soldierid+" active");
			*/
      }
	  else
	  {
			this.soldiers[i].thirdmanview = false;
	  }
   }
}

//------------------------------------------------------------------------------
RtPosModule.prototype.thirdManViewOff = function(soldierid)
{
	for(var i=0;i<this.soldiers.length;i++)
	{
		this.soldiers[i].thirdmanview = false;
	}
/*
	this.thirdMan = false;
	this.activeId = "";
	console.log("Third man view for soldier: "+soldierid+" disabled");
	*/
}


RtPosModule.prototype.GetConnectedIds = function()
{
	return this.soldiers;
}

RtPosModule.prototype.UpdateSoldierPositions = function()
{
	for(var i=0;i<this.soldiers.length;i++)
	{
		this.soldiers[i].Update();
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

RtPosModule.prototype.CreateFrustum = function(left,right,bottom,top,znear,zfar)
{

	//ToDo: Replace this...
	/*left = -100;
	right = 100;
	bottom = -100;
	top = 100;
	znear = -200;
	zfar = -1000;*/
	/*
	left = -1; 
	right = 1;
	bottom = -1;
	top = 1;
	znear = -2;
	zfar = -10;*/
	
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
	
	var mrot = new mat4();
	mrot.RotationY(-Math.PI/2);
	
	var rotfmat = new mat4();
	rotfmat.Multiply(mrot,fmatinv);
	
	//calculate the new frustum points
	pf1 = rotfmat.MultiplyVec3(p1);
	pf2 = rotfmat.MultiplyVec3(p2);
	pf3 = rotfmat.MultiplyVec3(p3);
	pf4 = rotfmat.MultiplyVec3(p4);
	pf5 = rotfmat.MultiplyVec3(p5);
	pf6 = rotfmat.MultiplyVec3(p6);
	pf7 = rotfmat.MultiplyVec3(p7);
	pf8 = rotfmat.MultiplyVec3(p8);
	
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
			"VisibilityDistance" : 100000,
         "VertexSemantic"  :  "pc",
         "Vertices"  :  linevertices,
         "IndexSemantic"  :  "LINES",
         "Indices"  :  lineindices
	},{
			"id"  :  "1",
         "Center"  :  [7.600771, 46.760578, 7000],
			"VisibilityDistance" : 100000,
         "VertexSemantic"  :  "pc",
         "Vertices"  :  vertices,
         "IndexSemantic"  :  "TRIANGLES",
         "Indices"  :  indices
	}]];
	
	
	
	return frustumgeometry;
}


RtPosModule.prototype.CreateCube = function(size,color)
{
	
	var vertices = [];
	vertices = [-0.5*size,-0.5*size,-0.5*size,color[0],color[1],color[2],color[3],
					0.5*size,-0.5*size,-0.5*size,color[0],color[1],color[2],color[3],
					0.5*size,0.5*size,-0.5*size,color[0],color[1],color[2],color[3],
					-0.5*size,0.5*size,-0.5*size,color[0],color[1],color[2],color[3],
					-0.5*size,-0.5*size,0.5*size,color[0],color[1],color[2],color[3],
					0.5*size,-0.5*size,0.5*size,color[0],color[1],color[2],color[3],
					0.5*size,0.5*size,0.5*size,color[0],color[1],color[2],color[3],
					-0.5*size,0.5*size,0.5*size,color[0],color[1],color[2],color[3]];

		
	var linevertices = vertices;
	
	
	
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
				
	var cubegeometry = [[{
			"id"  :  "1",
         "Center"  :  [7.600771, 46.760578, 7000],
			"VisibilityDistance" : 100000,
         "VertexSemantic"  :  "pc",
         "Vertices"  :  linevertices,
         "IndexSemantic"  :  "LINES",
         "Indices"  :  lineindices
	},{
			"id"  :  "1",
         "Center"  :  [7.600771, 46.760578, 7000],
			"VisibilityDistance" : 100000,
         "VertexSemantic"  :  "pc",
         "Vertices"  :  vertices,
         "IndexSemantic"  :  "TRIANGLES",
         "Indices"  :  indices
	}]];
	
	
	
	return cubegeometry;
	
}




