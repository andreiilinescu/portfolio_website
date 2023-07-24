!(function () {

        const div = document.getElementById("gradient-div");
        

        function detectWebGL() {
            // Check for the WebGL rendering context
            if (!!window.WebGLRenderingContext) {
                var canvas = document.createElement("canvas"),
                    names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
                    context = false;

                for (var i in names) {
                    try {
                        context = canvas.getContext(names[i]);
                        if (context && typeof context.getParameter === "function") {
                            // WebGL is enabled.
                            return 1;
                        }
                    } catch (e) { }
                }

                // WebGL is supported, but disabled.
                return 0;
            }

            // WebGL not supported.
            return -1;
        }


        const x=detectWebGL();

        if(x==0||x==-1){
            div.innerHTML='<div id="gradient-canvas-mobile"></div>'
        }



    })();