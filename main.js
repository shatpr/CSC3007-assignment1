fetch("https://api.data.gov.sg/v1/environment/psi").then((data)=>{
    //console.log(data);
    return data.json(); //converted to object
}).then((objectData)=>{
    var api_data = [];
    readings = objectData.items[0].readings
    update_timestamp = new Date(objectData.items[0].update_timestamp).toLocaleString()
    for (const item in readings) {
        api_data.push({
            metric: item,
            national: readings[item].national,
            central: readings[item].central,
            west: readings[item].west,
            east: readings[item].east,
            north: readings[item].north,
            south: readings[item].south,
        })
    }
    $("#last_updated").text("Last updated: " + update_timestamp);
    $("#table_data").show();
    $("#table_data").DataTable({
        data: api_data,
        columns: [
            { data: 'metric' },
            { data: 'national' },
            { data: 'central' },
            { data: 'west' },
            { data: 'east' },
            { data: 'north' },
            { data: 'south' }
        ],
        lengthMenu:  [10, 20, 30, 50, "All"]
    });
});


