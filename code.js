var root = document.getElementById("mithril");

const table = {
    view: () => {
        return m("main",[
            m("p", "Hello")
        ]);
    }
};

m.render(root, table);