//cifrado cesar
var cesar = cesar || (function(){
    var proceso = function(txt, desp, action){
        var replace = (function(){
            //primero necesito tener la matriz del alfabeto
            //hay que recorrar que el cifrado lo hace caracter por caracter
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z'];
            var l = abc.length;

            //necesitamos obtener la posicion que va  a venir por parte
            //de la llave privada

            return function(c){
                //vamos a saber la posicion
                var i = abc.indexOf(c.toLowerCase());
                //necesitamos saber es donde estamos adentro de la matriz
                //como la vamos a recorrer y que pasa cuando llegue
                //al final?
                //alert(c);
                //alert(i);

                if(i != -1){
                    //primero obtenemos la posicion para el desp
                    var pos = i;
                    //que voy a hacer cifrar o descifrar
                    if(action){
                        //cifrar para adelante
                        pos += desp;
                        //como se va a mover
                        pos -= (pos >= l)?l:0;
                    }else{
                        //descifrar para atras
                        pos -= desp;
                        //movimiento
                        pos += (pos < 0)?l:0;
                    }
                    return abc[pos];

                }
                return c;
            };
        })();
        //tenemos que saber que el texto este acorde al abc
        var re = (/([a-z])/ig);
        //una funcion que se encargue del intercambio
        return String(txt).replace(re, function(match){
            return replace(match);
        });

    };

    return{
        encode : function(txt, desp){
            return proceso(txt, desp, true);
        },

        decode : function(txt, desp){
            return proceso(txt, desp, false);
        }
    };
})();

//funcion de cifrado

function ccifrar(){
    document.getElementById('cresul').innerHTML =
        cesar.encode(document.getElementById('ctext').value, 3);
}

//funcion de descifrado

function cdescifrar(){
    document.getElementById("cresul").innerHTML =
        cesar.decode(document.getElementById("ctext").value, 3);
}

//------------------------

//cifrado viggenere

function PhraseToArray(Frase){
    var Out = [];
    for(var i = 0; i < Frase.length; i++)
    {
        var CodeNumber = Frase.charCodeAt(i);
        if(CodeNumber >= 97 && CodeNumber <= 122)
        {
            CodeNumber = CodeNumber - 32;
        }
        if(CodeNumber == 209 || CodeNumber == 241)
        {
            Out.push(15);
        }
        if(CodeNumber == 32)
        {
            Out.push(32);
        }
        else{
            if(CodeNumber-64 < 15)
            {
                Out.push(CodeNumber-64);
            }
            else if(CodeNumber-64 >= 15 && CodeNumber-64 < 28){
                Out.push(CodeNumber-63);
            }
        }
    }
    return Out;
}
function Encriptar(ModeEnc){
    var GetPhrase = document.getElementById('vtext').value;
    var GetPass = document.getElementById('llave').value;
    var Codes = [];
    if(GetPhrase.length < 1 || GetPass.length < 1)
    {
        alert('La frase no puede estar en blanco')
        return;
    }
    var PassData = PhraseToArray(GetPass);
    var PhraseData = PhraseToArray(GetPhrase);
    var SpaceCount = 0;
    if (ModeEnc == true)
    {
        for(var i = 0; i < PhraseData.length; i++)
        {
            if(PhraseData[i] == 32)
            {
                Codes.push(32);
                SpaceCount += 1;
            }else{
                Codes.push((PassData[(i - SpaceCount) % PassData.length] + PhraseData[i]) % 27);
            }
        }
    }else{
        for(var i = 0; i < PhraseData.length; i++)
        {
            if(PhraseData[i] == 32)
            {
                Codes.push(32);
                SpaceCount += 1;
            }else{
                var Value = PhraseData[i] - PassData[(i - SpaceCount) % PassData.length];
                if (Value < 1)
                {
                    Value += 27;
                }
                Codes.push(Value % 27);
            }
        }
    }
    return Codes;
}
// Devolver el resultado
function RebuildString(Codigos)
{
    var Salida = "";
    for(var i = 0; i < Codigos.length; i++)
    {
        if (Codigos[i] == 15 )
        {
            Salida += String.fromCharCode(209);
        }
        if (Codigos[i] == 32)
        {
            Salida += String.fromCharCode(32);
        }
        if (Codigos[i] == 0)
        {
            Salida += String.fromCharCode(90);
        }
        if(Codigos[i] < 15 && Codigos [i] > 0)
            Salida += String.fromCharCode(Codigos[i]+64);
        else if(Codigos[i] > 15 && Codigos[i] < 28){
            Salida += String.fromCharCode(Codigos[i]+63);
        }
    }
    document.getElementById('vresul').value = Salida;
}