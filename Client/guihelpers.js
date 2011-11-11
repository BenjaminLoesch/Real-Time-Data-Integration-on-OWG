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
function createQualityIndicator(name)
{
   var div = document.createElement('div');
   div.id = name;

   div.style.fontSize = '60%';
   div.style.width = '80px';
   div.style.height = '10px';
   div.style.backgroundColor = '#ffffff';
   div.style.border = 'solid';
   div.style.borderWidth = '1px';
   div.style.zIndex = '1';


   var divIndicator = document.createElement('div');
   divIndicator.id = name+"indicator";
   divIndicator.style.width = '40px';
   divIndicator.style.height = '10px';
   divIndicator.style.backgroundColor = '#ff0000';
   divIndicator.style.zIndex = '2';
   divIndicator.style.position = 'absolute';
   div.appendChild(divIndicator);
 
   var divLabel = document.createElement('div');
   divLabel.innerHTML = ' Position Quality';
   //divLabel.style.textAlign = 'center';
   divLabel.style.width = '80px';
   divLabel.style.height = '10px';
   divLabel.style.zIndex = '3';
   divLabel.style.position='absolute';
   divLabel.style.left = '10px';
   divLabel.style.top = '0px';
   divIndicator.appendChild(divLabel);
   
   return div;
}

function updateQualityIndicator(soldierid,quality)
{
   
   var div = document.getElementById(soldierid+"qualityindicator");
   
   if(quality<0.3)
   {
      div.style.backgroundColor = '#ff0000';
   }
   else if (quality>0.3 && quality<0.6)
   {
      div.style.backgroundColor = '#ff9f00';
   }
   else
   {
      div.style.backgroundColor = '#54ff00';
   }
   div.style.width = quality*80+'px';
}



//------------------------------------------------------------------------------
function createMessageNode(name)
{
   var div = document.createElement('div');
   div.id = name;
   div.style.backgroundColor='#ff000';
   div.innerHTML = "Message: ";
   
   return div;  
}

//------------------------------------------------------------------------------
function updateMessageNode(name,message)
{
   var div = document.getElementById(name+"message");
   div.innerHTML = message;
   
}



