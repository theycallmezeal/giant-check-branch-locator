const app = new Vue({
	el: "#app",
	data: {
		branches: [],
		checkWidth: 36,
		lat: 38.926,
		lon: -77.2125,
		filtered: false
	},
	methods: {
		getBranchData: function () {
			var vm = this;
			
			while (this.branches.length > 0) {
				this.branches.pop();
			}
			
			var request = new XMLHttpRequest();
			request.open('GET', 'http://api.reimaginebanking.com/branches?key=d76107176166c356f3e2c9fc9ca88da4', true);

			request.onload = function() {
				if (this.status >= 200 && this.status < 400) {
					var data = JSON.parse(this.response);
					for (var i in data) {
						var id = data[i]._id;
						var branchLat = data[i].geocode.lat;
						var branchLon = data[i].geocode.lng;
						var a = branchLat - vm.lat;
						var b = branchLon - vm.lon;
						var distance = Math.round(Math.sqrt(a * a + b * b));
						var name = data[i].name;
						vm.requestWidthAndPush(id, name, distance);
					}
				} else {
					console.log("error :(");
				}
			};

			request.onerror = function() {
				console.log("error :(");
			};

			request.send();
		},
		
		requestWidthAndPush: function(id, name, distance) {
			var vm = this;
			
			var widthRequest = new XMLHttpRequest();
			widthRequest.open('GET', 'http://localhost:8000/branches/' + id, true);
			
			widthRequest.onload = function() {
				if (this.status >= 200 && this.status < 400) {
					var width = this.response;
					vm.branches.push([name, distance, width]);
				} else {
					console.log("error :(");
				}
			};

			widthRequest.onerror = function() {
				console.log("error :(");
			};

			widthRequest.send();
		},
		
		getClass: function(width) {
			if (this.checkWidth <= parseFloat(width)) {
				return "good";
			}
			return "bad";
		},
		
		isGood: function(width) {
			if (this.checkWidth <= parseFloat(width)) {
				return true;
			}
			return false;
		},
		
		toggleFilter: function () {
			this.filtered = !this.filtered;
		}
	},
	computed: {
		filteredBranches: function () {
			var vm = this;
			return this.branches.filter(function(branch) {
				return vm.checkWidth <= parseFloat(branch[2]);
			})
		}
	}
});

navigator.geolocation.getCurrentPosition(function (position) {
	app.lat = position.coords.latitude;
	app.lon = position.coords.longitude;
});