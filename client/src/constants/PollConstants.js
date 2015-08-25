import builder from "./builder";
export default builder("POLL", [
  "RECEIVE_VOTES",
  "GENERATE_TOKEN",
  "VOTE",
  "UNVOTE",
  "LATEST",
  "ERROR"
], true);
