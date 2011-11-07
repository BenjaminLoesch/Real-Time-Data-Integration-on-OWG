function createRtPointCloudPanel(div)
{
   //--- create row for scout 1 ---------------------------------------------
  
   var cbon = function(){pcfilemanager.HidePointCloud();};
   var cboff = function(){pcfilemanager.ShowPointCloud();};
   var rtpconoff = createOnOffElement("Real Time Points",true,cbon,cboff);
  
   
   
   elements = [];
   elements[0] = ["Real Time Point Cloud",rtpconoff];
   elements[1] = ["History Length", ]
   
   
   jQuery(scoutonoff1).buttonset("disable");
   jQuery(scout1follow).button("disable");
   
   
}