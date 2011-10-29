<?php
				if ($handle = opendir('./pcdata')) {	
					while (false !== ($file = readdir($handle))) { 
						if(($file!=='.' && $file!=='..' && $file!=='xyz'))
                  {
                     echo $file.",";
						}	
					}
					closedir($handle);
				}
?>