function createPointCloudPanel(divPointCloudPanel)
{
   
   pointcloudlayer = ogCreateGeometryLayer(world,"pointclouds");
     
   var cbon = function(){ogShowGeometry(this.parentNode.geometryid);};
   var cboff = function(){ogHideGeometry(this.parentNode.geometryid);};
   
   
   // ----- load the building --------------------------------------------------
   var  buildingbutton = createOnOffElement("building",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.6383416688350052,47.53326882083595,0],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/building.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   buildingbutton.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the roof ------------------------------------------------------
   var  roofbutton = createOnOffElement("buildingroof",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.637986,47.533279,681.261592],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/roof.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   roofbutton.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   
   // ----- create the setting table -------------------------------------------
   var elements = [];
   elements[0] = ["Building",buildingbutton];
   elements[1] = ["Buidling Roof", roofbutton]

   var t = createSettingTable("pointcloudsettingtable","Point Cloud Settings",elements);
   divPointCloudPanel.appendChild(t);    
}


