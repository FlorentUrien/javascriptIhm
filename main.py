import pyvista
from fastapi import FastAPI
from starlette.responses import FileResponse
import os

app = FastAPI()


def convertit_xmdf():
    for i in range(0, 120):
        no = "{:04}".format(i)
        filemesh = os.path.join("xdmf", "extract_" + no + "_tempo.xdmf")
        fileimage = os.path.join("images", "extract_" + no + "_tempo.png")
        print(filemesh)
        mesh = pyvista.read(filemesh)
        mesh.plot(off_screen=True, window_size=(600, 600), screenshot=fileimage)


app = FastAPI()
#convertit_xmdf()


# mesh.plot(off_screen=True, window_size=(600, 600), screenshot=filepath)


@app.get("/")
def get_index():
    return FileResponse(os.path.join("templates", "index.html"))


@app.get("/static/style.css")
def get_style():
    return FileResponse(os.path.join("static", "style.css"))


@app.get("/dynamic/script.js")
def get_script():
    return FileResponse(os.path.join("dynamic", "script.js"))


@app.get("/images/polluants.PNG")
def get_image():
    """Generate a screenshot of a simple pyvista mesh.

        Returns
        -------
        str
            Local path within the static directory of the image.

        """
    return FileResponse(os.path.join('images', 'extract_0012_tempo.png'))


@app.get("/favicon.ico")
def get_icone():
    return FileResponse(os.path.join('templates', 'favicon.ico'))
