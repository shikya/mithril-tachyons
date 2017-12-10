var root = document.getElementById("mithril");
var data = [];

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

const table = {
    view: () => {
        return m("div",[
            m("table",[
                m("tr", [
                    m("th", { class: "ba bg-black-10" }, "id"),
                    m("th", { class: "ba bg-black-10"}, "Name"),
                    m("th", { class: "ba bg-black-10"}, "Gender"),
                    m("th", { class: "ba bg-black-10"}, "Company"),
                    m("th", { class: "ba bg-black-10"}, "Email"),
                ]),
                data.map( singleEntry => {
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

m.mount(root, table);