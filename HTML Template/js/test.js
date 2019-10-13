var data = {"kill-me":{"google":{"-Lr08zBxw8WjjUOYRnvF":{"comments":"nocomment","index":0,"phrase":"asd"},"url":"tffest"},"hub":{"-Lr0BRwy769DvPitKkhr":{"comments":"nocomment","index":0,"phrase":"CheckoutourQuickstarttutorialsforeachproduct-fast5-10minutetutorialstogetyouupandrunningwithyourfirstAPIcallordeployment.Ontheleftnavigationbarforeachproductdocumentationpage,wehavelinkstoothertutorials."},"-Lr0BSceqddgUr8pWSWD":{"comments":"nocomment","index":0,"phrase":"WhatproductsshouldItry?"},"-Lr0BUdd7py_GibYCXAW":{"comments":"nocomment","index":0,"phrase":"WhatisGoogleCloud?GoogleCloudisasuiteofdeveloper"},"url":"teffst"}},"project1":{"Google":{"-Lr-8Vn3RMiQSWUd2zEn":{"comments":"thisisacomment","index":"123","phrase":"hi"},"-Lr-8Vn7g0g8By4sk-uV":{"comments":"wow","index":"1","phrase":"hello"},"url":"thisisaurl"},"asdf":{"-Lr-gffppIldwaqVpNTs":{"comments":"aasfdasdfasd","index":"a","phrase":"b"},"-Lr0B3Ub2wFHoF0xeZLt":{"comments":"h","index":"i","phrase":"hi"},"-Lr0BxjinDaV2v8OgZbl":{"comments":"h","index":"i","phrase":"hi"},"-Lr0CLVWwS9avu_uBPTD":{"comments":"h","index":"i","phrase":"hi"},"-Lr0CPSvIsyQ3tHSBXUT":{"comments":"h","index":"i","phrase":"hi"},"url":"teffst"},"wikipedia":{"-Lr029kTsNMm9_o_SYK6":{"comments":"hi","index":"1","phrase":"hi"},"-Lr0DXjvwp4dC-8w4Gx-":{"comments":"h","index":"i","phrase":"hi"},"url":"tffest"}},"project2":{"wikipedia":{"-Lr-BNBLsUjS4H4ImFiG":{"comments":"","index":"7","phrase":"importanatsentence"},"url":"url1"}}}

let dataArray = []
let tempArray;
let dataEntries = Object.entries(data);

//console.log(dataEntries);

function getThings() {
    return data;
}


/*
for(i = 0; i < dataEntries.length; i++) {
    tempArray = []
    let sites = Object.entries(dataEntries[i][1]);
    //console.log(sites)
    //console.log("~~~~~~~~~~~~~~~~");
    for(k = 0; k < sites.length; k++) {
        let notes = Object.entries(sites[k][1]);
        //console.log(notes)
        //console.log("----------------")
        for(l = 0; l < notes.length; l++) {
            let details;
            if (notes[l][0] == "url") {
                //console.log("URL DETECTED!!!\n")
                //console.log(notes[l][1])
                details = ["url", notes[l][1]];
            } else {
                details = Object.entries(notes[l][1]);
                //console.log(details)
                //console.log("____________________")
            }
        }                 
    }
}
*/
