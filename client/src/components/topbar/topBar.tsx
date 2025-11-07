interface TopBarProp {
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TopBar({ setShowSideBar }: TopBarProp) {
    return (
        <section id="TopBar">
            <div className="appHeader">
                <div className="sideBarToggle">
                    <button
                        onClick={() => {
                            setShowSideBar((previous) => !previous);
                        }}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <div className="appTitle">
                    <h1>Strive</h1>
                </div>
            </div>
        </section>
    );
}
