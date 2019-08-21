$(document).ready(function(){

    $(document.body).append(
        `<div class="modal fade" id="logNewWeightModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" style="width: 300px; margin: auto">
                            <div class="form-group">
                            <label for="formGroup">Current Weight</label>
                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
                            </div>
                            <div class="form-group">
                            <label for="formGroupExampleInput2">Date</label>
                            <input type="date" class="form-control" id="formGroupExampleInput2" placeholder="">
                            </div>
                            <div>
                            <input class="btn btn-primary" id="chartInput" type="submit" value="Submit">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`
    );
    
    // 1. Pull the local storage values, parse them into arrays, and save them as variables
    var weights=JSON.parse(localStorage.getItem("weights")) || []
    var dates=JSON.parse(localStorage.getItem("dates")) || []
    
    // 3. Click Handler
    $("#chartInput").on("click", function(events) {
    events.preventDefault();
    // Pull the user entered data, parse as numbers, save as variables
    var weight=parseInt($("#formGroupExampleInput").val().trim())
    var date=parseInt($("#formGroupExampleInput2").val().trim())
    // Add these new data points to the masters arrays above
    weights.push(weight);
    dates.push(date);

    // Replot the graph with the updated data
    Plotly.plot( TESTER, [{
        // x axis will be for date 
        // uni
    x: dates,
    y: weights }], {
    margin: { t: 0 } } );

    // Convert the updated master arrays to strings and save them to local storage
    localStorage.setItem("weights", JSON.stringify(weights));
    localStorage.setItem("dates", JSON.stringify(dates));
    console.log(weights, dates)
    })



    
    // 2. Render the graph with the data pulled from the local storage on page load
    TESTER = document.getElementById('tester');
    Plotly.plot( TESTER, [{
        // x axis will be for date 
        // uni
    x: dates,
    y: weights }], {
    margin: { t: 0 } } );
});