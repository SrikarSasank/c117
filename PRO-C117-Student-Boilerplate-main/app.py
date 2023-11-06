from flask import Flask , render_template , request , jsonify
import sentiment_analysis as sa

app = Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/review' , methods = ['POST'])
def review():

    # extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get('text')

    if not review:

        response = {
                    'status' : 'error' , 
                    'message' : 'Empty response'
                    }
        return jsonify(response)
    else:
        predicted_emotion,predicted_emotion_img_url = sa.predict(review)
        
        # Response to send if the input_text is not undefined
        response = {
                    "status": "success",
                    "data": {
                            "predicted_emotion": predicted_emotion,
                            "predicted_emotion_img_url": predicted_emotion_img_url
                            }  
                   }
        return jsonify(response)  

app.run(debug = True)