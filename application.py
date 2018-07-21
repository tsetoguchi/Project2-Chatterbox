import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_dict = {}

@app.route("/")
def index():
    return render_template("index.html", channel_dict = channel_dict)

@socketio.on("addChannel")
def channel(data):
    channelName = data["channelName"]
    global channel_dict
    channel_dict[channelName] = []
    emit("channel_dict", channel_dict, broadcast=True)

@socketio.on("addUsername")
def usernameAdd(data):
    emit("username", username, broadcast=True)
