var authToken = neo4j.v1.auth.basic("neo4j", "neo4j");
console.log(authToken);
var driver = neo4j.v1.driver("bolt://127.0.0.1:7687", authToken, {
    encrypted:false
});
var session = driver.session();
function run() {
    var statement = document.getElementById("statement").value,
        parameters = getParameters();
    var table = document.createElement("table");
    session.run(statement, parameters).subscribe({
        onNext: function(record) {
            // On receipt of RECORD
            var tr = document.createElement("tr");
            record.forEach( function( value ) {
                var td = document.createElement("td");
                td.appendChild(document.createTextNode(value));
                tr.appendChild(td);
            });
            table.appendChild(tr);
        },
        onCompleted: function(metadata) {

        }
    });

    var results = document.getElementById("results");
    while(results.childElementCount > 0) {
        results.removeChild(results.children[0]);
    }
    results.appendChild(table);
}

function addParameter(key, value) {
    var row = document.getElementById("addParameter").parentNode.parentNode;

    if (!key) key = document.getElementById("key").value;
    if (!value) value = document.getElementById("value").value;

    if (key.length > 0) {
        var tbody = document.getElementById("parameters").getElementsByTagName("tbody")[0];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.setAttribute("class", "parameter");
        td1.appendChild(document.createTextNode(key));
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(value));
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("value", "-");
        button.onclick = function(event) {
            removeParameter(event.target.parentNode.parentNode);
        };
        td3.appendChild(button);
        tr.appendChild(td3);
        document.getElementById("key").value = "";
        document.getElementById("value").value = "";

        tbody.insertBefore(tr, row);
    }
}

function removeParameter(row) {
    row.parentNode.removeChild(row);
}

function getParameters() {
    var map = {},
        parameters = document.getElementById("parameters").getElementsByClassName("parameter");
    for(var i = 0; i < parameters.length; i++) {
        var p = parameters[i],
            key = p.textContent,
            value = p.nextSibling.textContent;
        try {
            map[key] = JSON.parse(value);
        } catch(e) {
            map[key] = value;
        }
    }
    return map;
}

document.getElementById("addParameter").onclick = function(event) {
    addParameter();
};
document.getElementById("runButton").onclick = run;
if (document.location.href.indexOf("example") >= 0) {
//        document.getElementById("statement").textContent = "MERGE (alice:Person {name:{name_a},age:{age_a},married:{married_a}})\nMERGE (bob:Person {name:{name_b},age:{age_b},married:{married_b}})\nCREATE UNIQUE (alice)-[alice_knows_bob:KNOWS]->(bob)\nRETURN alice, bob, alice_knows_bob";
    document.getElementById("statement").textContent = "MERGE (alice:Person {name:{name_a},age:{age_a}})\nMERGE (bob:Person {name:{name_b},age:{age_b}})\nCREATE UNIQUE (alice)-[alice_knows_bob:KNOWS]->(bob)\nRETURN alice, bob, alice_knows_bob";
    addParameter("name_a", "Alice");
    addParameter("age_a", 33);
    //addParameter("married_a", "true");
    addParameter("name_b", "Bob");
    addParameter("age_b", 44);
    //addParameter("married_b", "false");
}
