module.exports = {
    entry: {
        main: __dirname + "/src/main.form.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node-modules/,
            query: {
                presets: ["react", "env", "stage-0"]
            }
        }]
    }
}