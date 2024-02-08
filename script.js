function cifrarTexto() {
    let inputText = document.getElementById("textoOriginal").value;

    if (!/^[a-z\s]+$/.test(inputText)) {
        alert("Solo se aceptan letras minúsculas y espacios.");
        return;
    }

    let vocalesReemplazo = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    let encryptedText = "";

    for (let i = 0; i < inputText.length; i++) {
        let currentChar = inputText[i];

        if (currentChar in vocalesReemplazo) {
            encryptedText += vocalesReemplazo[currentChar];
        } else if (currentChar === ' ') {
            encryptedText += ' ';
        } else {
            encryptedText += currentChar; // Caracter no modificado
        }
    }

    mostrarTexto(encryptedText);
}

function descifrarTexto() {
    let inputText = document.getElementById("textoOriginal").value;

    if (!/^[a-z\s]+$/.test(inputText)) {
        alert("Solo se aceptan letras minúsculas y espacios.");
        return;
    }

    let vocalesReemplazo = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    let decryptedText = "";

    for (let i = 0; i < inputText.length; i++) {
        let currentChar = inputText[i];

        if (currentChar === ' ') {
            decryptedText += ' ';
        } else {
            let found = false;

            for (let key in vocalesReemplazo) {
                if (inputText.startsWith(key, i)) {
                    decryptedText += vocalesReemplazo[key];
                    i += key.length - 1; // Avanzar según la longitud de la combinación
                    found = true;
                    break;
                }
            }

            if (!found) {
                decryptedText += currentChar; // Caracter no modificado
            }
        }
    }

    mostrarTexto(decryptedText);

}

function mostrarTexto(texto) {
    let areaPresentacion = document.getElementById("areaPresentacion");
    areaPresentacion.innerText = texto;
    areaPresentacion.className = "textoCifrado";

    // Mostrar el botón de copiar solo si hay texto en el área de presentación
    if (texto.trim().length > 0) {
        document.getElementById("btnCopiar").style.display = "inline-block";
    } else {
        document.getElementById("btnCopiar").style.display = "none";
    }
}
function actualizarBotonCopiar() {
    var areaPresentacion = document.getElementById("areaPresentacion");
    var btnCopiar = document.getElementById("btnCopiar");

    if (areaPresentacion.textContent.trim() !== "") {
        btnCopiar.classList.add("mostrar-btn"); // Agregar la clase para mostrar el botón
    } else {
        btnCopiar.classList.remove("mostrar-btn"); // Quitar la clase para ocultar el botón
    }
}

function copiarTexto() {
    let areaPresentacion = document.getElementById("areaPresentacion");
    let textoCopiar = areaPresentacion.innerText.trim();

    if (textoCopiar === "") {
        alert("No hay texto para copiar.");
        return;
    }

    navigator.clipboard.writeText(textoCopiar)
        .then(function () {
            alert("Texto copiado al portapapeles: " + textoCopiar);
            // Limpiar el textarea
            document.getElementById("textoOriginal").value = "";
        })
        .catch(function (err) {
            console.error("Error al copiar el texto al portapapeles: ", err);
        });
}

function autoResize(textarea) {
    textarea.style.height = 'auto'; // Restablecer la altura a automática
    textarea.style.height = textarea.scrollHeight + 'px'; // Establecer la altura al desplazamiento del contenido
}
