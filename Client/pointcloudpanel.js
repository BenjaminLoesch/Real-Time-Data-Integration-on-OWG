function createPointCloudPanel(divPointCloudPanel)
{
   
   pointcloudlayer = ogCreateGeometryLayer(world,"pointclouds");
     
   var cbon = function(){ogShowGeometry(this.parentNode.geometryid);};
   var cboff = function(){ogHideGeometry(this.parentNode.geometryid);};
   
   
   // ----- load the MMS building --------------------------------------------------
   var  buildingbutton = createOnOffElement("building",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.6383416688350052,47.53326882083595,306.262630000000005],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/building.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   buildingbutton.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the geosat building --------------------------------------------------
   var  geosatbuilding = createOnOffElement("buildinggeosat",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.6383416688350052,47.53326882083595,306.262630000000005],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/building.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   }
   geosatbuilding.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the geosat environment --------------------------------------------------
   var  geosatenv = createOnOffElement("envgeosat",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.6383416688350052,47.53326882083595,306.262630000000005],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/building.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   geosatenv.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the roof ------------------------------------------------------
   var  geosatfloor = createOnOffElement("floorgeosat",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.600401953052925,46.76243052393125,587.476649921103],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/allpoints.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   geosatfloor.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the roof ------------------------------------------------------
   var  roofbutton = createOnOffElement("buildingroof",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.600401953052925,46.76243052393125,587.476649921103],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/allpoints.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   roofbutton.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   
   // ----- create the setting table -------------------------------------------
   var elements = [];
   elements[0] = ["FHNW MMS Building",buildingbutton];
   elements[1] = ["GeoSat LS Building", geosatbuilding];
   elements[2] = ["GeoSat LS Environmental", geosatenv]
   elements[3] = ["GeoSat LS 4th Floor", geosatfloor]
   elements[4] = ["GeoSat LS Roof", roofbutton]

   var t = createSettingTable("pointcloudsettingtable","Point Cloud Settings",elements);
   divPointCloudPanel.appendChild(t);    
}


