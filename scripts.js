const ArrayPixelsFogo = []
const larguraFogo = 40
const alturaFogo = 40
const PaletaDeCorFogo = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


function start(){
    estruturaDeDadosFogo()
    fonteFogo()
    renderFogo()

    setInterval(calculoPropagacaoFogo, 100)

}

function estruturaDeDadosFogo(){
    const numeroPixels = larguraFogo * alturaFogo

    for (let i=0; i < numeroPixels; i++){
        ArrayPixelsFogo[i] = 0
    }

}

function calculoPropagacaoFogo(){

    for (let colm=0; colm < larguraFogo; colm++){
        for (let row=0; row < alturaFogo; row++){
            const pixelIndex = colm + ( larguraFogo * row )

            updateIntensidadeFogo(pixelIndex)

        }
    }

    renderFogo()
}

function updateIntensidadeFogo(intensidadeAtual){
    const belowPixelIndex = intensidadeAtual + larguraFogo

    if (belowPixelIndex >= alturaFogo * larguraFogo){
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const blIntensidadeFogo = ArrayPixelsFogo[belowPixelIndex]
    const novaIntensidade = 
        blIntensidadeFogo - decay >= 0 ? blIntensidadeFogo - decay : 0

    ArrayPixelsFogo[intensidadeAtual - decay] = novaIntensidade

}
function renderFogo() {
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0'

    for (let row = 0; row < alturaFogo; row++){
        html += '<tr>'
        for (let colm=0; colm < alturaFogo; colm++){
            const pixelIndex = colm + (alturaFogo * row)
            const intensidadeFogo = ArrayPixelsFogo[pixelIndex]

            if (debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>` 
                html += intensidadeFogo
                html += '</td>'
            } else {
                const cor = PaletaDeCorFogo[intensidadeFogo]
                const StringCor = `${cor.r},${cor.g},${cor.b}`

                html += `<td class="pixel" style="background-color: rgb(${StringCor})">`
                html += '</td>'
            }
        }
        html += '</tr>'

        document.querySelector('#canvasFogo').innerHTML = html

    }

    html += '</table>'

}

function fonteFogo (){
    for (let colm =0; colm <= larguraFogo; colm++){
        const overFlowPixelIndex = alturaFogo * larguraFogo
        const pixelIndex = (overFlowPixelIndex - larguraFogo) + colm
        ArrayPixelsFogo[pixelIndex] = 36
    }
}
start()
