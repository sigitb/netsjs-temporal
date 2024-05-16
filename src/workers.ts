import concurrently from "concurrently";

const commands = [
    "nodemon src/temporal/user/worker.ts",
];

concurrently(commands);
