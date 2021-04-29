import React, { useEffect, useState } from 'react';

import { Container, Item } from './styles';

interface ItemData {
	key: number;
	value: string;
}

interface SlideMenuProps {
	onChange?: (selectedItem: string, key?: number) => void;
	initialValue?: number;
	items: ItemData[];
	state?: number;
}

const SlideMenu: React.FC<SlideMenuProps> = ({
	items,
	onChange,
	initialValue,
	state,
}) => {
	const [selected, setSelected] = useState(initialValue || 1);

	useEffect(() => {
		if (state) {
			setSelected(state);
		}
	}, [state]);

	return (
		<Container>
			<div>
				{items.map((item) => {
					const { key, value } = item;
					return (
						<Item
							key={key}
							onClick={() => {
								setSelected(key);
								return onChange ? onChange(value, key) : null;
							}}
							isSelected={Number(selected === key)}
						>
							{value}
						</Item>
					);
				})}
			</div>
		</Container>
	);
};

export default SlideMenu;
