function Soldier(ogid,id)
{
	this.ogid = ogid;
	this.id = id;
	this.lat = 0;
	this.lng = 0;
	this.elv = 0;
	this.filteredlat = 0;
	this.filteredlng = 0;
	this.filteredelv = 0;
	this.latbuffer = [];
	this.lngbuffer = [];
	this.elvbuffer = [];
	this.quality = 0;	
	this.qx = 0; 
	this.qxbuffer = [];
    this.qy = 0;
	this.qybuffer = [];
    this.qz = 0;
	this.qzbuffer = [];
    this.qw = 0;
	this.qwbuffer = [];
    this.msg = 0;
    this.msgcount = 0;
	
	this.lastUpdate = 0;

	//parameters...
	this.buffersize = 2;	
	this.updateInterval = 120; //ms
	
	this.followmode = false;
	this.thirdmanview = false;
	
	this.ishidden = false;
	this.updateThridManView = 0;
	
	
	/*this.jsonbuffer = [];
	var sold = this;
	this.timer = setInterval(function(){

		sold.SetData(sold.jsonbuffer.pop());
		},100);
	*/	
}
/*
Soldier.prototype.addToBuffer = function(posjson)
{
	this.jsonbuffer.push(posjson);
}
*/

Soldier.prototype.SetData = function(posjson)
{
   this.lat=CHtoWGSlat(posjson.X,posjson.Y); 
   this.latbuffer.unshift(lat);
   while(this.latbuffer.length>this.buffersize)
   {
     this.latbuffer.pop();
   }
   
   this.lng=CHtoWGSlng(posjson.X,posjson.Y);
   this.lngbuffer.unshift(lng);
   while(this.lngbuffer.length>this.buffersize)
   {
      this.lngbuffer.pop();
   }
	
   this.elv=posjson.Elv;
   this.elvbuffer.unshift(posjson.Elv);
   while(this.elvbuffer.length>this.buffersize)
   {
     this.elvbuffer.pop();
   }

   this.id=posjson.Id;
   
   this.qx = posjson.Qx; 
   this.qxbuffer.unshift(this.qx);
   while(this.qxbuffer.length>this.buffersize)
   {
     this.qxbuffer.pop();
   }
   this.qy = posjson.Qy;
   
   this.qybuffer.unshift(this.qy);
   while(this.qybuffer.length>this.buffersize)
   {
     this.qybuffer.pop();
   }
   
   this.qz = posjson.Qz;
   this.qzbuffer.unshift(this.qz);
   while(this.qzbuffer.length>this.buffersize)
   {
     this.qzbuffer.pop();
   }
   
   this.qw = posjson.Qw;
   this.qwbuffer.unshift(this.qw);
   while(this.qwbuffer.length>this.buffersize)
   {
     this.qwbuffer.pop();
   }
   
   
   this.msg = posjson.Message;
   this.msgcount = posjson.MessageCounter;
   this.quality = posjson.Quality;


   this.lastUpdate = new Date();
}


Soldier.prototype.Update= function()
{
	
	var dtNow = new Date();
	
	var delta = dtNow.valueOf()-this.lastUpdate.valueOf(); //delta since last position update

	var t = delta/this.updateInterval; //interpolation parameter
	if(t>1) t=1;
	
	var interpol_lng = t*this.lngbuffer[0]+(1-t)*this.lngbuffer[1];
	var interpol_lat = t*this.latbuffer[0]+(1-t)*this.latbuffer[1];
	var interpol_elv = t*this.elvbuffer[0]+(1-t)*this.elvbuffer[1];
	
	
	var quat1 = [this.qxbuffer[0],this.qybuffer[0],this.qzbuffer[0],this.qwbuffer[0]];
	var quat2 = [this.qxbuffer[1],this.qybuffer[1],this.qzbuffer[1],this.qwbuffer[1]];
	var quaternion = this.Slerp(t,quat2,quat1);
	//var quaternion =[this.qx,this.qy,this.qz,this.qw];
	ogSetGeometryPositionWGS84Quat(this.ogid,interpol_lng,interpol_lat,interpol_elv,quaternion);
	
	if(this.followmode)
	{
		var cam = ogGetActiveCamera(scene);
		this.SetCamera(cam,interpol_lng,interpol_lat,interpol_elv,quaternion);
	}
	
	if(this.thirdmanview)
	{
		this.updateThridManView++;
		if(this.updateThridManView==30){ 
			
			ogSetFlightDuration(scene,1000);
			if(isflying==false){
			ogFlyToLookAtPosition(scene,interpol_lng,interpol_lat,interpol_elv,50,0,-45,0);
			}
			this.updateThridManView=1;
		}
	}
}



Soldier.prototype.SetCamera = function(cam,lng,lat,elv,quats)
{
	var cam = ogGetActiveCamera(scene);
	ogSetPosition(cam,lng,lat,elv);
      
   var sensor2owg = new mat4();
   sensor2owg.SetFromArray([0,-1,0,0,  1,0,0,0,  0,0,1,0,  0,0,0,1]);
   sensor2owg.Transpose();
   
  
    // get rotation matrix out of quaternion
   var rotfromquat = new mat4();
   rotfromquat.FromQuaternionComponents(quats[0],quats[1],quats[2],quats[3]);
   //rotfromquat is in sensor system
   
   
   //convert rotation matrix into owg system
   var rotfromquatowg = new mat4();
   rotfromquatowg.Multiply(sensor2owg,rotfromquat);
   //rotfromquatowg is rotation matrix in owg system
   
   
   //roll 180°
   var roll180head90 = new mat4();
   //roll180.SetFromArray([1,0,0,0,  0,-1,0,0,  0,0,-1,0,  0,0,0,1]);
   roll180head90.SetFromArray([0,1,0,0,  1,0,0,0,  0,0,-1,0,  0,0,0,1]);
   roll180head90.Transpose();
   
   
   var matfinal = new mat4();
   matfinal.Multiply(rotfromquatowg,roll180head90);
   var quat_owg = matfinal.Rot2Quat();
   ogSetOrientationFromQuaternion(cam, quat_owg[0],quat_owg[1],quat_owg[2],quat_owg[3]);	

}


Soldier.prototype.Slerp = function(t,quat1,quat2)
{
	var fcos = quat1[0]*quat2[0]+quat1[1]*quat2[1]+quat1[2]*quat2[2]+quat1[3]*quat2[3];
	var quat3 = [];
	var delta = 0.001;
	if(fcos<0)
	{
		fcos = -fcos;
		quat3[0] = -quat2[0];
		quat3[1] = -quat2[1];
		quat3[2] = -quat2[2];
		quat3[3] = -quat2[3];
		}
	else
	{
		quat3 = quat2;
	}	
		
	if((1-fcos)>delta)
	{
		var omega = Math.acos(fcos);
		var sinom = Math.sin(omega);
		var scale0 = Math.sin((1.0-t)*omega)/sinom;
		var scale1 = Math.sin(t*omega)/sinom;
	}
	else
	{
		scale0 = 1.0-t;
		scale1 = t;
	}
	
	var res = [];
	res[0] = scale0 * quat1[0] + scale1 * quat3[0];
	res[1] = scale0 * quat1[1] + scale1 * quat3[1];
	res[2] = scale0 * quat1[2] + scale1 * quat3[2];
	res[3] = scale0 * quat1[3] + scale1 * quat3[3];
	
	return res;
}

Soldier.prototype.Hide = function()
{
	this.ishidden = true;
	ogHideGeometry(this.ogid); 
}

Soldier.prototype.Show = function()
{
	this.ishidden = false;
	ogShowGeometry(this.ogid); 
}