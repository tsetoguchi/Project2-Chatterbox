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
            return
    channel_dict[channelName] = []
    emit("channel_Addtolist", channelName, broadcast=True)

@socketio.on("addMessage")
def messages(data):
    global channel_dict

@app.route("/grabMessage", methods=["POST"])
def grabMessage():
    messages = request.form.get("newMessages")
    global channel_dict
    previousMessages = channel_dict['# general']

    # # Make sure request succeeded
    # if messages.status_code != 200:
    #     return jsonify({"success": False})

    return jsonify({"messages": messages,'channel_dict': channel_dict['# general']})
