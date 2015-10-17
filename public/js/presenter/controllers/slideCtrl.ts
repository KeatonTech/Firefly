module PresenterApp.Controllers{
	export class SlideCtrl{

		scope: ng.IScope;
		http: ng.IHttpService;

		presRunning: boolean;
		presWindow: Window;

		presName: string;
		currentSlide: number;
		slideCount: number;
		slideUrls: string[];

		currentOverlay: string;
		submissions: Object[];

		error: string;

		static $inject = ["$scope", "$http"];

		constructor($scope: ng.IScope, $http: ng.IHttpService){
			this.scope = $scope;
			this.http = $http;
			this.presRunning = false;

			// Test submissions
			this.submissions = [
				{ imgUrl: "http://placehold.it/300x300", caption: "Test caption"}
			];
		}

		presCommand(action: string, data: string){
			this.presWindow.postMessage(
				angular.toJson({action: action,  data: data}),
				Config.HOST
			);
		}

		updateSlide(){
			this.presCommand("changeSlide", this.slideUrls[this.currentSlide]);
		}

		startPresentation(){
			var sampleId = "59227f68-0818-4493-91df-c4b065a5011b-2";
			this.http.get("/getPresentationFromId/" + sampleId)
				.then((response: ng.IHttpPromiseCallbackArg<ApiResponses.PresentationFromId>) => {
					var result = response.data;
					if(!result.success || result.data.length < 1){
						this.error = "Your presentation was not found!";
					}

					this.currentSlide = 0;
					this.slideCount = result.data.length;
					this.presName = result.data.name;
					this.slideUrls = result.data.slides;
					this.presRunning = true;
					this.presWindow = window.open(
						"presentation.html", this.presName, "width=800,height=600"
					);

					setTimeout(() => this.updateSlide(), 1000);
				}, () => this.error = "Your presentation was not found!");
		}

		prevSlide() {
			this.currentSlide--;
			this.updateSlide();
		}

		nextSlide(){
			this.currentSlide++;
			this.updateSlide();
		}

		showOverlay(url?: string){
			if (url !== this.currentOverlay) {
				this.currentOverlay = url;
				this.presCommand("showOverlay", url);
			} else {
				this.currentOverlay = undefined;
				this.presCommand("hideOverlay", "");
			}
		}

	}
}