from flask import Flask, request, send_file, render_template
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    image = Image.open(request.files["image"])
    output = remove(image)

    buf = io.BytesIO()
    output.save(buf, format="PNG")
    buf.seek(0)

    return send_file(buf, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)
