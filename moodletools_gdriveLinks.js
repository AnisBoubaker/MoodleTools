/*
This script converts a Google Drive file link into two links: 
- One that shows a preview of the file within Google Drive
- One giving direct download to the file.

Ex.: <a href="https://drive.google.com/file/d/....">File description</a> will be converted into: 
	(icon) File description [ Preview ] [ Download ]
	Where Preview and Download will link to the corresponding file link.

USAGE ON MOODLE: 
----------------
On any Moodle rich text editor where you'd like to convert your Google drive links: 
- Add a link to the desired file, using the share link provided by Google Drive
- If desired, you can add a class to the link to reflect the file type and a corresponding icon will be automatically added. 
	The following classes are supported: 
		* drive-pdf: PDF file
		* drive-word: Word file
		* drive-video: Video file 
		* drive-image: Image file
		* drive-zip: Archive file
		* drive-code: Code file
	Ex.: <a class="drive-video" href="https://drive.google.com/file/d/....">File description</a>

	Note that if no class is specified, a default file icon will be added. 
- Open the code editor
- Place a call to this script at the end (replace ... by the URL where you've stored this script)
<script src="...."></script>
*/
/***********************************************
 *               CONFIG                        *
 ***********************************************/
drive_fontawsome_url = "https://kit.fontawesome.com/b64d736f71.js"
preview_text = "Visualiser";
download_text = "Télécharger";


/***********************************************************
 * Do not change below (unless you know what you're doing) *
 ***********************************************************/
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
	$.getScript( drive_fontawsome_url );
	links = drive_getAllDriveLinks();
	for (i = 0; i < links.length; i++) { 
		link_text = links[i].text;
		link_class = $(links[i]).attr('class');
		file_id = drive_getFileId(links[i]);
		show_link = links[i].href;
		download_link = "https://drive.google.com/uc?export=download&id="+file_id;
		append_text = "<span><i class='"+drive_getFileType(link_class)+"'></i> "+link_text+" ";
		append_text+= "[ <a href=\""+show_link+"\"  target='_blank'>"+preview_text+"</a> ] ";
		append_text+= "[ <a href=\""+download_link+"\">"+download_text+"</a> ]</span>";
		$(links[i]).after(append_text);
		links[i].parentNode.removeChild(links[i]);
	}
}
drive_ConvertAllLinks();
