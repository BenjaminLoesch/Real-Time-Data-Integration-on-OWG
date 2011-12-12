function createPointCloudPanel(divPointCloudPanel)
{
   
   pointcloudlayer = ogCreateGeometryLayer(world,"pointclouds");
     
   var cbon = function(){ogShowGeometry(this.parentNode.geometryid);};
   var cboff = function(){ogHideGeometry(this.parentNode.geometryid);};
   
   
   // ----- load the MMS building --------------------------------------------------
   var  buildingbutton = createOnOffElement("building",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.600401953052925,46.76243052393125,587.476649921103],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/allpoints.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   buildingbutton.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the geosat building --------------------------------------------------
   var  geosatbuilding = createOnOffElement("buildinggeosat",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.60072115355,46.7626996084,581.0715],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/terasse.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   }
   geosatbuilding.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the geosat environment --------------------------------------------------
   var  geosatenv = createOnOffElement("envgeosat",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.60071092866788025,46.762456573020202,590.27249999999998],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/exterior.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   geosatenv.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the roof ------------------------------------------------------
   var  geosatfloor = createOnOffElement("floorgeosat",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.6005317968,46.7624158136,580.5825],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/buildinglas.xyz",
                     "NumberOfPoints"   :  70000000,
                     "Type" : "pointcloud"
   } 
   geosatfloor.geometryid = ogCreateGeometry(pointcloudlayer,pcoptions);
   
   // ----- load the roof ------------------------------------------------------
   var  roofbutton = createOnOffElement("buildingroof",true,cbon,cboff);
   var pcoptions = { "id"               :  "1",
                     "Center"           :  [7.6006225294549998,46.7624822072747505,576.6915],
                     "VertexSemantic"   :  "pc",
                     "PointUrl"         :  "buildingpc/building_geosat.xyz",
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


