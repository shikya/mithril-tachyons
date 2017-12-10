var root = document.getElementById("mithril");

const table = {
    view: () => {
        return m("div",[
            m("table",[
                m("tr", [
                    m("th", { class: "bg-black-10" }, ""),
                    m("th", { class: "ba bg-black-10"}, "Header"),
                    m("th", { class: "ba bg-black-10"}, "Header"),
                    m("th", { class: "ba bg-black-10"}, "Header"),
                ]),
                m("tr",[
                    m("td", { class: "ba"}, "0"),
                    m("td", { class: "ba"}, "Cell"),
                    m("td", { class: "ba"}, "Cell"),
                    m("td", { class: "ba"}, "Cell"),
                ])
            ])
        ]);
    }
};

m.mount(root, table);