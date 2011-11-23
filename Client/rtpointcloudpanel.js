function createRtPointCloudPanel(div)
{
   // instanciate PointCloudFile Manager
   //var pcfm = new PointCloudFileManager("N:",this.scene);
	var pcfm = new PointCloudFileManager(const_rtpcfilefolder,this.scene);
   
   var cbon = function(){
      pcfm.ShowPointCloud();
   }
   var cboff = function(){
      pcfm.HidePointCloud();
   }
   var rtonoff = createOnOffElement("rtpc",false,cbon,cboff);
   
   var elements = [];
   elements[0] = ["Real Time Points",rtonoff];

   var t = createSettingTable("rtpointtable","Real Time Points Settings",elements);
   
   div.appendChild(t);
   
   
}