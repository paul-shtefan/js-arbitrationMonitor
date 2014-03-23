var http = require('http');

exports.post = function() {

	var options = this.options;
	var onSuccess = this.onSuccess;
	var onError = this.onError;
	var postData = this.postData;

	var request = http.request(options, function(response){
		response.setEncoding('utf8');

		response.on('data', function(data){
			onSuccess(data);
		});
	});

	request.on('error', function(ex){
		onError(ex);
	});

	
	request.end();
}

exports.get = function() {

	var url = this.url;
	var onSuccess = this.onSuccess;
	var onError = this.onError;
	var chunk = '';

	http.get(url, function(response) {
		
		response.on('data', function(data) {
    		chunk += data;
  		});

  		response.on('end', function() {
    		onSuccess(chunk);
  		});

	});
}




