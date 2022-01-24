

$("#new_post").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#edit_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })
    
    console.log(data)

    var request = {
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/view-user"){

    $ondelete = $(".t1 tr.m td a.delete");
    $ondelete.click(function(){
        console.log("Yes");
        var id = $(this).attr("data-id")
        
        var request = {
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
            })
        }
    })
}