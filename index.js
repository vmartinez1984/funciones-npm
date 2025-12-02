/**
 * Generates a random string of numbers of a specified length.
 * @param {number} length - The desired length of the string.
 * @returns {string} - A string consisting of random numbers.
 */
export function randomStringOfNumber(length) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * 10)).join('');
}

/**
 * get time in Unix
 * @returns time in unix
 */
export function getTimeUnix() {
    return (new Date()).getTime()
}

/**
 * short date current 2025-10-31
 * @returns {Date}
 */
export function getShortDate() {
    const fechaActual = new Date()
    const fechaUTC = fechaActual.toISOString().split("T")[0]

    return fechaUTC
}

/**
 * get a bithday between 18 and 80
 * @param {int} ageMin 
 * @param {int} ageMax 
 * @returns 
 */
export function randomBirthDay(ageMin = 18, ageMax = 80) {
    const hoy = new Date();

    // Rango de años
    const yearMax = hoy.getFullYear() - ageMin; // más joven
    const yearMin = hoy.getFullYear() - ageMax; // más viejo

    // Año aleatorio entre rango
    const year = Math.floor(Math.random() * (yearMax - yearMin + 1)) + yearMin;
    const month = Math.floor(Math.random() * 12); // 0–11
    const day = Math.floor(Math.random() * 28) + 1; // evita problemas con febrero

    return new Date(year, month, day);
}


/**
 * current date plus 15 minutes
 * @param {int} minutes 
 * @returns 
 */
export function getDatePlusMinutes(minutes = 15) {
    const fechaActual = new Date()
    const fechaUTC = new Date(fechaActual.getTime() + minutes * 60 * 1000).toISOString()

    return fechaUTC
}

/**
* Generates a random string of characters of a specified length.
* @param {number} length - The desired length of the string.
* @returns {string} - A string consisting of random characteres.
*/
export function randomStringOfCharacters(length) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let resultado = "";

    for (let i = 0; i < caracteres.length; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indice);
    }

    return resultado;
}

/**
 * date format utc
 * @returns {Date} date format Utc 2025-10-10T03:56:41.533Z
 */
export function getDateUtc() {
    const fechaActual = new Date();
    const fechaUTC = fechaActual.toISOString();

    return fechaUTC
}

/**
 *  return Argentina Date 2025-12-01 17:02:00
 * @param {*} minutosSumar 
 * @returns Argentina Date
 */
export function getDateArgentina(minutosSumar = 0) {
    const fecha = new Date(Date.now() + minutosSumar * 60 * 1000);

    // Convertir a hora argentina (UTC-3)
    const opciones = { timeZone: "America/Argentina/Buenos_Aires" };
    const fechaAR = new Date(fecha.toLocaleString("en-US", opciones));

    const año = fechaAR.getFullYear();
    const mes = String(fechaAR.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaAR.getDate()).padStart(2, "0");
    const hora = String(fechaAR.getHours()).padStart(2, "0");
    const minuto = String(fechaAR.getMinutes()).padStart(2, "0");
    const segundo = String(fechaAR.getSeconds()).padStart(2, "0");

    return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}

/**
 * generate id type mongo
 * @returns {string} 68fbbd82d09d019d63ded258
 */
export function randomMongoId() {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const random = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join("");
    return timestamp + random;
}

/**
 * get amount with two decimals
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export function randomAmount(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2)
}

export function randomCompany() {
    const prefijos = [
        "Tech", "Global", "Innova", "Next", "Prime", "Blue", "Smart", "Quantum",
        "Future", "Apex", "Digital", "Elite", "Green", "Vision", "Dynamic"
    ];

    const sufijos = [
        "Solutions", "Systems", "Group", "Labs", "Corporation", "Enterprises",
        "Industries", "Technologies", "Holdings", "Consulting", "Networks", "Studio"
    ];

    const conectores = ["", "", "", "", "&", "and", "de", "para"]; // algunos nombres no tienen conector

    // Escoger aleatoriamente cada parte
    const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
    const conector = conectores[Math.floor(Math.random() * conectores.length)];
    const sufijo = sufijos[Math.floor(Math.random() * sufijos.length)];

    // Combinar de forma más natural
    const nombre = conector
        ? `${prefijo} ${conector} ${sufijo}`
        : `${prefijo} ${sufijo}`;

    return nombre;
}

/**
 * Persona Moral Aleatoria
 * @returns {{nombreDeLaCompania, fechaDeConstitucion, rfc}}
 */
