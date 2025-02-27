// Firefly Global Configuration

class Configuration {
	public static DEFAULT_PORT = 8080;
	public static DISPLAY_NAME = "Firefly";
	public static MAIN_DOMAIN = process.env.MAIN_DOMAIN || "http://onfirefly.ws";
	public static PROCESSING_SERVER = process.env.PROCESSING_SERVER || "http://vm.onfirefly.ws";
	public static FILE_SERVER = process.env.FILE_SERVER || "https://fireflypresentations.blob.core.windows.net";
	public static STATIC_DIR = "./public/";
	public static PAGE_SUFFIX = ".html";
	public static CONNECTION_STRING_FILE = "db_connection.txt";
	public static CONNECTION_STRING_ENV = "MONGODB_CONNECTION_STRING";
	public static CAS_AUTH_URL = process.env.CAS_AUTH_URL || "https://cas-auth.rpi.edu/cas";
	public static CAS_AUTH_DOMAIN = process.env.CAS_AUTH_DOMAIN || "rpi.edu";
	public static SESSION_SECRET = process.env.SESSION_SECRET || "localhost secret";
	public static APP_ADDRESS = process.env.APP_ADDRESS || "http://localhost:"+Configuration.DEFAULT_PORT;
}

export = Configuration;