javascript:


if (window.location.href.indexOf('screen=ally&mode=members') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "ally&mode=members");
}
// Sophie "Shinko to Kuma"
$.getAll = function (
    urls, // array of URLs
    onLoad, // called when any URL is loaded, params (index, data)
    onDone, // called when all URLs successfully loaded, no params
    onError // called when a URL load fails or if onLoad throws an exception, params (error)
) {
    var numDone = 0;
    var lastRequestTime = 0;
    var minWaitTime = 200; // ms between requests
    loadNext();
    function loadNext() {
        if (numDone == urls.length) {
            onDone();
            return;
        }

        let now = Date.now();
        let timeElapsed = now - lastRequestTime;
        if (timeElapsed < minWaitTime) {
            let timeRemaining = minWaitTime - timeElapsed;
            setTimeout(loadNext, timeRemaining);
            return;
        }
        console.log('Getting ', urls[numDone]);
        $("#progress").css("width", `${(numDone + 1) / urls.length * 100}%`);
        lastRequestTime = now;
        $.get(urls[numDone])
            .done((data) => {
                try {
                    onLoad(numDone, data);
                    ++numDone;
                    loadNext();
                } catch (e) {
                    onError(e);
                }
            })
            .fail((xhr) => {
                onError(xhr);
            })
    }
};
var names = [];
rows = $($("table .vis")[2]).find('tr');
for (var i = 1; i < rows.length; i++) {
    names.push($(rows[i]).find('a')[0].innerText.trim().split(' ').join('+'));
}

linksODS = [];
linksODD = [];
linksODA = [];
linksLoot = [];
linksScav = [];

ODSperPlayer = [];
ODDperPlayer = [];
ODAperPlayer = [];
lootperPlayer = [];
scavperPlayer = [];

for (var i = 0; i < names.length; i++) {
    linksODA.push("/game.php?screen=ranking&mode=in_a_day&type=kill_att&name=" + names[i]);
    linksODS.push("/game.php?screen=ranking&mode=in_a_day&type=kill_sup&name=" + names[i]);
    linksODD.push("/game.php?screen=ranking&mode=in_a_day&type=kill_def&name=" + names[i]);
    linksLoot.push("/game.php?screen=ranking&mode=in_a_day&type=loot_res&name=" + names[i]);
    linksScav.push("/game.php?screen=ranking&mode=in_a_day&type=scavenge&name=" + names[i]);
}
$("#content_value table.vis tr").eq(2).append("<th onclick='sortTableTest(6)'>ODA</th><th onclick='sortTableTest(7)'>ODD</th><th onclick='sortTableTest(8)'>ODS</th><th onclick='sortTableTest(9)'>Loot</th><th onclick='sortTableTest(9)'>Scav</th>")
//need to fix sorting for scav
$("#content_value table.vis").eq(2).attr('id','tableMembers');
$("#contentContainer").eq(0).prepend(`
                <div id="progressbar" style="width: 100%;
                background-color: #36393f;"><div id="progress" style="width: 0%;
                height: 35px;
                background-color: #4CAF50;
                text-align: center;
                line-height: 32px;
                color: black;"></div>
                </div>`);
$("#mobileHeader").eq(0).prepend(`
                <div id="progressbar" style="width: 100%;
                background-color: #36393f;"><div id="progress" style="width: 0%;
                height: 35px;
                background-color: #4CAF50;
                text-align: center;
                line-height: 32px;
                color: black;"></div>
                </div>`);
//ODA
$.getAll(linksODA, (i, data) => {
    if ($(data).find(".lit-item")[3] != undefined) {
        temp = $(data).find(".lit-item")
        ODAperPlayer.push([temp[3].innerText, temp[4].innerText]);
    }
    else {
        ODAperPlayer.push(["0", "Never"]);
    }
    
},
    () => {
        $("#progress").css("width", `${(linksODA.length) / linksODA.length * 100}%`);
        for (var o = 3; o < ODAperPlayer.length + 3; o++) {
            $("#content_value table.vis tr").eq(o).append("<td title=" + ODAperPlayer[o - 3][1] + ">" + ODAperPlayer[o - 3][0] + "</th>")
        }
        //ODD
        $.getAll(linksODD, (i, data) => {
            if ($(data).find(".lit-item")[3] != undefined) {
                temp = $(data).find(".lit-item")
                ODDperPlayer.push([temp[3].innerText, temp[4].innerText]);
            }
            else {
                ODDperPlayer.push(["0", "Never"]);
            }

        },
            () => {
                for (var o = 3; o < ODDperPlayer.length + 3; o++) {
                    $("#content_value table.vis tr").eq(o).append("<td title=" + ODDperPlayer[o - 3][1] + ">" + ODDperPlayer[o - 3][0] + "</th>")
                }
                //ODS
                $.getAll(linksODS, (i, data) => {
                    if ($(data).find(".lit-item")[3] != undefined) {
                        temp = $(data).find(".lit-item")
                        ODSperPlayer.push([temp[3].innerText, temp[4].innerText]);
                    }
                    else {
                        ODSperPlayer.push(["0", "Never"]);
                    }

                },
                    () => {
                        for (var o = 3; o < ODSperPlayer.length + 3; o++) {
                            $("#content_value table.vis tr").eq(o).append("<td title=" + ODSperPlayer[o - 3][1] + ">" + ODSperPlayer[o - 3][0] + "</th>")
                        }

                        //loot
                        $.getAll(linksLoot, (i, data) => {
                            if ($(data).find(".lit-item")[3] != undefined) {
                                temp = $(data).find(".lit-item")
                                lootperPlayer.push([temp[3].innerText, temp[4].innerText]);
                            }
                            else {
                                lootperPlayer.push(["0", "Never"]);
                            }

                        },
                            () => {
                                for (var o = 3; o < lootperPlayer.length + 3; o++) {
                                    $("#content_value table.vis tr").eq(o).append("<td title=" + lootperPlayer[o - 3][1] + ">" + lootperPlayer[o - 3][0] + "</th>")
                                }

                                //scav
                        $.getAll(linksScav, (i, data) => {
                            if ($(data).find(".lit-item")[3] != undefined) {
                                temp = $(data).find(".lit-item")
                                scavperPlayer.push([temp[3].innerText, temp[4].innerText]);
                            }
                            else {
                                scavperPlayer.push(["0", "Never"]);
                            }

                        },
                            () => {
                                for (var o = 3; o < scavperPlayer.length + 3; o++) {
                                    $("#content_value table.vis tr").eq(o).append("<td title=" + scavperPlayer[o - 3][1] + ">" + scavperPlayer[o - 3][0] + "</th>")
                                }

                                $("#progress").remove();
                            },
                            (error) => {
                                console.error(error);
                            });
                    },
                    (error) => {
                        console.error(error);
                    });

            },
            (error) => {
                console.error(error);
            });



    },
    (error) => {
        console.error(error);
    });




    function sortTableTest(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("tableMembers");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (Number(x.innerHTML.replace(/\./g,'')) > Number(y.innerHTML.replace(/\./g,''))) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (Number(x.innerHTML.replace(/\./g,'')) < Number(y.innerHTML.replace(/\./g,''))) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
