import { Dispatcher } from "flux";

const instance: Dispatcher = new Dispatcher();
export default instance;

export const dispatch = instance.dispatch.bind(instance);
