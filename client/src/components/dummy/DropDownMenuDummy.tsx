import { DropDownItem } from '../DropDown';
import '../../css/taskDropDown.css';
import '../../css/dummy.css';

export const DropDownMenuDummy = () => {
    return (
        <div className="dropdown-menu-container dummy" id="dropDownMenuDummy">
            <div className="dropdown-menu">
                <DropDownItem
                    {...{
                        title: 'Add Subtask',
                        icon_name: 'subdirectory_arrow_right',
                        handleClick: (event) => {
                            event.stopPropagation();
                        },
                    }}
                />
                <DropDownItem
                    {...{
                        title: 'Delete',
                        icon_name: 'delete',
                        handleClick: (event) => {
                            event.stopPropagation();
                        },
                    }}
                />
            </div>
        </div>
    );
};
