function createViewPanel(divViewPanel)
{
	
   var view1 = createButton("1",function(){flyto(0);},"View 1");
	var view2 = createButton("2",function(){flyto(1);},"View 2");
	var view3 = createButton("3",function(){flyto(2);},"View 3");
	var view4 = createButton("4",function(){flyto(3);},"View 4");
	var view5 = createButton("5",function(){flyto(4);},"View 5");
	var view6 = createButton("6",function(){flyto(5);},"View 6");
	var view7 = createButton("7",function(){flyto(6);},"View 7");
	var view8 = createButton("8",function(){flyto(7);},"View 8");
	var view9 = createButton("9",function(){flyto(8);},"View 9");
	
	var elements = []
	elements[0] = [view1,view2,view3];
	elements[1] = [view4,view5,view6];
	elements[2] = [view7,view8,view9];
	
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
			case 6:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,0,-20,0);
						break;
			case 7:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,90,-20,0);
						break;
			case 8:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,200,180,-20,0);
						break;
			case 9:  ogFlyToLookAtPosition(scene,7.600478649139404,46.76235580444336,560,2000,0,-90,0);
						break;
		}
}