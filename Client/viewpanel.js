function createViewPanel(divViewPanel)
{
	
    var view1 = createButton("1",function(){flyto(6);},"Earth");
	jQuery(view1).addClass("viewbuttons");
	var view2 = createButton("2",function(){flyto(7);},"Switzerland");
	jQuery(view2).addClass("viewbuttons");
	var view3 = createButton("3",function(){flyto(8);},"Thun");
	jQuery(view3).addClass("viewbuttons");
	var view4 = createButton("4",function(){flyto(9);},"Armasuisse");
	jQuery(view4).addClass("viewbuttons");
	var view5 = createButton("5",function(){flyto(10);},"Entrance 1");
	jQuery(view5).addClass("viewbuttons");
	var view6 = createButton("6",function(){flyto(11);},"North-West");
	jQuery(view6).addClass("viewbuttons");
	var view7 = createButton("7",function(){flyto(12);},"South-West");
	jQuery(view7).addClass("viewbuttons");
	var view8 = createButton("8",function(){flyto(13);},"South-East");
	jQuery(view8).addClass("viewbuttons");
	var view9 = createButton("9",function(){flyto(14);},"North-East");
	jQuery(view9).addClass("viewbuttons");
	var view10 = createButton("9",function(){flyto(15);},"Stairs 1");
	jQuery(view10).addClass("viewbuttons");
	var view11 = createButton("9",function(){flyto(16);},"Stairs 2");
	jQuery(view11).addClass("viewbuttons");
	var view12 = createButton("9",function(){flyto(17);},"Stairs 3");
	jQuery(view12).addClass("viewbuttons");
	var view13 = createButton("9",function(){flyto(18);},"Stairs 4");
	jQuery(view13).addClass("viewbuttons");
	var view14 = createButton("9",function(){flyto(19);},"4th Floor 1");
	jQuery(view14).addClass("viewbuttons");
	var view15 = createButton("9",function(){flyto(20);},"4th Floor 2");
	jQuery(view15).addClass("viewbuttons");
	var view16 = createButton("9",function(){flyto(21);},"uuu");
	jQuery(view16).addClass("viewbuttons");

	
	var elements = [];
	elements[0] = [view1,view2,view3];
	elements[1] = [view4,view5,view6];
	elements[2] = [view7,view8,view9];
	elements[3] = [view10,view11,view12];
	elements[4] = [view13,view14,view15];
	
	
	var table = createSettingTable("views","Predefined Views",elements);
	
	divViewPanel.appendChild(table);
	
}


function flyto(viewnumber)
{
   console.log("flyto nach: "+viewnumber);
   switch(viewnumber)
		{
			case 0:	ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,0,-90,0);
						break;
			case 1:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,0,-45,0);
						break;
			case 2:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,90,-45,0);
						break;
			case 3:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,180,-45,0);
						break;
			case 4:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,270,-45,0);
						break;
			case 5:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,270,-20,0);
						break;
			//earth
			case 6:  ogFlyTo(scene,7.997883319854736,44.42983627319336,10000000,0,-90,0);
						break;
			//swiss
			case 7:  ogFlyTo(scene,7.717714786529541,45.973941802978516,398284.53125,1.0721531808161292e-15,-81.245204890401,0);
						break;
			//thun
			case 8:  ogFlyTo(scene,7.582337901216847,46.766708949839355,1584.011859634822,108.31355950306438,-13.011432431409611,0);
						break;
			//armasuisse
			case 9:  ogFlyTo(scene,7.598214149475098,46.76245880126953,701.4951782226562,78.15277582913838,-41.224355438415714,0); //entrance 1
						break;
			//Entrance
			case 10:  ogFlyTo(scene, 7.600012570069465,46.76251777198899,574.8894653320312,68.67884838907737,-23.008286396247346,0); 
						break;
			//NorthWest Corner
			case 11:  ogFlyTo(scene,7.601216739624348,46.76151820917247,632.9920927423638,-23.92634455658573,-29.34107288574052,0);
						break;
			//SouthWest
			case 12:  ogFlyTo(scene, 7.600959777832031,46.762874603271484,579.360595703125,-145.79254939714212,-12.125629356826336,0);
						break;
			//SouthEast
			case 13:  ogFlyTo(scene, 7.600331921315188,46.7629593686707,579.360595703125,-233.4712394527051,-13.888202110404983,0);
						break;
			//NorthEast
			case 14:  ogFlyTo(scene, 7.600184917449951,46.762081146240234,583.25,-319.57861131713634,-11.964578802694795,0);
						break;
			//Stairs1 
			case 15:  ogFlyTo(scene,7.5997332249809055,46.76256101147133,578.2457885742188,91.77984708905903,0,0);
						break;
			//Stairs2 
			case 16:  ogFlyTo(scene,7.6006870661496215,46.762548650341614,584.3362012351039,-448.1917707637968,-74.1502579848284,0);
						break;
			//Stairs3
			case 17:  ogFlyTo(scene, 7.6006770380750295,46.762545792003536,596.1968002952749,-396.41000606178864,-58.83362619200852,0);
						break;
			//Stairs4
			case 18:  ogFlyTo(scene, 7.6006903648376465,46.762508392333984,594.5797729492188,-25.540601104300833,-34.73411214226873,0);
						break;
			//4thFloor
			case 19:  ogFlyTo(scene, 7.6006038870211645,46.76246696829911,576.7928499816467,-156.7819476163813,-4.049034704920942,0);
						break;
			//4thFloor2
			case 20:  ogFlyTo(scene, 7.600569421444636,46.76236201294618,576.7928499816467,-156.7819476163813,-4.049034704920942,0);
						break;
			//4th Floor3
			case 21:  ogFlyTo(scene, 7.600496459408326,46.76227632385452,576.7928499816467,-235.60828184296668,-8.10222607520973,0);
						break;
			//4th Floor4
			case 22:  ogFlyTo(scene, 7.600485059572284,46.762564128869805,576.7928499816467,-235.9604695234351,-2.6299337682977373,0);
						break;
			
		}
}