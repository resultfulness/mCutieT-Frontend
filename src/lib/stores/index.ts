import { writable } from "svelte/store";
import { DEFAULT_APP_DATA, type AppData, type Topic } from "../../types";
import localStore from "./localStore";

const appData = localStore<AppData>("app-data", DEFAULT_APP_DATA);
const topics = localStore<Topic[]>("app-topics", []);
const currentTopic = localStore<string>("app-current-topic", "");

const appPage = writable<"Index" | "Topics">("Index");

export { appData, topics, currentTopic, appPage };