export function randomRfcMoral(){
    const personaMoral = {
        name: randomCompany(),
        date: randomBirthDay(1)
    }
    const rfc = generateRfcMoral(personaMoral.name, personaMoral.date)
    personaMoral.rfc = rfc

    return personaMoral
}
/**
 * Genera un RFC válido (persona moral) con homoclave y dígito verificador según algoritmo del SAT.
 * @param {string} razonSocial - Nombre de la empresa (ej: "Comercializadora del Norte S.A. de C.V.")
 * @param {string|Date} fechaConstitucion - Fecha de constitución (YYYY-MM-DD o Date)
 * @returns {string} RFC completo (ej: COM1005121A2)
 */
export function generateRfcMoral(razonSocial, fechaConstitucion) {
    if (!razonSocial) throw new Error("Se requiere razón social");

    // === Paso 1: Limpieza de la razón social ===
    const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const eliminarPalabrasComunes = (str) => {
        const comunes = [
            "S.A", "SA", "SAPI", "DE", "DEL", "LAS", "LOS", "LA", "EL",
            "Y", "CIA", "COMPANIA", "SOCIEDAD", "ANONIMA", "C.V", "CV",
            "S.C", "SC", "S.DE", "RL", "R.L"
        ];
        let palabras = str.split(/\s+/).filter(w => w && !comunes.includes(w));
        return palabras.join(" ");
    };

    let nombre = removeDiacritics(razonSocial.toUpperCase().replace(/[^A-Z\s]/g, " "));
    nombre = eliminarPalabrasComunes(nombre).replace(/\s+/g, " ").trim();

    // === Paso 2: Primeras 3 letras (clave base) ===
    const palabras = nombre.split(" ");
    let base;
    if (palabras.length >= 3) {
        base = palabras[0][0] + palabras[1][0] + palabras[2][0];
    } else {
        base = palabras.join("").substring(0, 3);
    }
    base = base.padEnd(3, "X");

    // === Paso 3: Fecha de constitución (YYMMDD) ===
    const fecha = new Date(fechaConstitucion);
    const yy = String(fecha.getFullYear()).slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const fechaStr = `${yy}${mm}${dd}`;

    // === Paso 4: Generar homoclave (2 caracteres) ===
    // Paso 4.1: Convertir la razón social a valor numérico
    const tablaValores = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ";
    const tablaPos = {};
    for (let i = 0; i < tablaValores.length; i++) tablaPos[tablaValores[i]] = i;

    let cadena = " " + nombre; // inicia con espacio
    let numCadena = "";
    for (let c of cadena) {
        numCadena += String(tablaPos[c] ?? 0o0).padStart(2, "0");
    }

    // Paso 4.2: Calcular suma
    let suma = 0;
    for (let i = 0; i < numCadena.length - 1; i++) {
        const a = parseInt(numCadena[i] + numCadena[i + 1]);
        const b = parseInt(numCadena[i + 1]);
        suma += a * b;
    }

    // Paso 4.3: Obtener los tres últimos dígitos
    const tresUltimos = suma % 1000;

    // Paso 4.4: Obtener homoclave (dos caracteres)
    const dic = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
    const cociente = Math.floor(tresUltimos / 34);
    const residuo = tresUltimos % 34;
    const homoclave = dic[cociente] + dic[residuo];

    // === Paso 5: Calcular dígito verificador ===
    const rfcParcial = base + fechaStr + homoclave;
    const tablaDigito = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13,
        'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19, 'K': 20,
        'L': 21, 'M': 22, 'N': 23, '&': 24, 'O': 25, 'P': 26, 'Q': 27,
        'R': 28, 'S': 29, 'T': 30, 'U': 31, 'V': 32, 'W': 33, 'X': 34,
        'Y': 35, 'Z': 36, ' ': 37, 'Ñ': 38
    };

    let sumaVerif = 0;
    let peso = 13;
    for (let c of rfcParcial) {
        sumaVerif += (tablaDigito[c] ?? 0) * peso--;
    }

    const digito = 11 - (sumaVerif % 11);
    let verificador;
    if (digito === 11) verificador = "0";
    else if (digito === 10) verificador = "A";
    else verificador = String(digito);

    // === Resultado final ===
    return `${rfcParcial}${verificador}`;
}

/**
 * Devuelve un estado aleatorio de México con clave y nombre oficial RENAPO.
 * @returns {{clave: string, nombre: string}} Estado aleatorio
 */
