(function( myTv , $ ) {


myTv.initialize = function() {

	$('#logo').append("<img src=\"tvguide_logo_tat.gif\">")	
	
	$('#loadData').wrap("<div id='data'></div>");
		
	$("#loadData").on("click", function() {
		
			$( "<button type=\"button\" id=\"season\">Season color</button>" ).insertAfter( "#loadData" );	
			$('#upcomingEpisodes').wrap("<div id='episodes'></div>");
			$('#interestingShows').wrap("<div id='episodes'></div>");

				
			$.ajax( {url:"episodes.json"}).done(
				
			function(episodes) { 

				var parsed = episodes;
				
				$(parsed).each( function(i,val) {
					$('#upcomingEpisodes').append(
						$("<div class=\"line\"><img width=100% height=200px src=" + val.episode.images.screen + "><br />" +"<b>"+ val.show.title + " </b><br />" + val.episode.title + " " +"<br /><span>Season " +val.episode.season+"</span></div>")
									);
									
				});

				
			});
			
			$.ajax( {url:"shows.json"}).done(
			
			function(shows) { 

				var parsed = shows;
				
				$(parsed).each( function(i,val) {
					$('#interestingShows').append(
						$("<p id=\"test"+i+"\" align= \"justify\" style=\"margin-right:1em;\"><b>"+ val.title + " </b><br />" + val.overview +"</p><p><button type=\"button\" id=\"plusInformation"+i+"\">Show URL</button></p>")
									);		
									
						$("#plusInformation"+i).on("click", function() {
						
								$('#test'+i).empty();
								
								$("#plusInformation"+i).hide();
					
								$('#test'+i).append(
										$("<p><b>"+ val.title + " </b><br />" + val.overview + " " + "<a href=\""+ val.url + "\">" + val.url +"</a><br />" + "<button type=\"button\" id=\"lessInformation"+i+"\">Hide URL</button></p>")
											);	

									$("#lessInformation"+i).on("click", function() {
									
										$('#test'+i).empty();
										
										$("#plusInformation"+i).show(); 
											
										$('#test'+i).append(
											$("<p><b>"+ val.title + " </b><br />" + val.overview + "</p>")
												);	
									
									});
									
						});
									
				});
				
			});
					
			$("#loadData").off("click");	
			
			
			$("#season").on("click", function() {
			
				$( "span" ).css( "color", "red" );
			
			});
	
	
});

}

$(document).ready(myTv.initialize);


})(window.myTv = window.myTv || {}, jQuery)