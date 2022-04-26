let cuadrosMaquina = [];
let cuadrosUsuario = [];
let ronda = 1;

document.querySelector('#jugar').onclick = empezarJuego;

function empezarJuego() {
    resetearDatos();
    manejarRonda();
}

function resetearDatos() {
    cuadrosMaquina = [];
    cuadrosUsuario = [];
    ronda = 1;
}

function manejarRonda() {
    bloquearInputUsuario();
    actualizarEstado('Turno de la máquina');
    actualizarRonda(ronda);

    const $nuevoCuadro = obtenerCuadroNuevo();
    cuadrosMaquina.push($nuevoCuadro);

    const delayJugador = (cuadrosMaquina.length + 1) * 1000;

    cuadrosMaquina.forEach(function(cuadro, index){
        const delayMaquina = (index + 1) * 1000;
        setTimeout(function(){
            resaltarCuadro(cuadro);
            console.log(cuadro.id);
        }, delayMaquina);
    })

    setTimeout(function(){
        desbloquearInputUsuario();
        actualizarEstado('Turno del jugador!')
    }, delayJugador);

    ronda++;
    cuadrosUsuario = [];
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        cuadro.onclick = function(){

        }
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        cuadro.onclick = manejarInputUsuario;
    })
}

function obtenerCuadroNuevo() {
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);

    return $cuadros[indice];
}

function resaltarCuadro(cuadro) {
    cuadro.style.opacity = 1;
    setTimeout(function(){
        cuadro.style.opacity = 0.5;
    }, 500);
}

function actualizarEstado(estado, error = false){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;

    if(error){
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    }
    else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }
}

function manejarInputUsuario(e){
    const $cuadro = e.target;
    resaltarCuadro($cuadro);
    cuadrosUsuario.push($cuadro);
 

    const $cuadroMaquina = cuadrosMaquina[cuadrosUsuario.length - 1];


    if($cuadro.id !== $cuadroMaquina.id){
        perder();
        return;
    }
    if(cuadrosUsuario.length === cuadrosMaquina.length){
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }

}

function perder(){
    bloquearInputUsuario();
    actualizarEstado('Lo siento, perdiste! Si querés volver a intentar toca "Jugar"', true);
}

function actualizarRonda(ronda){
    const $ronda = document.querySelector('#ronda');
    $ronda.textContent = ronda;
}