export function randomStateOfMexico() {
    const estados = {
        AS: "AGUASCALIENTES",
        BC: "BAJA CALIFORNIA",
        BS: "BAJA CALIFORNIA SUR",
        CC: "CAMPECHE",
        CL: "COAHUILA",
        CM: "COLIMA",
        CS: "CHIAPAS",
        CH: "CHIHUAHUA",
        DF: "CIUDAD DE MEXICO",
        DG: "DURANGO",
        GT: "GUANAJUATO",
        GR: "GUERRERO",
        HG: "HIDALGO",
        JC: "JALISCO",
        MC: "MEXICO",
        MN: "MICHOACAN",
        MS: "MORELOS",
        NT: "NAYARIT",
        NL: "NUEVO LEON",
        OC: "OAXACA",
        PL: "PUEBLA",
        QT: "QUERETARO",
        QR: "QUINTANA ROO",
        SP: "SAN LUIS POTOSI",
        SL: "SINALOA",
        SR: "SONORA",
        TC: "TABASCO",
        TS: "TAMAULIPAS",
        TL: "TLAXCALA",
        VZ: "VERACRUZ",
        YN: "YUCATAN",
        ZS: "ZACATECAS",
        NE: "NACIDO EN EL EXTRANJERO"
    };

    const claves = Object.keys(estados);
    const aleatoria = claves[Math.floor(Math.random() * claves.length)];
    return { clave: aleatoria, nombre: estados[aleatoria] };
}

/**
 * Devuelve aleatoriamente "H" (hombre) o "M" (mujer)
 * @returns {"H"|"M"}
 */
export function randomGenere() {
    const valores = ["H", "M"]
    const indice = Math.floor(Math.random() * valores.length)

    return valores[indice]
}

/**
 * Get female or male  random name 
 * @param {'H'|'M'} sexo 
 * @returns 
 */
export function randomName(sexo) {
    let names
    if (sexo == "H")
        names = ["Mauricio", "Amilcar", "Said", "Andrés", "Eduardo", "Andrés", "Federico", "Héctor", "Rafael", "Ivan", "Johnson", "Fernando", "Federico", "Diego"]
    else
        names = ["Marine", "Genny", "Marcela", "Lina", "Victoria", "Valentina"]

    const indice = Math.floor(Math.random() * names.length)
    return names[indice]
}

export function randomLastName() {
    let lastNames = ["Barios", "Guzman", "Melendez", "Pérez", "Betancur", "Barish", "Muhlmann", "Gonzalez", "De Palma", "Devoto", "Cianelli", "Buitrago", "Romero", "Bruera"]

    const indice = Math.floor(Math.random() * lastNames.length)
    return lastNames[indice]
}

export function randomCurp(){
    const genere = randomGenere()
    const persona = {
    nombre: randomName(genere),
    apellidoPaterno: randomLastName(),
    apellidoMaterno: randomLastName(),
    fechaNacimiento: randomBirthDay(),
    sexo: genere,
    estado: randomStateOfMexico()
    }
    const curp = generateCURP(persona)
    persona.curp = curp

    return persona
}

/**
 * Genera una CURP válida siguiendo las reglas oficiales del RENAPO.
 * @param {Object} datos
 * @param {string} datos.nombre - Nombre(s) (ej: "José Antonio")
 * @param {string} datos.apellidoPaterno - Primer apellido
 * @param {string} datos.apellidoMaterno - Segundo apellido
 * @param {string|Date} datos.fechaNacimiento - Fecha de nacimiento (YYYY-MM-DD o Date)
 * @param {"H"|"M"} datos.sexo - Sexo: "H" (hombre) o "M" (mujer)
 * @param {string} datos.estado - Estado de nacimiento (ej: "CMX", "JAL", "NLE")
 * @returns {string} CURP (18 caracteres)
 */
