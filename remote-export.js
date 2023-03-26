/**
//SAMPLE URL: https://someserver.com/remoteComponentA.js

//REFERENCE: https://github.com/angular-extensions/elements

SAMPLE USAGE
<DynamiComponent [url]="'https://someserver.com/remoteComponentA.js'"></DynamicComponent>
*/

function remoteComponentA() {
    let template = `<div>
						<h1>{{titleText}}</h1>
						<button (click)="buttonClick($event, 'John')">
							{{buttonLabel}}
						</button>
					</div>`;
    let controller = function () {
        this.titleText = "Title Text";
        this.buttonLabel = "I am a Button";
        this.buttonClick = function (e, name) {
            alert(name);
        }
    }
    return {
        template,
        controller
    }
}

export default remoteComponentA;
