function createRealTimePanel(divPointCloudPanel)
{
      // instanciate RealTime Module
      rtmodule = new RtPosModule(scene,const_wsaddress ,false);
     
      
      
      
      //--- create row for scout 1 ---------------------------------------------
      var cbon = function(){
            rtmodule.Show("eth1");
            };
      var cboff = function(){rtmodule.Hide("eth1");};
      var scoutonoff1 = createOnOffElement("eth1",true,cbon,cboff);
      var cbon = function(){
            rtmodule.FollowModeOn("eth1");};
      var cboff = function(){
            rtmodule.FollowModeOff("eth1");
            //flyto(0);
            ogSetOrientation(ogGetActiveCamera(scene),0,0,0);
            };
      var scout1follow = createToogleButton("eth1follow",cbon,cboff,"Follow Mode");
      
      var cbon = function(){
            ogSetOrientation(scene,0,0,0);
            rtmodule.thirdManViewOn("eth1");};
      var cboff = function(){
            rtmodule.thirdManViewOff("eth1");};
      var scout1thirdman = createToogleButton("eth1thirdman",cbon,cboff,"3rd Man View");
      var scout1quality = createQualityIndicator("eth1quality");
      var scout1message = createMessageNode("eth1message");
      
      
      jQuery(scoutonoff1).buttonset("disable");
      jQuery(scout1follow).button("disable");
      jQuery(scout1thirdman).button("disable");




       //--- create row for scout 2 ---------------------------------------------
      var cbon = function(){
            rtmodule.Show("icare1");
            };
      var cboff = function(){rtmodule.Hide("icare1");};
      var scoutonoff2 = createOnOffElement("icare1",true,cbon,cboff);
      var cbon = function(){
            rtmodule.FollowModeOn("icare1");};
      var cboff = function(){
            rtmodule.FollowModeOff("icare1");
            flyto(0);};
      var scout2follow = createToogleButton("icare1follow",cbon,cboff,"Follow Mode");
      
      var cbon = function(){
            ogSetOrientation(scene,0,0,0);
            rtmodule.thirdManViewOn("icare1");};
      var cboff = function(){
            rtmodule.thirdManViewOff("icare1");};
      var scout2thirdman = createToogleButton("icare1thirdman",cbon,cboff,"3rd Man View");
      var scout2quality = createQualityIndicator("icare1quality");
      var scout2message = createMessageNode("icare1message");
      
      
      jQuery(scoutonoff2).buttonset("disable");
      jQuery(scout2follow).button("disable");
      jQuery(scout2thirdman).button("disable");
      
      
      //--- create row for scout 3 ---------------------------------------------
      var cbon = function(){
            rtmodule.Show("icare2");
            };
      var cboff = function(){rtmodule.Hide("icare2");};
      var scoutonoff3 = createOnOffElement("icare2",true,cbon,cboff);
      var cbon = function(){
            ogSetOrientation(scene,0,0,0);
            rtmodule.FollowModeOn("icare2");};
      var cboff = function(){
            rtmodule.FollowModeOff("icare2");};
      var scout3follow = createToogleButton("icare2follow",cbon,cboff,"Follow Mode");
      
      var cbon = function(){
            rtmodule.thirdManViewOn("icare2");};
      var cboff = function(){
            rtmodule.thirdManViewOff("icare2");
            flyto(0);};
      var scout3thirdman = createToogleButton("icare2thirdman",cbon,cboff,"3rd Man View");
      var scout3quality = createQualityIndicator("icare2quality");
      var scout3message = createMessageNode("icare2message");
      
      
      jQuery(scoutonoff3).buttonset("disable");
      jQuery(scout3follow).button("disable");
      jQuery(scout3thirdman).button("disable");
      
     
   
      
  

      //--- create the table ---------------------------------------------------
      var elements = [];
      elements[0] = ["ETH 1",scoutonoff1,scout1quality,scout1follow,scout1thirdman,scout1message];
      elements[1] = ["iCare 1",scoutonoff2,scout2quality,scout2follow,scout2thirdman,scout2message];
      elements[2] = ["iCare 2",scoutonoff3,scout3quality,scout3follow,scout3thirdman,scout3message];
      
      var table = createSettingTable("realtimesettings","Localisation Settings",elements);
      divPointCloudPanel.appendChild(table);
      
      
      //--- try to start the websocket communication
      var oninit = function()
      {
            //enable all buttons
            jQuery(scoutonoff1).buttonset("enable");
            jQuery(scout1follow).button("enable");
            jQuery(scout1thirdman).button("enable");
            
            jQuery(scoutonoff2).buttonset("enable");
           //jQuery(scout2follow).button("enable"); -no orientation so no follow Mode possible
            jQuery(scout2thirdman).button("enable");
            
            jQuery(scoutonoff3).buttonset("enable");
            //jQuery(scout3follow).button("enable"); -no orientation so no follow Mode possible
            jQuery(scout3thirdman).button("enable");
            
      }
      var onclose = function()
      {
            //disable all buttons
            jQuery(scoutonoff1).buttonset("disable");
            jQuery(scout1follow).button("disable");
            jQuery(scout1thirdman).button("disable");
            
            jQuery(scoutonoff2).buttonset("disable");
            jQuery(scout2follow).button("disable");
            jQuery(scout2thirdman).button("disable");
            
            jQuery(scoutonoff3).buttonset("disable");
            jQuery(scout3follow).button("disable");
            jQuery(scout3thirdman).button("disable");
      }
      rtmodule.Init(oninit,onclose);
}


