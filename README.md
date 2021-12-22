# react-easy-seo

# a npm package that provides a  creative solution for react seo without ssr or preload

# Installation
npm install -g react-easy-seo

# Setup
1- uninstall any react seo tool like react-helmet if you are using one  ***

2- create a sitemetadata.json in project root folder
![sitemetadata json sample]()

3- add "postbuild":"react-easy-seo" in the scripts section in your package.json .  
"scripts":{
    .....   
    "postbuild":"react-easy-seo"   
  }.   
4-run your react build normally and the output will be in './output'

# How it Works 
react-easy-seo transforms your react single page application to the traditional html folder structure using the routes provided in the sitemap.json file you make.

the json is structured as follows:

key     value 
route   {metadataname : metadatacontent}

example:{"/":{"title":"react-easy-seo","description":"react-easy-seo is the best way to handle react seo"}}

which is converted to =>

`
"<meta name="title" content="react-easy-seo"></meta>"
"<meta name="description" content="react-easy-seo is the best way to handle react seo"></meta>"
"<title>react-easy-seo</title>"
`

so for each route you can have as many metadata as you want.
another cool feature is having an article metadataname in the route object 

{"/":{"article":"react-easy-seo is the best way to handle react seo"}}
this is converted to => 
<p>react-easy-seo is the best way to handle react seo</p>
and is added to the root div so its replaced as soon as your app loads but can really help with seo.



*** the titles added are not removed once the react app is loaded thats why it renders other seo tools useless
