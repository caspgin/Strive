import { DropDownItem } from '../../components';
import { DropDownMenuProp, SortBy } from '../../types/types';
import '../../css/listDropDown.css';
import ReactDOM from 'react-dom';
import { useDropDownMenu } from '../../Hooks/DropDownMenuHook';

interface ListDropDownProp {
	sortby: SortBy;
	setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
	listid: number;
	handleDeleteList: () => void;
	setIsNameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ListDropDownMenuProp = ListDropDownProp & DropDownMenuProp;

const portalRoot = document.getElementById('portal');

export const ListDropDown = ({
	sortby,
	listid,
	setSortBy,
	handleDeleteList,
	setIsNameDialogOpen,
}: ListDropDownProp) => {
	const {
		openMenu,
		handleClose,
		isOpen,
		setMenuPositionRef,
		onBlurRef,
		menuPos,
		dropDownBtnRef,
		setIsOpen,
		closeMenu,
	} = useDropDownMenu();
	return (
		<div className="listDropDown" onBlur={handleClose}>
			{
				<div className="dropdown-button-container listSetting">
					<button
						onClick={openMenu}
						className="dropdown-button"
						ref={dropDownBtnRef}
					>
						<span className="material-symbols-outlined">
							more_vert
						</span>
					</button>
				</div>
			}
			{isOpen &&
				portalRoot &&
				ReactDOM.createPortal(
					<ListDropDownMenu
						{...{
							setSortBy,
							listid,
							sortby,
							setIsNameDialogOpen,
							handleDeleteList,
							onBlurRef,
							setMenuPositionRef,
							menuPos,
							setIsOpen,
							closeMenu,
						}}
					/>,
					portalRoot,
				)}
		</div>
	);
};

const ListDropDownMenu = ({
	listid,
	sortby,
	onBlurRef,
	menuPos,
	setSortBy,
	handleDeleteList,
	setIsNameDialogOpen,
	setMenuPositionRef,
	closeMenu,
}: ListDropDownMenuProp) => {
	return (
		<div
			className="dropdown-menu-container"
			style={{
				top: menuPos.y,
				left: menuPos.x,
				right: 'auto',
				bottom: 'auto',
			}}
			ref={(node: HTMLDivElement | null) => {
				setMenuPositionRef(node);
				onBlurRef.current = node;
			}}
		>
			<div className="dropdown-menu">
				<div className="sortByMenu">
					<div className="dropdown-label">Sort by</div>
					<div>
						<DropDownItem
							{...{
								title: 'My order',
								icon_name:
									sortby == SortBy.UserOrder ? 'check' : '',
								handleClick: () => {
									closeMenu();
									setSortBy(SortBy.UserOrder);
								},
							}}
						/>
						<DropDownItem
							{...{
								title: 'Date',
								icon_name: sortby == SortBy.Date ? 'check' : '',
								handleClick: () => {
									closeMenu();
									setSortBy(SortBy.Date);
								},
							}}
						/>
						<DropDownItem
							{...{
								title: 'Title',
								icon_name:
									sortby == SortBy.Alphabetically
										? 'check'
										: '',
								handleClick: () => {
									closeMenu();
									setSortBy(SortBy.Alphabetically);
								},
							}}
						/>
					</div>
				</div>
				<hr className="line" />
				<DropDownItem
					{...{
						title: 'Rename List',
						handleClick: () => {
							closeMenu();
							setIsNameDialogOpen(true);
						},
					}}
				/>
				<DropDownItem
					{...{
						title: 'Delete List',
						handleClick: () => {
							closeMenu();
							handleDeleteList();
						},
						disabled: listid == 0 ? true : false,
					}}
				/>
			</div>
		</div>
	);
};
