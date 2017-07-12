const path  = require("path");
const webpack = require('webpack');

var config = {
   entry: path.join(__dirname, 'react', 'main.js'),
	
   output: {
      path: path.join(__dirname, 'public', 'js'),
      filename: 'index.js',
   },	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            loader: 'babel-loader',				
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.css$/,
            loader: 'style-loader!css-loader',          
         }
      ]
   }
}

module.exports = config;