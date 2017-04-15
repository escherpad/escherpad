// escherpad has all these insertion points
NAME_SPACE = "example-plugin";
export const module = {
    commands: {
        [NAME_SPACE + ":lint-code"]: {
            tooltip: "lint code in the current selection"
        },
        "Hydrogen:restart-server": {
            tooltip: "restart current kernel"
        }
    },
    reducer: {
        "accounts": (s, a) => s,
        "@accounts": (s, a) => s // this one modifies existing reducer associated with the field accounts
    }, // or a function (s, a)=>s
    view: {
        'view-insertion-point': (props) => <div>haha</div>, // Component
        '@view-decorator': (Component) => <Component newProp={True}/> // wrap around existing component
    },
    saga: {
        'action:type-blah-blah': function* ({state, update}) => {}, // take particular action
    }
};

