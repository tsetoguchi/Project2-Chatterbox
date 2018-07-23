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
        'message1', 'message2'
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
    channel_dict[channelName] = []
    emit("channel_Addtolist", channelName, broadcast=True)

@socketio.on("addMessage")
def messages(data):
    global channel_dict



@socketio.on("addUsername")
def usernameAdd(data):
    emit("username", username, broadcast=True)
