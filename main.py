import pyvista
from fastapi import FastAPI
from starlette.responses import FileResponse
import os
import time

app = FastAPI()
frame = 0


def convertit_png():
    for i in range(0, 120):
        no = "{:04}".format(i)
        filemesh = os.path.join("xdmf", "extract_" + no + "_tempo.xdmf")
        fileimage = os.path.join("images", "extract_" + no + "_tempo.png")
        print(filemesh)
        mesh = pyvista.read(filemesh)
        mesh.plot(off_screen=True, window_size=(600, 600), screenshot=fileimage)


def convertit_html(nb: int):
    pl = pyvista.Plotter(window_size=(600, 600))

    no = "{:04}".format(nb)
    filemesh = os.path.join("xdmf", "extract_" + no + "_tempo.xdmf")
    fileimage = os.path.join("html", "extract_" + no + "_tempo.html")
    print(filemesh)
    mesh = pyvista.read(filemesh)
    pl.add_mesh(mesh)
    pl.export_html(fileimage)


# convertit_xmdf()


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
    global frame
    convertit_html(frame)
    fileimage = os.path.join("html", "extract_" + frame + "_tempo.html")
    frame += 1
    return FileResponse(fileimage)


@app.get("/favicon.ico")
def get_icone():
    return FileResponse(os.path.join('templates', 'favicon.ico'))

@app.get("/frame")
def get_frame(no: int):
    fileimage = os.path.join("html", "extract_" + str(no).zfill(4) + "_tempo.html")
    print(fileimage)
    return FileResponse(fileimage)