export function generateCURP({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    sexo,
    estado
}) {
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !fechaNacimiento || !sexo || !estado)
        throw new Error("Faltan datos para generar la CURP");

    // === Normalización de texto ===
    const limpiar = (s) =>
        s.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Z\s]/g, "")
            .trim();

    nombre = limpiar(nombre.toUpperCase());
    apellidoPaterno = limpiar(apellidoPaterno.toUpperCase());
    apellidoMaterno = limpiar(apellidoMaterno.toUpperCase());

    // === Paso 1: 4 primeras letras ===
    const vocales = "AEIOU";
    const primeraLetra = apellidoPaterno[0] || "X";
    const primeraVocalInterna =
        apellidoPaterno.slice(1).split("").find((c) => vocales.includes(c)) || "X";
    const letraMaterno = apellidoMaterno[0] || "X";

    // Se omiten nombres comunes (JOSÉ, MARÍA) si hay más de un nombre
    const nombres = nombre.split(" ");
    let primerNombre = nombres[0];
    if (nombres.length > 1 && ["JOSE", "MARIA", "MA"].includes(primerNombre))
        primerNombre = nombres[1];

    const letraNombre = primerNombre[0] || "X";

    const primeras4 = (
        primeraLetra + primeraVocalInterna + letraMaterno + letraNombre
    ).replace(/Ñ/g, "X");

    // === Paso 2: Fecha de nacimiento (YYMMDD) ===
    const fecha = new Date(fechaNacimiento);
    const yy = String(fecha.getFullYear()).slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const fechaStr = `${yy}${mm}${dd}`;

    // === Paso 3: Sexo ===
    const sexoStr = sexo.toUpperCase() === "M" ? "M" : "H";

    // === Paso 4: Estado (código oficial RENAPO) ===
    const estados = {
        AS: "AGUASCALIENTES", BC: "BAJA CALIFORNIA", BS: "BAJA CALIFORNIA SUR",
        CC: "CAMPECHE", CL: "COAHUILA", CM: "COLIMA", CS: "CHIAPAS",
        CH: "CHIHUAHUA", DF: "CIUDAD DE MEXICO", DG: "DURANGO",
        GT: "GUANAJUATO", GR: "GUERRERO", HG: "HIDALGO", JC: "JALISCO",
        MC: "MEXICO", MN: "MICHOACAN", MS: "MORELOS", NT: "NAYARIT",
        NL: "NUEVO LEON", OC: "OAXACA", PL: "PUEBLA", QT: "QUERETARO",
        QR: "QUINTANA ROO", SP: "SAN LUIS POTOSI", SL: "SINALOA",
        SR: "SONORA", TC: "TABASCO", TS: "TAMAULIPAS", TL: "TLAXCALA",
        VZ: "VERACRUZ", YN: "YUCATAN", ZS: "ZACATECAS", NE: "NACIDO EN EL EXTRANJERO"
    };
    const estadoStr = Object.keys(estados).includes(estado.toUpperCase())
        ? estado.toUpperCase()
        : "NE";

    // === Paso 5: Consonantes internas ===
    const obtenerConsonanteInterna = (palabra) => {
        const consonantes = "BCDFGHJKLMNPQRSTVWXYZ";
        return (
            palabra
                .slice(1)
                .split("")
                .find((c) => consonantes.includes(c)) || "X"
        );
    };

    const c1 = obtenerConsonanteInterna(apellidoPaterno);
    const c2 = obtenerConsonanteInterna(apellidoMaterno);
    const c3 = obtenerConsonanteInterna(primerNombre);

    // === Paso 6: Diferenciador y dígito verificador ===
    const year = fecha.getFullYear();
    const diferenciador = year >= 2000 ? "A" : "0";

    // Dígito verificador simple (no oficial)
    const base = primeras4 + fechaStr + sexoStr + estadoStr + c1 + c2 + c3 + diferenciador;
    let suma = 0;
    for (let i = 0; i < base.length; i++) suma += base.charCodeAt(i) * (i + 1);
    const digito = (suma % 10).toString();

    // === Resultado final ===
    const curp = (base + digito).toUpperCase();

    return curp;
}

/**
 * Obtiene una frease de referencia random
 * @returns {string} Frase de pago de referencia
 */
export function randomReferencePayment() {
    const referencias = [
        // Comida y antojitos
        "tacos al pastor",
        "comida oficina",
        "desayuno chilaquiles",
        "comida corrida",
        "pizza del viernes",
        "hamburguesas anoche",
        "sushi fin de semana",
        "café y pan",
        "cena familiar",
        "birria del domingo",
        "tortas ahogadas",
        "pozole viernes",
        "alitas y boneless",

        // Servicios / casa
        "Pago luz",
        "Pago agua",
        "Pago internet",
        "Pago renta",
        "Pago gas",
        "Pago mantenimiento departamento",
        "Pago teléfono",
        "Pago servicio streaming",

        // Transporte
        "Pago gasolina",
        "Pago uber",
        "Pago taxi",
        "Pago estacionamiento",

        // Personales / varios
        "Pago deuda pendiente",
        "Pago prestamo amigo",
        "Pago colegiatura",
        "Pago útiles escolares",
        "Pago regalo cumpleaños",
        "Pago cine",
        "Pago bar el viernes",
        "Pago gimnasio",
        "Pago veterinario",
        "Pago farmacia",
        "Pago compra supermercado",
        "Pago mercado",
        "Pago ropa",

        //Chilangadas
        "Garnachas doña Pelos",
        "Guajalocombo",
        "Bolillos",
        "Tacos el paisa",
        "Un bolillo"
    ];

    const index = Math.floor(Math.random() * referencias.length);
    return referencias[index];
}

/**
* get random item from array
* @param {array}
* @returns {item} random item from array
*/
export function getRandomItem(valores) {
    const indice = Math.floor(Math.random() * valores.length)
    return valores[indice]
}

/**
* retunr a global unique identifier
* @returns {string } ex. a415e252-9d51-44a6-a1ad-c3b1aa7a5aac
*/
export function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}