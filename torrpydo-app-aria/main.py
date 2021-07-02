from aria2p import downloads
from flask import Flask, request, render_template
from flask_restful import Api, Resource, reqparse
import aria2p
from time import sleep
import os
import werkzeug
from flask_cors import CORS
os.system('sh aria2.sh&')


app = Flask(__name__)
CORS(app)
api = Api(app)


global aria2
aria2 = aria2p.API(
    aria2p.Client(
        host="http://localhost",
        port=6800,
        secret=""
    )
)


@app.route("/", methods=["GET"])
def f():
    return render_template("index.html")


@app.route("/add", methods=["POST", "GET"])
def addMag():
    if request.method == "POST":
        magnet = request.files['file']

        f = request.files['file']
        f.save(f.filename)
        download = aria2.add_torrent(f.filename)

    return render_template("index.html")


@app.route("/status", methods=["GET"])
def OngoingStats():

    downloads = aria2.get_downloads()

    responses = []

    for download in downloads:

        name_of_torrent = download.name
        stat = download.status
        etaa = download.eta_string(2)
        speed = download.download_speed_string(True)
        pro = download.progress_string(2)
        ulspeed = download.upload_speed_string(True)
        seeder = download.num_seeders
        progress = pro[0:1]

        responses.append({"name": name_of_torrent,
                          "status": stat,
                          "speed": speed,
                          "progress": progress,
                          "eta": etaa,
                          "uplo": ulspeed,
                          "seeds": seeder
                          }
                         )
    return {"resp": responses}


@app.route("/pause", methods=["GET"])
def pause():

    downloads = aria2.get_downloads()
    aria2.get_options(downloads)
    aria2.pause(downloads)
    return render_template("index.html")


@app.route("/resume", methods=["GET"])
def resume():

    downloads = aria2.get_downloads()
    print(downloads)
    aria2.resume(downloads)
    return render_template("index.html")

@app.route("/remove", methods=["POST", "GET"])
def remove():

    downloads = aria2.get_downloads
    print(downloads)
    aria2.remove_all(downloads)
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
