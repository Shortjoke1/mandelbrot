const container = document.querySelector(".container")
const size = document.querySelector(".size").value
const ran = 432

function componentToHex(c) {
  var hex = Math.floor(c).toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b){
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function hsv_to_rgb(h, s, v){
    if (s == 0.0){
        return [v*255, v*255, v*255]
    }
    var i = Math.floor(h*6.0)
    var f = (h*6.0) - i
    var p = v*(1.0 - s)
    var q = v*(1.0 - s*f)
    var t = v*(1.0 - s*(1.0-f))
    var i = i%6
    if (i == 0){
        return [v*255, t*255, p*255]
    }
    if (i == 1){
        return [q*255, v*255, p*255]
    }
    if (i == 2){
        return [p*255, v*255, t*255]
    }
    if (i == 3){
        return [p*255, q*255, v*255]
    }
    if (i == 4){
        return [t*255, p*255, v*255]
    }
    if (i == 5){
        return [v*255, p*255, q*255]
    }
}

function lerp(a, b, t){
    return a+(b-a)*t
}

function cardioid(x,y,a){
    return (x**2+y**2+x*a)**2<=a**2*(x**2+y**2)
}

function circle(x,y,a){
    return x**2+y**2<=a**2
}

function inSet(coords){
    var iteration=0
    const x=lerp(-2,2,coords[1]/size)
    const y=lerp(-2,2,coords[0]/size)
    var x0=x
    var y0=y
    for (let i = 0; i < ran; i++){
        var zx=(x0**2-y0**2+x)
        var zy=(2*x0*y0+y)
        if (zx**2+zy**2<=4){
            var x0=zx
            var y0=zy
            var iteration=i+1
        } else{
            break
        }
    }
    if (iteration==ran){
        return [0,0,0]
    }
    const h=2*iteration
    const s=0.8
    const v=Math.sin((2*iteration)/10)/4+3/4
    return hsv_to_rgb(h/255,s,v)
}

function draw(size){
    container.style.setProperty("--size", size)
    for (let x = 0; x < size; x++){
        for (let y = 0; y < size; y++){
            const div = document.createElement("div")
            div.classList.add("pixel")
            const col = inSet([x,y])
            div.style.backgroundColor = rgbToHex(col[0],col[1],col[2])
            container.appendChild(div)
        }
    }
}

draw(size)