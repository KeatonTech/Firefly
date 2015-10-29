import Database = require('../database');

export class BaseModel {
	public id:string;
	protected static _modelIdentifier:string = "UNKNOWN";
	
	constructor() {
		if (this.getType() == BaseModel._modelIdentifier) {
			console.log("MODEL DID NOT PROVIDE MODELIDENTIFIER!");
			return null;
		}
	}
	
	private toJSON() {
		var output = {}, key:string;
		for (key in this) {
			if (this.hasOwnProperty(key) && !(key.indexOf("_") === 0)) {
				output[key] = this[key];
			}
		}
		return output;
	}
	
	public getType():string {
		return (<typeof BaseModel>this.constructor)._modelIdentifier;
	}
	
	/** Function to load model contents from database with an ID */
	public static fromID(id:string, cb:(ok:boolean)=>void) {
		
	}
	
	/** Function to save model contents on database */
	protected save(cb:(ok:boolean)=>void) {
		Database.pushModel(this);
	}
}