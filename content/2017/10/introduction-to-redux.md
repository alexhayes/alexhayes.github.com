Title: Introduction to Redux
Slug: introduction-to-redux
Date: 2017-10-05 14:53
Category: Javascript
Tags: javascript, redux, react
Author: Alex Hayes 
Summary: Brief introduction to redux in react

# Steps

## Init project

    mkdir my-project
    yarn add next@beta react react-dom


Add the following into the `package.json`;

    {
      "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
      }
    }

## Create Page

    mkdir pages
    echo 'export default () => <div>Welcome to next.js!</div>' > pages/index.js
    
Browse to [localhost:3000](http://localhost:3000)

## Adding Redux

     yarn add react-redux redux-devtools-extension next-redux-wrapper
     


