import { app } from "electron";

console.log("App Installation Script");
const userdata_dir = app.getPath("appData");
console.log("Userdata Dir: ", userdata_dir);
