function createRealTimePanel(divPointCloudPanel)
{
      // instanciate RealTime Module
      rtmodule = new RtPosModule(scene,'ws://10.218.9.30:4123/consoleappsample',false);
      //rtmodule = new RtPosModule(scene,'ws://10.10.5.130:4123/consoleappsample',false);

      
      
      
      
      //--- create row for scout 1 ---------------------------------------------
      var cbon = function(){
            rtmodule.Show("eth2");
            };
      var cboff = function(){rtmodule.Hide("eth2");};
      var scoutonoff1 = createOnOffElement("eth",true,cbon,cboff);
      var cbon = function(){
            rtmodule.FollowModeOn();};
      var cboff = function(){
            rtmodule.FollowModeOff();
            flyto(0);};
      var scout1follow = createToogleButton("ethfollow",cbon,cboff,"Follow Mode");
      jQuery(scoutonoff1).buttonset("disable");
      jQuery(scout1follow).button("disable");
      
      //var quality = createQualityIndicator("ethquality");
      
      
      
      //--- create the table ---------------------------------------------------
      //prepared for 3
      var elements = [];
      elements[0] = ["ETH 1",scoutonoff1,scout1follow];
      
      var table = createSettingTable("realtimesettings","Localisation Settings",elements);
      divPointCloudPanel.appendChild(table);
      
      
      //--- try to start the websocket communication
      var oninit = function()
      {
            //enable all buttons
            jQuery(scoutonoff1).buttonset("enable");
            jQuery(scout1follow).button("enable");
            
      }
      var onclose = function()
      {
            //disable all buttons
            jQuery(scoutonoff1).buttonset("disable");
            jQuery(scout1follow).button("disable");
      }
      rtmodule.Init(oninit,onclose);
      

}


