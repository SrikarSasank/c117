var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()


$(document).ready(function(){
    console.log(display_date)
    $("#display_date").html(display_date)
})

let predicted_emotion;



$(function (){
    $("#submit_button").click(function () {

        let input_data = {
            "text": $("#text").val()
        }
        console.log(input_data)

        $.ajax({
            type: 'POST',
            url: "/review",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                
                // Result Received From Flask ----->JavaScript
                predicted_emotion = result.data.predicted_emotion
                emoji_url = result.data.predicted_emotion_img_url

                
                // Display Result Using JavaScript----->HTML
                $("#sentiment").html(predicted_emotion)
                $('#sentiment').css("display", "block");

                $("#emoji").attr('src', emoji_url);
                $('#emoji').css("display", "block");
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    })
})

//const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
//const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//display_date = `${weekDay[date.getDay() - 1]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`

 

