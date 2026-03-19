const isDevCommand = process.argv.includes("dev");

module.exports = {
    distDir: isDevCommand ? ".next-dev" : ".next",
    env: {
        mongodb_username: "",
        mongodb_password: "",
        mongodb_clustername: "",
        mongodb_database: "",
    },
};
