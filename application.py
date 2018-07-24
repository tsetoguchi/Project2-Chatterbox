import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_dict = {
    '# general': [

        ]
}

@app.route("/")
def index():
    return render_template("index.html", channel_dict = channel_dict)

@socketio.on("addChannel")
def channel(data):
    channelName = data["channelName"]
    global channel_dict

    for channel, messages in channel_dict.items():
        if channel == channelName:
            emit("usedChannelname", broadcast=True)
            return
    channel_dict[channelName] = []
    emit("channel_Addtolist", {'channelName': channelName}, broadcast=True)

@socketio.on("addMessage")
def messages(data):
    global channel_dict
    message = data["message"]
    currentChannel = data["currentChannel"]
    channel_dict[currentChannel].append(message)
    emit("postMessage", {'message': message}, broadcast=True)

# @app.route("/messagesChannel", methods=["POST"])
# def messagesChannel():

@app.route("/grabMessage", methods=["POST"])
def grabMessage():
    message = request.form.get("newMessage")
    currentChannel = request.form.get("currentChannel")
    global channel_dict
    previousMessages = channel_dict[currentChannel]

    # Prevent channel from containing more than 100 messages at once
    if len(previousMessages) > 100:
        previousMessages.remove(previousMessages[0])

    # # Make sure request succeeded
    # if messages.status_code != 200:
    #     return jsonify({"success": False})

    return jsonify({"message": str(message)})
