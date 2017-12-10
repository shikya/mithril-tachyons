var root = document.getElementById("mithril");
var data = [];

var showing = 5;
var rowsVisible = 100;
var offset = 0;

var fetchData = () => {
    return m.request({
        method: "GET",
        url: "data.json",
    }).then( responseData => {
        data = responseData;
    }).catch( error =>{
        console.error(error);
    } );
}

var updateShowing = (value) => {
    showing = value;
};

var updateRowVisible = (value) => {
    rowsVisible = value;
    if(value <= 0)
        rowsVisible = 1;
    if(value > data.length)
        rowsVisible = data.length
};
var updateOffset = (value) => {
    if(value >= 0) offset = value;
};

fetchData();
const header = {
    view: () => {
        return m("div", [
            [
                m("div", [
                    m("button",{ onclick: ()=>{ updateOffset(0) }}, "|<<"),
                    m("button",{ onclick: ()=>{ updateOffset(offset-=showing) }}, "<<"),
                    m("button",{ onclick: ()=>{ updateOffset(offset-1) }}, "<"),
                ]),
                m("div", [
                    m("div", [
                        m("label", { for: "showing"}, "Showing"),
                        m("input", { type: "number", value: showing, oninput: (event) => {updateShowing(event.srcElement.value)}})
                    ]),
                    m("div", [
                        m("label", { for: "rowsout"}, "Rows Out of"),
                        m("input", { type: "number", value: rowsVisible, oninput: (event) => {updateRowVisible(event.srcElement.value)} })
                    ]),
                    m("div", [
                        m("label", { for: "starting"}, "Starting"),
                        m("input", { type: "number", value: offset, oninput: (event) => { updateOffset(event.srcElement.value)} })
                    ]),
                ]),
                m("div", [
                    m("button",{ onclick: ()=> { updateOffset(offset+1) }}, ">"),
                    m("button",{ onclick: ()=> { updateOffset(offset+=showing) }}, ">>"),
                    m("button",{ onclick: ()=> {
                        updateOffset(data.length - showing)
                    }}, ">>|"),
                ]),
                // m("div",[
                //     m("p",{ innerText: "showing:"+ showing }),
                //     m("p",{ innerText: "rowsVisible:"+ rowsVisible }),
                //     m("p",{ innerText: "offset:"+ offset }),
                // ])
            ]
        ]);
    }
}

const table = {
    view: () => {
        return m("div",[
            m("div", header),
            m("table",[
                m("tr", [
                    m("th", { class: "bg-black-10" }, ""),
                    m("th", { class: "ba bg-black-10" }, "id"),
                    m("th", { class: "ba bg-black-10"}, "Name"),
                    m("th", { class: "ba bg-black-10"}, "Gender"),
                    m("th", { class: "ba bg-black-10"}, "Company"),
                    m("th", { class: "ba bg-black-10"}, "Email"),
                ]),
                data.slice(offset, rowsVisible)
                    .slice(0, showing)
                    .map( (singleEntry, index, array) => {
                        return m("tr",[
                            m("td", { class: "ba"}, index ),
                            m("td", { class: "ba"}, singleEntry.id ),
                            m("td", { class: "ba"}, singleEntry.name ),
                            m("td", { class: "ba"}, singleEntry.gender),
                            m("td", { class: "ba"}, singleEntry.company),
                            m("td", { class: "ba"}, singleEntry.email),
                        ])
                    })
            ])
        ]);
    }
};

const body = {
    view: () => {
        return m("div",[
            m(header),
            m(table)
        ])
    }
}

m.mount(root, body);