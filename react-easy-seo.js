const fs=require('fs-extra');
const path=require('path')
current_dir = process.cwd()
const siteData = require(current_dir+'/src/sitemetadata.json')

function startScript(){
    const routes = []
    for (const data in siteData) {
        routes.push(data)
    }
    var metadata = ''
    var htmlTemplate = fs.readFileSync(path.resolve(current_dir+'/build/', 'index.html'), 'utf8')
    const mainScripts = htmlTemplate.match(/<script \w*=.*?><\/script>/gm)

    fs.emptyDirSync(current_dir+'/output')
    fs.copySync(current_dir + '/build', current_dir +'/output')

    for (const route in routes) {
        const dir =current_dir+ "/output" + routes[route]
        fs.mkdirSync(dir, { recursive: true });
        var pageMetadata = '<!doctype html><html lang="en"><head>'
        for (const meta in siteData[routes[route]]) {
            if(meta==='article'){continue}
            pageMetadata = pageMetadata.concat( `<meta name="${meta}" content="${siteData[routes[route]][meta]}"></meta>`)
        }
        pageMetadata = pageMetadata.concat(`<title>${siteData[routes[route]]['title']}</title>`)
        if (siteData[routes[route]]['article']){
            htmlTemplate = htmlTemplate.replace('<div id="root"></div>', `<div id="root"><p>${siteData[routes[route]]['article']}</p></div>`)
        }
        
        htmlTemplate = htmlTemplate.replace('<!doctype html><html lang="en"><head>', pageMetadata)
        fs.writeFileSync(dir + 'index.html', htmlTemplate)

    }
}



exports.startScript = startScript


