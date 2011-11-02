<?php
				/*if ($handle = opendir('./pcdata')) {	
					while (false !== ($file = readdir($handle))) { 
						if(($file!=='.' && $file!=='..' && $file!=='xyz'))
                  {
                     echo $file.",";
						}	
					}
					closedir($handle);
				}*/
				$max_files = $_GET["maxfiles"];
				$folder = $_GET["folder"];


				$filenames = array();
				$i = 0;
				if ($handle = opendir($folder)) {	
					while (false !== ($file = readdir($handle))) { 
						if(($file!=='.' && $file!=='..' && $file!=='xyz'))
                  {
                     $filenames[] = $file;
							$i=$i+1;
						}	
					}
					closedir($handle);
				}

				// gebe die letzten 3 werte aus
				$filenames = array_reverse($filenames);
				if($i<$max_files)
				{
				     $max_files=$i;
				}
				for($j=0;$j<$max_files;$j++)
				{
					echo $filenames[$j].",";
				}
					
				
?>