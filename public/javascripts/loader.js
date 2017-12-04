(function () {
    System.import("/public/javascripts/main.js")
	.then(function () {console.log("Successfully loaded main.js");})
	.catch(function (error) {console.log(error.message)});
})();
