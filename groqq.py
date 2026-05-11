from flask import Flask, request, jsonify, render_template
import os
from groq import Groq 

app = Flask(__name__)

client = Groq(api_key="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")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def get_plan():
    user_data = request.json['answers']


    answers_text =str(user_data)
    #  البرومبت حقنا نغيره على الاول بعدين
    prompt = f"Given the following user data: {user_data}, generate a personalized plan for the user. The plan should include specific recommendations and actionable steps based on the provided data and send it as json."    

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that generates personalized plans based on user data in json format."},
            {"role": "user", "content": prompt}
        ],response_format={"type": "json_object"}
    )

    return completion.choices[0].message.content

if __name__ == '__main__':    app.run(debug=True)