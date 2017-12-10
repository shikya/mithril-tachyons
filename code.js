var root = document.getElementById("mithril");
var data = [];

var showing = 10;
var rowsVisible = 15;
var offset = 5;

var fetchData = () => {
    return m.request({
        method: "GET",
        url: "data.json",
    }).then( responseData => {
        data = responseData;
        console.log(data);
    }).catch( error =>{
        console.error(error);
    } );
}

fetchData();
const header = {
    view: () => {
        return m("div", [
            [
                m("div", [
                    m("button", "FP"),
                    m("button", "PP"),
                    m("button", "PC"),
                ]),
                m("div", [
                    m("div", [
                        m("label", { for: "showing"}, "Showing"),
                        m("input", { type: "number"})
                    ]),
                    m("div", [
                        m("label", { for: "rowsout"}, "Rows Out of"),
                        m("input", { type: "number"})
                    ]),
                    m("div", [
                        m("label", { for: "starting"}, "Showing"),
                        m("input", { type: "number"})
                    ]),
                ]),
                m("div", [
                    m("button", "LP"),
                    m("button", "NP"),
                    m("button", "NC"),
                ])
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
                    m("th", { class: "ba bg-black-10" }, "id"),
                    m("th", { class: "ba bg-black-10"}, "Name"),
                    m("th", { class: "ba bg-black-10"}, "Gender"),
                    m("th", { class: "ba bg-black-10"}, "Company"),
                    m("th", { class: "ba bg-black-10"}, "Email"),
                ]),
                data.filter((singleEntry, index, array) => {
                    console.log(offset, index, index + offset, rowsVisible, offset <= index,  (index + offset) < rowsVisible);
                    return (offset > index && (index + offset) < rowsVisible)
                }).map( (singleEntry, index, array) => {
                    return m("tr",[
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