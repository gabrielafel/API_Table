const express = require('express');
const request = require('request');

const router = express.Router();
var dataApi;

request.get("http://103.76.204.66:55557/WISECON_API/Service1.svc/LogConBranch", (error, response, body) => {
    dataApi = JSON.parse(body)
});

router.get("/", (req, res) => {
    const limit = req.query.limit || 5;
    var filter = req.query.filter;
    var page = req.query.page || 1;
    var dataFiltered = filter !== undefined ? dataApi.filter((item) => { return (
        item.Branch_Code.toUpperCase().includes(filter.toUpperCase())
        || item.Current_Ping_Response.toUpperCase().includes(filter.toUpperCase())
        || item.EmailDate.toUpperCase().includes(filter.toUpperCase())
        || item.Host_Previously_DOWN_for.toUpperCase().includes(filter.toUpperCase())
        || item.Host_Previously_UP_for.toUpperCase().includes(filter.toUpperCase())
        || item.Last_Date_Checked_DOWN.toUpperCase().includes(filter.toUpperCase())
        || item.Last_Date_Checked_UP.toUpperCase().includes(filter.toUpperCase())
        || item.Location.toUpperCase().includes(filter.toUpperCase())
        || item.Name.toUpperCase().includes(filter.toUpperCase())
        || item.Note.toUpperCase().includes(filter.toUpperCase())
        || item.Status.toUpperCase().toUpperCase().includes(filter.toUpperCase())
        || item.System_Availability.toUpperCase().includes(filter.toUpperCase())
        || item.Total_Checks_Since_Clear.toUpperCase().includes(filter.toUpperCase())
        || item.Total_Failed_Checks.toUpperCase().includes(filter.toUpperCase())
        || item.Uptime.toUpperCase().includes(filter.toUpperCase())
        || item.system.toUpperCase().includes(filter.toUpperCase())
    )}) : dataApi;
    res.render("pages/table", {data: dataFiltered.slice((page-1)*limit, page*limit),
    limit: limit,
    current: page,
    filter: filter,
    pages: Math.ceil(Object.keys(dataFiltered).length/ limit)});
});
module.exports = router;
//data: dataApi.filter(function(item) {return item.name == filter}).slice((page-1)*limit, page*limit)