function solve(arr) {
    let mistary = arr.shift();

    let command = arr.shift().split("!");

    let alreadyReversed = false;
    while (command[0] !== "End") {
            if (command[0] === "RemoveEven") {
        let spell = '';
            for (let index = 0; index < mistary.length; index+=2) {
                let char = mistary[index];    
                spell += char;
            }
            mistary = spell;
            console.log(mistary);
        } else if (command[0] === "TakePart") {
            let fromIndex = Number(command[1]);
            let toIndex = Number(command[2]);
            mistary = mistary.substring(fromIndex, toIndex);
            console.log(mistary);
        } else if (command[0] === "Reverse") {
            let substring = command[1];
            if (substring && alreadyReversed === false) {
            mistary = mistary.replace(substring, '');
            substring = substring.split('').reverse().join('');
            mistary += substring;
            alreadyReversed = true;
            console.log(mistary);
            } else {
                console.log("Error");
            }
        }
        command = arr.shift().split("!");
    }
    console.log(`The concealed spell is: ${mistary}`);
}


solve(["hZwemtroiui5tfone1haGnanbvcaploL2u2a2n2i2m", 
"TakePart!31!42",
"RemoveEven",
"Reverse!anim",
"Reverse!sad",
"End"]
)