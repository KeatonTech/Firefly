$(function() {

	var filename;
	
	$.get("/api/getCurrentUserInfo?rand="+(new Date().getTime()),function(data) {
		data = JSON.parse(data);
		if(!data.success){
			window.location.replace("/");
		} else{
			$(".username").text(data.data.name);
		}
	});
	
	var dropzone = $(".presentationDropZone");
	dropzone.on('dragenter', function(e) {
		e.stopPropagation();
		e.preventDefault();
		dropzone.toggleClass("highlight");
	});
	dropzone.on('dragleave', function(e) {
		dropzone.toggleClass('highlight');
		$(".presentationDropZone h1").html("Drop Presentation Here");
	});
	dropzone.on('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(".presentationDropZone h1").html("Let's go!");
	});
	dropzone.on('drop', function(e) {
		dropzone.addClass('highlight');
		e.preventDefault();
		var file = e.originalEvent.dataTransfer.file;
		filename = e.originalEvent.dataTransfer.files[0].name;
		uploadPresentation(file, dropzone);
	});

	function uploadPresentation(file, status) {
		var formData = new FormData($('form#uploadForm')[0]);
		$.ajax({
			url: '/api/uploadPresentation',
			type: 'POST',
			xhr: function() {
				var presXhr = $.ajaxSettings.xhr();
				if (presXhr.upload) {
					presXhr.upload.addEventListener('progress', progressHandler, false);
					$(".upstart").html("Uploading " + filename + "...");
					$(".upstart").attr("disabled","disabled");
				}
				return presXhr;
			},
			beforeSend: function() {
				$('progress').show();
			},
			success: function(data, status,jqXHR) {
				data = JSON.parse(data);
				console.log("STATUS: " + data, status);
				if (data.success == true) {
					var presentationURL = "/presenter#" + data.data.id;
					window.location.replace(presentationURL);
				} else {
					alert("Failed to upload.");
				}
			},
			error: function(jqXHR, status, error) {
				alert("ERROR", status, error);
			},
			data: formData,
			cache: false,
			contentType: false,
			processData: false
		});
	}

	function progressHandler(e) {
		if (e.lengthComputable) {
			$('progress').attr({value: e.loaded, max:e.total});
			if (e.loaded == e.total) {
				$(".upstart").html("Converting " + filename + "...");
			}
		}
	}
});