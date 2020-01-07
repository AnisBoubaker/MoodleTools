function drive_onlyUnique(value, index, self)
{
    return self.indexOf(value) === index;
} 

function drive_getAllDriveLinks()
{
   var links = [];
   $("a").each(function ()
   {
   	  if (this.href.indexOf("drive.google.com/file/d/") >= 0){
      	links.push(this);
  	  }
  	  
   });

   return links.filter(drive_onlyUnique);
}

function drive_getFileId(link)
{
	let id;
	id = link.href.match(/^https:\/\/drive.google.com\/file\/d\/(.*)\/view\?.*/m);
	return id[1];
}

function drive_getFileType(link_class)
{
	if(link_class == "drive-pdf")
		return "far fa-file-pdf";
	if(link_class == "drive-word")
		return "far fa-file-word";
	if(link_class == "drive-video")
		return "far fa-file-video";
	if(link_class == "drive-image")
		return "far fa-file-image";
	if(link_class == "drive-zip")
		return "far fa-file-archive";
	if(link_class == "drive-code")
		return "far fa-file-code";
	return "far fa-file";
}

function drive_ConvertAllLinks()
{
	links = drive_getAllDriveLinks();
	for (i = 0; i < links.length; i++) { 
		link_text = links[i].text;
		link_class = $(links[i]).attr('class');
		file_id = drive_getFileId(links[i]);
		show_link = links[i].href;
		download_link = "https://drive.google.com/uc?export=download&id="+file_id;
		append_text = "<span><i class='"+drive_getFileType(link_class)+"'></i> "+link_text+" ";
		append_text+= "[ <a href=\""+show_link+"\">Visualiser</a> ] ";
		append_text+= "[ <a href=\""+download_link+"\">Télécharger</a> ]</span>";
		$(links[i]).after(append_text);
		links[i].parentNode.removeChild(links[i]);
	}
}
drive_ConvertAllLinks();