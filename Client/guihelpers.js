var onoffcounter=0;
function createOnOffElement(name,on,cbon,cboff)
{
   onoffcounter++;
   var div = document.createElement('div');
   div.id = name;
   jQuery(div).addClass('onoffelement');
   var inputelement = document.createElement('input');
   inputelement.type = 'radio';
   inputelement.id = 'radio'+onoffcounter;
   inputelement.name = name;
   if(on)
   {
     inputelement.checked = true; 
   }
   jQuery(inputelement).click(cbon);
   var label = document.createElement('label');
   label.innerHTML ='ON';
   label.setAttribute('for','radio'+onoffcounter);
   label.style.fontSize = '6pt';
   div.appendChild(inputelement);
   div.appendChild(label);
   
   onoffcounter++;
   var inputelement = document.createElement('input');
   inputelement.type = 'radio';
   inputelement.id = 'radio'+onoffcounter;
   inputelement.name = name;
   if(!on)
   {
     inputelement.checked = true; 
   }
   jQuery(inputelement).click(cboff);
   var label = document.createElement('label');
   label.innerHTML ='OFF';
   label.setAttribute('for','radio'+onoffcounter);
   label.style.fontSize = '6pt';
   div.appendChild(inputelement);
   div.appendChild(label);
   
   jQuery(div).buttonset();
   return div;
}


function createButton(name,cb,text)
{
   var button = document.createElement('button');
   button.innerHTML = text;
   button.style.fontSize = '6pt';
   jQuery(button).button();
   jQuery(button).click(cb);
   return button;
}


function createToogleButton(name,cbon,cboff,label)
{
   var button = document.createElement('button');
   button.innerHTML = label;
   button.id = name;
   button.style.fontSize = '6pt';
   button.active = false;
   jQuery(button).button();
   jQuery(button).click(function(){
      if(this.active)
      {
         cboff();
         button.active = false;
         jQuery(button).toggleClass('ui-state-focus',false);
      }
      else
      {
         cbon();
         button.active = true;
         jQuery(button).toggleClass('ui-state-focus',true);
      }
                        
      });
   return button;
}

function createSettingTable(name,headerstring,elements)
{
   //create the settings table
      var table     = document.createElement("table");
      jQuery(table).addClass("settingtable");
      
      rows = elements.length;
      cols = elements[0].length;
      
      //add a header
      var row = document.createElement("tr");
      var header = document.createElement("th");
      var text = document.createTextNode(headerstring);
      header.appendChild(text);
      row.appendChild(header);
      header.setAttribute('colspan',cols);
      table.appendChild(row);
      
      for(var i=0;i<rows;i++)
      {
           var row = document.createElement("tr");
           for(j=0;j<cols;j++)
           {
             var cell = document.createElement("td");
             if(typeof elements[i][j] == 'string')
             {
               var currenttext = document.createTextNode(elements[i][j]); 
               cell.appendChild(currenttext);
               row.appendChild(cell);
             }
             else
             {
               cell.appendChild(elements[i][j]);
               row.appendChild(cell);
             }
           }
           table.appendChild(row);
      }
    
      return table;
}


//------------------------------------------------------------------------------
function createQualityMessageIndicator(name)
{
   var div = document.createElement('div');
   div.id = name;
   
   
   var qualitydiv = document.createElement('div');
   qualitydiv.id = name+"_qualitydiv";
   qualitydiv.style.width = '40px';
   qualitydiv.style.heigth = '10px';
   
   var textnode = document.createTextNode('message');
   
   var t = createSettingTable("ETH 1","Position Quality",qualitydiv,"Message",textnode);
   
   div.appendChild(t);
   
   
   
   
   
   div.style.fontSize = '10%';
   div.style.width = '400px';
   div.style.height = '10px';
   
   return div;
}


