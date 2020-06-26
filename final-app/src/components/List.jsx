import React from 'react';

export default function List({ items = [], remove, toggle }) {
	return (
		<ul>
			{items.map((item) => (
				<li key={item.id}>
					<span
						style={{
							textDecoration: item.complete && 'line-through',
						}}
					>
						{item.name}
					</span>
					{toggle && (
						<button onClick={() => toggle(item.id)}>toggle</button>
					)}
					<button onClick={() => remove(item)}>X</button>
				</li>
			))}
		</ul>
	);
}
