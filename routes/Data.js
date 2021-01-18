const express = require('express');
const request = require('request');

const router = express.Router();
var dataApi;

request.get("http://103.76.204.66:55557/WISECON_API/Service1.svc/LogConBranch", (error, response, body) => {
    dataApi = JSON.parse(body)
});

router.get("/", (req, res) =>{
    const limit = req.query.limit || 5;
    const filter = req.query.filter || null;
    var page = req.query.page || 1
    res.render("pages/table", {data: dataApi.slice((page-1)*limit, page*limit),
        limit: limit,
        current: page,
        pages: Math.ceil(Object.keys(dataApi).length/ limit)});
});
module.exports = router;
//data: dataApi.filter(function(item) {return item.name == filter}).slice((page-1)*limit, page*limit)