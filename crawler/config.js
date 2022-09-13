const config ={
    app: {
       port: 3000,
       host: 'localhost' 
    },
    scraper:{
        searchEngineUrl: "http://google.com",
        cookieApproveButtonSelector: "div.QS5gu.sy4vM",
        inputSearchSelector: "input.gNO89b",
        recordSelector: ".yuRUbf",
        blockResourceType: [
            'beacon',
            'csp_report',
            'font',
            'image',
            'imageset',
            'media',
            'object',
            'texttrack'],
    }


}
module.exports = config;