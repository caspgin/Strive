import { ListComponent, SideBar, TopBar } from './components';
import { ListType } from './types/types';
import { useListManagement } from './Hooks/ListManagementHook';
import { useState } from 'react';
import './css/App.css';
import { useScroll } from './Hooks/ScrollHook';

function App() {
	//console.log('app rendered');
	const {
		lists,
		deleteList,
		createNewList,
		updateList,
		updateTaskCount,
		err,
	} = useListManagement();

	const { scrolled, handleScroll } = useScroll('Horizontal');
	const [showSideBar, setShowSideBar] = useState<boolean>(true);

	return (
		<div id="app">
			<TopBar {...{ setShowSideBar }} />
			<main id="MainSection">
				{showSideBar && (
					<section
						className={`sideBarSection ${scrolled > 0 ? 'scrollingBorderColor' : ''}`}
					>
						<SideBar
							{...{
								lists,
								updateList,
								createList: createNewList,
							}}
						/>
					</section>
				)}
				<section className="listAreaSection">
					<div className="listAreaContainer" onScroll={handleScroll}>
						{lists.map((list: ListType) => (
							<ListComponent
								key={list.id}
								{...{
									list,
									deleteList,
									updateListName: updateList,
									updateTaskCount,
								}}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
